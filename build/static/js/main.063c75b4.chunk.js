(this.webpackJsonpworldmusic=this.webpackJsonpworldmusic||[]).push([[0],{92:function(e,t,c){},93:function(e,t){},95:function(e,t,c){"use strict";c.r(t);var s=c(13),n=c(3),a=c.n(n),r=c(10),i=c(6),l=c(1),j=c(0),o=function(){return Object(j.jsx)("section",{className:"hero is-fluid is-danger is-small",children:Object(j.jsx)("div",{className:"hero-body",children:Object(j.jsxs)("div",{className:"container has-text-centered s-divider",children:[Object(j.jsx)("h1",{className:"title",children:"About music aroud the world."}),Object(j.jsx)("h2",{className:"subtitle",children:"\u3053\u306e\u30b5\u30a4\u30c8\u306f\u3001\u53ef\u8996\u5316\u306b\u3088\u3063\u3066\u4e16\u754c\u5404\u56fd\u306e\u97f3\u697d\u306e\u7279\u5fb4\u3092\u6349\u3048\u308b\u3053\u3068\u3092\u76ee\u7684\u3068\u3057\u3066\u3044\u307e\u3059\u3002"})]})})})},d=function(){return Object(j.jsx)("footer",{className:"footer",children:Object(j.jsx)("div",{className:"content has-text-centered",children:Object(j.jsx)("p",{children:"\xa9 2021 koizumi hatasa miura moriya watanabe"})})})},u=function(){return Object(j.jsx)("div",{className:"my-section",children:Object(j.jsx)("div",{className:"card",style:{height:"24.25vh"},children:Object(j.jsx)("div",{className:"card-content",children:Object(j.jsx)("div",{className:"content",children:"\u985e\u4f3c\u66f2"})})})})},h=function(){return Object(j.jsx)("div",{className:"my-section",children:Object(j.jsx)("div",{className:"card",style:{height:"24.25vh"},children:Object(j.jsx)("div",{className:"card-content",children:Object(j.jsx)("div",{className:"content",children:"\u66f2"})})})})},b=function(){return Object(j.jsx)("div",{className:"my-section",children:Object(j.jsx)("div",{className:"card",style:{height:"50vh"},children:Object(j.jsx)("div",{className:"card-content",children:Object(j.jsx)("div",{className:"content",children:"\u30e9\u30f3\u30ad\u30f3\u30b0"})})})})},O=function(){return Object(j.jsx)("div",{className:"my-section",children:Object(j.jsx)("div",{className:"card",style:{height:"30vh"},children:Object(j.jsx)("div",{className:"card-content",children:Object(j.jsx)("div",{className:"content",children:"\u8a73\u7d30"})})})})},m=c(8),x=c(19),v=Object(x.b)({name:"user",initialState:{count:0},reducers:{CountUp:function(e,t){e.count+=t.payload},CountDown:function(e,t){e.count-=t.payload}}}),f=v.reducer,p=v.actions,N=(p.CountUp,p.CountDown,c(92),function(){return Object(j.jsx)("div",{className:"my-section",children:Object(j.jsx)("div",{className:"card",style:{height:"40vh"},children:Object(j.jsx)("div",{className:"card-content",children:Object(j.jsx)("div",{className:"content",children:"\u30d2\u30fc\u30c8\u30de\u30c3\u30d7"})})})})}),g=c(26),y=c(96),w=c(45),k=function(e){var t=e.features;console.log(1);var c=Object(l.useState)([]),s=Object(i.a)(c,2),n=s[0],o=s[1];Object(l.useEffect)((function(){Object(r.a)(a.a.mark((function e(){var t,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/.netlify/functions/getData");case 2:return t=e.sent,e.next=5,t.json();case 5:c=e.sent,o(c);case 7:case"end":return e.stop()}}),e)})))()}),[]);var d=g.a().center([0,0]).translate([450,250]).scale(78),u=g.b().projection(d);return console.log(n),Object(j.jsx)("div",{class:"#map-container",style:{height:"40vh"},children:Object(j.jsx)("svg",{width:"800",height:"280",viewBox:"50 50 800 280",children:Object(j.jsx)("g",{children:t.map((function(e){return Object(j.jsx)("path",{d:u(e),fill:"white",stroke:"black",strokeWidth:"1",strokeOpacity:"0.5",countryname:e,onMouseOver:function(e){Object(y.a)(e.target).attr("stroke","red")},onMouseOut:function(e){Object(y.a)(e.target).attr("stroke","black")},onClick:function(t){console.log(e.properties.ISO_A2)}})}))})})})},S=function(){var e=Object(l.useState)([]),t=Object(i.a)(e,2),c=t[0],s=t[1];return Object(l.useEffect)((function(){Object(r.a)(a.a.mark((function e(){var t,c,n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/data/worldmap.json"));case 2:return t=e.sent,e.next=5,t.json();case 5:c=e.sent,n=w.a(c,c.objects.worldmap),r=n.features,s(r);case 8:case"end":return e.stop()}}),e)})))()}),[]),null==c?Object(j.jsx)("p",{children:"loading"}):Object(j.jsx)(k,{features:c})},C=function(){var e=Object(l.useState)(0),t=Object(i.a)(e,2),c=t[0],s=t[1],n=Object(l.useState)("2017-01"),a=Object(i.a)(n,2),r=a[0],o=a[1],d=Object(l.useState)("2017-06"),u=Object(i.a)(d,2),h=u[0],b=u[1],O=[["2017-01","2017-06"],["2017-07","2017-12"],["2018-01","2018-06"],["2018-07","2018-12"],["2019-01","2019-06"],["2019-07","2019-12"],["2020-01","2020-06"],["2020-07","2020-12"]];return Object(j.jsx)("div",{className:"my-section",children:Object(j.jsx)("div",{className:"card",style:{height:"40vh"},children:Object(j.jsx)("div",{className:"card-content",style:{height:"40vh"},children:Object(j.jsxs)("div",{className:"content",children:[Object(j.jsx)("div",{className:"select is-small",children:Object(j.jsx)("select",{onChange:function(e){console.log(e.target.value)},children:["acousticness","danceability","energy","instrumentalness","liveness","loudness","mode","speechiness","tempo","time_signature","valence"].map((function(e,t){return Object(j.jsx)("option",{children:e})}))})}),Object(j.jsx)("input",{className:"slider is-fullwidth",type:"range",id:"getSliderValue",min:"0",max:"7",step:"1",value:c,onChange:function(e){s(e.target.value),o(O[e.target.value][0]),b(O[e.target.value][1])}}),Object(j.jsxs)("output",{for:"sliderWithValue",children:[r,"\u301c",h]}),Object(j.jsx)(S,{})]})})})})},D=(c(93),function(){var e=Object(l.useState)([]),t=Object(i.a)(e,2),c=t[0],s=t[1];return Object(l.useEffect)((function(){Object(r.a)(a.a.mark((function e(){var t,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/.netlify/functions/getData");case 2:return t=e.sent,e.next=5,t.json();case 5:c=e.sent,s(c);case 7:case"end":return e.stop()}}),e)})))()}),[]),console.log(c),Object(j.jsxs)("div",{children:[Object(j.jsx)(o,{}),Object(j.jsxs)("div",{className:"columns is-gapless",children:[Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)(C,{}),Object(j.jsx)(N,{})]}),Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)(O,{}),Object(j.jsxs)("div",{className:"columns is-gapless",children:[Object(j.jsx)("div",{className:"column",children:Object(j.jsx)(b,{})}),Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)(h,{}),Object(j.jsx)(u,{})]})]})]})]}),Object(j.jsx)(d,{})]})}),E=c(4),A=Object(E.b)({user:f}),J=Object(x.a)({reducer:A});c(94);Object(s.render)(Object(j.jsx)(m.a,{store:J,children:Object(j.jsx)(D,{})}),document.querySelector("#content"))}},[[95,1,2]]]);
//# sourceMappingURL=main.063c75b4.chunk.js.map