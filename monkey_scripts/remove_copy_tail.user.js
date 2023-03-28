// ==UserScript==
// @name        去掉小尾巴
// @namespace   Violentmonkey Scripts
// @match       https://wallstreetcn.com/live/global
// @grant       none
// @version     1.0
// @author      -
// @description 2023/1/3 15:02:16
// ==/UserScript==
[...document.querySelectorAll('*')].forEach(item=>{
    item.oncopy = function(e) {
        e.stopPropagation();
    }
});
