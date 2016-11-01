const _throttle = require('lodash/throttle');

class ScrollSpy {

  constructor() {
    this.throttleSpeed     = 200;
    this.scrollPosY        = 0;
    this.currentScrollPosY = 0;
    this.onTop             = true;
    this.scrollOffsetY     = 1; // toggle style / class when scrolling below this position (in px)
    this.elements          = document.getElementsByClassName('js-scroll-spy');
    this.classes           = {
      above: 'js-is-above',
      below: 'js-is-below',
      scrollUp: 'js-scrolled-up',
      scrollDown: 'js-scrolled-down',
    };

    // Add initial style / class to elements when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      // Defer initialization to allow browser to restore scroll position
      window.setTimeout(this.init.bind(this), 1);
    });

    // Register for window scroll events, and throttle them.
    window.addEventListener('scroll', _throttle(() => {
      this.onScroll();
    }, this.throttleSpeed));
  }

  /**
   * @desc Style elements when above scroll position
   */
  aboveScrollPos() {
    for (let i = 0; this.elements[i]; i += 1) {
      this.elements[i].classList.add(this.classes.above);
      this.elements[i].classList.remove(this.classes.below);
    }
  }

  /**
   * @desc Style elements when below scroll position
   */
  belowScrollPos() {
    for (let i = 0; this.elements[i]; i += 1) {
      this.elements[i].classList.add(this.classes.below);
      this.elements[i].classList.remove(this.classes.above);
    }
  }

  /**
   * @desc Add a class to the body based on scroll direction.
   */
  scrollDirection() {
    const body = document.body;
    if (this.currentScrollPosY >= this.scrollPosY) {
      body.classList.add(this.classes.scrollUp);
      body.classList.remove(this.classes.scrollDown);
    } else {
      body.classList.add(this.classes.scrollDown);
      body.classList.remove(this.classes.scrollUp);
    }
    // Update current scroll position.
    this.currentScrollPosY = window.pageYOffset;
  }

  /**
   * @desc Check scroll position
   */
  onScroll() {
    this.scrollPosY = window.pageYOffset;
    window.requestAnimationFrame(this.scrollDirection.bind(this));
    // if we were above, and are now below scroll position...
    if (this.onTop && this.scrollPosY > this.scrollOffsetY) {
      this.onTop = false;
      // asynchronously add style / class to elements
      window.requestAnimationFrame(this.belowScrollPos.bind(this));
    } else if (!this.onTop && this.scrollPosY <= this.scrollOffsetY) {
      this.onTop = true;
      // asynchronously add style / class to elements
      window.requestAnimationFrame(this.aboveScrollPos.bind(this));
    }
  }

  /**
   * @desc Initially style elements based on scroll position
   */
  init() {
    this.scrollPosY = window.pageYOffset;
    if (this.scrollPosY > this.scrollOffsetY) {
      this.onTop = false;
      // asynchronously add style / class to elements
      window.requestAnimationFrame(this.belowScrollPos.bind(this));
    } else { // (scrollPosY <= scrollOffsetY)
      this.onTop = true;
      // asynchronously add style / class to elements
      window.requestAnimationFrame(this.aboveScrollPos.bind(this));
    }
  }

}

module.exports = ScrollSpy;
