class GameElement {
  constructor(scene) {
    this.loaded = true;
    this.image = '';
    this.scene  = scene;
    this.width = 0;
    this.height = 0;
    this.gameX = 0;
    this.sprites = [];
    this.gameY = 0;
    this.widthBase = 0;
    this.heightBase = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.shadowX = 0;
    this.shadowY = 0;
    this.rotatingDegree = 0;
    this.rotatingX = 0;
    this.rotatingY = 0;
  }

  loadSprite(fileSrc) {
    var myImage = new Image(this.widthBase, this.heightBase);
    myImage.src = fileSrc;
    return myImage;
  }

  updatePosition() {
    // Complete in child
  }

  update() {
    this.x = parseInt(this.gameX - (this.width / 2));
    this.y = parseInt(this.gameY + 400 - this.height);
    this.shadowX = this.x;
    this.shadowY = parseInt(this.gameY + 400);
    this.updatePosition();
    this.width = parseInt(this.widthBase * this.height / this.heightBase);
  }

  drawShadow() {
  }

  draw() {
    return '<image ' +
      'x="' + this.x + '" ' +
      'y="' + (this.y - this.z) + '" ' +
      (this.rotatingDegree ?
        'transform="rotate(' + this.rotatingDegree + ') translate(' + this.rotatingX + ' ' + this.rotatingY + ')" ' : '') +
      'height="' + this.height + '" ' +
      'xlink:href="' + this.image.src + '" />';
  }
}
