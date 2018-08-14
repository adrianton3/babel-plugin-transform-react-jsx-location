# babel-plugin-transform-react-jsx-location

Adds a `data-source` attribute to JSX tags containing the file name and 
line number of the original source.

Use this plugin to locate which file is generating an element in your
page/app. Simply right click on an element in your favourite browser, 
then hit *Inspect* and the location of the source is revealed in the 
`data-source` attribute.

This plugin is intended to help with debugging while developing; 
**use in production is not recommended!**

![data-source attributes can be viewed in the elements inspector](https://cloud.githubusercontent.com/assets/1701763/22403856/ca7ba990-e624-11e6-98b2-49c97355e22d.png)
*elements inspector for the [mzabriskie/react-example](https://github.com/mzabriskie/react-example) app*

## Installation

```bash
npm install babel-plugin-transform-react-jsx-location
```

## Usage

### Via `.babelrc` (Recommended)

```js
// without options
{
  "plugins": ["transform-react-jsx-location"]
}

// with options
{
  "plugins": [
  	["transform-react-jsx-location", { 
  	    "filename": "compact",
  	    "attributeName": "source",
  	    "exclude": ["div"] // defaults to ["Fragment"]
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx-location script.js
```

### Via Node API

```js
require('babel').transform('code', {
	plugins: ['transform-react-jsx-location']
})
```
