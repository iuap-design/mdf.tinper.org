const marked = require("marked");
const fs = require('fs-extra');
const path = require('path');
const render = require('koa-ejs');
const sidebar = require('../../static/sidebar.json');
const menu = require('../../static/menu.json');
const renderer = new marked.Renderer();

renderer.heading = function (text, level,c,slugger) {
  let h = slugger.slug('h') 
  if (level > 1) {
    return `<h${level} id="${h+text}">${text}</h${level}/>`
  } else {
    return `<h${level}>${text}</h${level}/>`
  }
}

renderer.image = function(href,title,text){
  return `<div class="img-out-div"><img src="${href}" alt="${text}" title="${title}" /></div>`
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

function getFirstKey (nodes) {
  for (let item of nodes || []) {
    if (!item.children && item.key) {
      return item.key
    } 
    if (item.children) {
      let key = getFirstKey(item.children)
      if (key) {
        return key
      }
    }
  }
  return ''
}


module.exports = {
  guide: async ctx => {
    await ctx.render('../views/guide', {
      sidebar: sidebar
    })
  },
  docs: async (ctx, next) => {
    let indexData = fs.readFileSync('./static/tinper_gbimbg/index.html','utf-8')
    ctx.type = 'text/html'
    ctx.response.body = indexData;
  }
}