var __pageFrameStartTime__ = Date.now();
var __webviewId__;
var __wxAppCode__ = {};
var __WXML_GLOBAL__ = {
  entrys: {},
  defines: {},
  modules: {},
  ops: [],
  wxs_nf_init: undefined,
  total_ops: 0
};
var $gwx;

/*v0.5vv_20181221_syb_scopedata*/window.__wcc_version__='v0.5vv_20181221_syb_scopedata';window.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _gv( )
{if( typeof( window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;}
function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
var cs
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'contain'])
Z([[2,'+'],[[2,'+'],[1,'padding-top:'],[[7],[3,'statusBarHeight']]],[1,';']])
Z([3,'login_bg _img'])
Z([[6],[[7],[3,'$root']],[3,'m0']])
Z([3,'__e'])
Z([3,'row_between head_wrap _div'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'closeLogin']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'_img'])
Z([[6],[[7],[3,'$root']],[3,'m1']])
Z([3,'login_wrap _div'])
Z([3,'row_wrap _div'])
Z([3,'row _div'])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m2']])
Z(z[5])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'$0']],[1,'account']],[1,'$event']],[[4],[[5]]]]]],[[4],[[5],[1,'']]]]]]]]]]])
Z([3,'11'])
Z([3,'请输入手机号码'])
Z([3,'tel'])
Z([[7],[3,'account']])
Z(z[11])
Z(z[12])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m3']])
Z([3,'width:36rpx;margin-right:30rpx;'])
Z(z[5])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'$0']],[1,'code']],[1,'$event']],[[4],[[5]]]]]],[[4],[[5],[1,'']]]]]]]]]]])
Z([3,'6'])
Z([3,'请输入验证码'])
Z([3,'width:260rpx;'])
Z([3,'text'])
Z([[7],[3,'code']])
Z([3,'_span'])
Z([3,'flex:1;'])
Z(z[5])
Z([3,'get_code_txt _span'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'getCodeAction']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([a,[[7],[3,'count_text']]])
Z(z[11])
Z(z[12])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m4']])
Z([3,'width:28rpx;'])
Z(z[5])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'$0']],[1,'password']],[1,'$event']],[[4],[[5]]]]]],[[4],[[5],[1,'']]]]]]]]]]])
Z([3,'请输入密码'])
Z([3,'password'])
Z([[7],[3,'password']])
Z(z[11])
Z(z[12])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m5']])
Z(z[43])
Z(z[5])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'$0']],[1,'sure_password']],[1,'$event']],[[4],[[5]]]]]],[[4],[[5],[1,'']]]]]]]]]]])
Z([3,'请再次输入密码'])
Z(z[47])
Z([[7],[3,'sure_password']])
Z(z[5])
Z([3,'button'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'loginAction']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z(z[60])
Z([3,'确定'])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'https://www.baidu.com'])
Z([[7],[3,'webviewStyles']])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'contain'])
Z([[2,'+'],[[2,'+'],[1,'padding-top:'],[[7],[3,'statusBarHeight']]],[1,';']])
Z([3,'login_bg _img'])
Z([[6],[[7],[3,'$root']],[3,'m0']])
Z([3,'__e'])
Z([3,'row_between head_wrap _div'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'closeLogin']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'_img'])
Z([[6],[[7],[3,'$root']],[3,'m1']])
Z([3,'logo_wrap _div'])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m2']])
Z([3,'login_wrap _div'])
Z([3,'row_wrap _div'])
Z([3,'row _div'])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m3']])
Z([3,'mobile'])
Z([3,'11'])
Z([3,'请输入手机号码'])
Z([3,'tel'])
Z(z[14])
Z(z[15])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m4']])
Z([3,'width:28rpx;'])
Z([3,'password'])
Z([3,'请输入密码'])
Z(z[27])
Z(z[5])
Z([3,'forget_wrap _div'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goToForget']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'_span'])
Z([3,'忘记密码'])
Z(z[5])
Z([3,'button'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'loginAction']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z(z[36])
Z([3,'登录'])
Z([3,'regist_wrap _div'])
Z(z[33])
Z([3,'还没账号，'])
Z(z[5])
Z([3,'regist_txt _span'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goToRegister']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'立即注册'])
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'contain'])
Z([[2,'+'],[[2,'+'],[1,'padding-top:'],[[7],[3,'statusBarHeight']]],[1,';']])
Z([3,'login_bg _img'])
Z([[6],[[7],[3,'$root']],[3,'m0']])
Z([3,'__e'])
Z([3,'row_between head_wrap _div'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'closeLogin']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'_img'])
Z([[6],[[7],[3,'$root']],[3,'m1']])
Z([3,'logo_wrap _div'])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m2']])
Z([3,'login_wrap _div'])
Z([3,'row_wrap _div'])
Z([3,'row _div'])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m3']])
Z(z[5])
Z([3,'mobile'])
Z([[4],[[5],[[4],[[5],[[5],[1,'input']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'__set_model']],[[4],[[5],[[5],[[5],[[5],[1,'$0']],[1,'account']],[1,'$event']],[[4],[[5]]]]]],[[4],[[5],[1,'']]]]]]]]]]])
Z([3,'11'])
Z([3,'请输入手机号码'])
Z([3,'tel'])
Z([[7],[3,'account']])
Z(z[14])
Z(z[15])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m4']])
Z([3,'width:36rpx;margin-right:30rpx;'])
Z([3,'code'])
Z([3,'6'])
Z([3,'请输入验证码'])
Z([3,'width:260rpx;'])
Z([3,'text'])
Z([3,'_span'])
Z([3,'flex:1;'])
Z(z[5])
Z([3,'get_code_txt _span'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'getCodeAction']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([a,[[7],[3,'count_text']]])
Z(z[14])
Z(z[15])
Z(z[8])
Z([[6],[[7],[3,'$root']],[3,'m5']])
Z([3,'width:28rpx;'])
Z([3,'password'])
Z([3,'请输入密码'])
Z(z[46])
Z([3,'forget_wrap _div'])
Z(z[35])
Z([3,'点击“注册”表示你已经阅读并同意隐私条款和用户协议'])
Z(z[5])
Z([3,'mui-btn mui-btn-primary button'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'loginAction']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'button'])
Z([3,'注册'])
Z([3,'regist_wrap _div'])
Z(z[35])
Z([3,'已有账号，'])
Z(z[5])
Z([3,'regist_txt _span'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goToLogin']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'立即登录'])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([3,'页面 - 提问'])
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([3,'页面 - 发图文'])
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([3,'页面 - 发视频'])
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([1,true])
Z([3,'__e'])
Z([3,'head_img'])
Z([[4],[[5],[[4],[[5],[[5],[1,'change']],[[4],[[5],[[4],[[5],[[5],[1,'slideChange']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([1,1000])
Z([1,false])
Z([1,5000])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'itemList']])
Z(z[9])
Z(z[3])
Z(z[4])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goToH5']],[[4],[[5],[[7],[3,'index']]]]]]]]]]]])
Z(z[4])
Z([3,'widthFix'])
Z([[6],[[7],[3,'item']],[3,'t_url']])
Z([3,'dots'])
Z(z[9])
Z(z[10])
Z(z[11])
Z(z[9])
Z([[4],[[5],[[5],[1,'dot_normal']],[[2,'?:'],[[2,'=='],[[7],[3,'index']],[[7],[3,'curIndex']]],[1,'active'],[1,'']]]])
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([3,'页面 - 2'])
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
function gz$gwx_10(){
if( __WXML_GLOBAL__.ops_cached.$gwx_10)return __WXML_GLOBAL__.ops_cached.$gwx_10
__WXML_GLOBAL__.ops_cached.$gwx_10=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content data-v-15d061c8'])
Z([3,'页面 - 4'])
})(__WXML_GLOBAL__.ops_cached.$gwx_10);return __WXML_GLOBAL__.ops_cached.$gwx_10
}
function gz$gwx_11(){
if( __WXML_GLOBAL__.ops_cached.$gwx_11)return __WXML_GLOBAL__.ops_cached.$gwx_11
__WXML_GLOBAL__.ops_cached.$gwx_11=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([3,'页面 - 4'])
})(__WXML_GLOBAL__.ops_cached.$gwx_11);return __WXML_GLOBAL__.ops_cached.$gwx_11
}
function gz$gwx_12(){
if( __WXML_GLOBAL__.ops_cached.$gwx_12)return __WXML_GLOBAL__.ops_cached.$gwx_12
__WXML_GLOBAL__.ops_cached.$gwx_12=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'content'])
Z([3,'页面 - 5'])
})(__WXML_GLOBAL__.ops_cached.$gwx_12);return __WXML_GLOBAL__.ops_cached.$gwx_12
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./pages/forget/forget.wxml','./pages/home_webview/home_webview.wxml','./pages/login/login.wxml','./pages/register/register.wxml','./pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.wxml','./pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.wxml','./pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.wxml','./pages/tabbar/home/home.wxml','./pages/tabbar/tabbar-2/tabbar-2.wxml','./pages/tabbar/tabbar-3/tabbar-3.wxml','./pages/tabbar/tabbar-4/tabbar-4.wxml','./pages/tabbar/tabbar-5/tabbar-5.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
cs.push("./pages/forget/forget.wxml:view:1:1")
var oB=_mz(z,'view',['bind:__l',0,'class',1,'style',1],[],e,s,gg)
cs.push("./pages/forget/forget.wxml:image:1:87")
var xC=_mz(z,'image',['class',3,'src',1],[],e,s,gg)
cs.pop()
_(oB,xC)
cs.push("./pages/forget/forget.wxml:view:1:143")
var oD=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/forget/forget.wxml:image:1:258")
var fE=_mz(z,'image',['class',8,'src',1],[],e,s,gg)
cs.pop()
_(oD,fE)
cs.pop()
_(oB,oD)
cs.push("./pages/forget/forget.wxml:view:1:312")
var cF=_n('view')
_rz(z,cF,'class',10,e,s,gg)
cs.push("./pages/forget/forget.wxml:view:1:342")
var hG=_n('view')
_rz(z,hG,'class',11,e,s,gg)
cs.push("./pages/forget/forget.wxml:view:1:370")
var oH=_n('view')
_rz(z,oH,'class',12,e,s,gg)
cs.push("./pages/forget/forget.wxml:image:1:393")
var cI=_mz(z,'image',['class',13,'src',1],[],e,s,gg)
cs.pop()
_(oH,cI)
cs.push("./pages/forget/forget.wxml:input:1:440")
var oJ=_mz(z,'input',['bindinput',15,'data-event-opts',1,'maxlength',2,'placeholder',3,'type',4,'value',5],[],e,s,gg)
cs.pop()
_(oH,oJ)
cs.pop()
_(hG,oH)
cs.pop()
_(cF,hG)
cs.push("./pages/forget/forget.wxml:view:1:646")
var lK=_n('view')
_rz(z,lK,'class',21,e,s,gg)
cs.push("./pages/forget/forget.wxml:view:1:674")
var aL=_n('view')
_rz(z,aL,'class',22,e,s,gg)
cs.push("./pages/forget/forget.wxml:image:1:697")
var tM=_mz(z,'image',['class',23,'src',1,'style',2],[],e,s,gg)
cs.pop()
_(aL,tM)
cs.push("./pages/forget/forget.wxml:input:1:784")
var eN=_mz(z,'input',['bindinput',26,'data-event-opts',1,'maxlength',2,'placeholder',3,'style',4,'type',5,'value',6],[],e,s,gg)
cs.pop()
_(aL,eN)
cs.push("./pages/forget/forget.wxml:label:1:989")
var bO=_mz(z,'label',['class',33,'style',1],[],e,s,gg)
cs.pop()
_(aL,bO)
cs.push("./pages/forget/forget.wxml:label:1:1034")
var oP=_mz(z,'label',['bindtap',35,'class',1,'data-event-opts',2],[],e,s,gg)
var xQ=_oz(z,38,e,s,gg)
_(oP,xQ)
cs.pop()
_(aL,oP)
cs.pop()
_(lK,aL)
cs.pop()
_(cF,lK)
cs.push("./pages/forget/forget.wxml:view:1:1181")
var oR=_n('view')
_rz(z,oR,'class',39,e,s,gg)
cs.push("./pages/forget/forget.wxml:view:1:1209")
var fS=_n('view')
_rz(z,fS,'class',40,e,s,gg)
cs.push("./pages/forget/forget.wxml:image:1:1232")
var cT=_mz(z,'image',['class',41,'src',1,'style',2],[],e,s,gg)
cs.pop()
_(fS,cT)
cs.push("./pages/forget/forget.wxml:input:1:1300")
var hU=_mz(z,'input',['bindinput',44,'data-event-opts',1,'placeholder',2,'type',3,'value',4],[],e,s,gg)
cs.pop()
_(fS,hU)
cs.pop()
_(oR,fS)
cs.pop()
_(cF,oR)
cs.push("./pages/forget/forget.wxml:view:1:1492")
var oV=_n('view')
_rz(z,oV,'class',49,e,s,gg)
cs.push("./pages/forget/forget.wxml:view:1:1520")
var cW=_n('view')
_rz(z,cW,'class',50,e,s,gg)
cs.push("./pages/forget/forget.wxml:image:1:1543")
var oX=_mz(z,'image',['class',51,'src',1,'style',2],[],e,s,gg)
cs.pop()
_(cW,oX)
cs.push("./pages/forget/forget.wxml:input:1:1611")
var lY=_mz(z,'input',['bindinput',54,'data-event-opts',1,'placeholder',2,'type',3,'value',4],[],e,s,gg)
cs.pop()
_(cW,lY)
cs.pop()
_(oV,cW)
cs.pop()
_(cF,oV)
cs.pop()
_(oB,cF)
cs.push("./pages/forget/forget.wxml:button:1:1826")
var aZ=_mz(z,'button',['bindtap',59,'class',1,'data-event-opts',2,'type',3],[],e,s,gg)
var t1=_oz(z,63,e,s,gg)
_(aZ,t1)
cs.pop()
_(oB,aZ)
cs.pop()
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
cs.push("./pages/home_webview/home_webview.wxml:view:1:1")
var b3=_n('view')
_rz(z,b3,'bind:__l',0,e,s,gg)
cs.push("./pages/home_webview/home_webview.wxml:web-view:1:22")
var o4=_mz(z,'web-view',['src',1,'webviewStyles',1],[],e,s,gg)
cs.pop()
_(b3,o4)
cs.pop()
_(r,b3)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
cs.push("./pages/login/login.wxml:view:1:1")
var o6=_mz(z,'view',['bind:__l',0,'class',1,'style',1],[],e,s,gg)
cs.push("./pages/login/login.wxml:image:1:87")
var f7=_mz(z,'image',['class',3,'src',1],[],e,s,gg)
cs.pop()
_(o6,f7)
cs.push("./pages/login/login.wxml:view:1:143")
var c8=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/login/login.wxml:image:1:258")
var h9=_mz(z,'image',['class',8,'src',1],[],e,s,gg)
cs.pop()
_(c8,h9)
cs.pop()
_(o6,c8)
cs.push("./pages/login/login.wxml:view:1:312")
var o0=_n('view')
_rz(z,o0,'class',10,e,s,gg)
cs.push("./pages/login/login.wxml:image:1:341")
var cAB=_mz(z,'image',['class',11,'src',1],[],e,s,gg)
cs.pop()
_(o0,cAB)
cs.pop()
_(o6,o0)
cs.push("./pages/login/login.wxml:view:1:395")
var oBB=_n('view')
_rz(z,oBB,'class',13,e,s,gg)
cs.push("./pages/login/login.wxml:view:1:425")
var lCB=_n('view')
_rz(z,lCB,'class',14,e,s,gg)
cs.push("./pages/login/login.wxml:view:1:453")
var aDB=_n('view')
_rz(z,aDB,'class',15,e,s,gg)
cs.push("./pages/login/login.wxml:image:1:476")
var tEB=_mz(z,'image',['class',16,'src',1],[],e,s,gg)
cs.pop()
_(aDB,tEB)
cs.push("./pages/login/login.wxml:input:1:523")
var eFB=_mz(z,'input',['class',18,'maxlength',1,'placeholder',2,'type',3],[],e,s,gg)
cs.pop()
_(aDB,eFB)
cs.pop()
_(lCB,aDB)
cs.pop()
_(oBB,lCB)
cs.push("./pages/login/login.wxml:view:1:622")
var bGB=_n('view')
_rz(z,bGB,'class',22,e,s,gg)
cs.push("./pages/login/login.wxml:view:1:650")
var oHB=_n('view')
_rz(z,oHB,'class',23,e,s,gg)
cs.push("./pages/login/login.wxml:image:1:673")
var xIB=_mz(z,'image',['class',24,'src',1,'style',2],[],e,s,gg)
cs.pop()
_(oHB,xIB)
cs.push("./pages/login/login.wxml:input:1:741")
var oJB=_mz(z,'input',['class',27,'placeholder',1,'type',2],[],e,s,gg)
cs.pop()
_(oHB,oJB)
cs.pop()
_(bGB,oHB)
cs.pop()
_(oBB,bGB)
cs.pop()
_(o6,oBB)
cs.push("./pages/login/login.wxml:view:1:833")
var fKB=_mz(z,'view',['bindtap',30,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/login/login.wxml:label:1:938")
var cLB=_n('label')
_rz(z,cLB,'class',33,e,s,gg)
var hMB=_oz(z,34,e,s,gg)
_(cLB,hMB)
cs.pop()
_(fKB,cLB)
cs.pop()
_(o6,fKB)
cs.push("./pages/login/login.wxml:button:1:986")
var oNB=_mz(z,'button',['bindtap',35,'class',1,'data-event-opts',2,'type',3],[],e,s,gg)
var cOB=_oz(z,39,e,s,gg)
_(oNB,cOB)
cs.pop()
_(o6,oNB)
cs.push("./pages/login/login.wxml:view:1:1113")
var oPB=_n('view')
_rz(z,oPB,'class',40,e,s,gg)
cs.push("./pages/login/login.wxml:label:1:1144")
var lQB=_n('label')
_rz(z,lQB,'class',41,e,s,gg)
var aRB=_oz(z,42,e,s,gg)
_(lQB,aRB)
cs.push("./pages/login/login.wxml:label:1:1180")
var tSB=_mz(z,'label',['bindtap',43,'class',1,'data-event-opts',2],[],e,s,gg)
var eTB=_oz(z,46,e,s,gg)
_(tSB,eTB)
cs.pop()
_(lQB,tSB)
cs.pop()
_(oPB,lQB)
cs.pop()
_(o6,oPB)
cs.pop()
_(r,o6)
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
cs.push("./pages/register/register.wxml:view:1:1")
var oVB=_mz(z,'view',['bind:__l',0,'class',1,'style',1],[],e,s,gg)
cs.push("./pages/register/register.wxml:image:1:87")
var xWB=_mz(z,'image',['class',3,'src',1],[],e,s,gg)
cs.pop()
_(oVB,xWB)
cs.push("./pages/register/register.wxml:view:1:143")
var oXB=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/register/register.wxml:image:1:258")
var fYB=_mz(z,'image',['class',8,'src',1],[],e,s,gg)
cs.pop()
_(oXB,fYB)
cs.pop()
_(oVB,oXB)
cs.push("./pages/register/register.wxml:view:1:312")
var cZB=_n('view')
_rz(z,cZB,'class',10,e,s,gg)
cs.push("./pages/register/register.wxml:image:1:341")
var h1B=_mz(z,'image',['class',11,'src',1],[],e,s,gg)
cs.pop()
_(cZB,h1B)
cs.pop()
_(oVB,cZB)
cs.push("./pages/register/register.wxml:view:1:395")
var o2B=_n('view')
_rz(z,o2B,'class',13,e,s,gg)
cs.push("./pages/register/register.wxml:view:1:425")
var c3B=_n('view')
_rz(z,c3B,'class',14,e,s,gg)
cs.push("./pages/register/register.wxml:view:1:453")
var o4B=_n('view')
_rz(z,o4B,'class',15,e,s,gg)
cs.push("./pages/register/register.wxml:image:1:476")
var l5B=_mz(z,'image',['class',16,'src',1],[],e,s,gg)
cs.pop()
_(o4B,l5B)
cs.push("./pages/register/register.wxml:input:1:523")
var a6B=_mz(z,'input',['bindinput',18,'class',1,'data-event-opts',2,'maxlength',3,'placeholder',4,'type',5,'value',6],[],e,s,gg)
cs.pop()
_(o4B,a6B)
cs.pop()
_(c3B,o4B)
cs.pop()
_(o2B,c3B)
cs.push("./pages/register/register.wxml:view:1:744")
var t7B=_n('view')
_rz(z,t7B,'class',25,e,s,gg)
cs.push("./pages/register/register.wxml:view:1:772")
var e8B=_n('view')
_rz(z,e8B,'class',26,e,s,gg)
cs.push("./pages/register/register.wxml:image:1:795")
var b9B=_mz(z,'image',['class',27,'src',1,'style',2],[],e,s,gg)
cs.pop()
_(e8B,b9B)
cs.push("./pages/register/register.wxml:input:1:882")
var o0B=_mz(z,'input',['class',30,'maxlength',1,'placeholder',2,'style',3,'type',4],[],e,s,gg)
cs.pop()
_(e8B,o0B)
cs.push("./pages/register/register.wxml:label:1:984")
var xAC=_mz(z,'label',['class',35,'style',1],[],e,s,gg)
cs.pop()
_(e8B,xAC)
cs.push("./pages/register/register.wxml:label:1:1029")
var oBC=_mz(z,'label',['bindtap',37,'class',1,'data-event-opts',2],[],e,s,gg)
var fCC=_oz(z,40,e,s,gg)
_(oBC,fCC)
cs.pop()
_(e8B,oBC)
cs.pop()
_(t7B,e8B)
cs.pop()
_(o2B,t7B)
cs.push("./pages/register/register.wxml:view:1:1176")
var cDC=_n('view')
_rz(z,cDC,'class',41,e,s,gg)
cs.push("./pages/register/register.wxml:view:1:1204")
var hEC=_n('view')
_rz(z,hEC,'class',42,e,s,gg)
cs.push("./pages/register/register.wxml:image:1:1227")
var oFC=_mz(z,'image',['class',43,'src',1,'style',2],[],e,s,gg)
cs.pop()
_(hEC,oFC)
cs.push("./pages/register/register.wxml:input:1:1295")
var cGC=_mz(z,'input',['class',46,'placeholder',1,'type',2],[],e,s,gg)
cs.pop()
_(hEC,cGC)
cs.pop()
_(cDC,hEC)
cs.pop()
_(o2B,cDC)
cs.pop()
_(oVB,o2B)
cs.push("./pages/register/register.wxml:view:1:1387")
var oHC=_n('view')
_rz(z,oHC,'class',49,e,s,gg)
cs.push("./pages/register/register.wxml:label:1:1418")
var lIC=_n('label')
_rz(z,lIC,'class',50,e,s,gg)
var aJC=_oz(z,51,e,s,gg)
_(lIC,aJC)
cs.pop()
_(oHC,lIC)
cs.pop()
_(oVB,oHC)
cs.push("./pages/register/register.wxml:button:1:1529")
var tKC=_mz(z,'button',['bindtap',52,'class',1,'data-event-opts',2,'type',3],[],e,s,gg)
var eLC=_oz(z,56,e,s,gg)
_(tKC,eLC)
cs.pop()
_(oVB,tKC)
cs.push("./pages/register/register.wxml:view:1:1680")
var bMC=_n('view')
_rz(z,bMC,'class',57,e,s,gg)
cs.push("./pages/register/register.wxml:label:1:1711")
var oNC=_n('label')
_rz(z,oNC,'class',58,e,s,gg)
var xOC=_oz(z,59,e,s,gg)
_(oNC,xOC)
cs.push("./pages/register/register.wxml:label:1:1747")
var oPC=_mz(z,'label',['bindtap',60,'class',1,'data-event-opts',2],[],e,s,gg)
var fQC=_oz(z,63,e,s,gg)
_(oPC,fQC)
cs.pop()
_(oNC,oPC)
cs.pop()
_(bMC,oNC)
cs.pop()
_(oVB,bMC)
cs.pop()
_(r,oVB)
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
cs.push("./pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.wxml:view:1:1")
var hSC=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var oTC=_oz(z,2,e,s,gg)
_(hSC,oTC)
cs.pop()
_(r,hSC)
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
cs.push("./pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.wxml:view:1:1")
var oVC=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var lWC=_oz(z,2,e,s,gg)
_(oVC,lWC)
cs.pop()
_(r,oVC)
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
cs.push("./pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.wxml:view:1:1")
var tYC=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var eZC=_oz(z,2,e,s,gg)
_(tYC,eZC)
cs.pop()
_(r,tYC)
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
cs.push("./pages/tabbar/home/home.wxml:view:1:1")
var o2C=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./pages/tabbar/home/home.wxml:swiper:1:38")
var x3C=_mz(z,'swiper',['autoplay',2,'bindchange',1,'class',2,'data-event-opts',3,'duration',4,'indicatorDots',5,'interval',6],[],e,s,gg)
var o4C=_v()
_(x3C,o4C)
cs.push("./pages/tabbar/home/home.wxml:block:1:231")
var f5C=function(h7C,c6C,o8C,gg){
cs.push("./pages/tabbar/home/home.wxml:block:1:231")
cs.push("./pages/tabbar/home/home.wxml:swiper-item:1:315")
var o0C=_mz(z,'swiper-item',['bindtap',13,'class',1,'data-event-opts',2],[],h7C,c6C,gg)
cs.push("./pages/tabbar/home/home.wxml:image:1:412")
var lAD=_mz(z,'image',['class',16,'mode',1,'src',2],[],h7C,c6C,gg)
cs.pop()
_(o0C,lAD)
cs.pop()
_(o8C,o0C)
cs.pop()
return o8C
}
o4C.wxXCkey=2
_2z(z,11,f5C,e,s,gg,o4C,'item','index','index')
cs.pop()
cs.pop()
_(o2C,x3C)
cs.push("./pages/tabbar/home/home.wxml:view:1:512")
var aBD=_n('view')
_rz(z,aBD,'class',19,e,s,gg)
var tCD=_v()
_(aBD,tCD)
cs.push("./pages/tabbar/home/home.wxml:block:1:531")
var eDD=function(oFD,bED,xGD,gg){
cs.push("./pages/tabbar/home/home.wxml:block:1:531")
cs.push("./pages/tabbar/home/home.wxml:block:1:615")
cs.push("./pages/tabbar/home/home.wxml:view:1:622")
var fID=_n('view')
_rz(z,fID,'class',24,oFD,bED,gg)
cs.pop()
_(xGD,fID)
cs.pop()
cs.pop()
return xGD
}
tCD.wxXCkey=2
_2z(z,22,eDD,e,s,gg,tCD,'item','index','index')
cs.pop()
cs.pop()
_(o2C,aBD)
cs.pop()
_(r,o2C)
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
cs.push("./pages/tabbar/tabbar-2/tabbar-2.wxml:view:1:1")
var hKD=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var oLD=_oz(z,2,e,s,gg)
_(hKD,oLD)
cs.pop()
_(r,hKD)
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
d_[x[9]]={}
var m9=function(e,s,r,gg){
var z=gz$gwx_10()
cs.push("./pages/tabbar/tabbar-3/tabbar-3.wxml:view:1:1")
var oND=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var lOD=_oz(z,2,e,s,gg)
_(oND,lOD)
cs.pop()
_(r,oND)
return r
}
e_[x[9]]={f:m9,j:[],i:[],ti:[],ic:[]}
d_[x[10]]={}
var m10=function(e,s,r,gg){
var z=gz$gwx_11()
cs.push("./pages/tabbar/tabbar-4/tabbar-4.wxml:view:1:1")
var tQD=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var eRD=_oz(z,2,e,s,gg)
_(tQD,eRD)
cs.pop()
_(r,tQD)
return r
}
e_[x[10]]={f:m10,j:[],i:[],ti:[],ic:[]}
d_[x[11]]={}
var m11=function(e,s,r,gg){
var z=gz$gwx_12()
cs.push("./pages/tabbar/tabbar-5/tabbar-5.wxml:view:1:1")
var oTD=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var xUD=_oz(z,2,e,s,gg)
_(oTD,xUD)
cs.pop()
_(r,oTD)
return r
}
e_[x[11]]={f:m11,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
cs=[]
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(cs, env);
console.log(err)
throw err
}
return root;
}
}
}


var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C= [[[2,1],],[".",[1],"row{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center;}\n.",[1],"row_center{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center;}\n.",[1],"row_between{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between;}\n.",[1],"row_around{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around;}\n.",[1],"col{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center;}\n",],];
function makeup(file, opt) {
var _n = typeof(file) === "number";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 ) 
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid + "This wxss file is ignored." );
return;
}
}
Ca={};
css = makeup(file, opt);
if ( !style ) 
{
var head = document.head || document.getElementsByTagName('head')[0];
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else 
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([[2,0]],undefined,{path:"./app.wxss"})();

__wxAppCode__['app.wxss']=setCssToHead([[2,0]],undefined,{path:"./app.wxss"});    
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['pages/forget/forget.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"login_bg { position: fixed; width: 100%; height: 100%; top: ",[0,0],"; left: ",[0,0],"; z-index: -1; }\n.",[1],"contain { width: 100%; height: 100%; }\n.",[1],"get_code_txt { font-size: ",[0,28],"; color: #107EFF; }\n.",[1],"code { width: ",[0,300],"; }\n.",[1],"head_wrap { padding: ",[0,20]," ",[0,32]," ",[0,20],"; }\n.",[1],"head_wrap .",[1],"_img { width: ",[0,28],"; height: ",[0,28],"; }\n.",[1],"logo_wrap { margin: ",[0,80]," auto ",[0,100],"; text-align: center; }\n.",[1],"logo_wrap .",[1],"_img { width: ",[0,210],"; height: ",[0,240],"; }\n.",[1],"login_wrap { padding: ",[0,40]," ",[0,80]," ",[0,0],"; }\n.",[1],"row_wrap { border-bottom: ",[0,2]," solid #E3E3E3; }\n.",[1],"login_wrap .",[1],"_div { padding: ",[0,0]," ",[0,8],"; margin-bottom: ",[0,30],"; }\n.",[1],"login_wrap .",[1],"_img { width: ",[0,24],"; height: ",[0,40],"; margin-right: ",[0,40],"; }\n.",[1],"login_wrap wx-input { margin-bottom: ",[0,0],"; border: none; background: transparent; }\n::-webkit-input-placeholder { color: #999999; font-size: ",[0,28],"; }\n.",[1],"forget_wrap { text-align: right; padding-right: ",[0,100],"; color: #107EFF; font-size: ",[0,28],"; }\n.",[1],"button { border-radius: ",[0,40],"; margin: ",[0,60]," 15% ",[0,0],"; -webkit-box-sizing: border-box; box-sizing: border-box; background-color: #107EFF; color: #FFFFFF; font-size: ",[0,32],"; width: 70%; height: ",[0,80],"; }\n.",[1],"regist_wrap { text-align: center; font-size: ",[0,28],"; color: #666666; margin-top: ",[0,50],"; }\n.",[1],"regist_txt { font-size: ",[0,28],"; color: #107EFF; }\n",],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./pages/forget/forget.wxss:81:1)",{path:"./pages/forget/forget.wxss"});    
__wxAppCode__['pages/forget/forget.wxml']=$gwx('./pages/forget/forget.wxml');

__wxAppCode__['pages/home_webview/home_webview.wxss']=undefined;    
__wxAppCode__['pages/home_webview/home_webview.wxml']=$gwx('./pages/home_webview/home_webview.wxml');

__wxAppCode__['pages/login/login.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"login_bg { position: fixed; width: 100%; height: 100%; top: ",[0,0],"; left: ",[0,0],"; z-index: -1; }\n.",[1],"contain { width: 100%; height: 100%; }\n.",[1],"head_wrap { padding: ",[0,20]," ",[0,32]," ",[0,20],"; }\n.",[1],"head_wrap .",[1],"_img { width: ",[0,28],"; height: ",[0,28],"; }\n.",[1],"logo_wrap { margin: ",[0,80]," auto ",[0,100],"; text-align: center; }\n.",[1],"logo_wrap .",[1],"_img { width: ",[0,210],"; height: ",[0,240],"; }\n.",[1],"login_wrap { padding: ",[0,0]," ",[0,108],"; }\n.",[1],"row_wrap { border-bottom: ",[0,2]," solid #E3E3E3; }\n.",[1],"login_wrap .",[1],"_div { padding: ",[0,0]," ",[0,8],"; margin-bottom: ",[0,30],"; }\n.",[1],"login_wrap .",[1],"_img { width: ",[0,24],"; height: ",[0,40],"; margin-right: ",[0,40],"; }\n.",[1],"login_wrap wx-input { margin-bottom: ",[0,0],"; border: none; background: transparent; }\n::-webkit-input-placeholder { color: #999999; font-size: ",[0,28],"; }\n.",[1],"forget_wrap { text-align: right; padding-right: ",[0,100],"; color: #107EFF; font-size: ",[0,28],"; }\n.",[1],"button { border-radius: ",[0,40],"; margin: ",[0,60]," 15% ",[0,0],"; -webkit-box-sizing: border-box; box-sizing: border-box; background-color: #107EFF; color: #FFFFFF; font-size: ",[0,32],"; width: 70%; height: ",[0,80],"; }\n.",[1],"regist_wrap { text-align: center; font-size: ",[0,28],"; color: #666666; margin-top: ",[0,50],"; }\n.",[1],"regist_txt { font-size: ",[0,28],"; color: #107EFF; }\n",],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./pages/login/login.wxss:74:1)",{path:"./pages/login/login.wxss"});    
__wxAppCode__['pages/login/login.wxml']=$gwx('./pages/login/login.wxml');

__wxAppCode__['pages/register/register.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"login_bg { position: fixed; width: 100%; height: 100%; top: ",[0,0],"; left: ",[0,0],"; z-index: -1; }\n.",[1],"contain { width: 100%; height: 100%; }\n.",[1],"get_code_txt { font-size: ",[0,28],"; color: #107EFF; }\n.",[1],"code { width: ",[0,300],"; }\n.",[1],"head_wrap { padding: ",[0,20]," ",[0,32]," ",[0,20],"; }\n.",[1],"head_wrap .",[1],"_img { width: ",[0,28],"; height: ",[0,28],"; }\n.",[1],"logo_wrap { margin: ",[0,80]," auto ",[0,100],"; text-align: center; }\n.",[1],"logo_wrap .",[1],"_img { width: ",[0,210],"; height: ",[0,240],"; }\n.",[1],"login_wrap { padding: ",[0,0]," ",[0,108],"; }\n.",[1],"row_wrap { border-bottom: ",[0,2]," solid #E3E3E3; }\n.",[1],"login_wrap .",[1],"_div { margin-bottom: ",[0,30],"; }\n.",[1],"login_wrap .",[1],"_img { width: ",[0,24],"; height: ",[0,40],"; margin-right: ",[0,40],"; }\n.",[1],"login_wrap wx-input { margin-bottom: ",[0,0],"; border: none; background: transparent; }\n::-webkit-input-placeholder { color: #999999; font-size: ",[0,28],"; }\n.",[1],"forget_wrap { text-align: center; color: #999999; font-size: ",[0,24],"; margin-top: ",[0,40],"; }\n.",[1],"button { border-radius: ",[0,40],"; margin: ",[0,60]," 15% ",[0,0],"; -webkit-box-sizing: border-box; box-sizing: border-box; background-color: #107EFF; color: #FFFFFF; font-size: ",[0,32],"; width: 70%; height: ",[0,80],"; }\n.",[1],"regist_wrap { text-align: center; font-size: ",[0,28],"; color: #666666; margin-top: ",[0,50],"; }\n.",[1],"regist_txt { font-size: ",[0,28],"; color: #107EFF; }\n",],"Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./pages/register/register.wxss:80:1)",{path:"./pages/register/register.wxss"});    
__wxAppCode__['pages/register/register.wxml']=$gwx('./pages/register/register.wxml');

__wxAppCode__['pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.wxss']=setCssToHead([".",[1],"content { text-align: center; height: ",[0,400],"; margin-top: ",[0,200],"; }\n",],undefined,{path:"./pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.wxss"});    
__wxAppCode__['pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.wxml']=$gwx('./pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa.wxml');

__wxAppCode__['pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.wxss']=setCssToHead([".",[1],"content { text-align: center; height: ",[0,400],"; margin-top: ",[0,200],"; }\n",],undefined,{path:"./pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.wxss"});    
__wxAppCode__['pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.wxml']=$gwx('./pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release.wxml');

__wxAppCode__['pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.wxss']=setCssToHead([".",[1],"content { text-align: center; height: ",[0,400],"; margin-top: ",[0,200],"; }\n",],undefined,{path:"./pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.wxss"});    
__wxAppCode__['pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.wxml']=$gwx('./pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video.wxml');

__wxAppCode__['pages/tabbar/home/home.wxss']=setCssToHead([".",[1],"content { height: ",[0,400],"; position: relative; }\n.",[1],"head_img{ width: 100%; height: ",[0,400],"!important; }\n.",[1],"dots{ display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; position: absolute; bottom: ",[0,20],"; height: ",[0,20],"; width: 100%; z-index: 100; }\n.",[1],"dot_normal{ width: ",[0,10],"; height: ",[0,10],"; border-radius: 50%; background-color: #E0E5ED; margin: ",[0,0]," ",[0,6],"; position: relative; z-index: 100; }\n.",[1],"active{ width: ",[0,24],"; height: ",[0,10],"; border-radius: 40%; background-color: #107EFF; z-index: 100; }\n",],undefined,{path:"./pages/tabbar/home/home.wxss"});    
__wxAppCode__['pages/tabbar/home/home.wxml']=$gwx('./pages/tabbar/home/home.wxml');

__wxAppCode__['pages/tabbar/tabbar-2/tabbar-2.wxss']=setCssToHead([".",[1],"content { text-align: center; height: ",[0,400],"; margin-top: ",[0,200],"; }\n",],undefined,{path:"./pages/tabbar/tabbar-2/tabbar-2.wxss"});    
__wxAppCode__['pages/tabbar/tabbar-2/tabbar-2.wxml']=$gwx('./pages/tabbar/tabbar-2/tabbar-2.wxml');

__wxAppCode__['pages/tabbar/tabbar-3/tabbar-3.wxss']=setCssToHead(["@charset \x22UTF-8\x22;\n.",[1],"content.",[1],"data-v-15d061c8 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; width: 100%; height: 100vh; -webkit-transition: opacity 0.3s; -o-transition: opacity 0.3s; transition: opacity 0.3s; background: #999; opacity: 0; }\n.",[1],"content.",[1],"active.",[1],"data-v-15d061c8 { opacity: 1; }\n.",[1],"content .",[1],"logo.",[1],"data-v-15d061c8 { position: relative; margin-top: ",[0,-400],"; width: ",[0,200],"; height: ",[0,200],"; opacity: 0; -webkit-transition: opacity 0.3s; -o-transition: opacity 0.3s; transition: opacity 0.3s; }\n.",[1],"content .",[1],"logo.",[1],"active.",[1],"data-v-15d061c8 { opacity: 1; }\n.",[1],"tabbar-box-wrap.",[1],"data-v-15d061c8 { position: absolute; width: 100%; padding: ",[0,50],"; -webkit-box-sizing: border-box; box-sizing: border-box; bottom: 0; left: 0; }\n.",[1],"tabbar-box-wrap .",[1],"tabbar-box.",[1],"data-v-15d061c8 { position: relative; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; width: 100%; background: #fff; border-radius: ",[0,20],"; padding: ",[0,15]," ",[0,20],"; -webkit-box-sizing: border-box; box-sizing: border-box; z-index: 2; -webkit-box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1); box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1); }\n.",[1],"tabbar-box-wrap .",[1],"tabbar-box.",[1],"data-v-15d061c8:after { content: \x27\x27; position: absolute; bottom: ",[0,-16],"; left: 0; right: 0; margin: auto; width: ",[0,50],"; height: ",[0,50],"; -webkit-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg); background: #fff; z-index: 1; -webkit-box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1); box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1); border-radius: 2px; }\n.",[1],"tabbar-box-wrap .",[1],"tabbar-box.",[1],"data-v-15d061c8:before { content: \x27\x27; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #ffffff; border-radius: ",[0,20],"; z-index: 2; }\n.",[1],"tabbar-box-wrap .",[1],"tabbar-box .",[1],"tabbar-box-item.",[1],"data-v-15d061c8 { width: 100%; z-index: 3; margin: ",[0,10],"; color: #555555; text-align: center; font-size: ",[0,28],"; }\n.",[1],"tabbar-box-wrap .",[1],"tabbar-box .",[1],"tabbar-box-item .",[1],"box-image.",[1],"data-v-15d061c8 { width: 100%; height: ",[0,80],"; }\n",],undefined,{path:"./pages/tabbar/tabbar-3/tabbar-3.wxss"});    
__wxAppCode__['pages/tabbar/tabbar-3/tabbar-3.wxml']=$gwx('./pages/tabbar/tabbar-3/tabbar-3.wxml');

__wxAppCode__['pages/tabbar/tabbar-4/tabbar-4.wxss']=setCssToHead([".",[1],"content { text-align: center; height: ",[0,400],"; margin-top: ",[0,200],"; }\n",],undefined,{path:"./pages/tabbar/tabbar-4/tabbar-4.wxss"});    
__wxAppCode__['pages/tabbar/tabbar-4/tabbar-4.wxml']=$gwx('./pages/tabbar/tabbar-4/tabbar-4.wxml');

__wxAppCode__['pages/tabbar/tabbar-5/tabbar-5.wxss']=setCssToHead([".",[1],"content { text-align: center; height: ",[0,400],"; margin-top: ",[0,200],"; }\n",],undefined,{path:"./pages/tabbar/tabbar-5/tabbar-5.wxss"});    
__wxAppCode__['pages/tabbar/tabbar-5/tabbar-5.wxml']=$gwx('./pages/tabbar/tabbar-5/tabbar-5.wxml');

;var __pageFrameEndTime__ = Date.now();
(function() {
        window.UniLaunchWebviewReady = function(isWebviewReady){
          // !isWebviewReady && console.log('launchWebview fallback ready')
          plus.webview.postMessageToUniNView({type: 'UniWebviewReady-' + plus.webview.currentWebview().id}, '__uniapp__service');
        }
        UniLaunchWebviewReady(true);
})();
