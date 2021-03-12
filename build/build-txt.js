const utility = require('./utility')
const fs = require('fs')
const path = require('path');
const render = require('./render-txt').render;
const nzh = require('nzh/cn')

function generate_chapter(chapter) {
  const res = utility.readMd(chapter);
  return `${res.data.title}\n${render(res.content)}`
}

function generate_volume(volume) {
  const res = utility.readMd(path.join(volume, '_index.md'));
  let content;
  childs = fs.readdirSync(volume).map(x => path.join(volume, x)).filter(x => !x.includes('index')).sort((a, b) => {
    x = utility.readMd(a).data.weight;
    y = utility.readMd(b).data.weight;
    return x-y;
  })
  content = childs.map(chapter => generate_chapter(chapter));
  return [`${res.data.title}\n`].concat(content).join('\n')
}

function generate_book(book) {
  const meta = utility.readMd(path.join(book, '_index.md'));
  const prefix = `${meta.data.title}\n\n作者：${meta.data.author}\n\n简介：\n${render(meta.content)}\n`

  childs = fs.readdirSync(book);
  childs = childs.map(x => path.join(book, x)).filter(x => utility.isDir(x)).sort((a, b) => {
    return nzh.decodeS(a.match(/第([^卷]+)卷/)[1]) - nzh.decodeS(b.match(/第([^卷]+)卷/)[1])
  })
  content = childs.reduce((sum, volume) => sum.concat(generate_volume(volume)), [])
  return prefix + content.join('\n')
}

const prefix = 'static/resources'
fs.mkdirSync(prefix, {
  recursive: true
})

let books = [
  '魔女之吻乃百合之味1：梦与希望的女神',
  '魔女之吻乃百合之味2：星空梦夜万华镜',
  '魔女之吻外传：乐园之梦',
]

books.forEach(s => {
  fs.writeFileSync(
    path.join(prefix, `${s}.txt`),
    generate_book(`content/novel/${s}`)
  )
})