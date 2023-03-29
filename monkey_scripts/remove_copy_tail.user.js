// ==UserScript==
// @name        去掉小尾巴
// @namespace   Violentmonkey Scripts
// @match       https://wallstreetcn.com/*
// @match       https://*.zhihu.com/*
// @grant       none
// @version     2.1
// @author      LX
// @downloadURL https://github.com/bytedynamic/mirror/raw/main/monkey_scripts/remove_copy_tail.user.js
// @updateURL   https://github.com/bytedynamic/mirror/raw/main/monkey_scripts/remove_copy_tail.user.js
// @description 2023/3/29 12:45
// ==/UserScript==
[...document.querySelectorAll('*')].forEach(item=>{
    item.oncopy = function(e) {
        navigator.clipboard.writeText(window.getSelection().toString());
    }
});
