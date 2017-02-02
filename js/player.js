class Player extends GameElement {
  constructor(scene) {
    super(scene);
    this.widthBase  = 400;
    this.heightBase = 250;
    this.collision = false;
    this.state = 0;
    this.loadSprites();
    this.loaded = true;
    this.moving = null;
    this.initPostion();
  }

  loadSprites() {
    this.sprites['traveling'] = [];
    for (let i=1; i<12; i++) {
      this.sprites['traveling'].push(this.loadSprite('images/player/arzak' + i + '.png'));
    }
    this.sprites['moving'] = [];
    this.sprites['moving']['up'] = this.loadSprite('images/player/arzak_up.png');
    this.sprites['moving']['down'] = this.loadSprite('images/player/arzak_down.png');
    this.sprites['moving']['right'] = this.loadSprite('images/player/arzak_right.png');
    this.sprites['moving']['left'] = this.loadSprite('images/player/arzak_left.png');
    this.sprites['collision'] = this.loadSprite('images/player/arzak_red.png');
  }

  initPostion() {
    this.gameX = this.scene.clientWidth/2;
    this.gameY = 100;
    this.update();
  }

  moveLeft() {
    if (this.gameX > 0) {
      this.gameX -= this.width / 10;
      this.moving = 'left';
    }
  }

  moveRight() {
    if (this.gameX < this.scene.clientWidth - (this.width / 2)) {
      this.gameX += this.width / 10;
      this.moving = 'right';
    }
  }

  moveUp() {
    if (this.gameY > 0) {
      this.gameY -= 10;
      this.moving = 'up';
    }
  }

  moveDown() {
    if (this.gameY < 380) {
      this.gameY += 10;
      this.moving = 'down';
    }
  }

  moveJump(isJump) {
    const maxJump = this.height;
    if (isJump) {
      if (this.z < maxJump) {
        this.z += 10;
      } else {
        this.z = maxJump;
      }
      if (this.rotatingDegree > -8) {
        this.rotatingDegree -= 0.4;
      }
    } else {
      if (this.z > 0) {
        this.z -= 2;
      } else {
        this.z = 0;
      }
      if (this.rotatingDegree < 0) {
        this.rotatingDegree += 0.05;
      }
    }

    this.rotatingX = 0;
    this.rotatingY = 0;
  }

  testCollision(item) {

    const radius = 50;
    if (((this.gameX - radius) < item.gameX) &&
        ((this.gameX + radius) > item.gameX) &&
        ((this.gameY + radius) > item.gameY) &&
        ((this.gameY - radius) < item.gameY))
        {
            return (item.height >= this.z + this.height/2);
        }

    return false;
  }

  drawShadow() {
    const width = parseInt(this.width/3),
          offset = parseInt(this.width/5),
          height = parseInt(this.width/10);
    return '<path d="M' + (this.shadowX + offset) +',' + (this.shadowY - 15) +
      ' l' + width + ',' + height +
      ' ' + width + ',-' + height +
      ' -' + width + ',-' + height +
      ' -' + width + ',' + height +
      '" style="fill:#052e38"/>';
  }

  updatePosition() {
    let state = 0;
    this.height = parseInt(100 + (this.gameY * 0.5));
    this.width = parseInt(this.widthBase * this.height / this.heightBase);

    if (this.collision) {
      this.image = this.sprites['collision'];
    } else if (this.moving) {
        this.image = this.sprites['moving'][this.moving];
    } else {
        this.state ++;
        if (this.state >= this.sprites['traveling'].length) {
            this.state = 0;
        }
        this.image = this.sprites['traveling'][this.state];
    }
  }
}
