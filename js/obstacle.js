class Obstacle extends GameElement {
  constructor(scene, type) {
    super(scene);
    this.image = this.loadSprite('images/totem/totem' +type +'.png');
    this.widthBase  = 200;
    this.heightBase = 1024;
    this.initPostion();
    this.loaded = true;
  }

  initPostion() {
    this.gameX = 600 + (Math.random() + 1) * this.scene.clientWidth;
    this.gameY = parseInt(Math.random() * 380);
    this.height = parseInt(400 + (this.gameY * 1.1));
    this.update();
  }

  updatePosition() {
    if (this.gameX > -300) {
      this.gameX -= 10 + parseInt(this.gameY / 200);
    } else {
      this.gameX = 600 + (Math.random() + 1) * this.scene.clientWidth;
      this.gameY = parseInt(Math.random() * 380);
      this.height = parseInt(400 + (this.gameY * 1.1));
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
