class Bridge extends GameElement {
  constructor(scene, maxFrameToCenter) {
    super(scene);
    this.image = this.loadSprite('images/bridge.svg');
    this.heightBase = 2;
    this.transparent = 0
    this.length = maxFrameToCenter;
    this.maxFrameToCenter = maxFrameToCenter;
    this.initPostion();
    this.loaded = true;
  }

  initPostion() {
    this.widthBase  = this.length - 40;
    this.gameX = parseInt(this.scene.clientWidth / 2) - 40;
    this.transparent = this.scene.clientWidth;
  }

  updatePosition() {
    var speed = this.gameSpeed < 1 ? this.gameSpeed : 1;
    this.widthBase -= (this.length / this.maxFrameToCenter) * speed;
  }

  draw() {
    return '<image ' +
        'x="340" ' +
        'y="245" ' +
        'height="30" ' +
        'xlink:href="' + this.image.src + '" />' +
      '<path d="M343, 270' +
        ' l' + (this.widthBase +30) + ',65' +
        ' 80,0'+
        ' ' + (-(this.widthBase + 85)) + ',-65' +
        ' -30, 0" style="fill:#F2BBCB"/> '+
      '<path d="M343, 270' +
        ' l' + (this.widthBase +30) + ',65' +
        ' 0,10'+
        ' ' + (-(this.widthBase + 30)) + ',-75"' +
        ' style="fill:#13235B"/> '+
      '<image ' +
        'x="' + (this.gameX + parseInt(this.widthBase)) + '" ' +
        'y="250" ' +
        'height="100" ' +
        'xlink:href="' + this.image.src + '" />';
  }
}
