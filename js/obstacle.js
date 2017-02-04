class Obstacle extends GameElement {
  constructor(scene, type) {
    super(scene);
    this.type="obstacle";
    this.image = this.loadSprite('images/totem/totem' +type +'.png');
    this.widthBase  = 200;
    this.heightBase = 1024;
    this.initPostion();
    this.loaded = true;
    this.heightMin = 600;
  }

  initPostion() {
    this.gameX = 600 + (Math.random() + 1) * this.scene.clientWidth;
    this.gameY = parseInt(Math.random() * 380);
  }

  updatePosition() {
    if (this.gameX > -300) {
      this.gameX -= parseInt((10 + parseInt(this.gameY / 200)) * this.gameSpeed);
    } else {
      this.initPostion();
    }
  }

  drawShadow() {
    return '<path d="M' + (this.shadowX) +',' + (this.shadowY - 15) +
      ' l-1000,800' +
      ' 400,0' +
      ' ' + (600 + this.width) + ',-800,' +
      ' -' + this.width + ',0' +
      '" style="fill:#052e38"/>';
  }
}
