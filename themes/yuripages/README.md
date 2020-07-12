> Note: Initial stage quality. No backward-compatibility is guaranteed. Still going under development. Config values may not be backwards-compatible at all.

# YuriPages

YuriPages is a theme made with BootStrap for novel authors. The main difference than other themes is that categorizing is mainly based on directory structure.

### Getting Started:

Just simply download or clone this repository, and drop it into 

### **Commonly needed config entries**:

###### CJK language users:

Add this line (or equivalent) in config file `config.[toml|yaml|json]` :

`hasCJKLanguage = true`

to enable the correct wordcount for Chinese / Japanese / Korean.

###### If markdown file contains HTML syntax:

To render them, enable unsafe mode for Goldmark:

```toml
[markup]
	[markup.goldmark]
		[markup.goldmark.renderer]
			unsafe = true
```



### Configurable Parameters

In the `[params]` section of the config file, these options are available:

`description`  : Part of the footer, describe the site in few words.

`author` : Part of the footer, your name. (It should actually named "maintainer" because there is another front-matter entry called "author".)

------

# Todo:

- [ ] Bookmarks (progress marking) and probably a bookshelf implemented in JavaScript and data is stored in LocalStorage.
- [x] Night mode, implemented by changing colors using JS. 
- [ ] Cover images for books in `index.html` .
- [x] Turn the page with arrow keys (left = prev page, right = next page, Z = down half page).

- [ ] 文案没中文，差评
