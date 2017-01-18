#Scroll Spy

[![Travis branch](https://img.shields.io/travis/Rhym/scroll-spy/master.svg?style=flat-square)]()

> Add classes to an object based on it's position in the window.

**YARN**

```sh
yarn add @ryanpotternz/scroll-spy
```

**NPM**

```sh
npm install --save @ryanpotternz/scroll-spy
```

###Usage

```javascript
import ScrollSpy from '@ryanpotternz/scroll-spy';

ScrollSpy(elements); // @param {string} elements
```

* elements is an optional string representing the list of class names to match; class names are separated by white space. See the [getElementsByClassName()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) page for more documentation.