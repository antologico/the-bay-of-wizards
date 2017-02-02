class Game {

  constructor(elementId) {
    this.scene = document.getElementById(elementId);
    this.elements = [];
    this.decorations = [];
    this.prevElements = [];
    this.framesXsecond = 30;
    this.interval = null;
    this.gameKeys = [null, null, null, null];
    this.drawFuntion = null;
    this.printing = false;
    this.collisions = 0;
  }

  moveLeft() {
    this.player.moveLeft();
  }

  moveUp() {
    this.player.moveUp();
  }

  moveRight() {
    this.player.moveRight();
  }

  moveDown() {
    this.player.moveDown();
  }

  drawElements() {
      let html = "";
      for(var i = 0; i < this.elements.length; i++) {
        html += this.elements[i].drawShadow();
      }
      for(var i = 0; i < this.decorations.length; i++) {
        html += this.decorations[i].draw();
      }
      for(var i = 0; i < this.elements.length; i++) {
        html += this.elements[i].draw();
      }

      html += this.drawPlayerLive();

      this.scene.innerHTML = html;
  }

  drawPlayerLive() {
      let live = parseInt((1000 - (this.collisions * 5)) / 10);
      live = live > 0 ? live : 0
      return ('<text width="300" text-align="center" y="70" text-anchor="middle" x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Russo One" fill="#FFFFFF" font-size="55">' + live + '%</text>');
  }

  frameFunction() {

      if (this.gameKeys[0]) {
          this.moveLeft();
      }
      if (this.gameKeys[1]) {
          this.moveUp();
      }
      if (this.gameKeys[2]) {
          this.moveRight();
      }
      if (this.gameKeys[3]) {
          this.moveDown();
      }

      this.player.moveJump(this.gameKeys[4]);

      this.elements.sort(function(a, b) {
        return a.gameY >= b.gameY;
      });
      for(var i = 0; i < this.decorations.length; i++) {
        this.decorations[i].update();
      }

      let collision = false;
      for(var i = 0; i < this.elements.length; i++) {
        const el = this.elements[i];
        if ((this.player != el) && !collision) {
          collision = this.player.testCollision(el);
          if (collision) {
            this.collisions ++;
          }
        }
        el.update();
      }

      this.player.moving = null;
      this.player.collision = collision;
  }

  keyDown(e) {
    this.setKeyValue(e.keyCode, 1);
  }

  keyUp(e) {
    this.setKeyValue(e.keyCode, null);
  }

  setKeyValue(key, value) {
    switch (key) {
      case 37: // Left
        this.gameKeys[0] = value;
        break;
      case 38: // Up
        this.gameKeys[1] = value;
        break;
      case 39: // Right
        this.gameKeys[2] = value;
        break;
      case 40: // Down
        this.gameKeys[3] = value;
        break;
      case 32: // Space
        this.gameKeys[4] = value;
        break;
    }
  }

  init() {
    this.player = new Player(this.scene);
    this.elements.push(this.player);

    this.elements.push(new Obstacle(this.scene, 0));
    this.elements.push(new Obstacle(this.scene, 1));
    this.elements.push(new Obstacle(this.scene, 2));
    this.elements.push(new Obstacle(this.scene, 0));
    this.elements.push(new Obstacle(this.scene, 1));
    this.elements.push(new Obstacle(this.scene, 2));

    this.elements.push(new Stone(this.scene, 0));
    this.elements.push(new Stone(this.scene, 1));

    for (let i=0; i<5; i++) {
      this.decorations.push(new WaterShine(this.scene));
    }

    console.log('init', this.scene.clientWidth + 'x' + this.scene.clientHeight);

    window.addEventListener("keydown", this.keyDown.bind(this), false);
    window.addEventListener("keyup", this.keyUp.bind(this), false);
    setInterval(this.frameFunction.bind(this), 1000 / this.framesXsecond);
    setInterval(this.drawElements.bind(this), 1000 / this.framesXsecond);
  }
}
