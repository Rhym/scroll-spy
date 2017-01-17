Scroll Spy
==========

[![npm version](https://badge.fury.io/js/%40ryanpotternz%2Fscroll-spy.svg)](https://badge.fury.io/js/%40ryanpotternz%2Fscroll-spy)

Add classes to an object based on it's position in the window.

Syntax
------

```javascript
import ScrollSpy from '@ryanpotternz/scroll-spy';

ScrollSpy(elements);
```

* elements is an optional string representing the list of class names to match; class names are separated by white space. See the [getElementsByClassName()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) page for more documentation.

Usage
-----

Add `.js-scroll-spy` to an element to track it's position (if you haven't specified elements).