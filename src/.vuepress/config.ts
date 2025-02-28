import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",

  lang: "en-US",
  title: "Yuan Heng's Blog",
  description: "Yuan Heng's Blog",
  // head: [
  //   [
  //     'link',
  //     {rel: 'icon', href: "logo.png"},
  //   ]
  // ],
  // locales: {
  //   "/": {
      
      
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "博客演示",
  //     description: "vuepress-theme-hope 的博客演示",
  //   },
  // },
  port: 7777,
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
