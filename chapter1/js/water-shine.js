class WaterShine extends GameElement {
  constructor(scene) {
    super(scene);
    this.heightBase = 2;
    this.transparent = 0
    this.initPostion();
    this.loaded = true;
  }

  initPostion() {
    this.widthBase  = 10 + Math.round(Math.random() * 200);
    this.gameX = parseInt(this.scene.clientWidth * (1 + Math.random()));
    this.gameY = parseInt(Math.random() * 380);
    this.transparent = this.scene.clientWidth;
  }

  updatePosition() {
    if (this.gameX > -this.widthBase) {
      this.gameX -= parseInt((10 + parseInt(this.gameY / 100)) * this.gameSpeed);
      const transparent =this.gameX / this.scene.clientWidth;
      this.transparent = transparent > 1 ? 1 : transparent < 0.1  ? 0.1 : transparent;
    } else {
      this.initPostion();
    }
  }

  draw() {
    return '<rect ' +
      'x="' + this.gameX + '" ' +
      'y="' + this.y + '" ' +
      'height="' + this.heightBase + '" ' +
      'width="' + this.widthBase + '" ' +
      'fill="rgb(0,255,255)" fill-opacity="' + this.transparent  + '"/>';
  }
}
