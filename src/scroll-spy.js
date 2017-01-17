import throttle from 'lodash/throttle';

class ScrollSpy {

  /**
   * @param elements string Optional specified class to target.
   */
  constructor(elements = 'js-scroll-spy') {
    if (typeof window === 'undefined') return;

    this.currentScrollPosY = 0;
    this.elements          = document.getElementsByClassName(elements);
    this.classes           = {
      above: 'js-is-above',
      below: 'js-is-below',
      visible: 'js-is-visible',
      seen: 'js-has-been-visible',
      scrolled: 'js-is-scrolled',
      scrollUp: 'js-scrolled-up',
      scrollDown: 'js-scrolled-down',
    };

    document.addEventListener('DOMContentLoaded', () => {
      // Defer initialization to allow browser to restore scroll position
      window.setTimeout(() => {
        this.handleScroll();
      }, 0);
    });

    window.addEventListener('scroll', throttle(() => {
      this.handleScroll();
    }, 100));

    window.addEventListener('resize', throttle(() => {
      this.handleScroll();
    }, 100));
  }

  /**
   * @desc Assign the appropriate class to the element based on it's position to the window.
   */
  toggleElementClasses() {
    const windowBottomPosition = this.currentScrollPosY + window.innerHeight;
    for (let i = 0; this.elements[i]; i += 1) {
      const element        = this.elements[i];
      const height         = element.offsetHeight;
      const offset         = element.offsetTop;
      const bottomPosition = height + offset;

      if ((offset >= this.currentScrollPosY && offset <= windowBottomPosition) || (bottomPosition >= this.currentScrollPosY && bottomPosition <= windowBottomPosition)) {
        // If bottom position is within the current window
        element.classList.add(this.classes.seen);
        element.classList.add(this.classes.visible);
        element.classList.remove(this.classes.above);
        element.classList.remove(this.classes.below);
      } else if (bottomPosition <= this.currentScrollPosY) {
        // If bottom position is above the current window
        element.classList.add(this.classes.above);
        element.classList.remove(this.classes.below);
        element.classList.remove(this.classes.visible);
      } else {
        // If bottom position is below the current window view
        element.classList.add(this.classes.below);
        element.classList.remove(this.classes.above);
        element.classList.remove(this.classes.visible);
      }
    }
  }

  /**
   * @desc Add a class to the body based on scroll direction.
   */
  toggleBodyClasses() {
    const body = document.body;
    // If the body has been scrolled
    if (window.pageYOffset > 0) {
      body.classList.add(this.classes.scrolled);
    } else {
      body.classList.remove(this.classes.scrolled);
    }
    // Set the direction of the scroll
    if (this.currentScrollPosY >= window.pageYOffset) {
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
   * @desc Handle when a user scrolls.
   */
  handleScroll() {
    window.requestAnimationFrame(this.toggleBodyClasses.bind(this));
    window.requestAnimationFrame(this.toggleElementClasses.bind(this));
  }

}

export default elements => new ScrollSpy(elements);
