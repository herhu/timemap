"use strict";(self.webpackChunkviolencia_policial=self.webpackChunkviolencia_policial||[]).push([[326],{2954:function(n,t){t.Z=n=>()=>n},8063:function(n,t,r){function e(n,t){return n=+n,t=+t,function(r){return n*(1-r)+t*r}}r.d(t,{Z:function(){return e}})},1695:function(n,t,r){r.d(t,{ZP:function(){return o}});var e=r(2430);function u(n,t,r,e,u){var a=n*n,i=a*n;return((1-3*n+3*a-i)*t+(4-6*a+3*i)*r+(1+3*n+3*a-3*i)*e+i*u)/6}var a=r(2954);function i(n,t){var r=t-n;return r?function(n,t){return function(r){return n+r*t}}(n,r):(0,a.Z)(isNaN(n)?t:n)}var o=function n(t){var r=function(n){return 1==(n=+n)?i:function(t,r){return r-t?function(n,t,r){return n=Math.pow(n,r),t=Math.pow(t,r)-n,r=1/r,function(e){return Math.pow(n+e*t,r)}}(t,r,n):(0,a.Z)(isNaN(t)?r:t)}}(t);function u(n,t){var u=r((n=(0,e.B8)(n)).r,(t=(0,e.B8)(t)).r),a=r(n.g,t.g),o=r(n.b,t.b),c=i(n.opacity,t.opacity);return function(t){return n.r=u(t),n.g=a(t),n.b=o(t),n.opacity=c(t),n+""}}return u.gamma=n,u}(1);function c(n){return function(t){var r,u,a=t.length,i=new Array(a),o=new Array(a),c=new Array(a);for(r=0;r<a;++r)u=(0,e.B8)(t[r]),i[r]=u.r||0,o[r]=u.g||0,c[r]=u.b||0;return i=n(i),o=n(o),c=n(c),u.opacity=1,function(n){return u.r=i(n),u.g=o(n),u.b=c(n),u+""}}}c((function(n){var t=n.length-1;return function(r){var e=r<=0?r=0:r>=1?(r=1,t-1):Math.floor(r*t),a=n[e],i=n[e+1],o=e>0?n[e-1]:2*a-i,c=e<t-1?n[e+2]:2*i-a;return u((r-e/t)*t,o,a,i,c)}})),c((function(n){var t=n.length;return function(r){var e=Math.floor(((r%=1)<0?++r:r)*t),a=n[(e+t-1)%t],i=n[e%t],o=n[(e+1)%t],c=n[(e+2)%t];return u((r-e/t)*t,a,i,o,c)}}))},4635:function(n,t,r){function e(n,t){return n=+n,t=+t,function(r){return Math.round(n*(1-r)+t*r)}}r.d(t,{Z:function(){return e}})},6773:function(n,t,r){r.d(t,{Z:function(){return i}});var e=r(8063),u=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,a=new RegExp(u.source,"g");function i(n,t){var r,i,o,c=u.lastIndex=a.lastIndex=0,f=-1,l=[],s=[];for(n+="",t+="";(r=u.exec(n))&&(i=a.exec(t));)(o=i.index)>c&&(o=t.slice(c,o),l[f]?l[f]+=o:l[++f]=o),(r=r[0])===(i=i[0])?l[f]?l[f]+=i:l[++f]=i:(l[++f]=null,s.push({i:f,x:(0,e.Z)(r,i)})),c=a.lastIndex;return c<t.length&&(o=t.slice(c),l[f]?l[f]+=o:l[++f]=o),l.length<2?s[0]?function(n){return function(t){return n(t)+""}}(s[0].x):function(n){return function(){return n}}(t):(t=s.length,function(n){for(var r,e=0;e<t;++e)l[(r=s[e]).i]=r.x(n);return l.join("")})}},5293:function(n,t,r){r.d(t,{Y:function(){return f},w:function(){return l}});var e,u=r(8063),a=180/Math.PI,i={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function o(n,t,r,e,u,i){var o,c,f;return(o=Math.sqrt(n*n+t*t))&&(n/=o,t/=o),(f=n*r+t*e)&&(r-=n*f,e-=t*f),(c=Math.sqrt(r*r+e*e))&&(r/=c,e/=c,f/=c),n*e<t*r&&(n=-n,t=-t,f=-f,o=-o),{translateX:u,translateY:i,rotate:Math.atan2(t,n)*a,skewX:Math.atan(f)*a,scaleX:o,scaleY:c}}function c(n,t,r,e){function a(n){return n.length?n.pop()+" ":""}return function(i,o){var c=[],f=[];return i=n(i),o=n(o),function(n,e,a,i,o,c){if(n!==a||e!==i){var f=o.push("translate(",null,t,null,r);c.push({i:f-4,x:(0,u.Z)(n,a)},{i:f-2,x:(0,u.Z)(e,i)})}else(a||i)&&o.push("translate("+a+t+i+r)}(i.translateX,i.translateY,o.translateX,o.translateY,c,f),function(n,t,r,i){n!==t?(n-t>180?t+=360:t-n>180&&(n+=360),i.push({i:r.push(a(r)+"rotate(",null,e)-2,x:(0,u.Z)(n,t)})):t&&r.push(a(r)+"rotate("+t+e)}(i.rotate,o.rotate,c,f),function(n,t,r,i){n!==t?i.push({i:r.push(a(r)+"skewX(",null,e)-2,x:(0,u.Z)(n,t)}):t&&r.push(a(r)+"skewX("+t+e)}(i.skewX,o.skewX,c,f),function(n,t,r,e,i,o){if(n!==r||t!==e){var c=i.push(a(i)+"scale(",null,",",null,")");o.push({i:c-4,x:(0,u.Z)(n,r)},{i:c-2,x:(0,u.Z)(t,e)})}else 1===r&&1===e||i.push(a(i)+"scale("+r+","+e+")")}(i.scaleX,i.scaleY,o.scaleX,o.scaleY,c,f),i=o=null,function(n){for(var t,r=-1,e=f.length;++r<e;)c[(t=f[r]).i]=t.x(n);return c.join("")}}}var f=c((function(n){const t=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(n+"");return t.isIdentity?i:o(t.a,t.b,t.c,t.d,t.e,t.f)}),"px, ","px)","deg)"),l=c((function(n){return null==n?i:(e||(e=document.createElementNS("http://www.w3.org/2000/svg","g")),e.setAttribute("transform",n),(n=e.transform.baseVal.consolidate())?o((n=n.matrix).a,n.b,n.c,n.d,n.e,n.f):i)}),", ",")",")")},7135:function(n,t,r){r.d(t,{Z:function(){return h}});var e=r(2430),u=r(1695);function a(n,t){var r,e=t?t.length:0,u=n?Math.min(e,n.length):0,a=new Array(u),i=new Array(e);for(r=0;r<u;++r)a[r]=h(n[r],t[r]);for(;r<e;++r)i[r]=t[r];return function(n){for(r=0;r<u;++r)i[r]=a[r](n);return i}}function i(n,t){var r=new Date;return n=+n,t=+t,function(e){return r.setTime(n*(1-e)+t*e),r}}var o=r(8063);function c(n,t){var r,e={},u={};for(r in null!==n&&"object"==typeof n||(n={}),null!==t&&"object"==typeof t||(t={}),t)r in n?e[r]=h(n[r],t[r]):u[r]=t[r];return function(n){for(r in e)u[r]=e[r](n);return u}}var f=r(6773),l=r(2954);function s(n,t){t||(t=[]);var r,e=n?Math.min(t.length,n.length):0,u=t.slice();return function(a){for(r=0;r<e;++r)u[r]=n[r]*(1-a)+t[r]*a;return u}}function h(n,t){var r,h,p=typeof t;return null==t||"boolean"===p?(0,l.Z)(t):("number"===p?o.Z:"string"===p?(r=(0,e.ZP)(t))?(t=r,u.ZP):f.Z:t instanceof e.ZP?u.ZP:t instanceof Date?i:(h=t,!ArrayBuffer.isView(h)||h instanceof DataView?Array.isArray(t)?a:"function"!=typeof t.valueOf&&"function"!=typeof t.toString||isNaN(t)?c:o.Z:s))(n,t)}}}]);