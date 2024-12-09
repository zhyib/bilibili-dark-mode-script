// ==UserScript==
// @name         B站暗黑模式 Bilibili dark mode
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  B站暗黑模式
// @author       zhyib
// @match        https://*.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';
  const styleSheet = {
    '--bg1': '#101010',
    '--bg3': '#101010',
    '--Ga0': '#151515',
    '--Ga0_s': '#151515',
    '--Ga0_t': '#151515',
    '--Ga1': '#101010',
    '--Ga1_s': '#101010',
    '--Ga1_t': '#101010',
    '--Ga1_e': '#101010',
    '--Ga2': '#303030',
    '--Ga2_t': '#303030',
    '--Ga3': '#505050',
    '--Ga3_t': '#505050',
    '--Ga4': '#707070',
    '--Ga4_t': '#707070',
    '--Ga5': '#909090',
    '--Ga5_t': '#909090',
    '--Ga6': '#A0A0A0',
    '--Ga6_t': '#A0A0A0',
    '--Ga7': '#B0B0B0',
    '--Ga7_t': '#B0B0B0',
    '--Ga8': '#D0D0D0',
    '--Ga8_t': '#D0D0D0',
    '--Ga9': '#F0F0F0',
    '--Ga9_t': '#F0F0F0',
    '--Ga10': '#FFFFFF',
    '--Ga10_t': '#FFFFFF',
    '--Ga11': '#101010',
    '--Ga12': '#202020',
    '--Ga12_s': '#151515',
    '--Ga13': '#202020',
    '--Ga13_s': '#202020',
  };
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    const html = document.getElementsByTagName('html')[0];
    Object.entries(styleSheet).forEach(([k, v]) => {
      html.style.setProperty(k, v);
    })

    const bg = document.getElementsByClassName('bg')[0];
    bg.style.setProperty('background-image', `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), ${bg.style.getPropertyValue('background-image')}`)

  }
})();