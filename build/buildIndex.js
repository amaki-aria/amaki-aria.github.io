const fs = require('fs')
const utility = require('./utility')
const path = require('path');

function build(p) {
  if (path.extname(p) == '.md') {
    const base = path.basename(p, '.md')
    if (base.includes("index")) return;
    const data = utility.readMd(p).data;
    // console.log(base, title);
    return {
      base,
      title: data.title,
      weight: data.weight,
    }
  } else if (utility.isDir(p)){
    let childs = fs.readdirSync(p);
    childs = childs.map(x => path.join(p, x));
    const res = {
      base: path.basename(p),
      childs: []
    };
    if (fs.existsSync(path.join(p, '_index.md'))) {
      const data = utility.readMd(path.join(p, '_index.md')).data;
      res.title = data.title;
      res.weight = data.weight;
    }
    if (!res.title) res.title = res.base;

    childs.forEach(x => res.childs.push(build(x)));
    res.childs = res.childs.filter(x => Boolean(x));
    return res;
  }
}
const output = `window.DATA = ${JSON.stringify(build('content/novel'))}`
fs.writeFileSync('static/data.js', output)