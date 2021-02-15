const matter = require('gray-matter');
const YAML = require('yaml');
const fs = require('fs');
const TOML = require('toml')

function isDir(p) {
  return fs.statSync(p).isDirectory();
}

function readMd(p) {
  const res = fs.readFileSync(p, { encoding: 'utf-8' })
  if (res.slice(0, 3) == '+++')
    return matter(res, {
      language: 'toml',
      delims: '+++',
      engines: {
        toml: TOML.parse.bind(TOML),
      }
    });
  return matter(res);
}

function writeMd(p, data, content) {
  fs.writeFileSync(p, `---\n${YAML.stringify(data)}---\n${content}`)
}

function addMetadata(p, data) {
  const res = readMd(p);
  writeMd(p, Object.assign(res.data, data), res.content);
}

exports.readMd = readMd
exports.writeMd = writeMd
exports.addMetadata = addMetadata
exports.isDir = isDir