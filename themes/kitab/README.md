# kitab theme

The kitab Theme is a simple theme meant for publishing books.

## Demo
[Click here](https://kitabdemo.netlify.com/) for a live demo.

## Installation

Inside the folder of your Hugo site run:

    $ cd themes
    $ git clone https://github.com/darshanbaral/kitab.git

For more information read the official [setup guide](//gohugo.io/overview/installing/) of Hugo.

## Getting started

After installing the kitab Theme successfully, modify the `config.toml` as you wish.

### The config file

You'll find a file called [`config.toml`](https://github.com/darshanbaral/kitab/blob/master/exampleSite/config.toml). Copy the `config.toml`to the root folder of your Hugo site and customize it per your need.

## Adding books

- Create a folder inside the `content` folder for each book
- Add `_index.md` inside the folder for book with meta data such as book title, author, book cover image, and date.
- Create a new file for each chapter of the book.

### Book Cover Images

The book cover image can be specified in the `_index.md` of the section folder. If the book cover image is big in size, a copy that is reduced in size can be specified as a thumbnail. See the [`_index.md`](https://github.com/darshanbaral/kitab/tree/master/exampleSite/content/emma) in exampleSite for example.
