/* DS.toast has no DOM in Node, so this drives it against a minimal stub: structure, the
   variant contract, stacking, and dismissal. Appearance (40px from the top, centred, the
   colours) is CSS and is checked in the browser. */
const fs=require('fs'),vm=require('vm');
const BASE=require('path').join(__dirname,'..')+'/';
const src=fs.readFileSync(BASE+'components.js','utf8');

function grab(name){
  const m=src.indexOf('function '+name+'(');
  if(m<0) throw new Error('not found: '+name);
  let i=src.indexOf('{',m),d=0;
  for(let j=i;j<src.length;j++){ if(src[j]==='{')d++; else if(src[j]==='}'){d--; if(!d) return src.slice(m,j+1);} }
}

/* ---- minimal DOM ---------------------------------------------------------- */
function makeNode(tag){
  const n={
    tagName:String(tag).toUpperCase(), childNodes:[], attrs:{}, _cls:new Set(),
    parentNode:null, textContent:'', _listeners:{},
    get className(){ return [...n._cls].join(' '); },
    set className(v){ n._cls=new Set(String(v).split(/\s+/).filter(Boolean)); },
    get firstChild(){ return n.childNodes[0]||null; },
    get lastChild(){ return n.childNodes[n.childNodes.length-1]||null; },
    classList:{
      add:(...c)=>c.forEach(x=>n._cls.add(x)),
      remove:(...c)=>c.forEach(x=>n._cls.delete(x)),
      contains:(c)=>n._cls.has(c),
      toggle:(c,on)=>{ const want = on===undefined? !n._cls.has(c) : !!on; want?n._cls.add(c):n._cls.delete(c); },
    },
    setAttribute:(k,v)=>{ n.attrs[k]=String(v); },
    getAttribute:(k)=>(k in n.attrs? n.attrs[k]:null),
    removeAttribute:(k)=>{ delete n.attrs[k]; },
    appendChild:(c)=>{ if(c.parentNode) c.parentNode.removeChild(c); c.parentNode=n; n.childNodes.push(c); return c; },
    insertBefore:(c,ref)=>{ if(c.parentNode) c.parentNode.removeChild(c); c.parentNode=n;
      const i=ref? n.childNodes.indexOf(ref):-1; if(i<0) n.childNodes.push(c); else n.childNodes.splice(i,0,c); return c; },
    removeChild:(c)=>{ const i=n.childNodes.indexOf(c); if(i>=0) n.childNodes.splice(i,1); c.parentNode=null; return c; },
    addEventListener:(k,fn)=>{ (n._listeners[k]=n._listeners[k]||[]).push(fn); },
    fire:(k)=>{ (n._listeners[k]||[]).forEach(fn=>fn({})); },
  };
  return n;
}
const body = makeNode('body');
let rafQueue=[], timers=[];
const ctx={
  console,
  document:{ createElement:makeNode, createElementNS:(_ns,tag)=>makeNode(tag), body:body },
  requestAnimationFrame:(fn)=>{ rafQueue.push(fn); },
  setTimeout:(fn,ms)=>{ timers.push({fn,ms}); return timers.length; },
  clearTimeout:(id)=>{ if(timers[id-1]) timers[id-1].cancelled=true; },
};
ctx.window=ctx; ctx.globalThis=ctx;
vm.createContext(ctx);
const paths = src.slice(src.indexOf('const TOAST_GLYPH_PATHS'), src.indexOf('function toastHostEl'));
const fns = ['el','toastIcon','toastHostEl','toast'].map(grab).join('\n\n');
/* var, not const: the suite resets `toastHost` between cases. */
vm.runInContext(
  paths + '\n' +
  'var TOAST_SUCCESS_MS = 5000;\n' +
  'var TOAST_WARNING_MS = 6000;\n' +
  'var TOAST_MAX_VISIBLE = 3;\n' +
  'var toastHost = null;\n' +
  fns + '\n' +
  ';globalThis.__T = toast;\n' +
  ';globalThis.__resetHost = function(){ toastHost = null; };',
  ctx
);
const T = ctx.__T;

let fail=0;
function ok(l,c,e){ if(!c)fail++; console.log((c?'  OK  ':'  FAIL')+l.padEnd(58)+(e!==undefined?String(e):'')); }
function flushRaf(){ const q=rafQueue; rafQueue=[]; q.forEach(fn=>fn()); }
function host(){ return body.childNodes.find(n=>n._cls.has('ds-toast-host'))||null; }
function reset(){ body.childNodes.slice().forEach(n=>body.removeChild(n)); rafQueue=[]; timers=[];
  ctx.__resetHost(); }

console.log('=== a success toast ===');
reset();
const a = T({ message:'Role created successfully.', variant:'success' });
flushRaf();
ok('a host is created on the body',        !!host());
ok('the toast is inside it',               host().childNodes.length===1);
ok('it carries the success variant class', a.root._cls.has('ds-toast--success'));
ok('polite for a success',                 a.root.getAttribute('aria-live')==='polite', a.root.getAttribute('aria-live'));
ok('role=status for a success',            a.root.getAttribute('role')==='status');
ok('the message is rendered',              a.root.childNodes[0].childNodes[1].childNodes[0].childNodes[0].textContent==='Role created successfully.');
ok('it has a dismiss button',              a.root.childNodes[0].childNodes[2].childNodes[0].tagName==='BUTTON');
ok('the enter class is applied',           a.root._cls.has('is-in'));
ok('success schedules an auto-dismiss',    timers.some(t=>t.ms===5000), timers.map(t=>t.ms).join(','));

console.log('\n=== it matches the Air component structure (Figma 34224:21740) ===');
const root=a.root;
const container=root.childNodes[0];
ok('root > container',                     container && container._cls.has('ds-toast__container'));
ok('container has icon, content, close',   container.childNodes.map(c=>[...c._cls][0]).join(',')==='ds-toast__icon,ds-toast__content,ds-toast__close-wrap',
   container.childNodes.map(c=>[...c._cls][0]).join(','));
const glyph=container.childNodes[0].childNodes[0];
ok('the glyph is a 20x20 svg',             glyph.tagName==='SVG' && glyph.getAttribute('width')==='20' && glyph.getAttribute('viewBox')==='0 0 20 20');
ok('it is the Air check_circle path',      glyph.childNodes[0].getAttribute('d').startsWith('M10 1.66667C14.6 1.66667'));
ok('filled via currentColor, evenodd',     glyph.childNodes[0].getAttribute('fill')==='currentColor' && glyph.childNodes[0].getAttribute('fill-rule')==='evenodd');
const msg=container.childNodes[1].childNodes[0].childNodes[0];
ok('message is a <p> inside __text',       msg.tagName==='P' && msg._cls.has('ds-toast__message'));
const closeGlyph=container.childNodes[2].childNodes[0].childNodes[0];
ok('close uses the Air clear path',        closeGlyph.childNodes[0].getAttribute('d').startsWith('M14.0706 4.75421'));
ok('clear is not evenodd',                 closeGlyph.childNodes[0].getAttribute('fill-rule')===null);

console.log('\n=== an error toast ===');
reset();
const b = T({ message:'Cannot be deleted', variant:'error' });
flushRaf();
ok('it carries the error variant class',   b.root._cls.has('ds-toast--error'));
ok('assertive for an error',               b.root.getAttribute('aria-live')==='assertive');
ok('role=alert for an error',              b.root.getAttribute('role')==='alert');
ok('an error never auto-dismisses',        !timers.some(t=>t.ms===5000), timers.map(t=>t.ms).join(',')||'no timers');
const eGlyph=b.root.childNodes[0].childNodes[0].childNodes[0];
ok('it is the Air warning_circle path',    eGlyph.childNodes[0].getAttribute('d').startsWith('M10 1.66667C11.1528'));

console.log('\n=== a warning toast ===');
reset();
const w = T({ message:'Gateway is offline.', variant:'warning' });
flushRaf();
ok('it carries the warning variant class', w.root._cls.has('ds-toast--warning'));
ok('polite for a warning',                 w.root.getAttribute('aria-live')==='polite');
ok('role=status for a warning',            w.root.getAttribute('role')==='status');
ok('a warning auto-dismisses after 6s',    timers.some(t=>t.ms===6000), timers.map(t=>t.ms).join(','));
const wGlyph=w.root.childNodes[0].childNodes[0].childNodes[0];
ok('it reuses the warning_circle path',    wGlyph.childNodes[0].getAttribute('d').startsWith('M10 1.66667C11.1528'));

console.log('\n=== dismissal ===');
reset();
const c = T({ message:'x', variant:'success' });
flushRaf();
c.close();
ok('closing marks it leaving',             c.root._cls.has('is-leaving'));
c.root.fire('transitionend');
ok('it leaves the DOM',                    c.root.parentNode===null);
ok('and the empty host is torn down',      !host());
c.close();
ok('a second close is a no-op',            true);

console.log('\n=== stacking ===');
reset();
const t1=T({message:'1'}), t2=T({message:'2'}), t3=T({message:'3'}), t4=T({message:'4'});
flushRaf();
ok('at most three are visible',            host().childNodes.length===3, host().childNodes.length);
ok('newest sits on top',                   host().firstChild===t4.root);
ok('the oldest was dropped',               host().childNodes.indexOf(t1.root)===-1);

console.log('\n=== defaults ===');
reset();
const d = T({ message:'d' });
flushRaf();
ok('variant defaults to success',          d.root._cls.has('ds-toast--success'));
ok('an explicit duration is honoured',     (reset(), T({message:'e',variant:'error',duration:1200}), timers.some(t=>t.ms===1200)));

console.log(fail? '\n'+fail+' FAILING' : '\nall green');
process.exit(fail?1:0);
