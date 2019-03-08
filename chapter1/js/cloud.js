class Cloud extends GameElement {
  constructor(scene) {
    super(scene);
    this.type="decoration";
    this.image = this.loadSprite('images/cloud.svg');
    this.widthBase  = 2000;
    this.heightBase = 2000;
    this.heightMin  = 2000;
    this.initPostion();
    this.loaded = true;
    this.z=0;
  }

  initPostion() {
    this.gameX = this.widthBase + this.scene.clientWidth;
    this.gameY = parseInt(Math.random() * 380);
  }

  drawShadow() {
    return '';
  }
  
  updatePosition() {
    if (this.gameX > -this.width) {
      this.gameX -= parseInt((10 + parseInt(this.gameY / 200)) * this.gameSpeed);
    } else {
      this.initPostion();
    }
  }
}
