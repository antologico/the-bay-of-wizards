class GameElement {
  constructor(scene) {
    this.type="element";
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
    this.heightMin = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.shadowX = 0;
    this.shadowY = 0;
    this.rotatingDegree = 0;
    this.rotatingX = 0;
    this.rotatingY = 0;
    this.gameSpeed = 1;
  }

  loadSprite(fileSrc) {
    var myImage = new Image(this.widthBase, this.heightBase);
    myImage.src = fileSrc;
    return myImage;
  }

  updatePosition() {
    // Complete in child
  }

  update(gameSpeed = 1) {
    this.x = parseInt(this.gameX - (this.width / 2));
    this.y = parseInt(this.gameY + 400 - this.height);
    this.shadowX = this.x;
    this.shadowY = parseInt(this.gameY + 400);
    this.updatePosition();
    this.height = parseInt(this.heightMin + (this.gameY * 0.3));
    this.width = parseInt(this.widthBase * this.height / this.heightBase);
    this.gameSpeed = gameSpeed;
  }

  drawShadow() {
    const width = parseInt(this.width/2),
          offsetX = parseInt(this.width/5),
          offsetY = parseInt(this.z / 6),
          height = parseInt(this.width/10);
    return '<path d="M' + (this.shadowX) +',' + (this.shadowY  +  offsetY) +
      ' l' + width + ',' + height +
      ' ' + width + ',-' + height +
      ' -' + width + ',-' + height +
      ' -' + width + ',' + height +
      '" style="fill:#052e38"/>';
  }

  draw() {
    return '<image ' +
      'x="' + this.x + '" ' +
      'y="' + (this.y - this.z) + '" ' +
      'z=1 ' +
      (this.rotatingDegree ?
        'transform="rotate(' + this.rotatingDegree + ') translate(' + this.rotatingX + ' ' + this.rotatingY + ')" ' : '') +
      'height="' + this.height + '" ' +
      'width="' + this.width + '" ' +
      'xlink:href="' + this.image.src + '" />';
  }
}
