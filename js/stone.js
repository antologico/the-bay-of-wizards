class Stone extends GameElement {
  constructor(scene, type) {
    super(scene);
    this.type="obstacle";
    this.image = this.loadSprite('images/stone/stone' + type +'.png');
    this.widthBase  = 256;
    this.heightBase = 256;
    this.heightMin  = 80;
    this.initPostion();
    this.loaded = true;
  }

  initPostion() {
    this.gameX = 100 + this.scene.clientWidth;
    this.gameY = parseInt(Math.random() * 380);
  }

  drawShadow() {}

  updatePosition() {
    if (this.gameX > -this.width) {
      this.gameX -= parseInt((10 + parseInt(this.gameY / 200)) * this.gameSpeed);
    } else {
      this.initPostion();
    }
  }
}
