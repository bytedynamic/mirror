// ==UserScript==
// @name        去掉小尾巴
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     2.3
// @author      LX
// @supportURL  https://github.com/bytedynamic/mirror/tree/main/monkey_scripts
// @homepageURL https://github.com/bytedynamic/mirror/tree/main/monkey_scripts
// @downloadURL https://ghproxy.net/https://raw.githubusercontent.com/bytedynamic/mirror/main/monkey_scripts/remove_copy_tail.user.js
// @updateURL   https://ghproxy.net/https://raw.githubusercontent.com/bytedynamic/mirror/main/monkey_scripts/remove_copy_tail.user.js
// @description 2023/3/30 15:00
// ==/UserScript==
[...document.querySelectorAll('*')].forEach(item=>{
    item.oncopy = function(e) {
        navigator.clipboard.writeText(window.getSelection().toString());
    }
});
