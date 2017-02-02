class Stone extends GameElement {
  constructor(scene, type) {
    super(scene);
    this.image = this.loadSprite('images/stone/stone' + type +'.png');
    this.widthBase  = 256;
    this.heightBase = 256;;
    this.initPostion();
    this.loaded = true;
  }

  initPostion() {
    this.gameX = 100 + this.scene.clientWidth;
    this.gameY = parseInt(Math.random() * 380);
    this.height = parseInt(80 + (this.gameY * 0.3));
    this.update();
  }

  updatePosition() {
    if (this.gameX > -this.width) {
      this.gameX -= 10 + parseInt(this.gameY / 200);
    } else {
      this.gameX = 100 + this.scene.clientWidth;
      this.gameY = parseInt(Math.random() * 380);
      this.height = parseInt(80 + (this.gameY * 0.3));
    }
  }
}
