/*
MIT License

Copyright (c) 2019 Eric Buss

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const marked = require('marked');

const blockFn   = s => s + '\n';
const quoteFn   = s => '\n　　' + s.replaceAll('\n', '\n　　') + '\n';
const inlineFn  = s => s;
const newlineFn = () => '\n';
const emptyFn   = () => '';

const renderer = {
  code:       blockFn,
  blockquote: quoteFn,
  html:       emptyFn,
  heading:    blockFn,
  hr:         () => '------------\n',
  list:       blockFn,
  listitem:   (text) => blockFn(text),
  paragraph:  blockFn,
  table:      (header, body) => blockFn(header) + blockFn(body),
  tablerow:   blockFn,
  tablecell:  blockFn,
  // Inline elements
  strong:   inlineFn,
  em:       inlineFn,
  codespan: inlineFn,
  br:       newlineFn,
  del:      inlineFn,
  link:     (_0, _1, text) => inlineFn(text),
  image:    (_0, _2, text) => inlineFn("图像："+text),
  text:     inlineFn,
}

function render(str) {
  return (str
    ? marked(str, {renderer: renderer})
    : ''
  )
}

exports.render = render