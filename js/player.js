class Player extends GameElement {
  constructor(scene) {
    super(scene);
    this.widthBase  = 400;
    this.heightBase = 250;
    this.heightMin  = 100;
    this.loadSprites();
    this.initPostion();
    this.loaded = true;
  }

  loadSprites() {
    this.sprites['traveling'] = [];
    for (let i=1; i<=8; i++) {
      var image = this.loadSprite('images/player/player' + i + '.svg');
      this.sprites['traveling'].push(image);
      this.sprites['traveling'].push(image);
    }
    const travelingSprites = this.sprites['traveling'].length;
    for (let i=1; i<travelingSprites; i++) {
      this.sprites['traveling'].push(this.sprites['traveling'][travelingSprites-i]);
    //  this.sprites['traveling'].push(this.sprites['traveling'][travelingSprites-i]);
    }

    this.sprites['moving'] = [];
    this.sprites['moving']['up'] = this.loadSprite('images/player/player_up.svg');
    this.sprites['moving']['down'] = this.loadSprite('images/player/player_down.svg');
    this.sprites['moving']['right'] = this.loadSprite('images/player/player_right.svg');
    this.sprites['moving']['left'] = this.loadSprite('images/player/player_left.svg');
    this.sprites['collision'] = this.loadSprite('images/player/player_red.svg');
  }

  initPostion() {
    this.state = 0;
    this.moving = null;
    this.collision = false;
    this.live = 100;
    this.items = 0;
    this.gameX = this.scene.clientWidth/2;
    this.gameY = 100;
    this.z = 400;
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


  testCollisionAxis(i1, i2, j1, j2) {
      return ((i1 >= j1) && (i1 <= j2)) || ((i2 >= j1) && (i2 <= j2)) ||
             ((j1 >= i1) && (j1 <= i2)) || ((j2 >= i1) && (j2 <= i2));
  }

  testCollision(item) {
    const radius = 5,
          white_space = 100;
    return this.testCollisionAxis(
            this.gameX,
            this.gameX + (this.width/2), // for white space
            item.gameX,
            item.gameX + item.width) &&
          this.testCollisionAxis(
            this.gameY - radius,
            this.gameY + radius,
            item.gameY,
            item.gameY) &&
          this.testCollisionAxis(
            this.z,
            this.z + this.height,
            item.z,
            item.z + item.height);
  }

  updatePosition() {
    let state = 0;

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
