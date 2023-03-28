// ==UserScript==
// @name        去掉小尾巴
// @namespace   Violentmonkey Scripts
// @match       https://wallstreetcn.com/live/global
// @grant       none
// @version     2.0
// @author      -
// @description 2023/3/29 0:17
// ==/UserScript==
[...document.querySelectorAll('*')].forEach(item=>{
    item.oncopy = function(e) {
        navigator.clipboard.writeText(window.getSelection().toString());
    }
});
