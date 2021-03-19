// https://d3js.org/d3-shape/ Version 1.2.0. Copyright 2017 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("d3-path")):"function"==typeof define&&define.amd?define(["exports","d3-path"],n):n(t.d3=t.d3||{},t.d3)}(this,function(t,n){"use strict";function i(t){return t>1?0:t<-1?lt:Math.acos(t)}function e(t){return t>=1?ut:t<=-1?-ut:Math.asin(t)}function s(t){return t.innerRadius}function h(t){return t.outerRadius}function o(t){return t.startAngle}function _(t){return t.endAngle}function r(t){return t&&t.padAngle}function a(t,n,i,e,s,h,o,_){var r=i-t,a=e-n,c=o-s,l=_-h,u=(c*(n-h)-l*(t-s))/(l*r-c*a);return[t+u*r,n+u*a]}function c(t,n,i,e,s,h,o){var _=t-i,r=n-e,a=(o?h:-h)/at(_*_+r*r),c=a*r,l=-a*_,u=t+c,f=n+l,x=i+c,y=e+l,p=(u+x)/2,v=(f+y)/2,d=x-u,T=y-f,g=d*d+T*T,b=s-h,w=u*y-x*f,k=(T<0?-1:1)*at(ot(0,b*b*g-w*w)),m=(w*T-d*k)/g,N=(-w*d-T*k)/g,M=(w*T+d*k)/g,S=(-w*d+T*k)/g,E=m-p,A=N-v,P=M-p,C=S-v;return E*E+A*A>P*P+C*C&&(m=M,N=S),{cx:m,cy:N,x01:-c,y01:-l,x11:m*(s/b-1),y11:N*(s/b-1)}}function l(t){this._context=t}function u(t){return t[0]}function f(t){return t[1]}function x(t){this._curve=t}function y(t){function n(n){return new x(t(n))}return n._curve=t,n}function p(t){var n=t.curve;return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t.curve=function(t){return arguments.length?n(y(t)):n()._curve},t}function v(t){return t.source}function d(t){return t.target}function T(t){function i(){var i,r=Nt.call(arguments),a=e.apply(this,r),c=s.apply(this,r);if(_||(_=i=n.path()),t(_,+h.apply(this,(r[0]=a,r)),+o.apply(this,r),+h.apply(this,(r[0]=c,r)),+o.apply(this,r)),i)return _=null,i+""||null}var e=v,s=d,h=u,o=f,_=null;return i.source=function(t){return arguments.length?(e=t,i):e},i.target=function(t){return arguments.length?(s=t,i):s},i.x=function(t){return arguments.length?(h="function"==typeof t?t:it(+t),i):h},i.y=function(t){return arguments.length?(o="function"==typeof t?t:it(+t),i):o},i.context=function(t){return arguments.length?(_=null==t?null:t,i):_},i}function g(t,n,i,e,s){t.moveTo(n,i),t.bezierCurveTo(n=(n+e)/2,i,n,s,e,s)}function b(t,n,i,e,s){t.moveTo(n,i),t.bezierCurveTo(n,i=(i+s)/2,e,i,e,s)}function w(t,n,i,e,s){var h=mt(n,i),o=mt(n,i=(i+s)/2),_=mt(e,i),r=mt(e,s);t.moveTo(h[0],h[1]),t.bezierCurveTo(o[0],o[1],_[0],_[1],r[0],r[1])}function k(){return T(g)}function m(){return T(b)}function N(){var t=T(w);return t.angle=t.x,delete t.x,t.radius=t.y,delete t.y,t}function M(t,n,i){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+i)/6)}function S(t){this._context=t}function E(t){this._context=t}function A(t){this._context=t}function P(t,n){this._basis=new S(t),this._beta=n}function C(t,n,i){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-n),t._y2+t._k*(t._y1-i),t._x2,t._y2)}function R(t,n){this._context=t,this._k=(1-n)/6}function q(t,n){this._context=t,this._k=(1-n)/6}function O(t,n){this._context=t,this._k=(1-n)/6}function z(t,n,i){var e=t._x1,s=t._y1,h=t._x2,o=t._y2;if(t._l01_a>ct){var _=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,r=3*t._l01_a*(t._l01_a+t._l12_a);e=(e*_-t._x0*t._l12_2a+t._x2*t._l01_2a)/r,s=(s*_-t._y0*t._l12_2a+t._y2*t._l01_2a)/r}if(t._l23_a>ct){var a=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a);h=(h*a+t._x1*t._l23_2a-n*t._l12_2a)/c,o=(o*a+t._y1*t._l23_2a-i*t._l12_2a)/c}t._context.bezierCurveTo(e,s,h,o,t._x2,t._y2)}function X(t,n){this._context=t,this._alpha=n}function Y(t,n){this._context=t,this._alpha=n}function B(t,n){this._context=t,this._alpha=n}function I(t){this._context=t}function j(t){return t<0?-1:1}function D(t,n,i){var e=t._x1-t._x0,s=n-t._x1,h=(t._y1-t._y0)/(e||s<0&&-0),o=(i-t._y1)/(s||e<0&&-0),_=(h*s+o*e)/(e+s);return(j(h)+j(o))*Math.min(Math.abs(h),Math.abs(o),.5*Math.abs(_))||0}function L(t,n){var i=t._x1-t._x0;return i?(3*(t._y1-t._y0)/i-n)/2:n}function V(t,n,i){var e=t._x0,s=t._y0,h=t._x1,o=t._y1,_=(h-e)/3;t._context.bezierCurveTo(e+_,s+_*n,h-_,o-_*i,h,o)}function W(t){this._context=t}function H(t){this._context=new F(t)}function F(t){this._context=t}function G(t){return new W(t)}function J(t){return new H(t)}function K(t){this._context=t}function Q(t){var n,i,e=t.length-1,s=new Array(e),h=new Array(e),o=new Array(e);for(s[0]=0,h[0]=2,o[0]=t[0]+2*t[1],n=1;n<e-1;++n)s[n]=1,h[n]=4,o[n]=4*t[n]+2*t[n+1];for(s[e-1]=2,h[e-1]=7,o[e-1]=8*t[e-1]+t[e],n=1;n<e;++n)i=s[n]/h[n-1],h[n]-=i,o[n]-=i*o[n-1];for(s[e-1]=o[e-1]/h[e-1],n=e-2;n>=0;--n)s[n]=(o[n]-s[n+1])/h[n];for(h[e-1]=(t[e]+s[e-1])/2,n=0;n<e-1;++n)h[n]=2*t[n+1]-s[n+1];return[s,h]}function U(t,n){this._context=t,this._t=n}function Z(t){return new U(t,0)}function $(t){return new U(t,1)}function tt(t,n){return t[n]}function nt(t){for(var n,i=0,e=-1,s=t.length;++e<s;)(n=+t[e][1])&&(i+=n);return i}var it=function(t){return function(){return t}},et=Math.abs,st=Math.atan2,ht=Math.cos,ot=Math.max,_t=Math.min,rt=Math.sin,at=Math.sqrt,ct=1e-12,lt=Math.PI,ut=lt/2,ft=2*lt,xt=function(){function t(){var t,s,h=+l.apply(this,arguments),o=+u.apply(this,arguments),_=y.apply(this,arguments)-ut,r=p.apply(this,arguments)-ut,T=et(r-_),g=r>_;if(d||(d=t=n.path()),o<h&&(s=o,o=h,h=s),o>ct)if(T>ft-ct)d.moveTo(o*ht(_),o*rt(_)),d.arc(0,0,o,_,r,!g),h>ct&&(d.moveTo(h*ht(r),h*rt(r)),d.arc(0,0,h,r,_,g));else{var b,w,k=_,m=r,N=_,M=r,S=T,E=T,A=v.apply(this,arguments)/2,P=A>ct&&(x?+x.apply(this,arguments):at(h*h+o*o)),C=_t(et(o-h)/2,+f.apply(this,arguments)),R=C,q=C;if(P>ct){var O=e(P/h*rt(A)),z=e(P/o*rt(A));(S-=2*O)>ct?(O*=g?1:-1,N+=O,M-=O):(S=0,N=M=(_+r)/2),(E-=2*z)>ct?(z*=g?1:-1,k+=z,m-=z):(E=0,k=m=(_+r)/2)}var X=o*ht(k),Y=o*rt(k),B=h*ht(M),I=h*rt(M);if(C>ct){var j=o*ht(m),D=o*rt(m),L=h*ht(N),V=h*rt(N);if(T<lt){var W=S>ct?a(X,Y,L,V,j,D,B,I):[B,I],H=X-W[0],F=Y-W[1],G=j-W[0],J=D-W[1],K=1/rt(i((H*G+F*J)/(at(H*H+F*F)*at(G*G+J*J)))/2),Q=at(W[0]*W[0]+W[1]*W[1]);R=_t(C,(h-Q)/(K-1)),q=_t(C,(o-Q)/(K+1))}}E>ct?q>ct?(b=c(L,V,X,Y,o,q,g),w=c(j,D,B,I,o,q,g),d.moveTo(b.cx+b.x01,b.cy+b.y01),q<C?d.arc(b.cx,b.cy,q,st(b.y01,b.x01),st(w.y01,w.x01),!g):(d.arc(b.cx,b.cy,q,st(b.y01,b.x01),st(b.y11,b.x11),!g),d.arc(0,0,o,st(b.cy+b.y11,b.cx+b.x11),st(w.cy+w.y11,w.cx+w.x11),!g),d.arc(w.cx,w.cy,q,st(w.y11,w.x11),st(w.y01,w.x01),!g))):(d.moveTo(X,Y),d.arc(0,0,o,k,m,!g)):d.moveTo(X,Y),h>ct&&S>ct?R>ct?(b=c(B,I,j,D,h,-R,g),w=c(X,Y,L,V,h,-R,g),d.lineTo(b.cx+b.x01,b.cy+b.y01),R<C?d.arc(b.cx,b.cy,R,st(b.y01,b.x01),st(w.y01,w.x01),!g):(d.arc(b.cx,b.cy,R,st(b.y01,b.x01),st(b.y11,b.x11),!g),d.arc(0,0,h,st(b.cy+b.y11,b.cx+b.x11),st(w.cy+w.y11,w.cx+w.x11),g),d.arc(w.cx,w.cy,R,st(w.y11,w.x11),st(w.y01,w.x01),!g))):d.arc(0,0,h,M,N,g):d.lineTo(B,I)}else d.moveTo(0,0);if(d.closePath(),t)return d=null,t+""||null}var l=s,u=h,f=it(0),x=null,y=o,p=_,v=r,d=null;return t.centroid=function(){var t=(+l.apply(this,arguments)+ +u.apply(this,arguments))/2,n=(+y.apply(this,arguments)+ +p.apply(this,arguments))/2-lt/2;return[ht(n)*t,rt(n)*t]},t.innerRadius=function(n){return arguments.length?(l="function"==typeof n?n:it(+n),t):l},t.outerRadius=function(n){return arguments.length?(u="function"==typeof n?n:it(+n),t):u},t.cornerRadius=function(n){return arguments.length?(f="function"==typeof n?n:it(+n),t):f},t.padRadius=function(n){return arguments.length?(x=null==n?null:"function"==typeof n?n:it(+n),t):x},t.startAngle=function(n){return arguments.length?(y="function"==typeof n?n:it(+n),t):y},t.endAngle=function(n){return arguments.length?(p="function"==typeof n?n:it(+n),t):p},t.padAngle=function(n){return arguments.length?(v="function"==typeof n?n:it(+n),t):v},t.context=function(n){return arguments.length?(d=null==n?null:n,t):d},t};l.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};var yt=function(t){return new l(t)},pt=function(){function t(t){var r,a,c,l=t.length,u=!1;for(null==h&&(_=o(c=n.path())),r=0;r<=l;++r)!(r<l&&s(a=t[r],r,t))===u&&((u=!u)?_.lineStart():_.lineEnd()),u&&_.point(+i(a,r,t),+e(a,r,t));if(c)return _=null,c+""||null}var i=u,e=f,s=it(!0),h=null,o=yt,_=null;return t.x=function(n){return arguments.length?(i="function"==typeof n?n:it(+n),t):i},t.y=function(n){return arguments.length?(e="function"==typeof n?n:it(+n),t):e},t.defined=function(n){return arguments.length?(s="function"==typeof n?n:it(!!n),t):s},t.curve=function(n){return arguments.length?(o=n,null!=h&&(_=o(h)),t):o},t.context=function(n){return arguments.length?(null==n?h=_=null:_=o(h=n),t):h},t},vt=function(){function t(t){var i,l,u,f,x,y=t.length,p=!1,v=new Array(y),d=new Array(y);for(null==r&&(c=a(x=n.path())),i=0;i<=y;++i){if(!(i<y&&_(f=t[i],i,t))===p)if(p=!p)l=i,c.areaStart(),c.lineStart();else{for(c.lineEnd(),c.lineStart(),u=i-1;u>=l;--u)c.point(v[u],d[u]);c.lineEnd(),c.areaEnd()}p&&(v[i]=+e(f,i,t),d[i]=+h(f,i,t),c.point(s?+s(f,i,t):v[i],o?+o(f,i,t):d[i]))}if(x)return c=null,x+""||null}function i(){return pt().defined(_).curve(a).context(r)}var e=u,s=null,h=it(0),o=f,_=it(!0),r=null,a=yt,c=null;return t.x=function(n){return arguments.length?(e="function"==typeof n?n:it(+n),s=null,t):e},t.x0=function(n){return arguments.length?(e="function"==typeof n?n:it(+n),t):e},t.x1=function(n){return arguments.length?(s=null==n?null:"function"==typeof n?n:it(+n),t):s},t.y=function(n){return arguments.length?(h="function"==typeof n?n:it(+n),o=null,t):h},t.y0=function(n){return arguments.length?(h="function"==typeof n?n:it(+n),t):h},t.y1=function(n){return arguments.length?(o=null==n?null:"function"==typeof n?n:it(+n),t):o},t.lineX0=t.lineY0=function(){return i().x(e).y(h)},t.lineY1=function(){return i().x(e).y(o)},t.lineX1=function(){return i().x(s).y(h)},t.defined=function(n){return arguments.length?(_="function"==typeof n?n:it(!!n),t):_},t.curve=function(n){return arguments.length?(a=n,null!=r&&(c=a(r)),t):a},t.context=function(n){return arguments.length?(null==n?r=c=null:c=a(r=n),t):r},t},dt=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},Tt=function(t){return t},gt=function(){function t(t){var _,r,a,c,l,u=t.length,f=0,x=new Array(u),y=new Array(u),p=+s.apply(this,arguments),v=Math.min(ft,Math.max(-ft,h.apply(this,arguments)-p)),d=Math.min(Math.abs(v)/u,o.apply(this,arguments)),T=d*(v<0?-1:1);for(_=0;_<u;++_)(l=y[x[_]=_]=+n(t[_],_,t))>0&&(f+=l);for(null!=i?x.sort(function(t,n){return i(y[t],y[n])}):null!=e&&x.sort(function(n,i){return e(t[n],t[i])}),_=0,a=f?(v-u*T)/f:0;_<u;++_,p=c)r=x[_],l=y[r],c=p+(l>0?l*a:0)+T,y[r]={data:t[r],index:_,value:l,startAngle:p,endAngle:c,padAngle:d};return y}var n=Tt,i=dt,e=null,s=it(0),h=it(ft),o=it(0);return t.value=function(i){return arguments.length?(n="function"==typeof i?i:it(+i),t):n},t.sortValues=function(n){return arguments.length?(i=n,e=null,t):i},t.sort=function(n){return arguments.length?(e=n,i=null,t):e},t.startAngle=function(n){return arguments.length?(s="function"==typeof n?n:it(+n),t):s},t.endAngle=function(n){return arguments.length?(h="function"==typeof n?n:it(+n),t):h},t.padAngle=function(n){return arguments.length?(o="function"==typeof n?n:it(+n),t):o},t},bt=y(yt);x.prototype={areaStart:function(){this._curve.areaStart()},areaEnd:function(){this._curve.areaEnd()},lineStart:function(){this._curve.lineStart()},lineEnd:function(){this._curve.lineEnd()},point:function(t,n){this._curve.point(n*Math.sin(t),n*-Math.cos(t))}};var wt=function(){return p(pt().curve(bt))},kt=function(){var t=vt().curve(bt),n=t.curve,i=t.lineX0,e=t.lineX1,s=t.lineY0,h=t.lineY1;return t.angle=t.x,delete t.x,t.startAngle=t.x0,delete t.x0,t.endAngle=t.x1,delete t.x1,t.radius=t.y,delete t.y,t.innerRadius=t.y0,delete t.y0,t.outerRadius=t.y1,delete t.y1,t.lineStartAngle=function(){return p(i())},delete t.lineX0,t.lineEndAngle=function(){return p(e())},delete t.lineX1,t.lineInnerRadius=function(){return p(s())},delete t.lineY0,t.lineOuterRadius=function(){return p(h())},delete t.lineY1,t.curve=function(t){return arguments.length?n(y(t)):n()._curve},t},mt=function(t,n){return[(n=+n)*Math.cos(t-=Math.PI/2),n*Math.sin(t)]},Nt=Array.prototype.slice,Mt={draw:function(t,n){var i=Math.sqrt(n/lt);t.moveTo(i,0),t.arc(0,0,i,0,ft)}},St={draw:function(t,n){var i=Math.sqrt(n/5)/2;t.moveTo(-3*i,-i),t.lineTo(-i,-i),t.lineTo(-i,-3*i),t.lineTo(i,-3*i),t.lineTo(i,-i),t.lineTo(3*i,-i),t.lineTo(3*i,i),t.lineTo(i,i),t.lineTo(i,3*i),t.lineTo(-i,3*i),t.lineTo(-i,i),t.lineTo(-3*i,i),t.closePath()}},Et=Math.sqrt(1/3),At=2*Et,Pt={draw:function(t,n){var i=Math.sqrt(n/At),e=i*Et;t.moveTo(0,-i),t.lineTo(e,0),t.lineTo(0,i),t.lineTo(-e,0),t.closePath()}},Ct=Math.sin(lt/10)/Math.sin(7*lt/10),Rt=Math.sin(ft/10)*Ct,qt=-Math.cos(ft/10)*Ct,Ot={draw:function(t,n){var i=Math.sqrt(.8908130915292852*n),e=Rt*i,s=qt*i;t.moveTo(0,-i),t.lineTo(e,s);for(var h=1;h<5;++h){var o=ft*h/5,_=Math.cos(o),r=Math.sin(o);t.lineTo(r*i,-_*i),t.lineTo(_*e-r*s,r*e+_*s)}t.closePath()}},zt={draw:function(t,n){var i=Math.sqrt(n),e=-i/2;t.rect(e,e,i,i)}},Xt=Math.sqrt(3),Yt={draw:function(t,n){var i=-Math.sqrt(n/(3*Xt));t.moveTo(0,2*i),t.lineTo(-Xt*i,-i),t.lineTo(Xt*i,-i),t.closePath()}},Bt=-.5,It=Math.sqrt(3)/2,jt=1/Math.sqrt(12),Dt=3*(jt/2+1),Lt={draw:function(t,n){var i=Math.sqrt(n/Dt),e=i/2,s=i*jt,h=e,o=i*jt+i,_=-h,r=o;t.moveTo(e,s),t.lineTo(h,o),t.lineTo(_,r),t.lineTo(Bt*e-It*s,It*e+Bt*s),t.lineTo(Bt*h-It*o,It*h+Bt*o),t.lineTo(Bt*_-It*r,It*_+Bt*r),t.lineTo(Bt*e+It*s,Bt*s-It*e),t.lineTo(Bt*h+It*o,Bt*o-It*h),t.lineTo(Bt*_+It*r,Bt*r-It*_),t.closePath()}},Vt=[Mt,St,Pt,zt,Ot,Yt,Lt],Wt=function(){function t(){var t;if(s||(s=t=n.path()),i.apply(this,arguments).draw(s,+e.apply(this,arguments)),t)return s=null,t+""||null}var i=it(Mt),e=it(64),s=null;return t.type=function(n){return arguments.length?(i="function"==typeof n?n:it(n),t):i},t.size=function(n){return arguments.length?(e="function"==typeof n?n:it(+n),t):e},t.context=function(n){return arguments.length?(s=null==n?null:n,t):s},t},Ht=function(){};S.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:M(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:M(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Ft=function(t){return new S(t)};E.prototype={areaStart:Ht,areaEnd:Ht,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x2,this._y2),this._context.closePath();break;case 2:this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break;case 3:this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x2=t,this._y2=n;break;case 1:this._point=2,this._x3=t,this._y3=n;break;case 2:this._point=3,this._x4=t,this._y4=n,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+n)/6);break;default:M(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Gt=function(t){return new E(t)};A.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var i=(this._x0+4*this._x1+t)/6,e=(this._y0+4*this._y1+n)/6;this._line?this._context.lineTo(i,e):this._context.moveTo(i,e);break;case 3:this._point=4;default:M(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}};var Jt=function(t){return new A(t)};P.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var t=this._x,n=this._y,i=t.length-1;if(i>0)for(var e,s=t[0],h=n[0],o=t[i]-s,_=n[i]-h,r=-1;++r<=i;)e=r/i,this._basis.point(this._beta*t[r]+(1-this._beta)*(s+e*o),this._beta*n[r]+(1-this._beta)*(h+e*_));this._x=this._y=null,this._basis.lineEnd()},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var Kt=function t(n){function i(t){return 1===n?new S(t):new P(t,n)}return i.beta=function(n){return t(+n)},i}(.85);R.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:C(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2,this._x1=t,this._y1=n;break;case 2:this._point=3;default:C(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Qt=function t(n){function i(t){return new R(t,n)}return i.tension=function(n){return t(+n)},i}(0);q.prototype={areaStart:Ht,areaEnd:Ht,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:C(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Ut=function t(n){function i(t){return new q(t,n)}return i.tension=function(n){return t(+n)},i}(0);O.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:C(this,t,n)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Zt=function t(n){function i(t){return new O(t,n)}return i.tension=function(n){return t(+n)},i}(0);X.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var i=this._x2-t,e=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(i*i+e*e,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3;default:z(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var $t=function t(n){function i(t){return n?new X(t,n):new R(t,0)}return i.alpha=function(n){return t(+n)},i}(.5);Y.prototype={areaStart:Ht,areaEnd:Ht,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:this._context.moveTo(this._x3,this._y3),this._context.closePath();break;case 2:this._context.lineTo(this._x3,this._y3),this._context.closePath();break;case 3:this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5)}},point:function(t,n){if(t=+t,n=+n,this._point){var i=this._x2-t,e=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(i*i+e*e,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=t,this._y3=n;break;case 1:this._point=2,this._context.moveTo(this._x4=t,this._y4=n);break;case 2:this._point=3,this._x5=t,this._y5=n;break;default:z(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var tn=function t(n){function i(t){return n?new Y(t,n):new q(t,0)}return i.alpha=function(n){return t(+n)},i}(.5);B.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||0!==this._line&&3===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){if(t=+t,n=+n,this._point){var i=this._x2-t,e=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(i*i+e*e,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:z(this,t,n)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var nn=function t(n){function i(t){return n?new B(t,n):new O(t,0)}return i.alpha=function(n){return t(+n)},i}(.5);I.prototype={areaStart:Ht,areaEnd:Ht,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,n){t=+t,n=+n,this._point?this._context.lineTo(t,n):(this._point=1,this._context.moveTo(t,n))}};var en=function(t){return new I(t)};W.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:V(this,this._t0,L(this,this._t0))}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){var i=NaN;if(t=+t,n=+n,t!==this._x1||n!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,V(this,L(this,i=D(this,t,n)),i);break;default:V(this,this._t0,i=D(this,t,n))}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n,this._t0=i}}},(H.prototype=Object.create(W.prototype)).point=function(t,n){W.prototype.point.call(this,n,t)},F.prototype={moveTo:function(t,n){this._context.moveTo(n,t)},closePath:function(){this._context.closePath()},lineTo:function(t,n){this._context.lineTo(n,t)},bezierCurveTo:function(t,n,i,e,s,h){this._context.bezierCurveTo(n,t,e,i,h,s)}},K.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var t=this._x,n=this._y,i=t.length;if(i)if(this._line?this._context.lineTo(t[0],n[0]):this._context.moveTo(t[0],n[0]),2===i)this._context.lineTo(t[1],n[1]);else for(var e=Q(t),s=Q(n),h=0,o=1;o<i;++h,++o)this._context.bezierCurveTo(e[0][h],s[0][h],e[1][h],s[1][h],t[o],n[o]);(this._line||0!==this._line&&1===i)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(t,n){this._x.push(+t),this._y.push(+n)}};var sn=function(t){return new K(t)};U.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&2===this._point&&this._context.lineTo(this._x,this._y),(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:if(this._t<=0)this._context.lineTo(this._x,n),this._context.lineTo(t,n);else{var i=this._x*(1-this._t)+t*this._t;this._context.lineTo(i,this._y),this._context.lineTo(i,n)}}this._x=t,this._y=n}};var hn=function(t){return new U(t,.5)},on=function(t,n){if((s=t.length)>1)for(var i,e,s,h=1,o=t[n[0]],_=o.length;h<s;++h)for(e=o,o=t[n[h]],i=0;i<_;++i)o[i][1]+=o[i][0]=isNaN(e[i][1])?e[i][0]:e[i][1]},_n=function(t){for(var n=t.length,i=new Array(n);--n>=0;)i[n]=n;return i},rn=function(){function t(t){var h,o,_=n.apply(this,arguments),r=t.length,a=_.length,c=new Array(a);for(h=0;h<a;++h){for(var l,u=_[h],f=c[h]=new Array(r),x=0;x<r;++x)f[x]=l=[0,+s(t[x],u,x,t)],l.data=t[x];f.key=u}for(h=0,o=i(c);h<a;++h)c[o[h]].index=h;return e(c,o),c}var n=it([]),i=_n,e=on,s=tt;return t.keys=function(i){return arguments.length?(n="function"==typeof i?i:it(Nt.call(i)),t):n},t.value=function(n){return arguments.length?(s="function"==typeof n?n:it(+n),t):s},t.order=function(n){return arguments.length?(i=null==n?_n:"function"==typeof n?n:it(Nt.call(n)),t):i},t.offset=function(n){return arguments.length?(e=null==n?on:n,t):e},t},an=function(t,n){if((e=t.length)>0){for(var i,e,s,h=0,o=t[0].length;h<o;++h){for(s=i=0;i<e;++i)s+=t[i][h][1]||0;if(s)for(i=0;i<e;++i)t[i][h][1]/=s}on(t,n)}},cn=function(t,n){if((_=t.length)>1)for(var i,e,s,h,o,_,r=0,a=t[n[0]].length;r<a;++r)for(h=o=0,i=0;i<_;++i)(s=(e=t[n[i]][r])[1]-e[0])>=0?(e[0]=h,e[1]=h+=s):s<0?(e[1]=o,e[0]=o+=s):e[0]=h},ln=function(t,n){if((i=t.length)>0){for(var i,e=0,s=t[n[0]],h=s.length;e<h;++e){for(var o=0,_=0;o<i;++o)_+=t[o][e][1]||0;s[e][1]+=s[e][0]=-_/2}on(t,n)}},un=function(t,n){if((s=t.length)>0&&(e=(i=t[n[0]]).length)>0){for(var i,e,s,h=0,o=1;o<e;++o){for(var _=0,r=0,a=0;_<s;++_){for(var c=t[n[_]],l=c[o][1]||0,u=c[o-1][1]||0,f=(l-u)/2,x=0;x<_;++x){var y=t[n[x]];f+=(y[o][1]||0)-(y[o-1][1]||0)}r+=l,a+=f*l}i[o-1][1]+=i[o-1][0]=h,r&&(h-=a/r)}i[o-1][1]+=i[o-1][0]=h,on(t,n)}},fn=function(t){var n=t.map(nt);return _n(t).sort(function(t,i){return n[t]-n[i]})},xn=function(t){return fn(t).reverse()},yn=function(t){var n,i,e=t.length,s=t.map(nt),h=_n(t).sort(function(t,n){return s[n]-s[t]}),o=0,_=0,r=[],a=[];for(n=0;n<e;++n)i=h[n],o<_?(o+=s[i],r.push(i)):(_+=s[i],a.push(i));return a.reverse().concat(r)},pn=function(t){return _n(t).reverse()};t.arc=xt,t.area=vt,t.line=pt,t.pie=gt,t.areaRadial=kt,t.radialArea=kt,t.lineRadial=wt,t.radialLine=wt,t.pointRadial=mt,t.linkHorizontal=k,t.linkVertical=m,t.linkRadial=N,t.symbol=Wt,t.symbols=Vt,t.symbolCircle=Mt,t.symbolCross=St,t.symbolDiamond=Pt,t.symbolSquare=zt,t.symbolStar=Ot,t.symbolTriangle=Yt,t.symbolWye=Lt,t.curveBasisClosed=Gt,t.curveBasisOpen=Jt,t.curveBasis=Ft,t.curveBundle=Kt,t.curveCardinalClosed=Ut,t.curveCardinalOpen=Zt,t.curveCardinal=Qt,t.curveCatmullRomClosed=tn,t.curveCatmullRomOpen=nn,t.curveCatmullRom=$t,t.curveLinearClosed=en,t.curveLinear=yt,t.curveMonotoneX=G,t.curveMonotoneY=J,t.curveNatural=sn,t.curveStep=hn,t.curveStepAfter=$,t.curveStepBefore=Z,t.stack=rn,t.stackOffsetExpand=an,t.stackOffsetDiverging=cn,t.stackOffsetNone=on,t.stackOffsetSilhouette=ln,t.stackOffsetWiggle=un,t.stackOrderAscending=fn,t.stackOrderDescending=xn,t.stackOrderInsideOut=yn,t.stackOrderNone=_n,t.stackOrderReverse=pn,Object.defineProperty(t,"__esModule",{value:!0})});