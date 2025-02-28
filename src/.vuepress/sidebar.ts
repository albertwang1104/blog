import { sidebar } from "vuepress-theme-hope";

export const Sidebar = sidebar({
  "/": [
    "",
    // {
    //   text: "Demo",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "Posts",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    // {
    //   text: "Slides",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html",
    // },
  ],
});
