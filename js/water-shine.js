class WaterShine extends GameElement {
  constructor(scene) {
    super(scene);
    this.widthBase  = 10 + Math.round(Math.random()*200);
    this.heightBase = 2;
    this.transparent = 0
    this.initPostion();
    this.loaded = true;
  }

  initPostion() {
    this.gameX = (Math.random() + 1) * this.scene.clientWidth;
    this.gameY = parseInt(Math.random() * 380);
    this.update();
  }

  updatePosition() {
    if (this.gameX > -(this.widthBase + 100)) {
      this.gameX -= 10 + parseInt(this.gameY / 40);
      const transparent =this.gameX / this.scene.clientWidth;
      this.transparent = transparent > 1 ? 1 :
                         transparent < 0.1  ? 0.1 : transparent;
    } else {
      this.gameX = 10 + this.scene.clientWidth;
      this.widthBase  = 10 + parseInt(Math.random() * 200);
      this.gameY = parseInt(Math.random() * 380);
    }
  }

  draw() {
    return '<rect ' +
      'x="' + this.x + '" ' +
      'y="' + this.y + '" ' +
      'height="2" ' +
      'width="' + this.widthBase + '" ' +
      'fill="rgb(0,255,255)" fill-opacity="' + this.transparent  + '"/>';
  }
}
