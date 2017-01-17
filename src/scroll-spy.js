import throttle from 'lodash/throttle';

class ScrollSpy {

  /**
   * @param elements string Optional specified class to target.
   */
  constructor(elements = 'js-scroll-spy') {
    this.windowHeight      = 0;
    this.throttleSpeed     = 200;
    this.scrollPosY        = 0;
    this.currentScrollPosY = 0;
    this.elements          = document.getElementsByClassName(elements);
    this.classes           = {
      above: 'js-is-above',
      below: 'js-is-below',
      visible: 'js-is-visible',
      seen: 'js-has-been-visible',
      scrollUp: 'js-scrolled-up',
      scrollDown: 'js-scrolled-down',
    };

    // Add initial style / class to elements when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      // Defer initialization to allow browser to restore scroll position
      window.setTimeout(this.init.bind(this), 0);
    });

    // Register for window scroll events, and throttle them.
    window.addEventListener('scroll', throttle(() => {
      this.onScroll();
    }, this.throttleSpeed));

    // Register for window resize events, and throttle them.
    window.addEventListener('resize', throttle(() => {
      this.windowHeight = window.innerHeight;
    }, this.throttleSpeed));
  }

  toggleClasses() {
    console.time('Assigning Classes');
    for (let i = 0; this.elements[i]; i += 1) {
      const element              = this.elements[i];
      const height               = element.offsetHeight;
      const offset               = element.offsetTop;
      const bottomPosition       = height + offset;
      const windowBottomPosition = this.currentScrollPosY + this.windowHeight;

      if ((offset >= this.currentScrollPosY && offset <= windowBottomPosition) || (bottomPosition >= this.currentScrollPosY && bottomPosition <= windowBottomPosition)) {
        // If bottom position is within the current window
        element.classList.add(this.classes.seen);
        element.classList.remove(this.classes.above);
        element.classList.remove(this.classes.below);
        element.classList.add(this.classes.visible);
      } else if (bottomPosition <= this.currentScrollPosY) {
        // If bottom position is above the current window
        element.classList.add(this.classes.above);
        element.classList.remove(this.classes.below);
        element.classList.remove(this.classes.visible);
      } else {
        // If bottom position is below the current window view
        element.classList.remove(this.classes.above);
        element.classList.add(this.classes.below);
        element.classList.remove(this.classes.visible);
      }
    }
    console.timeEnd('Assigning Classes');
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
    window.requestAnimationFrame(this.toggleClasses.bind(this));
  }

  /**
   * @desc Initially style elements based on scroll position
   */
  init() {
    this.windowHeight = window.innerHeight;
    this.scrollPosY   = window.pageYOffset;
    window.requestAnimationFrame(this.toggleClasses.bind(this));
  }

}

export default elements => new ScrollSpy(elements);
