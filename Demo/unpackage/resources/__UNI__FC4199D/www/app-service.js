var __wxAppData = {};
var __wxRoute;
var __wxRouteBegin;
var __wxAppCode__ = {};
var global = {};
var __wxAppCurrentFile__;
if(typeof __WXML_GLOBAL__ !== 'undefined'){
  delete __WXML_GLOBAL__.ops_cached//remove ops_cached(v8 下会有 cache)
}
// var Component = Component || function() {};
// var definePlugin = definePlugin || function() {};
// var requirePlugin = requirePlugin || function() {};
// var Behavior = Behavior || function() {};
var $gwx;
  
/*v0.5vv_20190312_syb_scopedata*/global.__wcc_version__='v0.5vv_20190312_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
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
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./pages/tabbar/home/home.wxml','./pages/tabbar/my/my.wxml','./pages/tabbar/service/service.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
return root;
}
}
}



__wxAppCode__['app.json']={"pages":["pages/tabbar/home/home","pages/tabbar/my/my","pages/tabbar/service/service"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"楼服宝","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","compatible":{"ignoreVersion":true}},"tabBar":{"borderStyle":"black","backgroundColor":"#ffffff","color":"#8F8F94","selectedColor":"#107EFF","list":[{"pagePath":"pages/tabbar/home/home","iconPath":"static/img/tabbar/home.png","selectedIconPath":"static/img/tabbar/homeactive.png","text":"首页"},{"pagePath":"pages/tabbar/my/my","iconPath":"static/img/tabbar/me.png","selectedIconPath":"static/img/tabbar/meactive.png","text":"会员"},{"pagePath":"pages/tabbar/service/service","iconPath":"static/img/tabbar/me.png","selectedIconPath":"static/img/tabbar/meactive.png","text":"服务"}]},"nvueCompiler":"weex","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"楼服宝","compilerVersion":"2.1.3","usingComponents":{}};
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['pages/tabbar/home/home.json']={"navigationStyle":"custom","titleNView":false,"scrollIndicator":"none","usingComponents":{}};
__wxAppCode__['pages/tabbar/home/home.wxml']=$gwx('./pages/tabbar/home/home.wxml');

__wxAppCode__['pages/tabbar/my/my.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{}};
__wxAppCode__['pages/tabbar/my/my.wxml']=$gwx('./pages/tabbar/my/my.wxml');

__wxAppCode__['pages/tabbar/service/service.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{}};
__wxAppCode__['pages/tabbar/service/service.wxml']=$gwx('./pages/tabbar/service/service.wxml');



define('common/main.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{1838:function(n,o,t){"use strict";t.r(o);var e=t("f087");for(var u in e)"default"!==u&&function(n){t.d(o,n,function(){return e[n]})}(u);t("d2c6");var c,a,i=t("2877"),r=Object(i["a"])(e["default"],c,a,!1,null,null,null);o["default"]=r.exports},"240b":function(n,o,t){},4550:function(n,o,t){"use strict";(function(n){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={onLaunch:function(){console.log("App Launch"," at App.vue:4"),n.setStorageSync("isShow",!0)},onShow:function(){console.log("App Show"," at App.vue:26")},onHide:function(){console.log("App Hide"," at App.vue:29")},methods:{getQueryString:function(n){var o=new RegExp("[?&]"+n+"=([^&#]*)","i"),t=window.location.href.match(o);return t&&t.length>1?decodeURIComponent(t[1]):""}}};o.default=t}).call(this,t("6e42")["default"])},d2c6:function(n,o,t){"use strict";var e=t("240b"),u=t.n(e);u.a},f087:function(n,o,t){"use strict";t.r(o);var e=t("4550"),u=t.n(e);for(var c in e)"default"!==c&&function(n){t.d(o,n,function(){return e[n]})}(c);o["default"]=u.a}},[["10f6","common/runtime","common/vendor"]]]);
});
define('common/runtime.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(function (e) {
  function r(r) {
    for (var n, l, i = r[0], a = r[1], f = r[2], p = 0, s = []; p < i.length; p++) {
      l = i[p], o[l] && s.push(o[l][0]), o[l] = 0;
    }

    for (n in a) {
      Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }

    c && c(r);

    while (s.length) {
      s.shift()();
    }

    return u.push.apply(u, f || []), t();
  }

  function t() {
    for (var e, r = 0; r < u.length; r++) {
      for (var t = u[r], n = !0, i = 1; i < t.length; i++) {
        var a = t[i];
        0 !== o[a] && (n = !1);
      }

      n && (u.splice(r--, 1), e = l(l.s = t[0]));
    }

    return e;
  }

  var n = {},
      o = {
    "common/runtime": 0
  },
      u = [];

  function l(r) {
    if (n[r]) return n[r].exports;
    var t = n[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(t.exports, t, t.exports, l), t.l = !0, t.exports;
  }

  l.m = e, l.c = n, l.d = function (e, r, t) {
    l.o(e, r) || Object.defineProperty(e, r, {
      enumerable: !0,
      get: t
    });
  }, l.r = function (e) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, l.t = function (e, r) {
    if (1 & r && (e = l(e)), 8 & r) return e;
    if (4 & r && "object" === typeof e && e && e.__esModule) return e;
    var t = Object.create(null);
    if (l.r(t), Object.defineProperty(t, "default", {
      enumerable: !0,
      value: e
    }), 2 & r && "string" != typeof e) for (var n in e) {
      l.d(t, n, function (r) {
        return e[r];
      }.bind(null, n));
    }
    return t;
  }, l.n = function (e) {
    var r = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return l.d(r, "a", r), r;
  }, l.o = function (e, r) {
    return Object.prototype.hasOwnProperty.call(e, r);
  }, l.p = "/";
  var i = global["webpackJsonp"] = global["webpackJsonp"] || [],
      a = i.push.bind(i);
  i.push = r, i = i.slice();

  for (var f = 0; f < i.length; f++) {
    r(i[f]);
  }

  var c = a;
  t();
})([]);
});
define('common/vendor.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/vendor"],{"10f6":function(e,t,n){"use strict";(function(e,t){n("6932");var r=a(n("66fd")),o=a(n("1838")),i=a(n("21e6"));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){c(e,t,n[t])})}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}r.default.prototype.$store=i.default,r.default.config.productionTip=!1,r.default.prototype.$eventHub=new r.default,r.default.prototype.isLogin=function(){var t=e.getStorageSync("userInfo");return t?!!t.buildingName||(e.navigateTo({url:"/pages/build/build"}),!1):(e.navigateTo({url:"/pages/login/login"}),!1)},o.default.mpType="app";var u=new r.default(s({},o.default));t(u).$mount()}).call(this,n("6e42")["default"],n("6e42")["createApp"])},"21e6":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("66fd")),o=i(n("2f62"));function i(e){return e&&e.__esModule?e:{default:e}}r.default.use(o.default);var a=new o.default.Store({state:{addressID:0,orderItem:""},getters:{getAddressID:function(e){return e.addressID},getOrderItem:function(e){return e.orderItem}},mutations:{changeAddress:function(e,t){e.addressID=t},changeOrderItem:function(e,t){e.orderItem=t}},actions:{changeAddressFunc:function(e,t){e.commit("changeAddress",t)}}}),s=a;t.default=s},2877:function(e,t,n){"use strict";function r(e,t,n,r,o,i,a,s){var c,u="function"===typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),a?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=c):o&&(c=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(u.functional){u._injectStyles=c;var f=u.render;u.render=function(e,t){return c.call(t),f(e,t)}}else{var l=u.beforeCreate;u.beforeCreate=l?[].concat(l,c):[c]}return{exports:e,options:u}}n.d(t,"a",function(){return r})},"2f62":function(e,t,n){"use strict";n.r(t),n.d(t,"Store",function(){return h}),n.d(t,"install",function(){return j}),n.d(t,"mapState",function(){return E}),n.d(t,"mapMutations",function(){return P}),n.d(t,"mapGetters",function(){return I}),n.d(t,"mapActions",function(){return T}),n.d(t,"createNamespacedHelpers",function(){return C});
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var r=function(e){var t=Number(e.version.split(".")[0]);if(t>=2)e.mixin({beforeCreate:r});else{var n=e.prototype._init;e.prototype._init=function(e){void 0===e&&(e={}),e.init=e.init?[r].concat(e.init):r,n.call(this,e)}}function r(){var e=this.$options;e.store?this.$store="function"===typeof e.store?e.store():e.store:e.parent&&e.parent.$store&&(this.$store=e.parent.$store)}},o="undefined"!==typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function i(e){o&&(e._devtoolHook=o,o.emit("vuex:init",e),o.on("vuex:travel-to-state",function(t){e.replaceState(t)}),e.subscribe(function(e,t){o.emit("vuex:mutation",e,t)}))}function a(e,t){Object.keys(e).forEach(function(n){return t(e[n],n)})}function s(e){return null!==e&&"object"===typeof e}function c(e){return e&&"function"===typeof e.then}var u=function(e,t){this.runtime=t,this._children=Object.create(null),this._rawModule=e;var n=e.state;this.state=("function"===typeof n?n():n)||{}},f={namespaced:{configurable:!0}};f.namespaced.get=function(){return!!this._rawModule.namespaced},u.prototype.addChild=function(e,t){this._children[e]=t},u.prototype.removeChild=function(e){delete this._children[e]},u.prototype.getChild=function(e){return this._children[e]},u.prototype.update=function(e){this._rawModule.namespaced=e.namespaced,e.actions&&(this._rawModule.actions=e.actions),e.mutations&&(this._rawModule.mutations=e.mutations),e.getters&&(this._rawModule.getters=e.getters)},u.prototype.forEachChild=function(e){a(this._children,e)},u.prototype.forEachGetter=function(e){this._rawModule.getters&&a(this._rawModule.getters,e)},u.prototype.forEachAction=function(e){this._rawModule.actions&&a(this._rawModule.actions,e)},u.prototype.forEachMutation=function(e){this._rawModule.mutations&&a(this._rawModule.mutations,e)},Object.defineProperties(u.prototype,f);var l=function(e){this.register([],e,!1)};function p(e,t,n){if(t.update(n),n.modules)for(var r in n.modules){if(!t.getChild(r))return void 0;p(e.concat(r),t.getChild(r),n.modules[r])}}l.prototype.get=function(e){return e.reduce(function(e,t){return e.getChild(t)},this.root)},l.prototype.getNamespace=function(e){var t=this.root;return e.reduce(function(e,n){return t=t.getChild(n),e+(t.namespaced?n+"/":"")},"")},l.prototype.update=function(e){p([],this.root,e)},l.prototype.register=function(e,t,n){var r=this;void 0===n&&(n=!0);var o=new u(t,n);if(0===e.length)this.root=o;else{var i=this.get(e.slice(0,-1));i.addChild(e[e.length-1],o)}t.modules&&a(t.modules,function(t,o){r.register(e.concat(o),t,n)})},l.prototype.unregister=function(e){var t=this.get(e.slice(0,-1)),n=e[e.length-1];t.getChild(n).runtime&&t.removeChild(n)};var d;var h=function(e){var t=this;void 0===e&&(e={}),!d&&"undefined"!==typeof window&&window.Vue&&j(window.Vue);var n=e.plugins;void 0===n&&(n=[]);var r=e.strict;void 0===r&&(r=!1);var o=e.state;void 0===o&&(o={}),"function"===typeof o&&(o=o()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new l(e),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new d;var a=this,s=this,c=s.dispatch,u=s.commit;this.dispatch=function(e,t){return c.call(a,e,t)},this.commit=function(e,t,n){return u.call(a,e,t,n)},this.strict=r,_(this,o,[],this._modules.root),g(this,o),n.forEach(function(e){return e(t)}),d.config.devtools&&i(this)},v={state:{configurable:!0}};function y(e,t){return t.indexOf(e)<0&&t.push(e),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}function m(e,t){e._actions=Object.create(null),e._mutations=Object.create(null),e._wrappedGetters=Object.create(null),e._modulesNamespaceMap=Object.create(null);var n=e.state;_(e,n,[],e._modules.root,!0),g(e,n,t)}function g(e,t,n){var r=e._vm;e.getters={};var o=e._wrappedGetters,i={};a(o,function(t,n){i[n]=function(){return t(e)},Object.defineProperty(e.getters,n,{get:function(){return e._vm[n]},enumerable:!0})});var s=d.config.silent;d.config.silent=!0,e._vm=new d({data:{$$state:t},computed:i}),d.config.silent=s,e.strict&&x(e),r&&(n&&e._withCommit(function(){r._data.$$state=null}),d.nextTick(function(){return r.$destroy()}))}function _(e,t,n,r,o){var i=!n.length,a=e._modules.getNamespace(n);if(r.namespaced&&(e._modulesNamespaceMap[a]=r),!i&&!o){var s=S(t,n.slice(0,-1)),c=n[n.length-1];e._withCommit(function(){d.set(s,c,r.state)})}var u=r.context=b(e,a,n);r.forEachMutation(function(t,n){var r=a+n;O(e,r,t,u)}),r.forEachAction(function(t,n){var r=t.root?n:a+n,o=t.handler||t;$(e,r,o,u)}),r.forEachGetter(function(t,n){var r=a+n;A(e,r,t,u)}),r.forEachChild(function(r,i){_(e,t,n.concat(i),r,o)})}function b(e,t,n){var r=""===t,o={dispatch:r?e.dispatch:function(n,r,o){var i=k(n,r,o),a=i.payload,s=i.options,c=i.type;return s&&s.root||(c=t+c),e.dispatch(c,a)},commit:r?e.commit:function(n,r,o){var i=k(n,r,o),a=i.payload,s=i.options,c=i.type;s&&s.root||(c=t+c),e.commit(c,a,s)}};return Object.defineProperties(o,{getters:{get:r?function(){return e.getters}:function(){return w(e,t)}},state:{get:function(){return S(e.state,n)}}}),o}function w(e,t){var n={},r=t.length;return Object.keys(e.getters).forEach(function(o){if(o.slice(0,r)===t){var i=o.slice(r);Object.defineProperty(n,i,{get:function(){return e.getters[o]},enumerable:!0})}}),n}function O(e,t,n,r){var o=e._mutations[t]||(e._mutations[t]=[]);o.push(function(t){n.call(e,r.state,t)})}function $(e,t,n,r){var o=e._actions[t]||(e._actions[t]=[]);o.push(function(t,o){var i=n.call(e,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:e.getters,rootState:e.state},t,o);return c(i)||(i=Promise.resolve(i)),e._devtoolHook?i.catch(function(t){throw e._devtoolHook.emit("vuex:error",t),t}):i})}function A(e,t,n,r){e._wrappedGetters[t]||(e._wrappedGetters[t]=function(e){return n(r.state,r.getters,e.state,e.getters)})}function x(e){e._vm.$watch(function(){return this._data.$$state},function(){0},{deep:!0,sync:!0})}function S(e,t){return t.length?t.reduce(function(e,t){return e[t]},e):e}function k(e,t,n){return s(e)&&e.type&&(n=t,t=e,e=e.type),{type:e,payload:t,options:n}}function j(e){d&&e===d||(d=e,r(d))}v.state.get=function(){return this._vm._data.$$state},v.state.set=function(e){0},h.prototype.commit=function(e,t,n){var r=this,o=k(e,t,n),i=o.type,a=o.payload,s=(o.options,{type:i,payload:a}),c=this._mutations[i];c&&(this._withCommit(function(){c.forEach(function(e){e(a)})}),this._subscribers.forEach(function(e){return e(s,r.state)}))},h.prototype.dispatch=function(e,t){var n=this,r=k(e,t),o=r.type,i=r.payload,a={type:o,payload:i},s=this._actions[o];if(s)return this._actionSubscribers.forEach(function(e){return e(a,n.state)}),s.length>1?Promise.all(s.map(function(e){return e(i)})):s[0](i)},h.prototype.subscribe=function(e){return y(e,this._subscribers)},h.prototype.subscribeAction=function(e){return y(e,this._actionSubscribers)},h.prototype.watch=function(e,t,n){var r=this;return this._watcherVM.$watch(function(){return e(r.state,r.getters)},t,n)},h.prototype.replaceState=function(e){var t=this;this._withCommit(function(){t._vm._data.$$state=e})},h.prototype.registerModule=function(e,t,n){void 0===n&&(n={}),"string"===typeof e&&(e=[e]),this._modules.register(e,t),_(this,this.state,e,this._modules.get(e),n.preserveState),g(this,this.state)},h.prototype.unregisterModule=function(e){var t=this;"string"===typeof e&&(e=[e]),this._modules.unregister(e),this._withCommit(function(){var n=S(t.state,e.slice(0,-1));d.delete(n,e[e.length-1])}),m(this)},h.prototype.hotUpdate=function(e){this._modules.update(e),m(this,!0)},h.prototype._withCommit=function(e){var t=this._committing;this._committing=!0,e(),this._committing=t},Object.defineProperties(h.prototype,v);var E=L(function(e,t){var n={};return M(t).forEach(function(t){var r=t.key,o=t.val;n[r]=function(){var t=this.$store.state,n=this.$store.getters;if(e){var r=D(this.$store,"mapState",e);if(!r)return;t=r.context.state,n=r.context.getters}return"function"===typeof o?o.call(this,t,n):t[o]},n[r].vuex=!0}),n}),P=L(function(e,t){var n={};return M(t).forEach(function(t){var r=t.key,o=t.val;n[r]=function(){var t=[],n=arguments.length;while(n--)t[n]=arguments[n];var r=this.$store.commit;if(e){var i=D(this.$store,"mapMutations",e);if(!i)return;r=i.context.commit}return"function"===typeof o?o.apply(this,[r].concat(t)):r.apply(this.$store,[o].concat(t))}}),n}),I=L(function(e,t){var n={};return M(t).forEach(function(t){var r=t.key,o=t.val;o=e+o,n[r]=function(){if(!e||D(this.$store,"mapGetters",e))return this.$store.getters[o]},n[r].vuex=!0}),n}),T=L(function(e,t){var n={};return M(t).forEach(function(t){var r=t.key,o=t.val;n[r]=function(){var t=[],n=arguments.length;while(n--)t[n]=arguments[n];var r=this.$store.dispatch;if(e){var i=D(this.$store,"mapActions",e);if(!i)return;r=i.context.dispatch}return"function"===typeof o?o.apply(this,[r].concat(t)):r.apply(this.$store,[o].concat(t))}}),n}),C=function(e){return{mapState:E.bind(null,e),mapGetters:I.bind(null,e),mapMutations:P.bind(null,e),mapActions:T.bind(null,e)}};function M(e){return Array.isArray(e)?e.map(function(e){return{key:e,val:e}}):Object.keys(e).map(function(t){return{key:t,val:e[t]}})}function L(e){return function(t,n){return"string"!==typeof t?(n=t,t=""):"/"!==t.charAt(t.length-1)&&(t+="/"),e(t,n)}}function D(e,t,n){var r=e._modulesNamespaceMap[n];return r}var N={Store:h,install:j,version:"3.0.1",mapState:E,mapMutations:P,mapGetters:I,mapActions:T,createNamespacedHelpers:C};t["default"]=N},"3bf3":function(e,t,n){"use strict";(function(t,n){e.exports=n()})(0,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}([function(e,t,n){var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports={type:function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()},isObject:function(e,t){return t?"object"===this.type(e):e&&"object"===("undefined"===typeof e?"undefined":r(e))},isFormData:function(e){return"undefined"!==typeof FormData&&e instanceof FormData},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},encode:function(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")},formatParams:function(e){var t="",n=!0,r=this;if(!this.isObject(e))return e;function o(e,i){var a=r.encode,s=r.type(e);if("array"==s)e.forEach(function(e,t){r.isObject(e)||(t=""),o(e,i+"%5B"+t+"%5D")});else if("object"==s)for(var c in e)o(e[c],i?i+"%5B"+a(c)+"%5D":a(c));else n||(t+="&"),n=!1,t+=i+"="+a(e)}return o(e,""),t},merge:function(e,t){for(var n in t)e.hasOwnProperty(n)?this.isObject(t[n],1)&&this.isObject(e[n],1)&&this.merge(e[n],t[n]):e[n]=t[n];return e}}},function(e,t,n){var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=n(0),s="undefined"!==typeof document;function c(e){var t=function(){function t(){i(this,t),this.requestHeaders={},this.readyState=0,this.timeout=0,this.responseURL="",this.responseHeaders={}}return o(t,[{key:"_call",value:function(e){this[e]&&this[e].apply(this,[].splice.call(arguments,1))}},{key:"_changeReadyState",value:function(e){this.readyState=e,this._call("onreadystatechange")}},{key:"open",value:function(e,t){if(this.method=e,t){if(t=a.trim(t),0!==t.indexOf("http")&&s){var n=document.createElement("a");n.href=t,t=n.href}}else t=location.href;this.responseURL=t,this._changeReadyState(1)}},{key:"send",value:function(t){var n=this;t=t||null;var o=this;if(e){var i={method:o.method,url:o.responseURL,headers:o.requestHeaders||{},body:t};a.merge(i,o._options||{}),"GET"===i.method&&(i.body=null),o._changeReadyState(3);var c=void 0;o.timeout=o.timeout||0,o.timeout>0&&(c=setTimeout(function(){3===o.readyState&&(n._call("onloadend"),o._changeReadyState(0),o._call("ontimeout"))},o.timeout)),i.timeout=o.timeout,e(i,function(e){function t(t){var n=e[t];return delete e[t],n}if(3===o.readyState){clearTimeout(c),o.status=t("statusCode")-0;var n=t("responseText"),i=t("statusMessage");if(o.status){var a=t("headers"),u={};for(var f in a){var l=a[f],p=f.toLowerCase();"object"===("undefined"===typeof l?"undefined":r(l))?u[p]=l:(u[p]=u[p]||[],u[p].push(l))}var d=u["set-cookie"];s&&d&&d.forEach(function(e){document.cookie=e.replace(/;\s*httpOnly/gi,"")}),o.responseHeaders=u,o.statusText=i||"",o.response=o.responseText=n,o._response=e,o._changeReadyState(4),o._call("onload")}else o.statusText=n,o._call("onerror",{msg:i});o._call("onloadend")}})}else console.error("Ajax require adapter"," at utils/fly.js:312")}},{key:"setRequestHeader",value:function(e,t){this.requestHeaders[a.trim(e)]=t}},{key:"getResponseHeader",value:function(e){return(this.responseHeaders[e.toLowerCase()]||"").toString()||null}},{key:"getAllResponseHeaders",value:function(){var e="";for(var t in this.responseHeaders)e+=t+":"+this.getResponseHeader(t)+"\r\n";return e||null}},{key:"abort",value:function(e){this._changeReadyState(0),this._call("onerror",{msg:e}),this._call("onloadend")}}],[{key:"setAdapter",value:function(t){e=t}}]),t}();return t}e.exports=c},function(e,t,n){var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=n(0),a="undefined"!==typeof document,s=function(){function e(t){function n(e){var t=void 0,n=void 0;function r(){e.p=t=n=null}i.merge(e,{lock:function(){t||(e.p=new Promise(function(e,r){t=e,n=r}))},unlock:function(){t&&(t(),r())},clear:function(){n&&(n("cancel"),r())}})}o(this,e),this.engine=t||XMLHttpRequest,this.default=this;var r=this.interceptors={response:{use:function(e,t){this.handler=e,this.onerror=t}},request:{use:function(e){this.handler=e}}},a=r.request,s=r.response;n(s),n(a),this.config={method:"GET",baseURL:"",headers:{},timeout:0,params:{},parseJson:!0,withCredentials:!1}}return r(e,[{key:"request",value:function(e,t,n){var r=this,o=new this.engine,s="Content-Type",c=s.toLowerCase(),u=this.interceptors,f=u.request,l=u.response,p=f.handler,d=new Promise(function(u,d){function h(e){return e&&e.then&&e.catch}function v(e,t){e?e.then(function(){t()}):t()}function y(n){t=n.body,e=i.trim(n.url);var r=i.trim(n.baseURL||"");if(e||!a||r||(e=location.href),0!==e.indexOf("http")){var f="/"===e[0];if(!r&&a){var p=location.pathname.split("/");p.pop(),r=location.protocol+"//"+location.host+(f?"":p.join("/"))}if("/"!==r[r.length-1]&&(r+="/"),e=r+(f?e.substr(1):e),a){var y=document.createElement("a");y.href=e,e=y.href}}var m=i.trim(n.responseType||""),g=-1!==["GET","HEAD","DELETE","OPTION"].indexOf(n.method),_=i.type(t),b=n.params||{};g&&"object"===_&&(b=i.merge(t,b)),b=i.formatParams(b);var w=[];b&&w.push(b),g&&t&&"string"===_&&w.push(t),w.length>0&&(e+=(-1===e.indexOf("?")?"?":"&")+w.join("&")),o.open(n.method,e);try{o.withCredentials=!!n.withCredentials,o.timeout=n.timeout||0,"stream"!==m&&(o.responseType=m)}catch(j){}var O=n.headers[s]||n.headers[c],$="application/x-www-form-urlencoded";for(var A in i.trim((O||"").toLowerCase())===$?t=i.formatParams(t):i.isFormData(t)||-1===["object","array"].indexOf(i.type(t))||($="application/json;charset=utf-8",t=JSON.stringify(t)),O||g||(n.headers[s]=$),n.headers)if(A===s&&i.isFormData(t))delete n.headers[A];else try{o.setRequestHeader(A,n.headers[A])}catch(j){}function x(e,t,r){v(l.p,function(){if(e){r&&(t.request=n);var o=e.call(l,t,Promise);t=void 0===o?t:o}h(t)||(t=Promise[0===r?"resolve":"reject"](t)),t.then(function(e){u(e)}).catch(function(e){d(e)})})}function S(e){e.engine=o,x(l.onerror,e,-1)}function k(e,t){this.message=e,this.status=t}o.onload=function(){try{var e=o.response||o.responseText;e&&n.parseJson&&-1!==(o.getResponseHeader(s)||"").indexOf("json")&&!i.isObject(e)&&(e=JSON.parse(e));var t=o.responseHeaders;if(!t){t={};var r=(o.getAllResponseHeaders()||"").split("\r\n");r.pop(),r.forEach(function(e){if(e){var n=e.split(":")[0];t[n]=o.getResponseHeader(n)}})}var a=o.status,c=o.statusText,u={data:e,headers:t,status:a,statusText:c};if(i.merge(u,o._response),a>=200&&a<300||304===a)u.engine=o,u.request=n,x(l.handler,u,0);else{var f=new k(c,a);f.response=u,S(f)}}catch(f){S(new k(f.msg,o.status))}},o.onerror=function(e){S(new k(e.msg||"Network Error",0))},o.ontimeout=function(){S(new k("timeout [ "+o.timeout+"ms ]",1))},o._options=n,setTimeout(function(){o.send(g?null:t)},0)}i.isObject(e)&&(n=e,e=n.url),n=n||{},n.headers=n.headers||{},v(f.p,function(){i.merge(n,JSON.parse(JSON.stringify(r.config)));var o=n.headers;o[s]=o[s]||o[c]||"",delete o[c],n.body=t||n.body,e=i.trim(e||""),n.method=n.method.toUpperCase(),n.url=e;var a=n;p&&(a=p.call(f,n,Promise)||n),h(a)||(a=Promise.resolve(a)),a.then(function(e){e===n?y(e):u(e)},function(e){d(e)})})});return d.engine=o,d}},{key:"all",value:function(e){return Promise.all(e)}},{key:"spread",value:function(e){return function(t){return e.apply(null,t)}}}]),e}();s.default=s,["get","post","put","patch","head","delete"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.request(t,n,i.merge({method:e},r))}}),["lock","unlock","clear"].forEach(function(e){s.prototype[e]=function(){this.interceptors.request[e]()}}),e.exports=s},,,,,function(e,t,n){e.exports=function(e,t){var n={method:e.method,url:e.url,dataType:e.dataType||void 0,header:e.headers,data:e.body||{},responseType:e.responseType||"text",success:function(e){t({statusCode:e.statusCode,responseText:e.data,headers:e.header,statusMessage:e.errMsg})},fail:function(e){t({statusCode:e.statusCode||0,statusMessage:e.errMsg})}};wx.request(n)}},,,,,,function(e,t,n){var r=n(2),o=n(1),i=n(7),a=o(i);e.exports=function(e){return new r(e||a)}}])})},4127:function(e,t,n){"use strict";var r=n("d233"),o=n("b313"),i={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},a=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,serializeDate:function(e){return a.call(e)},skipNulls:!1,strictNullHandling:!1},c=function e(t,n,o,i,a,c,u,f,l,p,d,h){var v=t;if("function"===typeof u)v=u(n,v);else if(v instanceof Date)v=p(v);else if(null===v){if(i)return c&&!h?c(n,s.encoder):n;v=""}if("string"===typeof v||"number"===typeof v||"boolean"===typeof v||r.isBuffer(v)){if(c){var y=h?n:c(n,s.encoder);return[d(y)+"="+d(c(v,s.encoder))]}return[d(n)+"="+d(String(v))]}var m,g=[];if("undefined"===typeof v)return g;if(Array.isArray(u))m=u;else{var _=Object.keys(v);m=f?_.sort(f):_}for(var b=0;b<m.length;++b){var w=m[b];a&&null===v[w]||(g=Array.isArray(v)?g.concat(e(v[w],o(n,w),o,i,a,c,u,f,l,p,d,h)):g.concat(e(v[w],n+(l?"."+w:"["+w+"]"),o,i,a,c,u,f,l,p,d,h)))}return g};e.exports=function(e,t){var n=e,a=t?r.assign({},t):{};if(null!==a.encoder&&void 0!==a.encoder&&"function"!==typeof a.encoder)throw new TypeError("Encoder has to be a function.");var u="undefined"===typeof a.delimiter?s.delimiter:a.delimiter,f="boolean"===typeof a.strictNullHandling?a.strictNullHandling:s.strictNullHandling,l="boolean"===typeof a.skipNulls?a.skipNulls:s.skipNulls,p="boolean"===typeof a.encode?a.encode:s.encode,d="function"===typeof a.encoder?a.encoder:s.encoder,h="function"===typeof a.sort?a.sort:null,v="undefined"!==typeof a.allowDots&&a.allowDots,y="function"===typeof a.serializeDate?a.serializeDate:s.serializeDate,m="boolean"===typeof a.encodeValuesOnly?a.encodeValuesOnly:s.encodeValuesOnly;if("undefined"===typeof a.format)a.format=o["default"];else if(!Object.prototype.hasOwnProperty.call(o.formatters,a.format))throw new TypeError("Unknown format option provided.");var g,_,b=o.formatters[a.format];"function"===typeof a.filter?(_=a.filter,n=_("",n)):Array.isArray(a.filter)&&(_=a.filter,g=_);var w,O=[];if("object"!==typeof n||null===n)return"";w=a.arrayFormat in i?a.arrayFormat:"indices"in a?a.indices?"indices":"repeat":"indices";var $=i[w];g||(g=Object.keys(n)),h&&g.sort(h);for(var A=0;A<g.length;++A){var x=g[A];l&&null===n[x]||(O=O.concat(c(n[x],x,$,f,l,p?d:null,_,h,v,y,b,m)))}var S=O.join(u),k=!0===a.addQueryPrefix?"?":"";return S.length>0?k+S:""}},4328:function(e,t,n){"use strict";var r=n("4127"),o=n("9e6a"),i=n("b313");e.exports={formats:i,parse:o,stringify:r}},"66fd":function(e,t,n){"use strict";n.r(t),function(e){
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
var n=Object.freeze({});function r(e){return void 0===e||null===e}function o(e){return void 0!==e&&null!==e}function i(e){return!0===e}function a(e){return!1===e}function s(e){return"string"===typeof e||"number"===typeof e||"symbol"===typeof e||"boolean"===typeof e}function c(e){return null!==e&&"object"===typeof e}var u=Object.prototype.toString;function f(e){return"[object Object]"===u.call(e)}function l(e){return"[object RegExp]"===u.call(e)}function p(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function d(e){return o(e)&&"function"===typeof e.then&&"function"===typeof e.catch}function h(e){return null==e?"":Array.isArray(e)||f(e)&&e.toString===u?JSON.stringify(e,null,2):String(e)}function v(e){var t=parseFloat(e);return isNaN(t)?e:t}function y(e,t){for(var n=Object.create(null),r=e.split(","),o=0;o<r.length;o++)n[r[o]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}y("slot,component",!0);var m=y("key,ref,slot,slot-scope,is");function g(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var _=Object.prototype.hasOwnProperty;function b(e,t){return _.call(e,t)}function w(e){var t=Object.create(null);return function(n){var r=t[n];return r||(t[n]=e(n))}}var O=/-(\w)/g,$=w(function(e){return e.replace(O,function(e,t){return t?t.toUpperCase():""})}),A=w(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),x=/\B([A-Z])/g,S=w(function(e){return e.replace(x,"-$1").toLowerCase()});function k(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function j(e,t){return e.bind(t)}var E=Function.prototype.bind?j:k;function P(e,t){t=t||0;var n=e.length-t,r=new Array(n);while(n--)r[n]=e[n+t];return r}function I(e,t){for(var n in t)e[n]=t[n];return e}function T(e){for(var t={},n=0;n<e.length;n++)e[n]&&I(t,e[n]);return t}function C(e,t,n){}var M=function(e,t,n){return!1},L=function(e){return e};function D(e,t){if(e===t)return!0;var n=c(e),r=c(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var o=Array.isArray(e),i=Array.isArray(t);if(o&&i)return e.length===t.length&&e.every(function(e,n){return D(e,t[n])});if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(o||i)return!1;var a=Object.keys(e),s=Object.keys(t);return a.length===s.length&&a.every(function(n){return D(e[n],t[n])})}catch(u){return!1}}function N(e,t){for(var n=0;n<e.length;n++)if(D(e[n],t))return n;return-1}function R(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var V=["component","directive","filter"],B=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],U={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:M,isReservedAttr:M,isUnknownElement:M,getTagNamespace:C,parsePlatformTagName:L,mustUseProp:M,async:!0,_lifecycleHooks:B},F=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function H(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function W(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var G=new RegExp("[^"+F.source+".$_\\d]");function J(e){if(!G.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}var q,z="__proto__"in{},Q="undefined"!==typeof window,K="undefined"!==typeof WXEnvironment&&!!WXEnvironment.platform,X=K&&WXEnvironment.platform.toLowerCase(),Z=Q&&window.navigator.userAgent.toLowerCase(),Y=Z&&/msie|trident/.test(Z),ee=(Z&&Z.indexOf("msie 9.0"),Z&&Z.indexOf("edge/")>0),te=(Z&&Z.indexOf("android"),Z&&/iphone|ipad|ipod|ios/.test(Z)||"ios"===X),ne=(Z&&/chrome\/\d+/.test(Z),Z&&/phantomjs/.test(Z),Z&&Z.match(/firefox\/(\d+)/),{}.watch);if(Q)try{var re={};Object.defineProperty(re,"passive",{get:function(){}}),window.addEventListener("test-passive",null,re)}catch(no){}var oe=function(){return void 0===q&&(q=!Q&&!K&&"undefined"!==typeof e&&(e["process"]&&"server"===e["process"].env.VUE_ENV)),q},ie=Q&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ae(e){return"function"===typeof e&&/native code/.test(e.toString())}var se,ce="undefined"!==typeof Symbol&&ae(Symbol)&&"undefined"!==typeof Reflect&&ae(Reflect.ownKeys);se="undefined"!==typeof Set&&ae(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var ue=C,fe=0,le=function(){this.id=fe++,this.subs=[]};le.prototype.addSub=function(e){this.subs.push(e)},le.prototype.removeSub=function(e){g(this.subs,e)},le.prototype.depend=function(){le.target&&le.target.addDep(this)},le.prototype.notify=function(){var e=this.subs.slice();for(var t=0,n=e.length;t<n;t++)e[t].update()},le.target=null;var pe=[];function de(e){pe.push(e),le.target=e}function he(){pe.pop(),le.target=pe[pe.length-1]}var ve=function(e,t,n,r,o,i,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=o,this.ns=void 0,this.context=i,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},ye={child:{configurable:!0}};ye.child.get=function(){return this.componentInstance},Object.defineProperties(ve.prototype,ye);var me=function(e){void 0===e&&(e="");var t=new ve;return t.text=e,t.isComment=!0,t};function ge(e){return new ve(void 0,void 0,void 0,String(e))}function _e(e){var t=new ve(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var be=Array.prototype,we=Object.create(be),Oe=["push","pop","shift","unshift","splice","sort","reverse"];Oe.forEach(function(e){var t=be[e];W(we,e,function(){var n=[],r=arguments.length;while(r--)n[r]=arguments[r];var o,i=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":o=n;break;case"splice":o=n.slice(2);break}return o&&a.observeArray(o),a.dep.notify(),i})});var $e=Object.getOwnPropertyNames(we),Ae=!0;function xe(e){Ae=e}var Se=function(e){this.value=e,this.dep=new le,this.vmCount=0,W(e,"__ob__",this),Array.isArray(e)?(z?ke(e,we):je(e,we,$e),this.observeArray(e)):this.walk(e)};function ke(e,t){e.__proto__=t}function je(e,t,n){for(var r=0,o=n.length;r<o;r++){var i=n[r];W(e,i,t[i])}}function Ee(e,t){var n;if(c(e)&&!(e instanceof ve))return b(e,"__ob__")&&e.__ob__ instanceof Se?n=e.__ob__:Ae&&!oe()&&(Array.isArray(e)||f(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new Se(e)),t&&n&&n.vmCount++,n}function Pe(e,t,n,r,o){var i=new le,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set;s&&!c||2!==arguments.length||(n=e[t]);var u=!o&&Ee(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return le.target&&(i.depend(),u&&(u.dep.depend(),Array.isArray(t)&&Ce(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!==t&&r!==r||s&&!c||(c?c.call(e,t):n=t,u=!o&&Ee(t),i.notify())}})}}function Ie(e,t,n){if(Array.isArray(e)&&p(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(Pe(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function Te(e,t){if(Array.isArray(e)&&p(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||b(e,t)&&(delete e[t],n&&n.dep.notify())}}function Ce(e){for(var t=void 0,n=0,r=e.length;n<r;n++)t=e[n],t&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&Ce(t)}Se.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)Pe(e,t[n])},Se.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)Ee(e[t])};var Me=U.optionMergeStrategies;function Le(e,t){if(!t)return e;for(var n,r,o,i=ce?Reflect.ownKeys(t):Object.keys(t),a=0;a<i.length;a++)n=i[a],"__ob__"!==n&&(r=e[n],o=t[n],b(e,n)?r!==o&&f(r)&&f(o)&&Le(r,o):Ie(e,n,o));return e}function De(e,t,n){return n?function(){var r="function"===typeof t?t.call(n,n):t,o="function"===typeof e?e.call(n,n):e;return r?Le(r,o):o}:t?e?function(){return Le("function"===typeof t?t.call(this,this):t,"function"===typeof e?e.call(this,this):e)}:t:e}function Ne(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?Re(n):n}function Re(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}function Ve(e,t,n,r){var o=Object.create(e||null);return t?I(o,t):o}Me.data=function(e,t,n){return n?De(e,t,n):t&&"function"!==typeof t?e:De(e,t)},B.forEach(function(e){Me[e]=Ne}),V.forEach(function(e){Me[e+"s"]=Ve}),Me.watch=function(e,t,n,r){if(e===ne&&(e=void 0),t===ne&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var o={};for(var i in I(o,e),t){var a=o[i],s=t[i];a&&!Array.isArray(a)&&(a=[a]),o[i]=a?a.concat(s):Array.isArray(s)?s:[s]}return o},Me.props=Me.methods=Me.inject=Me.computed=function(e,t,n,r){if(!e)return t;var o=Object.create(null);return I(o,e),t&&I(o,t),o},Me.provide=De;var Be=function(e,t){return void 0===t?e:t};function Ue(e,t){var n=e.props;if(n){var r,o,i,a={};if(Array.isArray(n)){r=n.length;while(r--)o=n[r],"string"===typeof o&&(i=$(o),a[i]={type:null})}else if(f(n))for(var s in n)o=n[s],i=$(s),a[i]=f(o)?o:{type:o};else 0;e.props=a}}function Fe(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var o=0;o<n.length;o++)r[n[o]]={from:n[o]};else if(f(n))for(var i in n){var a=n[i];r[i]=f(a)?I({from:i},a):{from:a}}else 0}}function He(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"===typeof r&&(t[n]={bind:r,update:r})}}function We(e,t,n){if("function"===typeof t&&(t=t.options),Ue(t,n),Fe(t,n),He(t),!t._base&&(t.extends&&(e=We(e,t.extends,n)),t.mixins))for(var r=0,o=t.mixins.length;r<o;r++)e=We(e,t.mixins[r],n);var i,a={};for(i in e)s(i);for(i in t)b(e,i)||s(i);function s(r){var o=Me[r]||Be;a[r]=o(e[r],t[r],n,r)}return a}function Ge(e,t,n,r){if("string"===typeof n){var o=e[t];if(b(o,n))return o[n];var i=$(n);if(b(o,i))return o[i];var a=A(i);if(b(o,a))return o[a];var s=o[n]||o[i]||o[a];return s}}function Je(e,t,n,r){var o=t[e],i=!b(n,e),a=n[e],s=Ke(Boolean,o.type);if(s>-1)if(i&&!b(o,"default"))a=!1;else if(""===a||a===S(e)){var c=Ke(String,o.type);(c<0||s<c)&&(a=!0)}if(void 0===a){a=qe(r,o,e);var u=Ae;xe(!0),Ee(a),xe(u)}return a}function qe(e,t,n){if(b(t,"default")){var r=t.default;return e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n]?e._props[n]:"function"===typeof r&&"Function"!==ze(t.type)?r.call(e):r}}function ze(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function Qe(e,t){return ze(e)===ze(t)}function Ke(e,t){if(!Array.isArray(t))return Qe(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(Qe(t[n],e))return n;return-1}function Xe(e,t,n){de();try{if(t){var r=t;while(r=r.$parent){var o=r.$options.errorCaptured;if(o)for(var i=0;i<o.length;i++)try{var a=!1===o[i].call(r,e,t,n);if(a)return}catch(no){Ye(no,r,"errorCaptured hook")}}}Ye(e,t,n)}finally{he()}}function Ze(e,t,n,r,o){var i;try{i=n?e.apply(t,n):e.call(t),i&&!i._isVue&&d(i)&&!i._handled&&(i.catch(function(e){return Xe(e,r,o+" (Promise/async)")}),i._handled=!0)}catch(no){Xe(no,r,o)}return i}function Ye(e,t,n){if(U.errorHandler)try{return U.errorHandler.call(null,e,t,n)}catch(no){no!==e&&et(no,null,"config.errorHandler")}et(e,t,n)}function et(e,t,n){if(!Q&&!K||"undefined"===typeof console)throw e;console.error(e)}var tt,nt=[],rt=!1;function ot(){rt=!1;var e=nt.slice(0);nt.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!==typeof Promise&&ae(Promise)){var it=Promise.resolve();tt=function(){it.then(ot),te&&setTimeout(C)}}else if(Y||"undefined"===typeof MutationObserver||!ae(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())tt="undefined"!==typeof setImmediate&&ae(setImmediate)?function(){setImmediate(ot)}:function(){setTimeout(ot,0)};else{var at=1,st=new MutationObserver(ot),ct=document.createTextNode(String(at));st.observe(ct,{characterData:!0}),tt=function(){at=(at+1)%2,ct.data=String(at)}}function ut(e,t){var n;if(nt.push(function(){if(e)try{e.call(t)}catch(no){Xe(no,t,"nextTick")}else n&&n(t)}),rt||(rt=!0,tt()),!e&&"undefined"!==typeof Promise)return new Promise(function(e){n=e})}var ft=new se;function lt(e){pt(e,ft),ft.clear()}function pt(e,t){var n,r,o=Array.isArray(e);if(!(!o&&!c(e)||Object.isFrozen(e)||e instanceof ve)){if(e.__ob__){var i=e.__ob__.dep.id;if(t.has(i))return;t.add(i)}if(o){n=e.length;while(n--)pt(e[n],t)}else{r=Object.keys(e),n=r.length;while(n--)pt(e[r[n]],t)}}}var dt=w(function(e){var t="&"===e.charAt(0);e=t?e.slice(1):e;var n="~"===e.charAt(0);e=n?e.slice(1):e;var r="!"===e.charAt(0);return e=r?e.slice(1):e,{name:e,once:n,capture:r,passive:t}});function ht(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return Ze(r,null,arguments,t,"v-on handler");for(var o=r.slice(),i=0;i<o.length;i++)Ze(o[i],null,e,t,"v-on handler")}return n.fns=e,n}function vt(e,t,n,o,a,s){var c,u,f,l;for(c in e)u=e[c],f=t[c],l=dt(c),r(u)||(r(f)?(r(u.fns)&&(u=e[c]=ht(u,s)),i(l.once)&&(u=e[c]=a(l.name,u,l.capture)),n(l.name,u,l.capture,l.passive,l.params)):u!==f&&(f.fns=u,e[c]=f));for(c in t)r(e[c])&&(l=dt(c),o(l.name,t[c],l.capture))}function yt(e,t,n){var i=t.options.props;if(!r(i)){var a={},s=e.attrs,c=e.props;if(o(s)||o(c))for(var u in i){var f=S(u);mt(a,c,u,f,!0)||mt(a,s,u,f,!1)}return a}}function mt(e,t,n,r,i){if(o(t)){if(b(t,n))return e[n]=t[n],i||delete t[n],!0;if(b(t,r))return e[n]=t[r],i||delete t[r],!0}return!1}function gt(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}function _t(e){return s(e)?[ge(e)]:Array.isArray(e)?wt(e):void 0}function bt(e){return o(e)&&o(e.text)&&a(e.isComment)}function wt(e,t){var n,a,c,u,f=[];for(n=0;n<e.length;n++)a=e[n],r(a)||"boolean"===typeof a||(c=f.length-1,u=f[c],Array.isArray(a)?a.length>0&&(a=wt(a,(t||"")+"_"+n),bt(a[0])&&bt(u)&&(f[c]=ge(u.text+a[0].text),a.shift()),f.push.apply(f,a)):s(a)?bt(u)?f[c]=ge(u.text+a):""!==a&&f.push(ge(a)):bt(a)&&bt(u)?f[c]=ge(u.text+a.text):(i(e._isVList)&&o(a.tag)&&r(a.key)&&o(t)&&(a.key="__vlist"+t+"_"+n+"__"),f.push(a)));return f}function Ot(e){var t=e.$options.provide;t&&(e._provided="function"===typeof t?t.call(e):t)}function $t(e){var t=At(e.$options.inject,e);t&&(xe(!1),Object.keys(t).forEach(function(n){Pe(e,n,t[n])}),xe(!0))}function At(e,t){if(e){for(var n=Object.create(null),r=ce?Reflect.ownKeys(e):Object.keys(e),o=0;o<r.length;o++){var i=r[o];if("__ob__"!==i){var a=e[i].from,s=t;while(s){if(s._provided&&b(s._provided,a)){n[i]=s._provided[a];break}s=s.$parent}if(!s)if("default"in e[i]){var c=e[i].default;n[i]="function"===typeof c?c.call(t):c}else 0}}return n}}function xt(e,t){if(!e||!e.length)return{};for(var n={},r=0,o=e.length;r<o;r++){var i=e[r],a=i.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,i.context!==t&&i.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(i);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===i.tag?c.push.apply(c,i.children||[]):c.push(i)}}for(var u in n)n[u].every(St)&&delete n[u];return n}function St(e){return e.isComment&&!e.asyncFactory||" "===e.text}function kt(e,t,r){var o,i=Object.keys(t).length>0,a=e?!!e.$stable:!i,s=e&&e.$key;if(e){if(e._normalized)return e._normalized;if(a&&r&&r!==n&&s===r.$key&&!i&&!r.$hasNormal)return r;for(var c in o={},e)e[c]&&"$"!==c[0]&&(o[c]=jt(t,c,e[c]))}else o={};for(var u in t)u in o||(o[u]=Et(t,u));return e&&Object.isExtensible(e)&&(e._normalized=o),W(o,"$stable",a),W(o,"$key",s),W(o,"$hasNormal",i),o}function jt(e,t,n){var r=function(){var e=arguments.length?n.apply(null,arguments):n({});return e=e&&"object"===typeof e&&!Array.isArray(e)?[e]:_t(e),e&&(0===e.length||1===e.length&&e[0].isComment)?void 0:e};return n.proxy&&Object.defineProperty(e,t,{get:r,enumerable:!0,configurable:!0}),r}function Et(e,t){return function(){return e[t]}}function Pt(e,t){var n,r,i,a,s;if(Array.isArray(e)||"string"===typeof e)for(n=new Array(e.length),r=0,i=e.length;r<i;r++)n[r]=t(e[r],r);else if("number"===typeof e)for(n=new Array(e),r=0;r<e;r++)n[r]=t(r+1,r);else if(c(e))if(ce&&e[Symbol.iterator]){n=[];var u=e[Symbol.iterator](),f=u.next();while(!f.done)n.push(t(f.value,n.length)),f=u.next()}else for(a=Object.keys(e),n=new Array(a.length),r=0,i=a.length;r<i;r++)s=a[r],n[r]=t(e[s],s,r);return o(n)||(n=[]),n._isVList=!0,n}function It(e,t,n,r){var o,i=this.$scopedSlots[e];i?(n=n||{},r&&(n=I(I({},r),n)),o=i(n)||t):o=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},o):o}function Tt(e){return Ge(this.$options,"filters",e,!0)||L}function Ct(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function Mt(e,t,n,r,o){var i=U.keyCodes[t]||n;return o&&r&&!U.keyCodes[t]?Ct(o,r):i?Ct(i,e):r?S(r)!==t:void 0}function Lt(e,t,n,r,o){if(n)if(c(n)){var i;Array.isArray(n)&&(n=T(n));var a=function(a){if("class"===a||"style"===a||m(a))i=e;else{var s=e.attrs&&e.attrs.type;i=r||U.mustUseProp(t,s,a)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=$(a),u=S(a);if(!(c in i)&&!(u in i)&&(i[a]=n[a],o)){var f=e.on||(e.on={});f["update:"+a]=function(e){n[a]=e}}};for(var s in n)a(s)}else;return e}function Dt(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t?r:(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),Rt(r,"__static__"+e,!1),r)}function Nt(e,t,n){return Rt(e,"__once__"+t+(n?"_"+n:""),!0),e}function Rt(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!==typeof e[r]&&Vt(e[r],t+"_"+r,n);else Vt(e,t,n)}function Vt(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function Bt(e,t){if(t)if(f(t)){var n=e.on=e.on?I({},e.on):{};for(var r in t){var o=n[r],i=t[r];n[r]=o?[].concat(o,i):i}}else;return e}function Ut(e,t,n,r){t=t||{$stable:!n};for(var o=0;o<e.length;o++){var i=e[o];Array.isArray(i)?Ut(i,t,n):i&&(i.proxy&&(i.fn.proxy=!0),t[i.key]=i.fn)}return r&&(t.$key=r),t}function Ft(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"===typeof r&&r&&(e[t[n]]=t[n+1])}return e}function Ht(e,t){return"string"===typeof e?t+e:e}function Wt(e){e._o=Nt,e._n=v,e._s=h,e._l=Pt,e._t=It,e._q=D,e._i=N,e._m=Dt,e._f=Tt,e._k=Mt,e._b=Lt,e._v=ge,e._e=me,e._u=Ut,e._g=Bt,e._d=Ft,e._p=Ht}function Gt(e,t,r,o,a){var s,c=this,u=a.options;b(o,"_uid")?(s=Object.create(o),s._original=o):(s=o,o=o._original);var f=i(u._compiled),l=!f;this.data=e,this.props=t,this.children=r,this.parent=o,this.listeners=e.on||n,this.injections=At(u.inject,o),this.slots=function(){return c.$slots||kt(e.scopedSlots,c.$slots=xt(r,o)),c.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return kt(e.scopedSlots,this.slots())}}),f&&(this.$options=u,this.$slots=this.slots(),this.$scopedSlots=kt(e.scopedSlots,this.$slots)),u._scopeId?this._c=function(e,t,n,r){var i=on(s,e,t,n,r,l);return i&&!Array.isArray(i)&&(i.fnScopeId=u._scopeId,i.fnContext=o),i}:this._c=function(e,t,n,r){return on(s,e,t,n,r,l)}}function Jt(e,t,r,i,a){var s=e.options,c={},u=s.props;if(o(u))for(var f in u)c[f]=Je(f,u,t||n);else o(r.attrs)&&zt(c,r.attrs),o(r.props)&&zt(c,r.props);var l=new Gt(r,c,a,i,e),p=s.render.call(null,l._c,l);if(p instanceof ve)return qt(p,r,l.parent,s,l);if(Array.isArray(p)){for(var d=_t(p)||[],h=new Array(d.length),v=0;v<d.length;v++)h[v]=qt(d[v],r,l.parent,s,l);return h}}function qt(e,t,n,r,o){var i=_e(e);return i.fnContext=n,i.fnOptions=r,t.slot&&((i.data||(i.data={})).slot=t.slot),i}function zt(e,t){for(var n in t)e[$(n)]=t[n]}Wt(Gt.prototype);var Qt={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var n=e;Qt.prepatch(n,n)}else{var r=e.componentInstance=Zt(e,An);r.$mount(t?e.elm:void 0,t)}},prepatch:function(e,t){var n=t.componentOptions,r=t.componentInstance=e.componentInstance;jn(r,n.propsData,n.listeners,t,n.children)},insert:function(e){var t=e.context,n=e.componentInstance;n._isMounted||(n._isMounted=!0,Tn(n,"mounted")),e.data.keepAlive&&(t._isMounted?Wn(n):Pn(n,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?In(t,!0):t.$destroy())}},Kt=Object.keys(Qt);function Xt(e,t,n,a,s){if(!r(e)){var u=n.$options._base;if(c(e)&&(e=u.extend(e)),"function"===typeof e){var f;if(r(e.cid)&&(f=e,e=vn(f,u),void 0===e))return hn(f,t,n,a,s);t=t||{},dr(e),o(t.model)&&tn(e.options,t);var l=yt(t,e,s);if(i(e.options.functional))return Jt(e,l,t,n,a);var p=t.on;if(t.on=t.nativeOn,i(e.options.abstract)){var d=t.slot;t={},d&&(t.slot=d)}Yt(t);var h=e.options.name||s,v=new ve("vue-component-"+e.cid+(h?"-"+h:""),t,void 0,void 0,void 0,n,{Ctor:e,propsData:l,listeners:p,tag:s,children:a},f);return v}}}function Zt(e,t){var n={_isComponent:!0,_parentVnode:e,parent:t},r=e.data.inlineTemplate;return o(r)&&(n.render=r.render,n.staticRenderFns=r.staticRenderFns),new e.componentOptions.Ctor(n)}function Yt(e){for(var t=e.hook||(e.hook={}),n=0;n<Kt.length;n++){var r=Kt[n],o=t[r],i=Qt[r];o===i||o&&o._merged||(t[r]=o?en(i,o):i)}}function en(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}function tn(e,t){var n=e.model&&e.model.prop||"value",r=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[n]=t.model.value;var i=t.on||(t.on={}),a=i[r],s=t.model.callback;o(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(i[r]=[s].concat(a)):i[r]=s}var nn=1,rn=2;function on(e,t,n,r,o,a){return(Array.isArray(n)||s(n))&&(o=r,r=n,n=void 0),i(a)&&(o=rn),an(e,t,n,r,o)}function an(e,t,n,r,i){if(o(n)&&o(n.__ob__))return me();if(o(n)&&o(n.is)&&(t=n.is),!t)return me();var a,s,c;(Array.isArray(r)&&"function"===typeof r[0]&&(n=n||{},n.scopedSlots={default:r[0]},r.length=0),i===rn?r=_t(r):i===nn&&(r=gt(r)),"string"===typeof t)?(s=e.$vnode&&e.$vnode.ns||U.getTagNamespace(t),a=U.isReservedTag(t)?new ve(U.parsePlatformTagName(t),n,r,void 0,void 0,e):n&&n.pre||!o(c=Ge(e.$options,"components",t))?new ve(t,n,r,void 0,void 0,e):Xt(c,n,e,r,t)):a=Xt(t,n,e,r);return Array.isArray(a)?a:o(a)?(o(s)&&sn(a,s),o(n)&&cn(n),a):me()}function sn(e,t,n){if(e.ns=t,"foreignObject"===e.tag&&(t=void 0,n=!0),o(e.children))for(var a=0,s=e.children.length;a<s;a++){var c=e.children[a];o(c.tag)&&(r(c.ns)||i(n)&&"svg"!==c.tag)&&sn(c,t,n)}}function cn(e){c(e.style)&&lt(e.style),c(e.class)&&lt(e.class)}function un(e){e._vnode=null,e._staticTrees=null;var t=e.$options,r=e.$vnode=t._parentVnode,o=r&&r.context;e.$slots=xt(t._renderChildren,o),e.$scopedSlots=n,e._c=function(t,n,r,o){return on(e,t,n,r,o,!1)},e.$createElement=function(t,n,r,o){return on(e,t,n,r,o,!0)};var i=r&&r.data;Pe(e,"$attrs",i&&i.attrs||n,null,!0),Pe(e,"$listeners",t._parentListeners||n,null,!0)}var fn,ln=null;function pn(e){Wt(e.prototype),e.prototype.$nextTick=function(e){return ut(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,o=n._parentVnode;o&&(t.$scopedSlots=kt(o.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=o;try{ln=t,e=r.call(t._renderProxy,t.$createElement)}catch(no){Xe(no,t,"render"),e=t._vnode}finally{ln=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof ve||(e=me()),e.parent=o,e}}function dn(e,t){return(e.__esModule||ce&&"Module"===e[Symbol.toStringTag])&&(e=e.default),c(e)?t.extend(e):e}function hn(e,t,n,r,o){var i=me();return i.asyncFactory=e,i.asyncMeta={data:t,context:n,children:r,tag:o},i}function vn(e,t){if(i(e.error)&&o(e.errorComp))return e.errorComp;if(o(e.resolved))return e.resolved;var n=ln;if(n&&o(e.owners)&&-1===e.owners.indexOf(n)&&e.owners.push(n),i(e.loading)&&o(e.loadingComp))return e.loadingComp;if(n&&!o(e.owners)){var a=e.owners=[n],s=!0,u=null,f=null;n.$on("hook:destroyed",function(){return g(a,n)});var l=function(e){for(var t=0,n=a.length;t<n;t++)a[t].$forceUpdate();e&&(a.length=0,null!==u&&(clearTimeout(u),u=null),null!==f&&(clearTimeout(f),f=null))},p=R(function(n){e.resolved=dn(n,t),s?a.length=0:l(!0)}),h=R(function(t){o(e.errorComp)&&(e.error=!0,l(!0))}),v=e(p,h);return c(v)&&(d(v)?r(e.resolved)&&v.then(p,h):d(v.component)&&(v.component.then(p,h),o(v.error)&&(e.errorComp=dn(v.error,t)),o(v.loading)&&(e.loadingComp=dn(v.loading,t),0===v.delay?e.loading=!0:u=setTimeout(function(){u=null,r(e.resolved)&&r(e.error)&&(e.loading=!0,l(!1))},v.delay||200)),o(v.timeout)&&(f=setTimeout(function(){f=null,r(e.resolved)&&h(null)},v.timeout)))),s=!1,e.loading?e.loadingComp:e.resolved}}function yn(e){return e.isComment&&e.asyncFactory}function mn(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var n=e[t];if(o(n)&&(o(n.componentOptions)||yn(n)))return n}}function gn(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&On(e,t)}function _n(e,t){fn.$on(e,t)}function bn(e,t){fn.$off(e,t)}function wn(e,t){var n=fn;return function r(){var o=t.apply(null,arguments);null!==o&&n.$off(e,r)}}function On(e,t,n){fn=e,vt(t,n||{},_n,bn,wn,e),fn=void 0}function $n(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var o=0,i=e.length;o<i;o++)r.$on(e[o],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,o=e.length;r<o;r++)n.$off(e[r],t);return n}var i,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;var s=a.length;while(s--)if(i=a[s],i===t||i.fn===t){a.splice(s,1);break}return n},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?P(n):n;for(var r=P(arguments,1),o='event handler for "'+e+'"',i=0,a=n.length;i<a;i++)Ze(n[i],t,r,t,o)}return t}}var An=null;function xn(e){var t=An;return An=e,function(){An=t}}function Sn(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){while(n.$options.abstract&&n.$parent)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function kn(e){e.prototype._update=function(e,t){var n=this,r=n.$el,o=n._vnode,i=xn(n);n._vnode=e,n.$el=o?n.__patch__(o,e):n.__patch__(n.$el,e,t,!1),i(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Tn(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||g(t.$children,e),e._watcher&&e._watcher.teardown();var n=e._watchers.length;while(n--)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Tn(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function jn(e,t,r,o,i){var a=o.data.scopedSlots,s=e.$scopedSlots,c=!!(a&&!a.$stable||s!==n&&!s.$stable||a&&e.$scopedSlots.$key!==a.$key),u=!!(i||e.$options._renderChildren||c);if(e.$options._parentVnode=o,e.$vnode=o,e._vnode&&(e._vnode.parent=o),e.$options._renderChildren=i,e.$attrs=o.data.attrs||n,e.$listeners=r||n,t&&e.$options.props){xe(!1);for(var f=e._props,l=e.$options._propKeys||[],p=0;p<l.length;p++){var d=l[p],h=e.$options.props;f[d]=Je(d,h,t,e)}xe(!0),e.$options.propsData=t}r=r||n;var v=e.$options._parentListeners;e.$options._parentListeners=r,On(e,r,v),u&&(e.$slots=xt(i,o.context),e.$forceUpdate())}function En(e){while(e&&(e=e.$parent))if(e._inactive)return!0;return!1}function Pn(e,t){if(t){if(e._directInactive=!1,En(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Pn(e.$children[n]);Tn(e,"activated")}}function In(e,t){if((!t||(e._directInactive=!0,!En(e)))&&!e._inactive){e._inactive=!0;for(var n=0;n<e.$children.length;n++)In(e.$children[n]);Tn(e,"deactivated")}}function Tn(e,t){de();var n=e.$options[t],r=t+" hook";if(n)for(var o=0,i=n.length;o<i;o++)Ze(n[o],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),he()}var Cn=[],Mn=[],Ln={},Dn=!1,Nn=!1,Rn=0;function Vn(){Rn=Cn.length=Mn.length=0,Ln={},Dn=Nn=!1}var Bn=Date.now;if(Q&&!Y){var Un=window.performance;Un&&"function"===typeof Un.now&&Bn()>document.createEvent("Event").timeStamp&&(Bn=function(){return Un.now()})}function Fn(){var e,t;for(Bn(),Nn=!0,Cn.sort(function(e,t){return e.id-t.id}),Rn=0;Rn<Cn.length;Rn++)e=Cn[Rn],e.before&&e.before(),t=e.id,Ln[t]=null,e.run();var n=Mn.slice(),r=Cn.slice();Vn(),Gn(n),Hn(r),ie&&U.devtools&&ie.emit("flush")}function Hn(e){var t=e.length;while(t--){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Tn(r,"updated")}}function Wn(e){e._inactive=!1,Mn.push(e)}function Gn(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Pn(e[t],!0)}function Jn(e){var t=e.id;if(null==Ln[t]){if(Ln[t]=!0,Nn){var n=Cn.length-1;while(n>Rn&&Cn[n].id>e.id)n--;Cn.splice(n+1,0,e)}else Cn.push(e);Dn||(Dn=!0,ut(Fn))}}var qn=0,zn=function(e,t,n,r,o){this.vm=e,o&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++qn,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new se,this.newDepIds=new se,this.expression="","function"===typeof t?this.getter=t:(this.getter=J(t),this.getter||(this.getter=C)),this.value=this.lazy?void 0:this.get()};zn.prototype.get=function(){var e;de(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(no){if(!this.user)throw no;Xe(no,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&lt(e),he(),this.cleanupDeps()}return e},zn.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},zn.prototype.cleanupDeps=function(){var e=this.deps.length;while(e--){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},zn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Jn(this)},zn.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||c(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(no){Xe(no,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},zn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},zn.prototype.depend=function(){var e=this.deps.length;while(e--)this.deps[e].depend()},zn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||g(this.vm._watchers,this);var e=this.deps.length;while(e--)this.deps[e].removeSub(this);this.active=!1}};var Qn={enumerable:!0,configurable:!0,get:C,set:C};function Kn(e,t,n){Qn.get=function(){return this[t][n]},Qn.set=function(e){this[t][n]=e},Object.defineProperty(e,n,Qn)}function Xn(e){e._watchers=[];var t=e.$options;t.props&&Zn(e,t.props),t.methods&&ar(e,t.methods),t.data?Yn(e):Ee(e._data={},!0),t.computed&&nr(e,t.computed),t.watch&&t.watch!==ne&&sr(e,t.watch)}function Zn(e,t){var n=e.$options.propsData||{},r=e._props={},o=e.$options._propKeys=[],i=!e.$parent;i||xe(!1);var a=function(i){o.push(i);var a=Je(i,t,n,e);Pe(r,i,a),i in e||Kn(e,"_props",i)};for(var s in t)a(s);xe(!0)}function Yn(e){var t=e.$options.data;t=e._data="function"===typeof t?er(t,e):t||{},f(t)||(t={});var n=Object.keys(t),r=e.$options.props,o=(e.$options.methods,n.length);while(o--){var i=n[o];0,r&&b(r,i)||H(i)||Kn(e,"_data",i)}Ee(t,!0)}function er(e,t){de();try{return e.call(t,t)}catch(no){return Xe(no,t,"data()"),{}}finally{he()}}var tr={lazy:!0};function nr(e,t){var n=e._computedWatchers=Object.create(null),r=oe();for(var o in t){var i=t[o],a="function"===typeof i?i:i.get;0,r||(n[o]=new zn(e,a||C,C,tr)),o in e||rr(e,o,i)}}function rr(e,t,n){var r=!oe();"function"===typeof n?(Qn.get=r?or(t):ir(n),Qn.set=C):(Qn.get=n.get?r&&!1!==n.cache?or(t):ir(n.get):C,Qn.set=n.set||C),Object.defineProperty(e,t,Qn)}function or(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),le.target&&t.depend(),t.value}}function ir(e){return function(){return e.call(this,this)}}function ar(e,t){e.$options.props;for(var n in t)e[n]="function"!==typeof t[n]?C:E(t[n],e)}function sr(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var o=0;o<r.length;o++)cr(e,n,r[o]);else cr(e,n,r)}}function cr(e,t,n,r){return f(n)&&(r=n,n=n.handler),"string"===typeof n&&(n=e[n]),e.$watch(t,n,r)}function ur(e){var t={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=Ie,e.prototype.$delete=Te,e.prototype.$watch=function(e,t,n){var r=this;if(f(t))return cr(r,e,t,n);n=n||{},n.user=!0;var o=new zn(r,e,t,n);if(n.immediate)try{t.call(r,o.value)}catch(i){Xe(i,r,'callback for immediate watcher "'+o.expression+'"')}return function(){o.teardown()}}}var fr=0;function lr(e){e.prototype._init=function(e){var t=this;t._uid=fr++,t._isVue=!0,e&&e._isComponent?pr(t,e):t.$options=We(dr(t.constructor),e||{},t),t._renderProxy=t,t._self=t,Sn(t),gn(t),un(t),Tn(t,"beforeCreate"),"mp-toutiao"!==t.mpHost&&$t(t),Xn(t),"mp-toutiao"!==t.mpHost&&Ot(t),"mp-toutiao"!==t.mpHost&&Tn(t,"created"),t.$options.el&&t.$mount(t.$options.el)}}function pr(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var o=r.componentOptions;n.propsData=o.propsData,n._parentListeners=o.listeners,n._renderChildren=o.children,n._componentTag=o.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function dr(e){var t=e.options;if(e.super){var n=dr(e.super),r=e.superOptions;if(n!==r){e.superOptions=n;var o=hr(e);o&&I(e.extendOptions,o),t=e.options=We(n,e.extendOptions),t.name&&(t.components[t.name]=e)}}return t}function hr(e){var t,n=e.options,r=e.sealedOptions;for(var o in n)n[o]!==r[o]&&(t||(t={}),t[o]=n[o]);return t}function vr(e){this._init(e)}function yr(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=P(arguments,1);return n.unshift(this),"function"===typeof e.install?e.install.apply(e,n):"function"===typeof e&&e.apply(null,n),t.push(e),this}}function mr(e){e.mixin=function(e){return this.options=We(this.options,e),this}}function gr(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,o=e._Ctor||(e._Ctor={});if(o[r])return o[r];var i=e.name||n.options.name;var a=function(e){this._init(e)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=t++,a.options=We(n.options,e),a["super"]=n,a.options.props&&_r(a),a.options.computed&&br(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,V.forEach(function(e){a[e]=n[e]}),i&&(a.options.components[i]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=I({},a.options),o[r]=a,a}}function _r(e){var t=e.options.props;for(var n in t)Kn(e.prototype,"_props",n)}function br(e){var t=e.options.computed;for(var n in t)rr(e.prototype,n,t[n])}function wr(e){V.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&f(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"===typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function Or(e){return e&&(e.Ctor.options.name||e.tag)}function $r(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"===typeof e?e.split(",").indexOf(t)>-1:!!l(e)&&e.test(t)}function Ar(e,t){var n=e.cache,r=e.keys,o=e._vnode;for(var i in n){var a=n[i];if(a){var s=Or(a.componentOptions);s&&!t(s)&&xr(n,i,r,o)}}}function xr(e,t,n,r){var o=e[t];!o||r&&o.tag===r.tag||o.componentInstance.$destroy(),e[t]=null,g(n,t)}lr(vr),ur(vr),$n(vr),kn(vr),pn(vr);var Sr=[String,RegExp,Array],kr={name:"keep-alive",abstract:!0,props:{include:Sr,exclude:Sr,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)xr(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",function(t){Ar(e,function(e){return $r(t,e)})}),this.$watch("exclude",function(t){Ar(e,function(e){return!$r(t,e)})})},render:function(){var e=this.$slots.default,t=mn(e),n=t&&t.componentOptions;if(n){var r=Or(n),o=this,i=o.include,a=o.exclude;if(i&&(!r||!$r(i,r))||a&&r&&$r(a,r))return t;var s=this,c=s.cache,u=s.keys,f=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;c[f]?(t.componentInstance=c[f].componentInstance,g(u,f),u.push(f)):(c[f]=t,u.push(f),this.max&&u.length>parseInt(this.max)&&xr(c,u[0],u,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}},jr={KeepAlive:kr};function Er(e){var t={get:function(){return U}};Object.defineProperty(e,"config",t),e.util={warn:ue,extend:I,mergeOptions:We,defineReactive:Pe},e.set=Ie,e.delete=Te,e.nextTick=ut,e.observable=function(e){return Ee(e),e},e.options=Object.create(null),V.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,I(e.options.components,jr),yr(e),mr(e),gr(e),wr(e)}Er(vr),Object.defineProperty(vr.prototype,"$isServer",{get:oe}),Object.defineProperty(vr.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(vr,"FunctionalRenderContext",{value:Gt}),vr.version="2.6.10";var Pr="[object Array]",Ir="[object Object]";function Tr(e,t){var n={};return Cr(e,t),Mr(e,t,"",n),n}function Cr(e,t){if(e!==t){var n=Dr(e),r=Dr(t);if(n==Ir&&r==Ir){if(Object.keys(e).length>=Object.keys(t).length)for(var o in t){var i=e[o];void 0===i?e[o]=null:Cr(i,t[o])}}else n==Pr&&r==Pr&&e.length>=t.length&&t.forEach(function(t,n){Cr(e[n],t)})}}function Mr(e,t,n,r){if(e!==t){var o=Dr(e),i=Dr(t);if(o==Ir)if(i!=Ir||Object.keys(e).length<Object.keys(t).length)Lr(r,n,e);else{var a=function(o){var i=e[o],a=t[o],s=Dr(i),c=Dr(a);if(s!=Pr&&s!=Ir)i!=t[o]&&Lr(r,(""==n?"":n+".")+o,i);else if(s==Pr)c!=Pr?Lr(r,(""==n?"":n+".")+o,i):i.length<a.length?Lr(r,(""==n?"":n+".")+o,i):i.forEach(function(e,t){Mr(e,a[t],(""==n?"":n+".")+o+"["+t+"]",r)});else if(s==Ir)if(c!=Ir||Object.keys(i).length<Object.keys(a).length)Lr(r,(""==n?"":n+".")+o,i);else for(var u in i)Mr(i[u],a[u],(""==n?"":n+".")+o+"."+u,r)};for(var s in e)a(s)}else o==Pr?i!=Pr?Lr(r,n,e):e.length<t.length?Lr(r,n,e):e.forEach(function(e,o){Mr(e,t[o],n+"["+o+"]",r)}):Lr(r,n,e)}}function Lr(e,t,n){e[t]=n}function Dr(e){return Object.prototype.toString.call(e)}function Nr(e){if(e.__next_tick_callbacks&&e.__next_tick_callbacks.length){if(Object({NODE_ENV:"production",VUE_APP_PLATFORM:"app-plus",BASE_URL:"/"}).VUE_APP_DEBUG){var t=e.$scope;console.log("["+ +new Date+"]["+(t.is||t.route)+"]["+e._uid+"]:flushCallbacks["+e.__next_tick_callbacks.length+"]")}var n=e.__next_tick_callbacks.slice(0);e.__next_tick_callbacks.length=0;for(var r=0;r<n.length;r++)n[r]()}}function Rr(e){return Cn.find(function(t){return e._watcher===t})}function Vr(e,t){if(!e.__next_tick_pending&&!Rr(e)){if(Object({NODE_ENV:"production",VUE_APP_PLATFORM:"app-plus",BASE_URL:"/"}).VUE_APP_DEBUG){var n=e.$scope;console.log("["+ +new Date+"]["+(n.is||n.route)+"]["+e._uid+"]:nextVueTick")}return ut(t,e)}if(Object({NODE_ENV:"production",VUE_APP_PLATFORM:"app-plus",BASE_URL:"/"}).VUE_APP_DEBUG){var r=e.$scope;console.log("["+ +new Date+"]["+(r.is||r.route)+"]["+e._uid+"]:nextMPTick")}var o;if(e.__next_tick_callbacks||(e.__next_tick_callbacks=[]),e.__next_tick_callbacks.push(function(){if(t)try{t.call(e)}catch(no){Xe(no,e,"nextTick")}else o&&o(e)}),!t&&"undefined"!==typeof Promise)return new Promise(function(e){o=e})}function Br(e){var t=Object.create(null),n=[].concat(Object.keys(e._data||{}),Object.keys(e._computedWatchers||{}));return n.reduce(function(t,n){return t[n]=e[n],t},t),Object.assign(t,e.$mp.data||{}),Array.isArray(e.$options.behaviors)&&-1!==e.$options.behaviors.indexOf("uni://form-field")&&(t["name"]=e.name,t["value"]=e.value),JSON.parse(JSON.stringify(t))}var Ur=function(e,t){var n=this;if(null!==t&&("page"===this.mpType||"component"===this.mpType)){var r=this.$scope,o=Object.create(null);try{o=Br(this)}catch(s){console.error(s)}o.__webviewId__=r.data.__webviewId__;var i=Object.create(null);Object.keys(o).forEach(function(e){i[e]=r.data[e]});var a=Tr(o,i);Object.keys(a).length?(Object({NODE_ENV:"production",VUE_APP_PLATFORM:"app-plus",BASE_URL:"/"}).VUE_APP_DEBUG&&console.log("["+ +new Date+"]["+(r.is||r.route)+"]["+this._uid+"]差量更新",JSON.stringify(a)),this.__next_tick_pending=!0,r.setData(a,function(){n.__next_tick_pending=!1,Nr(n)})):Nr(this)}};function Fr(){}function Hr(e,t,n){if(!e.mpType)return e;"app"===e.mpType&&(e.$options.render=Fr),e.$options.render||(e.$options.render=Fr),"mp-toutiao"!==e.mpHost&&Tn(e,"beforeMount");var r=function(){e._update(e._render(),n)};return new zn(e,r,C,{before:function(){e._isMounted&&!e._isDestroyed&&Tn(e,"beforeUpdate")}},!0),n=!1,e}function Wr(e,t){return o(e)||o(t)?Gr(e,Jr(t)):""}function Gr(e,t){return e?t?e+" "+t:e:t||""}function Jr(e){return Array.isArray(e)?qr(e):c(e)?zr(e):"string"===typeof e?e:""}function qr(e){for(var t,n="",r=0,i=e.length;r<i;r++)o(t=Jr(e[r]))&&""!==t&&(n&&(n+=" "),n+=t);return n}function zr(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}var Qr=w(function(e){var t={},n=/;(?![^(]*\))/g,r=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(r);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t});function Kr(e){return Array.isArray(e)?T(e):"string"===typeof e?Qr(e):e}var Xr=["createSelectorQuery","createIntersectionObserver","selectAllComponents","selectComponent"];function Zr(e,t){var n=t.split("."),r=n[0];return 0===r.indexOf("__$n")&&(r=parseInt(r.replace("__$n",""))),1===n.length?e[r]:Zr(e[r],n.slice(1).join("."))}function Yr(e){e.config.errorHandler=function(e){console.error(e)};var t=e.prototype.$emit;e.prototype.$emit=function(e){return this.$scope&&e&&this.$scope["triggerEvent"](e,{__args__:P(arguments,1)}),t.apply(this,arguments)},e.prototype.$nextTick=function(e){return Vr(this,e)},Xr.forEach(function(t){e.prototype[t]=function(e){if(this.$scope)return this.$scope[t](e)}}),e.prototype.__init_provide=Ot,e.prototype.__init_injections=$t,e.prototype.__call_hook=function(e,t){var n=this;de();var r,o=n.$options[e],i=e+" hook";if(o)for(var a=0,s=o.length;a<s;a++)r=Ze(o[a],n,t?[t]:null,n,i);return n._hasHookEvent&&n.$emit("hook:"+e),he(),r},e.prototype.__set_model=function(e,t,n,r){Array.isArray(r)&&(-1!==r.indexOf("trim")&&(n=n.trim()),-1!==r.indexOf("number")&&(n=this._n(n))),e||(e=this),e[t]=n},e.prototype.__set_sync=function(e,t,n){e||(e=this),e[t]=n},e.prototype.__get_orig=function(e){return f(e)&&e["$orig"]||e},e.prototype.__get_value=function(e,t){return Zr(t||this,e)},e.prototype.__get_class=function(e,t){return Wr(t,e)},e.prototype.__get_style=function(e,t){if(!e&&!t)return"";var n=Kr(e),r=t?I(t,n):n;return Object.keys(r).map(function(e){return S(e)+":"+r[e]}).join(";")},e.prototype.__map=function(e,t){var n,r,o,i,a;if(Array.isArray(e)){for(n=new Array(e.length),r=0,o=e.length;r<o;r++)n[r]=t(e[r],r);return n}if(c(e)){for(i=Object.keys(e),n=Object.create(null),r=0,o=i.length;r<o;r++)a=i[r],n[a]=t(e[a],a,r);return n}return[]}}var eo=["onLaunch","onShow","onHide","onUniNViewMessage","onError","onLoad","onReady","onUnload","onPullDownRefresh","onReachBottom","onTabItemTap","onShareAppMessage","onResize","onPageScroll","onNavigationBarButtonTap","onBackPress","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked","onPageShow","onPageHide","onPageResize"];function to(e){var t=e.extend;e.extend=function(e){e=e||{};var n=e.methods;return n&&Object.keys(n).forEach(function(t){-1!==eo.indexOf(t)&&(e[t]=n[t],delete n[t])}),t.call(this,e)};var n=e.config.optionMergeStrategies,r=n.created;eo.forEach(function(e){n[e]=r}),e.prototype.__lifecycle_hooks__=eo}vr.prototype.__patch__=Ur,vr.prototype.$mount=function(e,t){return Hr(this,e,t)},to(vr),Yr(vr),t["default"]=vr}.call(this,n("c8ba"))},"692b":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.about_us=s,t.getShareData=c,t.BASE_IMAGE_URL=void 0;var r=o(n("9cc8"));function o(e){return e&&e.__esModule?e:{default:e}}var i=n("4328"),a="https://www.gzfgeh.xyz/";function s(e){return r.default.post("Home/Index/about_us",i.stringify(e))}function c(e){return r.default.get("Api/Weixin/getShareData?shareUrl="+e)}t.BASE_IMAGE_URL=a},6932:function(e,t,n){},"6e42":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.createApp=ht,t.createPage=$t,t.createComponent=At,t.default=void 0;var r=o(n("66fd"));function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){return c(e)||s(e,t)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function s(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done);r=!0)if(n.push(a.value),t&&n.length===t)break}catch(c){o=!0,i=c}finally{try{r||null==s["return"]||s["return"]()}finally{if(o)throw i}}return n}function c(e){if(Array.isArray(e))return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){return d(e)||p(e)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function p(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function d(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var h=Object.prototype.toString,v=Object.prototype.hasOwnProperty;function y(e){return"function"===typeof e}function m(e){return"string"===typeof e}function g(e){return"[object Object]"===h.call(e)}function _(e,t){return v.call(e,t)}function b(){}function w(e){var t=Object.create(null);return function(n){var r=t[n];return r||(t[n]=e(n))}}var O=/-(\w)/g,$=w(function(e){return e.replace(O,function(e,t){return t?t.toUpperCase():""})}),A=["invoke","success","fail","complete","returnValue"],x={},S={};function k(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?j(n):n}function j(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}function E(e,t){var n=e.indexOf(t);-1!==n&&e.splice(n,1)}function P(e,t){Object.keys(t).forEach(function(n){-1!==A.indexOf(n)&&y(t[n])&&(e[n]=k(e[n],t[n]))})}function I(e,t){e&&t&&Object.keys(t).forEach(function(n){-1!==A.indexOf(n)&&y(t[n])&&E(e[n],t[n])})}function T(e,t){"string"===typeof e&&g(t)?P(S[e]||(S[e]={}),t):g(e)&&P(x,e)}function C(e,t){"string"===typeof e?g(t)?I(S[e],t):delete S[e]:g(e)&&I(x,e)}function M(e){return function(t){return e(t)||t}}function L(e){return!!e&&("object"===typeof e||"function"===typeof e)&&"function"===typeof e.then}function D(e,t){for(var n=!1,r=0;r<e.length;r++){var o=e[r];if(n)n=Promise.then(M(o));else{var i=o(t);if(L(i)&&(n=Promise.resolve(i)),!1===i)return{then:function(){}}}}return n||{then:function(e){return e(t)}}}function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return["success","fail","complete"].forEach(function(n){if(Array.isArray(e[n])){var r=t[n];t[n]=function(t){D(e[n],t).then(function(e){return y(r)&&r(e)||e})}}}),t}function R(e,t){var n=[];Array.isArray(x.returnValue)&&n.push.apply(n,f(x.returnValue));var r=S[e];return r&&Array.isArray(r.returnValue)&&n.push.apply(n,f(r.returnValue)),n.forEach(function(e){t=e(t)||t}),t}function V(e){var t=Object.create(null);Object.keys(x).forEach(function(e){"returnValue"!==e&&(t[e]=x[e].slice())});var n=S[e];return n&&Object.keys(n).forEach(function(e){"returnValue"!==e&&(t[e]=(t[e]||[]).concat(n[e]))}),t}function B(e,t,n){for(var r=arguments.length,o=new Array(r>3?r-3:0),i=3;i<r;i++)o[i-3]=arguments[i];var a=V(e);if(a&&Object.keys(a).length){if(Array.isArray(a.invoke)){var s=D(a.invoke,n);return s.then(function(e){return t.apply(void 0,[N(a,e)].concat(o))})}return t.apply(void 0,[N(a,n)].concat(o))}return t.apply(void 0,[n].concat(o))}var U={returnValue:function(e){return L(e)?e.then(function(e){return e[1]}).catch(function(e){return e[0]}):e}},F=/^\$|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/,H=/^create|Manager$/,W=/^on/;function G(e){return H.test(e)}function J(e){return F.test(e)}function q(e){return W.test(e)}function z(e){return e.then(function(e){return[null,e]}).catch(function(e){return[e]})}function Q(e){return!(G(e)||J(e)||q(e))}function K(e,t){return Q(e)?function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return y(n.success)||y(n.fail)||y(n.complete)?R(e,B.apply(void 0,[e,t,n].concat(o))):R(e,z(new Promise(function(r,i){B.apply(void 0,[e,t,Object.assign({},n,{success:r,fail:i})].concat(o)),Promise.prototype.finally||(Promise.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})})})))}:t}var X=1e-4,Z=750,Y=!1,ee=0,te=0;function ne(){var e=wx.getSystemInfoSync(),t=e.platform,n=e.pixelRatio,r=e.windowWidth;ee=r,te=n,Y="ios"===t}function re(e,t){if(0===ee&&ne(),e=Number(e),0===e)return 0;var n=e/Z*(t||ee);return n<0&&(n=-n),n=Math.floor(n+X),0===n?1!==te&&Y?.5:1:e<0?-n:n}var oe={promiseInterceptor:U},ie=Object.freeze({upx2px:re,interceptors:oe,addInterceptor:T,removeInterceptor:C}),ae={},se=[],ce=[],ue=["success","fail","cancel","complete"];function fe(e,t,n){return function(r){return t(pe(e,r,n))}}function le(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(g(t)){var i=!0===o?t:{};for(var a in y(n)&&(n=n(t,i)||{}),t)if(_(n,a)){var s=n[a];y(s)&&(s=s(t[a],t,i)),s?m(s)?i[s]=t[a]:g(s)&&(i[s.name?s.name:a]=s.value):console.warn("app-plus ".concat(e,"暂不支持").concat(a))}else-1!==ue.indexOf(a)?i[a]=fe(e,t[a],r):o||(i[a]=t[a]);return i}return y(t)&&(t=fe(e,t,r)),t}function pe(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return y(ae.returnValue)&&(t=ae.returnValue(e,t)),le(e,t,n,{},r)}function de(e,t){if(_(ae,e)){var n=ae[e];return n?function(t,r){var o=n;y(n)&&(o=n(t)),t=le(e,t,o.args,o.returnValue);var i=[t];"undefined"!==typeof r&&i.push(r);var a=wx[o.name||e].apply(wx,i);return J(e)?pe(e,a,o.returnValue,G(e)):a}:function(){console.error("app-plus 暂不支持".concat(e))}}return t}var he=Object.create(null),ve=["subscribePush","unsubscribePush","onPush","offPush","share"];function ye(e){return function(t){var n=t.fail,r=t.complete,o={errMsg:"".concat(e,":fail:暂不支持 ").concat(e," 方法")};y(n)&&n(o),y(r)&&r(o)}}ve.forEach(function(e){he[e]=ye(e)});var me=function(){return"function"===typeof getUniEmitter?getUniEmitter:function(){return e||(e=new r.default),e};var e}();function ge(e,t,n){return e[t].apply(e,n)}function _e(){return ge(me(),"$on",Array.prototype.slice.call(arguments))}function be(){return ge(me(),"$off",Array.prototype.slice.call(arguments))}function we(){return ge(me(),"$once",Array.prototype.slice.call(arguments))}function Oe(){return ge(me(),"$emit",Array.prototype.slice.call(arguments))}var $e=Object.freeze({$on:_e,$off:be,$once:we,$emit:Oe});function Ae(e){e.$processed=!0,e.postMessage=function(t){plus.webview.postMessageToUniNView({type:"UniAppSubNVue",data:t},e.id)};var t=[];if(e.onMessage=function(e){t.push(e)},e.$consumeMessage=function(e){t.forEach(function(t){return t(e)})},e.__uniapp_mask_id){var n=e.__uniapp_mask,r=plus.webview.getWebviewById(e.__uniapp_mask_id);r=r.parent()||r;var o=e.show,i=e.hide,a=e.close,s=function(){r.setStyle({mask:n})},c=function(){r.setStyle({mask:"none"})};e.show=function(){s();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return o.apply(e,n)},e.hide=function(){c();for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return i.apply(e,n)},e.close=function(){c(),t=[];for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a.apply(e,r)}}}function xe(e){var t=plus.webview.getWebviewById(e);return t&&!t.$processed&&Ae(t),t}function Se(e){return"undefined"!==typeof weex?weex.requireModule(e):__requireNativePlugin__(e)}var ke=Object.freeze({requireNativePlugin:Se,getSubNVueById:xe}),je=Page,Ee=Component,Pe=/:/g,Ie=w(function(e){return $(e.replace(Pe,"-"))});function Te(e){if(wx.canIUse("nextTick")){var t=e.triggerEvent;e.triggerEvent=function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return t.apply(e,[Ie(n)].concat(o))}}}function Ce(e,t){var n=t[e];t[e]=n?function(){Te(this);for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.apply(this,t)}:function(){Te(this)}}Page=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Ce("onLoad",e),je(e)},Component=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Ce("created",e),Ee(e)};var Me=["onPullDownRefresh","onReachBottom","onShareAppMessage","onPageScroll","onResize","onTabItemTap"];function Le(e,t){var n=e.$mp[e.mpType];t.forEach(function(t){_(n,t)&&(e[t]=n[t])})}function De(e,t){if(!t)return!0;if(r.default.options&&Array.isArray(r.default.options[e]))return!0;if(t=t.default||t,y(t))return!!y(t.extendOptions[e])||!!(t.super&&t.super.options&&Array.isArray(t.super.options[e]));if(y(t[e]))return!0;var n=t.mixins;return Array.isArray(n)?!!n.find(function(t){return De(e,t)}):void 0}function Ne(e,t,n){t.forEach(function(t){De(t,n)&&(e[t]=function(e){return this.$vm&&this.$vm.__call_hook(t,e)})})}function Re(e,t){var n;return t=t.default||t,y(t)?(n=t,t=n.extendOptions):n=e.extend(t),[n,t]}function Ve(e,t){if(Array.isArray(t)&&t.length){var n=Object.create(null);t.forEach(function(e){n[e]=!0}),e.$scopedSlots=e.$slots=n}}function Be(e,t){e=(e||"").split(",");var n=e.length;1===n?t._$vueId=e[0]:2===n&&(t._$vueId=e[0],t._$vuePid=e[1])}function Ue(e,t){var n=e.data||{},r=e.methods||{};if("function"===typeof n)try{n=n.call(t)}catch(o){Object({NODE_ENV:"production",VUE_APP_PLATFORM:"app-plus",BASE_URL:"/"}).VUE_APP_DEBUG&&console.warn("根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。",n)}else try{n=JSON.parse(JSON.stringify(n))}catch(o){}return g(n)||(n={}),Object.keys(r).forEach(function(e){-1!==t.__lifecycle_hooks__.indexOf(e)||_(n,e)||(n[e]=r[e])}),n}var Fe=[String,Number,Boolean,Object,Array,null];function He(e){return function(t,n){this.$vm&&(this.$vm[e]=t)}}function We(e,t){var n=e["behaviors"],r=e["extends"],o=e["mixins"],i=e["props"];i||(e["props"]=i=[]);var a=[];return Array.isArray(n)&&n.forEach(function(e){a.push(e.replace("uni://","wx".concat("://"))),"uni://form-field"===e&&(Array.isArray(i)?(i.push("name"),i.push("value")):(i["name"]={type:String,default:""},i["value"]={type:[String,Number,Boolean,Array,Object,Date],default:""}))}),g(r)&&r.props&&a.push(t({properties:Je(r.props,!0)})),Array.isArray(o)&&o.forEach(function(e){g(e)&&e.props&&a.push(t({properties:Je(e.props,!0)}))}),a}function Ge(e,t,n,r){return Array.isArray(t)&&1===t.length?t[0]:t}function Je(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r={};return t||(r.vueId={type:String,value:""},r.vueSlots={type:null,value:[],observer:function(e,t){var n=Object.create(null);e.forEach(function(e){n[e]=!0}),this.setData({$slots:n})}}),Array.isArray(e)?e.forEach(function(e){r[e]={type:null,observer:He(e)}}):g(e)&&Object.keys(e).forEach(function(t){var o=e[t];if(g(o)){var i=o["default"];y(i)&&(i=i()),o.type=Ge(t,o.type,i,n),r[t]={type:-1!==Fe.indexOf(o.type)?o.type:null,value:i,observer:He(t)}}else{var a=Ge(t,o,null,n);r[t]={type:-1!==Fe.indexOf(a)?a:null,observer:He(t)}}}),r}function qe(e){try{e.mp=JSON.parse(JSON.stringify(e))}catch(t){}return e.stopPropagation=b,e.preventDefault=b,e.target=e.target||{},_(e,"detail")||(e.detail={}),g(e.detail)&&(e.target=Object.assign({},e.target,e.detail)),e}function ze(e,t){var n=e;return t.forEach(function(t){var r=t[0],o=t[2];if(r||"undefined"!==typeof o){var i=t[1],a=t[3],s=r?e.__get_value(r,n):n;Number.isInteger(s)?n=o:i?Array.isArray(s)?n=s.find(function(t){return e.__get_value(i,t)===o}):g(s)?n=Object.keys(s).find(function(t){return e.__get_value(i,s[t])===o}):console.error("v-for 暂不支持循环数据：",s):n=s[o],a&&(n=e.__get_value(a,n))}}),n}function Qe(e,t,n){var r={};return Array.isArray(t)&&t.length&&t.forEach(function(t,o){"string"===typeof t?t?"$event"===t?r["$"+o]=n:0===t.indexOf("$event.")?r["$"+o]=e.__get_value(t.replace("$event.",""),n):r["$"+o]=e.__get_value(t):r["$"+o]=e:r["$"+o]=ze(e,t)}),r}function Ke(e){for(var t={},n=1;n<e.length;n++){var r=e[n];t[r[0]]=r[1]}return t}function Xe(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,a=!1;if(o&&(a=t.currentTarget&&t.currentTarget.dataset&&"wx"===t.currentTarget.dataset.comType,!n.length))return a?[t]:t.detail.__args__||t.detail;var s=Qe(e,r,t),c=[];return n.forEach(function(e){"$event"===e?"__set_model"!==i||o?o&&!a?c.push(t.detail.__args__[0]):c.push(t):c.push(t.target.value):Array.isArray(e)&&"o"===e[0]?c.push(Ke(e)):"string"===typeof e&&_(s,e)?c.push(s[e]):c.push(e)}),c}var Ze="~",Ye="^";function et(e,t){return e===t||"regionchange"===t&&("begin"===e||"end"===e)}function tt(e){var t=this;e=qe(e);var n=(e.currentTarget||e.target).dataset;if(!n)return console.warn("事件信息不存在");var r=n.eventOpts||n["event-opts"];if(!r)return console.warn("事件信息不存在");var o=e.type;r.forEach(function(n){var r=n[0],i=n[1],a=r.charAt(0)===Ye;r=a?r.slice(1):r;var s=r.charAt(0)===Ze;r=s?r.slice(1):r,i&&et(o,r)&&i.forEach(function(n){var r=n[0];if(r){var o=t.$vm;o.$options.generic&&o.$parent&&o.$parent.$parent&&(o=o.$parent.$parent);var i=o[r];if(!y(i))throw new Error(" _vm.".concat(r," is not a function"));if(s){if(i.once)return;i.once=!0}i.apply(o,Xe(t.$vm,e,n[1],n[2],a,r))}})})}var nt=["onShow","onHide","onError","onPageNotFound"];function rt(e,t){var n=t.mocks,o=t.initRefs;r.default.prototype.mpHost="app-plus",r.default.mixin({beforeCreate:function(){this.$options.mpType&&(this.mpType=this.$options.mpType,this.$mp=u({data:{}},this.mpType,this.$options.mpInstance),this.$scope=this.$options.mpInstance,delete this.$options.mpType,delete this.$options.mpInstance,"app"!==this.mpType&&(o(this),Le(this,n)))}});var i={onLaunch:function(t){this.$vm||(this.$vm=e,this.$vm.$mp={app:this},this.$vm.$scope=this,this.$vm._isMounted=!0,this.$vm.__call_hook("mounted",t),this.$vm.__call_hook("onLaunch",t))}};return i.globalData=e.$options.globalData||{},Ne(i,nt),i}var ot=["__route__","__wxExparserNodeId__","__wxWebviewId__"];function it(e,t){var n=e.$children,r=n.find(function(e){return e.$scope._$vueId===t});if(r)return r;for(var o=n.length-1;o>=0;o--)if(r=it(n[o],t),r)return r}function at(e){return Behavior(e)}function st(){return!!this.route}function ct(e){this.triggerEvent("__l",e)}function ut(e){var t=e.$scope;Object.defineProperty(e,"$refs",{get:function(){var e={},n=t.selectAllComponents(".vue-ref");n.forEach(function(t){var n=t.dataset.ref;e[n]=t.$vm||t});var r=t.selectAllComponents(".vue-ref-in-for");return r.forEach(function(t){var n=t.dataset.ref;e[n]||(e[n]=[]),e[n].push(t.$vm||t)}),e}})}function ft(e){var t,n=e.detail||e.value,r=n.vuePid,o=n.vueOptions;r&&(t=it(this.$vm,r)),t||(t=this.$vm),o.parent=t}function lt(e){return rt(e,{mocks:ot,initRefs:ut})}var pt=["onUniNViewMessage"];function dt(e){var t=lt(e);return Ne(t,pt),t}function ht(e){return App(dt(e)),e}function vt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.isPage,o=t.initRelation,a=Re(r.default,e),s=i(a,2),c=s[0],u=s[1],f={options:{multipleSlots:!0,addGlobalClass:!0},data:Ue(u,r.default.prototype),behaviors:We(u,at),properties:Je(u.props,!1,u.__file),lifetimes:{attached:function(){var e=this.properties,t={mpType:n.call(this)?"page":"component",mpInstance:this,propsData:e};Be(e.vueId,this),o.call(this,{vuePid:this._$vuePid,vueOptions:t}),this.$vm=new c(t),Ve(this.$vm,e.vueSlots),this.$vm.$mount()},ready:function(){this.$vm&&(this.$vm._isMounted=!0,this.$vm.__call_hook("mounted"),this.$vm.__call_hook("onReady"))},detached:function(){this.$vm.$destroy()}},pageLifetimes:{show:function(e){this.$vm&&this.$vm.__call_hook("onPageShow",e)},hide:function(){this.$vm&&this.$vm.__call_hook("onPageHide")},resize:function(e){this.$vm&&this.$vm.__call_hook("onPageResize",e)}},methods:{__l:ft,__e:tt}};return n?f:[f,c]}function yt(e){return vt(e,{isPage:st,initRelation:ct})}function mt(e){var t=yt(e);return t.methods.$getAppWebview=function(){return plus.webview.getWebviewById("".concat(this.__wxWebviewId__))},t}var gt=["onShow","onHide","onUnload"];function _t(e,t){var n=t.isPage,r=t.initRelation,o=mt(e,{isPage:n,initRelation:r});return Ne(o.methods,gt,e),o.methods.onLoad=function(e){this.$vm.$mp.query=e,this.$vm.__call_hook("onLoad",e)},o}function bt(e){return _t(e,{isPage:st,initRelation:ct})}gt.push.apply(gt,Me);var wt=["onBackPress","onNavigationBarButtonTap","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked"];function Ot(e){var t=bt(e);return Ne(t.methods,wt),t}function $t(e){return Component(Ot(e))}function At(e){return Component(mt(e))}se.forEach(function(e){ae[e]=!1}),ce.forEach(function(e){var t=ae[e]&&ae[e].name?ae[e].name:e;wx.canIUse(t)||(ae[e]=!1)});var xt={};Object.keys(ie).forEach(function(e){xt[e]=ie[e]}),Object.keys($e).forEach(function(e){xt[e]=$e[e]}),Object.keys(ke).forEach(function(e){xt[e]=K(e,ke[e])}),Object.keys(wx).forEach(function(e){(_(wx,e)||_(ae,e))&&(xt[e]=K(e,de(e,wx[e])))}),"undefined"!==typeof e&&(e.uni=xt,e.UniEmitter=$e),wx.createApp=ht,wx.createPage=$t,wx.createComponent=At;var St=xt,kt=St;t.default=kt}).call(this,n("c8ba"))},"96cf":function(e,t){!function(t){"use strict";var n,r=Object.prototype,o=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag",u="object"===typeof e,f=t.regeneratorRuntime;if(f)u&&(e.exports=f);else{f=t.regeneratorRuntime=u?e.exports:{},f.wrap=b;var l="suspendedStart",p="suspendedYield",d="executing",h="completed",v={},y={};y[a]=function(){return this};var m=Object.getPrototypeOf,g=m&&m(m(T([])));g&&g!==r&&o.call(g,a)&&(y=g);var _=A.prototype=O.prototype=Object.create(y);$.prototype=_.constructor=A,A.constructor=$,A[c]=$.displayName="GeneratorFunction",f.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===$||"GeneratorFunction"===(t.displayName||t.name))},f.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,A):(e.__proto__=A,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(_),e},f.awrap=function(e){return{__await:e}},x(S.prototype),S.prototype[s]=function(){return this},f.AsyncIterator=S,f.async=function(e,t,n,r){var o=new S(b(e,t,n,r));return f.isGeneratorFunction(t)?o:o.next().then(function(e){return e.done?e.value:o.next()})},x(_),_[c]="Generator",_[a]=function(){return this},_.toString=function(){return"[object Generator]"},f.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){while(t.length){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},f.values=T,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(P),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=n)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,o){return s.type="throw",s.arg=e,t.next=r,o&&(t.method="next",t.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),P(n),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;P(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:T(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=n),v}}}function b(e,t,n,r){var o=t&&t.prototype instanceof O?t:O,i=Object.create(o.prototype),a=new I(r||[]);return i._invoke=k(e,n,a),i}function w(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(r){return{type:"throw",arg:r}}}function O(){}function $(){}function A(){}function x(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function S(e){function t(n,r,i,a){var s=w(e[n],e,r);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"===typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,i,a)},function(e){t("throw",e,i,a)}):Promise.resolve(u).then(function(e){c.value=e,i(c)},function(e){return t("throw",e,i,a)})}a(s.arg)}var n;function r(e,r){function o(){return new Promise(function(n,o){t(e,r,n,o)})}return n=n?n.then(o,o):o()}this._invoke=r}function k(e,t,n){var r=l;return function(o,i){if(r===d)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw i;return C()}n.method=o,n.arg=i;while(1){var a=n.delegate;if(a){var s=j(a,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var c=w(e,t,n);if("normal"===c.type){if(r=n.done?h:p,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=h,n.method="throw",n.arg=c.arg)}}}function j(e,t){var r=e.iterator[t.method];if(r===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=n,j(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=w(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,v;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=n),t.delegate=null,v):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function I(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function T(e){if(e){var t=e[a];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){while(++r<e.length)if(o.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=n,t.done=!0,t};return i.next=i}}return{next:C}}function C(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},9987:function(e,t,n){"use strict";(function(e){n("6932");r(n("66fd"));var t=r(n("058b"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"9cc8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(n("66fd"));function r(e){return e&&e.__esModule?e:{default:e}}var o=n("3bf3");console.log(o," at utils/request.js:3");var i=new o,a=new o;i.config.timeout=1e4,i.config.baseURL="https://www.gzfgeh.xyz/",a.config=i.config,i.interceptors.request.use(function(t){e.getStorageSync("isShow")&&e.showLoading({title:"加载中..."}),t.headers["Content-Type"]="application/x-www-form-urlencoded";var n=e.getStorageSync("userInfo").token;return console.log(n," at utils/request.js:22"),n&&(t.headers["userToken"]=n),t}),i.interceptors.response.use(function(t,n){return e.hideLoading(),e.setStorageSync("isShow",!0),999==t.data.status?(console.log(t.data.status," at utils/request.js:37"),void e.navigateTo({url:"/pages/login/login"})):n.resolve(t.data)},function(t,n){console.log("error-interceptor"," at utils/request.js:46"),e.setStorageSync("isShow",!0),e.stopPullDownRefresh(),e.hideLoading();var r="";return r&&e.showToast({title:r,icon:"none",duration:2e3}),n.reject()});var s=i;t.default=s}).call(this,n("6e42")["default"])},"9e6a":function(e,t,n){"use strict";var r=n("d233"),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:r.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},a=function(e,t){for(var n={},r=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,s=r.split(t.delimiter,a),c=0;c<s.length;++c){var u,f,l=s[c],p=l.indexOf("]="),d=-1===p?l.indexOf("="):p+1;-1===d?(u=t.decoder(l,i.decoder),f=t.strictNullHandling?null:""):(u=t.decoder(l.slice(0,d),i.decoder),f=t.decoder(l.slice(d+1),i.decoder)),o.call(n,u)?n[u]=[].concat(n[u]).concat(f):n[u]=f}return n},s=function(e,t,n){for(var r=t,o=e.length-1;o>=0;--o){var i,a=e[o];if("[]"===a)i=[],i=i.concat(r);else{i=n.plainObjects?Object.create(null):{};var s="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,c=parseInt(s,10);!isNaN(c)&&a!==s&&String(c)===s&&c>=0&&n.parseArrays&&c<=n.arrayLimit?(i=[],i[c]=r):i[s]=r}r=i}return r},c=function(e,t,n){if(e){var r=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,a=/(\[[^[\]]*])/g,c=i.exec(r),u=c?r.slice(0,c.index):r,f=[];if(u){if(!n.plainObjects&&o.call(Object.prototype,u)&&!n.allowPrototypes)return;f.push(u)}var l=0;while(null!==(c=a.exec(r))&&l<n.depth){if(l+=1,!n.plainObjects&&o.call(Object.prototype,c[1].slice(1,-1))&&!n.allowPrototypes)return;f.push(c[1])}return c&&f.push("["+r.slice(c.index)+"]"),s(f,t,n)}};e.exports=function(e,t){var n=t?r.assign({},t):{};if(null!==n.decoder&&void 0!==n.decoder&&"function"!==typeof n.decoder)throw new TypeError("Decoder has to be a function.");if(n.ignoreQueryPrefix=!0===n.ignoreQueryPrefix,n.delimiter="string"===typeof n.delimiter||r.isRegExp(n.delimiter)?n.delimiter:i.delimiter,n.depth="number"===typeof n.depth?n.depth:i.depth,n.arrayLimit="number"===typeof n.arrayLimit?n.arrayLimit:i.arrayLimit,n.parseArrays=!1!==n.parseArrays,n.decoder="function"===typeof n.decoder?n.decoder:i.decoder,n.allowDots="boolean"===typeof n.allowDots?n.allowDots:i.allowDots,n.plainObjects="boolean"===typeof n.plainObjects?n.plainObjects:i.plainObjects,n.allowPrototypes="boolean"===typeof n.allowPrototypes?n.allowPrototypes:i.allowPrototypes,n.parameterLimit="number"===typeof n.parameterLimit?n.parameterLimit:i.parameterLimit,n.strictNullHandling="boolean"===typeof n.strictNullHandling?n.strictNullHandling:i.strictNullHandling,""===e||null===e||"undefined"===typeof e)return n.plainObjects?Object.create(null):{};for(var o="string"===typeof e?a(e,n):e,s=n.plainObjects?Object.create(null):{},u=Object.keys(o),f=0;f<u.length;++f){var l=u[f],p=c(l,o[l],n);s=r.merge(s,p,n)}return r.compact(s)}},a34a:function(e,t,n){e.exports=n("bbdd")},b313:function(e,t,n){"use strict";var r=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return r.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},bbdd:function(e,t,n){var r=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,e.exports=n("96cf"),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(a){r.regeneratorRuntime=void 0}},c69b:function(e,t,n){"use strict";(function(e){n("6932");r(n("66fd"));var t=r(n("6aca"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},c8ba:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}e.exports=n},d233:function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),i=function(e){var t;while(e.length){var n=e.pop();if(t=n.obj[n.prop],Array.isArray(t)){for(var r=[],o=0;o<t.length;++o)"undefined"!==typeof t[o]&&r.push(t[o]);n.obj[n.prop]=r}}return t},a=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)"undefined"!==typeof e[r]&&(n[r]=e[r]);return n},s=function e(t,n,o){if(!n)return t;if("object"!==typeof n){if(Array.isArray(t))t.push(n);else{if("object"!==typeof t)return[t,n];(o.plainObjects||o.allowPrototypes||!r.call(Object.prototype,n))&&(t[n]=!0)}return t}if("object"!==typeof t)return[t].concat(n);var i=t;return Array.isArray(t)&&!Array.isArray(n)&&(i=a(t,o)),Array.isArray(t)&&Array.isArray(n)?(n.forEach(function(n,i){r.call(t,i)?t[i]&&"object"===typeof t[i]?t[i]=e(t[i],n,o):t.push(n):t[i]=n}),t):Object.keys(n).reduce(function(t,i){var a=n[i];return r.call(t,i)?t[i]=e(t[i],a,o):t[i]=a,t},i)},c=function(e,t){return Object.keys(t).reduce(function(e,n){return e[n]=t[n],e},e)},u=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},f=function(e){if(0===e.length)return e;for(var t="string"===typeof e?e:String(e),n="",r=0;r<t.length;++r){var i=t.charCodeAt(r);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?n+=t.charAt(r):i<128?n+=o[i]:i<2048?n+=o[192|i>>6]+o[128|63&i]:i<55296||i>=57344?n+=o[224|i>>12]+o[128|i>>6&63]+o[128|63&i]:(r+=1,i=65536+((1023&i)<<10|1023&t.charCodeAt(r)),n+=o[240|i>>18]+o[128|i>>12&63]+o[128|i>>6&63]+o[128|63&i])}return n},l=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var o=t[r],a=o.obj[o.prop],s=Object.keys(a),c=0;c<s.length;++c){var u=s[c],f=a[u];"object"===typeof f&&null!==f&&-1===n.indexOf(f)&&(t.push({obj:a,prop:u}),n.push(f))}return i(t)},p=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},d=function(e){return null!==e&&"undefined"!==typeof e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))};e.exports={arrayToObject:a,assign:c,compact:l,decode:u,encode:f,isBuffer:d,isRegExp:p,merge:s}},e1fc:function(e,t,n){"use strict";(function(e){n("6932");r(n("66fd"));var t=r(n("52b6"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},f414:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(t,n){e.exports=n(t)}(window,function(e,t){function n(t,n,r){e.WeixinJSBridge?WeixinJSBridge.invoke(t,i(n),function(e){s(t,e,r)}):u(t,r)}function o(t,n,r){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){r&&r.trigger&&r.trigger(e),s(t,e,n)}):u(t,r||n)}function i(e){return(e=e||{}).appId=k.appId,e.verifyAppId=k.appId,e.verifySignType="sha1",e.verifyTimestamp=k.timestamp+"",e.verifyNonceStr=k.nonceStr,e.verifySignature=k.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e,t,n){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var r=t.errMsg;r||(r=t.err_msg,delete t.err_msg,r=function(e,t){var n=e,r=h[n];r&&(n=r);var o="ok";if(t){var i=t.indexOf(":");"confirm"==(o=t.substring(i+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==n&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n+":"+o}(e,r),t.errMsg=r),(n=n||{})._complete&&(n._complete(t),delete n._complete),r=t.errMsg||"",k.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var o=r.indexOf(":");switch(r.substring(o+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function c(e){if(e){for(var t=0,n=e.length;t<n;++t){var r=e[t],o=d[r];o&&(e[t]=o)}return e}}function u(e,t){if(!(!k.debug||t&&t.isInnerInvoke)){var n=h[e];n&&(e=n),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||""," at utils/weixin-jsapi.js:1")}}function f(){return(new Date).getTime()}function l(t){w&&(e.WeixinJSBridge?t():v.addEventListener&&v.addEventListener("WeixinJSBridgeReady",t,!1))}if(!e.jWeixin){var p,d={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},h=function(){var e={};for(var t in d)e[d[t]]=t;return e}(),v=e.document,y=v.title,m=navigator.userAgent.toLowerCase(),g=navigator.platform.toLowerCase(),_=!(!g.match("mac")&&!g.match("win")),b=-1!=m.indexOf("wxdebugger"),w=-1!=m.indexOf("micromessenger"),O=-1!=m.indexOf("android"),$=-1!=m.indexOf("iphone")||-1!=m.indexOf("ipad"),A=(L=m.match(/micromessenger\/(\d+\.\d+\.\d+)/)||m.match(/micromessenger\/(\d+\.\d+)/))?L[1]:"",x={initStartTime:f(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},S={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:$?1:O?2:-1,clientVersion:A,url:encodeURIComponent(location.href)},k={},j={_completes:[]},E={state:0,data:{}};l(function(){x.initEndTime=f()});var P=!1,I=[],T=(p={config:function(t){u("config",k=t);var r=!1!==k.check;l(function(){if(r)n(d.config,{verifyJsApiList:c(k.jsApiList)},function(){j._complete=function(e){x.preVerifyEndTime=f(),E.state=1,E.data=e},j.success=function(e){S.isPreVerifyOk=0},j.fail=function(e){j._fail?j._fail(e):E.state=-1};var e=j._completes;return e.push(function(){!function(e){if(!(_||b||k.debug||A<"6.0.2"||S.systemType<0)){var t=new Image;S.appId=k.appId,S.initTime=x.initEndTime-x.initStartTime,S.preVerifyTime=x.preVerifyEndTime-x.preVerifyStartTime,T.getNetworkType({isInnerInvoke:!0,success:function(e){S.networkType=e.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+S.version+"&o="+S.isPreVerifyOk+"&s="+S.systemType+"&c="+S.clientVersion+"&a="+S.appId+"&n="+S.networkType+"&i="+S.initTime+"&p="+S.preVerifyTime+"&u="+S.url;t.src=n}})}}()}),j.complete=function(t){for(var n=0,r=e.length;n<r;++n)e[n]();j._completes=[]},j}()),x.preVerifyStartTime=f();else{E.state=1;for(var e=j._completes,t=0,o=e.length;t<o;++t)e[t]();j._completes=[]}}),T.invoke||(T.invoke=function(t,n,r){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,i(n),r)},T.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})},ready:function(e){0!=E.state?e():(j._completes.push(e),!w&&k.debug&&e())},error:function(e){A<"6.0.2"||(-1==E.state?e(E.data):j._fail=e)},checkJsApi:function(e){n("checkJsApi",{jsApiList:c(e.jsApiList)},(e._complete=function(e){if(O){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var n in t){var r=h[n];r&&(t[r]=t[n],delete t[n])}return e}(e)},e))},onMenuShareTimeline:function(e){o(d.onMenuShareTimeline,{complete:function(){n("shareTimeline",{title:e.title||y,desc:e.title||y,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){o(d.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?n("sendAppMessage",{title:e.title||y,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):n("sendAppMessage",{title:e.title||y,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(d.onMenuShareQQ,{complete:function(){n("shareQQ",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(d.onMenuShareWeibo,{complete:function(){n("shareWeiboApp",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(d.onMenuShareQZone,{complete:function(){n("shareQZone",{title:e.title||y,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){n("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){n("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){n("startRecord",{},e)},stopRecord:function(e){n("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){n("playVoice",{localId:e.localId},e)},pauseVoice:function(e){n("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){n("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){n("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){n("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){n("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){n("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(O){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){n(d.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){n("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){n("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===P?(P=!0,n("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(P=!1,0<I.length){var t=I.shift();wx.getLocalImgData(t)}},e))):I.push(e)},getNetworkType:function(e){n("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var r=t.indexOf(":"),o=t.substring(r+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){n("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},r(p,"getLocation",function(e){n(d.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))}),r(p,"hideOptionMenu",function(e){n("hideOptionMenu",{},e)}),r(p,"showOptionMenu",function(e){n("showOptionMenu",{},e)}),r(p,"closeWindow",function(e){n("closeWindow",{},e=e||{})}),r(p,"hideMenuItems",function(e){n("hideMenuItems",{menuList:e.menuList},e)}),r(p,"showMenuItems",function(e){n("showMenuItems",{menuList:e.menuList},e)}),r(p,"hideAllNonBaseMenuItem",function(e){n("hideAllNonBaseMenuItem",{},e)}),r(p,"showAllNonBaseMenuItem",function(e){n("showAllNonBaseMenuItem",{},e)}),r(p,"scanQRCode",function(e){n("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if($){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e))}),r(p,"openAddress",function(e){n(d.openAddress,{},(e._complete=function(e){var t;(t=e).postalCode=t.addressPostalCode,delete t.addressPostalCode,t.provinceName=t.proviceFirstStageName,delete t.proviceFirstStageName,t.cityName=t.addressCitySecondStageName,delete t.addressCitySecondStageName,t.countryName=t.addressCountiesThirdStageName,delete t.addressCountiesThirdStageName,t.detailInfo=t.addressDetailInfo,delete t.addressDetailInfo,e=t},e))}),r(p,"openProductSpecificView",function(e){n(d.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),r(p,"addCard",function(e){for(var t=e.cardList,r=[],o=0,i=t.length;o<i;++o){var a=t[o],s={card_id:a.cardId,card_ext:a.cardExt};r.push(s)}n(d.addCard,{card_list:r},(e._complete=function(e){var t=e.card_list;if(t){for(var n=0,r=(t=JSON.parse(t)).length;n<r;++n){var o=t[n];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=t,delete e.card_list}},e))}),r(p,"chooseCard",function(e){n("chooseCard",{app_id:k.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))}),r(p,"openCard",function(e){for(var t=e.cardList,r=[],o=0,i=t.length;o<i;++o){var a=t[o],s={card_id:a.cardId,code:a.code};r.push(s)}n(d.openCard,{card_list:r},e)}),r(p,"consumeAndShareCard",function(e){n(d.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),r(p,"chooseWXPay",function(e){n(d.chooseWXPay,a(e),e)}),r(p,"openEnterpriseRedPacket",function(e){n(d.openEnterpriseRedPacket,a(e),e)}),r(p,"startSearchBeacons",function(e){n(d.startSearchBeacons,{ticket:e.ticket},e)}),r(p,"stopSearchBeacons",function(e){n(d.stopSearchBeacons,{},e)}),r(p,"onSearchBeacons",function(e){o(d.onSearchBeacons,e)}),r(p,"openEnterpriseChat",function(e){n("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),r(p,"launchMiniProgram",function(e){n("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],n=e.split("?")[1];return t+=".html",void 0!==n?t+"?"+n:t}}(e.path),envVersion:e.envVersion},e)}),r(p,"miniProgram",{navigateBack:function(e){e=e||{},l(function(){n("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){l(function(){n("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){l(function(){n("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){l(function(){n("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){l(function(){n("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){l(function(){n("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(t){l(function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})})}}),p),C=1,M={};return v.addEventListener("error",function(e){if(!O){var t=e.target,n=t.tagName,r=t.src;if(("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n)&&-1!=r.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=t["wx-id"];if(o||(o=C++,t["wx-id"]=o),M[o])return;M[o]=!0,wx.ready(function(){wx.getLocalImgData({localId:r,success:function(e){t.src=e.localData}})})}}},!0),v.addEventListener("load",function(e){if(!O){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var r=t["wx-id"];r&&(M[r]=!1)}}},!0),t&&(e.wx=e.jWeixin=T),T}var L})}}]);
});

define('app.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){

require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')
});
require('app.js');


__wxRoute = 'pages/tabbar/home/home';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tabbar/home/home.js';

define('pages/tabbar/home/home.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/home/home"],{"43b4":function(n,t,e){"use strict";e.r(t);var o=e("fbf9"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a},6872:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},"6aca":function(n,t,e){"use strict";e.r(t);var o=e("6872"),i=e("43b4");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);var a=e("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},fbf9:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=n.requireNativePlugin("GZF-YunPay"),o={data:function(){return{}},onLoad:function(){},methods:{callAndroid:function(){e.show({title:"456"},function(t){var e=JSON.stringify(t),o=e.type;n.showToast({icon:"none",title:o,duration:1e3})})},callLogin:function(){e.eLogin({title:"123"},function(t){var e=JSON.stringify(t),o=e.type;n.showToast({icon:"none",title:o,duration:1e3})})}}};t.default=o}).call(this,e("6e42")["default"])}},[["c69b","common/runtime","common/vendor"]]]);
});
require('pages/tabbar/home/home.js');
__wxRoute = 'pages/tabbar/my/my';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tabbar/my/my.js';

define('pages/tabbar/my/my.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/my/my"],{"058b":function(n,t,e){"use strict";e.r(t);var i=e("660d"),o=e("c39b");for(var a in o)"default"!==a&&function(n){e.d(t,n,function(){return o[n]})}(a);e("971b");var u=e("2877"),r=Object(u["a"])(o["default"],i["a"],i["b"],!1,null,null,null);t["default"]=r.exports},"660d":function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return o})},"78a1":function(n,t,e){},"971b":function(n,t,e){"use strict";var i=e("78a1"),o=e.n(i);o.a},c39b:function(n,t,e){"use strict";e.r(t);var i=e("dbe2"),o=e.n(i);for(var a in i)"default"!==a&&function(n){e.d(t,n,function(){return i[n]})}(a);t["default"]=o.a},dbe2:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(e("a34a")),o=e("692b"),a=u(e("f414"));function u(n){return n&&n.__esModule?n:{default:n}}function r(n,t,e,i,o,a,u){try{var r=n[a](u),c=r.value}catch(s){return void e(s)}r.done?t(c):Promise.resolve(c).then(i,o)}function c(n){return function(){var t=this,e=arguments;return new Promise(function(i,o){var a=n.apply(t,e);function u(n){r(a,i,o,u,c,"next",n)}function c(n){r(a,i,o,u,c,"throw",n)}u(void 0)})}}var s=n.requireNativePlugin("dzt"),l={data:function(){return{buildingName:"请选择楼宇",itemList:[],contentList:[],msg:[],t_url:"",curIndex:0,contentCurIndex:0,statusBarHeight:0,msgCount:0,showBg:0,isAPP:!1,paddingValue:"",shopList:[]}},onLoad:function(){},methods:{callAndroid:function(){s.show({title:rn},function(t){var e=JSON.stringify(t),i=e.type;"-1"==i?n.showToast({icon:"none",title:"请安装云闪付APP",duration:1e3}):n.showToast({icon:"none",title:i,duration:1e3})})},getShareData:function(){var n=c(i.default.mark(function n(){var t;return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.getShareData)(window.location.href.split("#")[0]);case 2:t=n.sent,1e3==t.code&&this.initWeiXin(t.data);case 4:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),initWeiXin:function(n){a.default.config({debug:!0,appId:"wx619e8821f163f2cc",timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"]}),a.default.ready(function(){a.default.onMenuShareAppMessage({title:"title",desc:"desc",link:window.location.href.split("#")[0],imgUrl:"https://www.baidu.com/img/bd_logo1.png",success:function(){},cancel:function(){}}),a.default.onMenuShareTimeline({title:"title",link:window.location.href.split("#")[0],imgUrl:"https://www.baidu.com/img/bd_logo1.png",success:function(){},cancel:function(){}})})}}};t.default=l}).call(this,e("6e42")["default"])}},[["9987","common/runtime","common/vendor"]]]);
});
require('pages/tabbar/my/my.js');
__wxRoute = 'pages/tabbar/service/service';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tabbar/service/service.js';

define('pages/tabbar/service/service.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/service/service"],{"52b6":function(n,t,e){"use strict";e.r(t);var o=e("e7b4"),i=e("5b2d");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);var r=e("2877"),a=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=a.exports},"5b2d":function(n,t,e){"use strict";e.r(t);var o=e("fc75"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a},e7b4:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},fc75:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=n.requireNativePlugin("GZF-YunPay"),o={data:function(){return{}},onLoad:function(){},methods:{callAndroid:function(){e.show({title:"456"},function(t){var e=JSON.stringify(t),o=e.type;n.showToast({icon:"none",title:o,duration:1e3})})},callLogin:function(){e.eLogin({title:"123"},function(t){var e=JSON.stringify(t),o=e.type;n.showToast({icon:"none",title:o,duration:1e3})})}}};t.default=o}).call(this,e("6e42")["default"])}},[["e1fc","common/runtime","common/vendor"]]]);
});
require('pages/tabbar/service/service.js');
;(function(global) {
    __uni_launch_ready(function() {
        var entryPagePath = __wxConfig.entryPagePath.replace('.html', '')
        if (entryPagePath.indexOf('/') !== 0) {
            entryPagePath = '/' + entryPagePath
        }
        wx.navigateTo({
            url: entryPagePath,
            query: {},
            openType: 'appLaunch',
            webviewId: 1
        })
        __wxConfig.__ready__ = true
    })
})(this);

