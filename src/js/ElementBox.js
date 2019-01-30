export default class ElementBox {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.boundingBox = this.updateBoundingBox();
  }
  
  updateBoundingBox() {
    return this.element.getBoundingClientRect();
  }
}