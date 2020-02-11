const selectors = {
  link: '.tab-scroll__link',
  linkInactive: '.tab-scroll__link--inactive',
  section: '.tab-scroll__section'
}

export default class TabScroll {
  constructor(rootSelector) {
    this.rootElement = document.querySelector(rootSelector);
    this.navItems = this.rootElement.querySelectorAll(selectors.link);
    this.sections = this.rootElement.querySelectorAll(selectors.section);
    this.sectionEngineered = this.rootElement.querySelectorAll(selectors.section + '--engineered');
    this.sectionInstall = this.rootElement.querySelectorAll(selectors.section + '--install');
    this.sectionControl = this.rootElement.querySelectorAll(selectors.section + '--control');
    this.init();
  }

  init() {
    if (this.navItems) this.setAnchorOnClickHandler(this.navItems);
    this.setIntersectionObservers(this.sections);
  }

  setIntersectionObservers() {
    const opts = {
      root: null,
      threshold: [
        0.0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
        1
      ]
    };

    this.sections.forEach((section) => {
      console.log(section.id);
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        console.group(entry.target.id);
        console.log(entry.target);
        if (entry.isIntersecting) {
          // Check if element is near top of vp if scrolling up or bottom
          // of element is being scrolled into view if scrolling down.
          const bounds = entry.target.getBoundingClientRect();
          const top = bounds.top;
          const bottom = bounds.bottom;
          // console.log(top);
          // console.log(bottom);
          // Update if top or bottom section get scrolled into view.
          if ((top > 0 && top <= 100) || (top < 0 && bottom >= 100)) {
            console.log('updating');
            this.updateActiveSection(entry.target.id);
          }
        }
        console.groupEnd(entry.target.id);
      }, opts);
      observer.observe(section);
    });
  }

  setAnchorOnClickHandler(anchors) {
    anchors.forEach(element => {
      element.addEventListener('click', e => {
        const hrefVal = element.getAttribute('href');
        this.scrollToElement(hrefVal);

        // const id = hrefVal.replace('#', '');
        // this.updateActiveSection(id);
        e.preventDefault();
      });
    });    
  }

  scrollToElement(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      }); 
    }
  }

  updateHistoryHash(urlHash) {
    history.pushState(urlHash);
  }

  updateActiveSection(id) {
    if (id) {
      this.navItems.forEach((item) => {
        const navTarget = item.getAttribute('href').replace('#', '');
        if (navTarget !== id) {
          item.classList.add(selectors.linkInactive.replace('.', ''));
        } else {
          item.classList.remove(selectors.linkInactive.replace('.', ''));
        }
      });
    } else {
      this.navItems.forEach((item) => {
        item.classList.remove(selectors.linkInactive.replace('.', ''));
      })
    }
  }
}