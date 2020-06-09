> Note: Initial stage quality. No backward-compatibility is guaranteed. Still going under development. Config values may not be backwards-compatible at all.

# YuriPages

YuriPages is a theme made with BootStrap for novel authors. The main difference than other themes is that categorizing is mainly based on directory structure.

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

- Enabling or disabling features via config file (or possibly also by another file.)
- Bookmarks, real breadcrumb, and bookshelf implemented by javascript.