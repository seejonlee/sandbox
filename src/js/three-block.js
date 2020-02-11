class ThreeBlock {
  constructor(selector) {
    this.root = document.querySelector(selector);
    this.headingBlock = this.root.querySelector(selector + '__headings');
    console.log(this.root);
    console.log(this.headingBlock);
    console.log('booyakasha!!!');
    this.setOnScroll();
  }

  setOnScroll() {
    if (!!window.IntersectionObserver) {
      let observer = new IntersectionObserver((entries) => {
        let entry = entries[0];
        console.log(entry);
        let rect = entry.target.getBoundingClientRect();
        console.log(rect);
        if (entry.isIntersecting) {
          // let rect = entry.target.getBoundingClientRect();
          // console.log(rect);
        }
      }, {
        threshold: [0, 1]
      });

      observer.observe(this.headingBlock);
    }
  }
}

export default ThreeBlock;
