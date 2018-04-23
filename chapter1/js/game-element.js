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
    this.shadowColor = '#052e38'
    this.shadowOpacity = 0.5;
    this.shadowOffsetY = 0;
    this.cache = null;
    this.cacheShadow = null;
    this.updated = false;
  }

  loadSprite(fileSrc) {
    var myImage = new Image(this.widthBase, this.heightBase);
    myImage.src = fileSrc;
    return myImage;
  }

  updatePosition() {
    // Complete in child
  }

  getState() {
    return {
      x: this.y,
      y: this.y,
      z: this.z,
      rotatingDegree: this.rotatingDegree,
      rotatingX: this.rotatingX,
      rotatingY: this.rotatingX,
      image: this.image.src
    }
  }

  update(gameSpeed = 1) {
    this.prevValues = this.getState();
    this.updatePosition();
    this.x = parseInt(this.gameX - (this.width / 2));
    this.y = parseInt(this.gameY + 400 - this.height);
    this.shadowX = this.x;
    this.shadowY = parseInt(this.gameY + 400);
    this.height = parseInt(this.heightMin + (this.gameY * 0.3));
    this.width = parseInt(this.widthBase * this.height / this.heightBase);
    this.gameSpeed = gameSpeed;
    this.updated = this.prevValues == this.getState()
  }

  drawElementShadow() {
    if (!this.cacheShadow || !this.updated) {
      this.cacheShadow = this.drawShadow()
    }
    return this.cacheShadow
  }

  drawShadow() {
    const width = parseInt(this.width/2),
          offsetX = parseInt(this.width/5),
          offsetY = parseInt(this.z / 0),
          height = parseInt(this.width/10);
    return '<path d="M' + (this.shadowX) +',' + (this.shadowY + this.shadowOffsetY) +
      ' l' + width + ',' + height +
      ' ' + width + ',-' + height +
      ' -' + width + ',-' + height +
      ' -' + width + ',' + height +
      '" style="fill:' + this.shadowColor + '" fill-opacity="' + this.shadowOpacity + '" />';
  }

  drawElement() {
    if (!this.cache || !this.updated) {
      this.cache = this.draw()
    }
    return this.cache
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
