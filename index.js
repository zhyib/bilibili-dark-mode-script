// ==UserScript==
// @name         B站自动深色模式 Bilibili auto dark mode
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  B站自动深色模式
// @author       zhyib
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  // Vue 3: depth-first walk over the vnode tree, returns the first non-null visit(v)
  function walkV3(rootVNode, visit) {
    const stack = [rootVNode];
    const seen = new Set();
    while (stack.length) {
      const v = stack.pop();
      if (!v || typeof v !== 'object' || seen.has(v)) continue;
      seen.add(v);
      const hit = visit(v);
      if (hit) return hit;
      if (v.component) stack.push(v.component.subTree);
      else if (Array.isArray(v.children)) for (const c of v.children) stack.push(c);
      else if (v.suspense) stack.push(v.suspense.activeBranch || v.suspense.pendingBranch);
    }
    return null;
  }

  // poll until the container exists and Vue has mounted on it (container._vnode is set)
  async function waitForVNode(selector, timeout = 5000) {
    const deadline = Date.now() + timeout;
    for (;;) {
      const vnode = document.querySelector(selector)?._vnode;
      if (vnode) return vnode;
      if (Date.now() > deadline) throw new Error(`waitForVNode: 超时未找到 ${selector} 的 _vnode`);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  (async () => {
    const root = await waitForVNode(location.href === 'https://www.bilibili.com/' ? '#app' : '[data-v-app]');

    // BiliHeader's setup() calls provide("emitter", <event bus>), shared with its children via inject("emitter").
    // Emitting on that bus is the same as clicking the dark-mode toggle in the header: it re-themes the header
    // itself, calls the page's themeSwitchHandler, and broadcasts global.themeChange.
    const emitter = walkV3(root, (v) => v.component?.provides?.emitter);
    if (!emitter) {
      console.warn('B站自动深色模式: 未找到顶栏的 emitter 事件总线，跳过深浅色切换');
      return;
    }

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => emitter.emit('themeChange', darkModeQuery.matches ? 'dark' : 'light');

    apply();
    darkModeQuery.addEventListener('change', apply);
  })();
})();
