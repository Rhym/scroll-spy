Scroll Spy
==========

Add classes to an object based on it's position in the window.

Syntax
------

```javascript
import ScrollSpy from '@ryanpotternz/scroll-spy';

const ScrollSpyInstance = new ScrollSpy(elements);
```

* elements is an optional string representing the list of class names to match; class names are separated by white space. See the [getElementsByClassName()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) page for more documentation.

Usage
-----

Add `.js-scroll-spy` to an element to track it's position (if you haven't specified elements).