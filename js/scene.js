class Scene {
  constructor(element) {
    this.element = element;
    this.clientWidth = element.clientWidth || element.parentNode.clientWidth;
    this.clientHeight = element.clientHeight || element.parentNode.clientHeight;
  }

  draw(html) {
    this.element.innerHTML = html;
  }

  add(html) {
    this.element.innerHTML += html;
  }
}
