"use strict";(self.webpackChunkviolencia_policial=self.webpackChunkviolencia_policial||[]).push([[361],{6199:function(n,t,e){var r=e(2576),u=e(1262),o=(0,r.Z)((n=>n.setHours(0,0,0,0)),((n,t)=>n.setDate(n.getDate()+t)),((n,t)=>(t-n-(t.getTimezoneOffset()-n.getTimezoneOffset())*u.yB)/u.UD),(n=>n.getDate()-1));t.Z=o,o.range},1262:function(n,t,e){e.d(t,{Ym:function(){return r},yB:function(){return u},Y2:function(){return o},UD:function(){return i},iM:function(){return f},jz:function(){return c},qz:function(){return a}});const r=1e3,u=60*r,o=60*u,i=24*o,f=7*i,c=30*i,a=365*i},6549:function(n,t,e){var r=e(2576),u=e(1262),o=(0,r.Z)((function(n){n.setTime(n-n.getMilliseconds()-n.getSeconds()*u.Ym-n.getMinutes()*u.yB)}),(function(n,t){n.setTime(+n+t*u.Y2)}),(function(n,t){return(t-n)/u.Y2}),(function(n){return n.getHours()}));t.Z=o,o.range},2576:function(n,t,e){e.d(t,{Z:function(){return o}});var r=new Date,u=new Date;function o(n,t,e,i){function f(t){return n(t=0===arguments.length?new Date:new Date(+t)),t}return f.floor=function(t){return n(t=new Date(+t)),t},f.ceil=function(e){return n(e=new Date(e-1)),t(e,1),n(e),e},f.round=function(n){var t=f(n),e=f.ceil(n);return n-t<e-n?t:e},f.offset=function(n,e){return t(n=new Date(+n),null==e?1:Math.floor(e)),n},f.range=function(e,r,u){var o,i=[];if(e=f.ceil(e),u=null==u?1:Math.floor(u),!(e<r&&u>0))return i;do{i.push(o=new Date(+e)),t(e,u),n(e)}while(o<e&&e<r);return i},f.filter=function(e){return o((function(t){if(t>=t)for(;n(t),!e(t);)t.setTime(t-1)}),(function(n,r){if(n>=n)if(r<0)for(;++r<=0;)for(;t(n,-1),!e(n););else for(;--r>=0;)for(;t(n,1),!e(n););}))},e&&(f.count=function(t,o){return r.setTime(+t),u.setTime(+o),n(r),n(u),Math.floor(e(r,u))},f.every=function(n){return n=Math.floor(n),isFinite(n)&&n>0?n>1?f.filter(i?function(t){return i(t)%n==0}:function(t){return f.count(0,t)%n==0}):f:null}),f}},2828:function(n,t,e){var r=e(2576),u=e(1262),o=(0,r.Z)((function(n){n.setTime(n-n.getMilliseconds()-n.getSeconds()*u.Ym)}),(function(n,t){n.setTime(+n+t*u.yB)}),(function(n,t){return(t-n)/u.yB}),(function(n){return n.getMinutes()}));t.Z=o,o.range},6978:function(n,t,e){var r=(0,e(2576).Z)((function(n){n.setDate(1),n.setHours(0,0,0,0)}),(function(n,t){n.setMonth(n.getMonth()+t)}),(function(n,t){return t.getMonth()-n.getMonth()+12*(t.getFullYear()-n.getFullYear())}),(function(n){return n.getMonth()}));t.Z=r,r.range},6599:function(n,t,e){var r=e(2576),u=e(1262),o=(0,r.Z)((function(n){n.setTime(n-n.getMilliseconds())}),(function(n,t){n.setTime(+n+t*u.Ym)}),(function(n,t){return(t-n)/u.Ym}),(function(n){return n.getUTCSeconds()}));t.Z=o,o.range},6758:function(n,t,e){e.d(t,{_g:function(){return z},jK:function(){return H}});var r=e(477),u=e(3896),o=e(1262),i=e(2576),f=(0,i.Z)((function(){}),(function(n,t){n.setTime(+n+t)}),(function(n,t){return t-n}));f.every=function(n){return n=Math.floor(n),isFinite(n)&&n>0?n>1?(0,i.Z)((function(t){t.setTime(Math.floor(t/n)*n)}),(function(t,e){t.setTime(+t+e*n)}),(function(t,e){return(e-t)/n})):f:null};var c=f,a=(f.range,e(6599)),s=e(2828),l=e(6549),g=e(6199),T=e(5235),U=e(6978),Y=e(8887),C=(0,i.Z)((function(n){n.setUTCSeconds(0,0)}),(function(n,t){n.setTime(+n+t*o.yB)}),(function(n,t){return(t-n)/o.yB}),(function(n){return n.getUTCMinutes()})),M=C,Z=(C.range,(0,i.Z)((function(n){n.setUTCMinutes(0,0,0)}),(function(n,t){n.setTime(+n+t*o.Y2)}),(function(n,t){return(t-n)/o.Y2}),(function(n){return n.getUTCHours()}))),h=Z,D=(Z.range,e(4834)),m=e(1416),v=(0,i.Z)((function(n){n.setUTCDate(1),n.setUTCHours(0,0,0,0)}),(function(n,t){n.setUTCMonth(n.getUTCMonth()+t)}),(function(n,t){return t.getUTCMonth()-n.getUTCMonth()+12*(t.getUTCFullYear()-n.getUTCFullYear())}),(function(n){return n.getUTCMonth()})),F=v,y=(v.range,e(9935));function d(n,t,e,i,f,s){const l=[[a.Z,1,o.Ym],[a.Z,5,5*o.Ym],[a.Z,15,15*o.Ym],[a.Z,30,30*o.Ym],[s,1,o.yB],[s,5,5*o.yB],[s,15,15*o.yB],[s,30,30*o.yB],[f,1,o.Y2],[f,3,3*o.Y2],[f,6,6*o.Y2],[f,12,12*o.Y2],[i,1,o.UD],[i,2,2*o.UD],[e,1,o.iM],[t,1,o.jz],[t,3,3*o.jz],[n,1,o.qz]];function g(t,e,i){const f=Math.abs(e-t)/i,a=(0,r.Z)((([,,n])=>n)).right(l,f);if(a===l.length)return n.every((0,u.ly)(t/o.qz,e/o.qz,i));if(0===a)return c.every(Math.max((0,u.ly)(t,e,i),1));const[s,g]=l[f/l[a-1][2]<l[a][2]/f?a-1:a];return s.every(g)}return[function(n,t,e){const r=t<n;r&&([n,t]=[t,n]);const u=e&&"function"==typeof e.range?e:g(n,t,e),o=u?u.range(n,+t+1):[];return r?o.reverse():o},g]}const[B,w]=d(y.Z,F,m.Ox,D.Z,h,M),[H,z]=d(Y.Z,U.Z,T.OM,g.Z,l.Z,s.Z)},4834:function(n,t,e){var r=e(2576),u=e(1262),o=(0,r.Z)((function(n){n.setUTCHours(0,0,0,0)}),(function(n,t){n.setUTCDate(n.getUTCDate()+t)}),(function(n,t){return(t-n)/u.UD}),(function(n){return n.getUTCDate()-1}));t.Z=o,o.range},1416:function(n,t,e){e.d(t,{Ox:function(){return i},l6:function(){return f},hB:function(){return s}});var r=e(2576),u=e(1262);function o(n){return(0,r.Z)((function(t){t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-n)%7),t.setUTCHours(0,0,0,0)}),(function(n,t){n.setUTCDate(n.getUTCDate()+7*t)}),(function(n,t){return(t-n)/u.iM}))}var i=o(0),f=o(1),c=o(2),a=o(3),s=o(4),l=o(5),g=o(6);i.range,f.range,c.range,a.range,s.range,l.range,g.range},9935:function(n,t,e){var r=e(2576),u=(0,r.Z)((function(n){n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)}),(function(n,t){n.setUTCFullYear(n.getUTCFullYear()+t)}),(function(n,t){return t.getUTCFullYear()-n.getUTCFullYear()}),(function(n){return n.getUTCFullYear()}));u.every=function(n){return isFinite(n=Math.floor(n))&&n>0?(0,r.Z)((function(t){t.setUTCFullYear(Math.floor(t.getUTCFullYear()/n)*n),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),(function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e*n)})):null},t.Z=u,u.range},5235:function(n,t,e){e.d(t,{OM:function(){return i},wA:function(){return f},bL:function(){return s}});var r=e(2576),u=e(1262);function o(n){return(0,r.Z)((function(t){t.setDate(t.getDate()-(t.getDay()+7-n)%7),t.setHours(0,0,0,0)}),(function(n,t){n.setDate(n.getDate()+7*t)}),(function(n,t){return(t-n-(t.getTimezoneOffset()-n.getTimezoneOffset())*u.yB)/u.iM}))}var i=o(0),f=o(1),c=o(2),a=o(3),s=o(4),l=o(5),g=o(6);i.range,f.range,c.range,a.range,s.range,l.range,g.range},8887:function(n,t,e){var r=e(2576),u=(0,r.Z)((function(n){n.setMonth(0,1),n.setHours(0,0,0,0)}),(function(n,t){n.setFullYear(n.getFullYear()+t)}),(function(n,t){return t.getFullYear()-n.getFullYear()}),(function(n){return n.getFullYear()}));u.every=function(n){return isFinite(n=Math.floor(n))&&n>0?(0,r.Z)((function(t){t.setFullYear(Math.floor(t.getFullYear()/n)*n),t.setMonth(0,1),t.setHours(0,0,0,0)}),(function(t,e){t.setFullYear(t.getFullYear()+e*n)})):null},t.Z=u,u.range}}]);