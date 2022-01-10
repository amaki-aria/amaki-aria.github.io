const utility = require('./utility')
const fs = require('fs')
const path = require('path');
const render = require('./render-txt').render;
const nzh = require('nzh/cn')

const DEBUG = false

function generate_chapter(chapter) {
  const res = utility.readMd(chapter);
  return `${res.data.title}\n${render(res.content)}`
}

function generate_volume(volume, no_volume_title = false) {
  const res = utility.readMd(path.join(volume, '_index.md'));
  let content;
  childs = fs.readdirSync(volume).map(x => path.join(volume, x)).filter(x => !x.includes('index')).sort((a, b) => {
    x = utility.readMd(a).data.weight;
    y = utility.readMd(b).data.weight;
    return x-y;
  })
  content = childs.map(chapter => generate_chapter(chapter));
  if (no_volume_title) {
    return content.join('\n')
  } else {
    return [`${res.data.title}\n`].concat(content).join('\n')
  }
}

function generate_book(book, no_subdir = false) {
  const meta = utility.readMd(path.join(book, '_index.md'));
  const intro = meta.content.trim() == '' ? '无\n' : render(meta.content)
  const prefix = `${meta.data.title}\n\n作者：${meta.data.author}\n\n简介：\n${intro}\n`

  childs = fs.readdirSync(book);
  
  if (no_subdir) {
    return prefix + generate_volume(book, true)
  } else {
    childs = childs.map(x => path.join(book, x)).filter(x => utility.isDir(x)).sort((a, b) => {
      match_a = a.match(/第([^卷]+)卷/)?.at(1)
      match_b = b.match(/第([^卷]+)卷/)?.at(1)
      if (match_a == undefined || match_b == undefined) {
        weight_a = utility.readMd(path.join(a, '_index.md')).data.weight;
        weight_b = utility.readMd(path.join(b, '_index.md')).data.weight;
        return weight_a - weight_b
      } else {
        num_a = isNaN(match_a) ? nzh.decodeS(match_a) : match_a
        num_b = isNaN(match_b) ? nzh.decodeS(match_b) : match_b
        if (DEBUG) {
          console.log(`${a} => ${match_a} => ${num_a}`)
          console.log(`${b} => ${match_b} => ${num_b}`)
        }
        return num_a - num_b
      }
    })
    content = childs.reduce((sum, volume) => sum.concat(generate_volume(volume)), [])
    return prefix + content.join('\n')
  }
}

const prefix = 'static/resources'
fs.mkdirSync(prefix, {
  recursive: true
})

let books = [
  '魔女之吻乃百合之味1：梦与希望的女神',
  '魔女之吻乃百合之味2：星空梦夜万华镜',
  '魔女之吻乃百合之味3：扭曲世界的残影',
  '魔女之吻外传：乐园之梦',
  '魔女之吻外传：枕上的魔法使',
]

let single_volume_books = [
  '魔女之吻外传：10days~双子大小姐的奴隶生活',
  '魔女之吻外传：千羽优佳日记',
  '魔女之吻外传：圣女调教日记',
  '魔女之吻外传：魅魔少女想要个妹妹',
  '魔女之吻·番外短篇集',
  '白珍珠的泡沫恋曲',
  '吸血姬之夜',
  '姐妹百合短篇集/与诱受圣女妹妹的日常',
  '姐妹百合短篇集/姐姐，在时光流逝前都要抱紧我哦',
]

books.forEach(s => {
  fs.writeFileSync(
    path.join(prefix, `${s}.txt`),
    generate_book(`content/novel/${s}`)
  )
})

single_volume_books.forEach(s => {
  fs.writeFileSync(
    path.join(prefix, `${s.split('/').at(-1)}.txt`),
    generate_book(`content/novel/${s}`, true)
  )
})