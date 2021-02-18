const fs = require('fs')
const utility = require('./utility')
const path = require('path');

function build(p, ancestors) {
  if (path.extname(p) == '.md') {
    // ancestors = ancestors.slice(0, -1);
    if (p.includes('_index.md'))
      ancestors = ancestors.slice(0, -1);
    utility.addMetadata(p, {
      ancestors: ancestors
    })
    // const base = path.basename(p, '.md')
    // if (base.includes("index")) return;
    // const title = utility.readMd(p).data.title;
    // console.log(ancestors)
  } else if (utility.isDir(p)){
    let childs = fs.readdirSync(p);
    childs.forEach(x => {  
      build(path.join(p, x), ancestors.concat(p.replace('content', '')))
    })
  }
}

build('content/novel', [])