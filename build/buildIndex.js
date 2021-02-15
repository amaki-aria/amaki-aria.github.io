const fs = require('fs')
const utility = require('./utility')
const path = require('path');

const res = {};

function build(p) {
  if (path.extname(p) == '.md') {
    const base = path.basename(p, '.md')
    if (base.includes("index")) return;
    const title = utility.readMd(p).data.title;
    // console.log(base, title);
    return {
      base,
      title,
    }
  } else if (utility.isDir(p)){
    let childs = fs.readdirSync(p);
    childs = childs.map(x => path.join(p, x));
    const res = {
      base: path.basename(p),
      childs: []
    };
    if (fs.existsSync(path.join(p, '_index.md'))) {
      res.title = utility.readMd(path.join(p, '_index.md')).data.title;
    }
    if (!res.title) res.title = res.base;

    childs.forEach(x => res.childs.push(build(x)));
    res.childs = res.childs.filter(x => Boolean(x));
    return res;
  }
}
const output = `window.DATA = ${JSON.stringify(build('content/novel'))}`
fs.writeFileSync('static/data.js', output)