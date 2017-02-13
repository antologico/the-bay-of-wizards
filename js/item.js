class Item extends GameElement {
  constructor(scene, type) {
    super(scene);
    this.type = 'item';
    this.sprites = [];
    this.sprites['free'] = this.loadSprite('images/jewel/jewel_free.svg');
    this.sprites['recolected'] = this.loadSprite('images/jewel/jewel_recolected.svg');
    this.widthBase  = 80;
    this.heightBase = 100;
    this.heightMin  = 20;
    this.initPostion();
    this.shadowOpacity = 1;
    this.loaded = true;
    this.recolected = false;
  }

  initPostion() {
    this.gameX = parseInt(this.scene.clientWidth * (1 + (Math.random() * 0.5)));
    this.gameY = 110;//parseInt(Math.random() * 380);
    this.image = this.sprites['free'];
    this.recolected = false;
    this.shadowOffsetY = 0;
    this.shadowOpacity = 1;
    this.z = parseInt(Math.random() * 200);
  }

  updatePosition() {
    if (this.gameX > -300) {
      if (this.recolected) {
        this.z +=20;
        this.shadowOffsetY = parseInt(this.z / 10);
        this.shadowOpacity = this.shadowOpacity > 0 ? this.shadowOpacity-0.1 : 0;
        this.image = this.sprites['recolected'];
      }
      this.gameX -= parseInt((10 + parseInt(this.gameY / 200)) * this.gameSpeed);
    } else {
      this.initPostion();
    }
  }
}
