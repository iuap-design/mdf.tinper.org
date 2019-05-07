const marked = require("marked");
const fs = require('fs-extra');
const path = require('path');
const render = require('koa-ejs');
const sidebar = require('../../static/sidebar.json');
const menu = require('../../static/menu.json');
const renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  if (level > 1) {
    return `<h${level} id="${text}">${text}</h${level}/>`
  } else {
    return `<h${level}>${text}</h${level}/>`
  }
}

renderer.link = function (href, title, text) {
  var target = '';
  if (href) {
    target = "_blank";
  } else {
    href = 'javacript:void(0);'
  }
  return `<a target="${target}" href="${href}" style="color:#E14C46" title="${text}" >${text}</a>`;
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


module.exports = {
  index: async (ctx, next) => {
    let component = ctx.params.component || 'gs';
    let rightMenu = [];
    if(menu[component])rightMenu=menu[component];
    let filePath = path.join(__dirname, `../../docs/${component}.md`);
    let data = await fs.readFileSync(filePath, 'utf-8');
    data = marked(data);
    data = data
      .replace(/\<table/gi, '<div class="table-container">\n<table')
      .replace(/<\/table>/gi, "</table>\n</div>\n");

    await ctx.render('index', {
      sidebar: sidebar,
      docs: data,
      active: component,
      rightMenu: rightMenu,
      latestVersion:'2.0.7'
    });
  }
}