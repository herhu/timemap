"use strict";(self.webpackChunkviolencia_policial=self.webpackChunkviolencia_policial||[]).push([[869],{6057:function(n,r){var e={value:()=>{}};function t(){for(var n,r=0,e=arguments.length,t={};r<e;++r){if(!(n=arguments[r]+"")||n in t||/[\s.]/.test(n))throw new Error("illegal type: "+n);t[n]=[]}return new i(t)}function i(n){this._=n}function o(n,r){return n.trim().split(/^|\s+/).map((function(n){var e="",t=n.indexOf(".");if(t>=0&&(e=n.slice(t+1),n=n.slice(0,t)),n&&!r.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:e}}))}function l(n,r){for(var e,t=0,i=n.length;t<i;++t)if((e=n[t]).name===r)return e.value}function a(n,r,t){for(var i=0,o=n.length;i<o;++i)if(n[i].name===r){n[i]=e,n=n.slice(0,i).concat(n.slice(i+1));break}return null!=t&&n.push({name:r,value:t}),n}i.prototype=t.prototype={constructor:i,on:function(n,r){var e,t=this._,i=o(n+"",t),f=-1,u=i.length;if(!(arguments.length<2)){if(null!=r&&"function"!=typeof r)throw new Error("invalid callback: "+r);for(;++f<u;)if(e=(n=i[f]).type)t[e]=a(t[e],n.name,r);else if(null==r)for(e in t)t[e]=a(t[e],n.name,null);return this}for(;++f<u;)if((e=(n=i[f]).type)&&(e=l(t[e],n.name)))return e},copy:function(){var n={},r=this._;for(var e in r)n[e]=r[e].slice();return new i(n)},call:function(n,r){if((e=arguments.length-2)>0)for(var e,t,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(o=0,e=(t=this._[n]).length;o<e;++o)t[o].value.apply(r,i)},apply:function(n,r,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var t=this._[n],i=0,o=t.length;i<o;++i)t[i].value.apply(r,e)}},r.Z=t}}]);