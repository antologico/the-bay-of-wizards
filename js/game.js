class Game {

  constructor(elementId, coverId) {
    this.cover = document.getElementById(coverId);
    this.scene = new Scene(document.getElementById(elementId));
    this.maxWidth =
    this.elements = [];
    this.decorations = [];
    this.prevElements = [];
    this.framesXsecond = 30;
    this.frameFunctionInterval = null;
    this.drawElementsInterval = null;
    this.gameKeys = [null, null, null, null];
    this.collisions = 0;
    this.maxFrames = 3200; // 2 minutes
    this.frame = 0;
    this.finished = true;
    this.itemsMin = 40;
    this.gameSpeed = 0;
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
    if (!this.finished) {
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

      html += this.drawPlayerLive() + this.drawPlayerItems();

      this.scene.draw(html);
    }
  }

  drawPlayerLive() {
      let live = this.player.live;
      live = live > 0 ? live : 0
      return ('<text width="300" text-align="center" y="55" text-anchor="middle" x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Montserrat Alternates" fill="#FFFFFF" font-size="50">' + live +
        '<tspan font-size="40">&hearts;</tspan></text>');
  }

  drawPlayerItems() {
      return ('<text width="300" text-align="center" y="80" text-anchor="middle" x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Montserrat Alternates" fill="#FFFF00" font-size="20">&#9830;' + this.player.items + '</text>');
  }

  movePlayer() {
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
  }


  shortElements() {
    this.elements.sort(function(a, b) {
      return a.gameY >= b.gameY;
    });
    for(var i = 0; i < this.decorations.length; i++) {
      this.decorations[i].update(this.gameSpeed);
    }
  }


  detectCollisions()
  {
    let collision = false;

    for(var i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      if ((el.type == "obstacle") && !collision) {
        collision = this.player.testCollision(el);
        if (collision) {
          this.player.live -= 2;
        }
      }
      if ((el.type == "item")) {
        if (this.player.testCollision(el) && !el.recolected) {
          el.recolected = true;
          this.player.items ++;
        }
      }
      el.update(this.gameSpeed);
    }

    this.player.moving = null;
    this.player.collision = collision;
  }

  frameFunction() {

    if (!this.finished) {
      this.movePlayer();
      this.shortElements();
      this.detectCollisions();

      if (this.frame < 100) {
        this.gameSpeed = this.gameSpeed < 1 ? this.gameSpeed + 0.01 : 1;
      } else if (this.frame > this.maxFrames - 200) {
        this.gameSpeed = this.gameSpeed > 0 ? this.gameSpeed - 0.02 : 0;
      } else {
        this.gameSpeed = parseFloat(1 + (2 * this.frame / (this.maxFrames-200))).toFixed(2); // Max 3
      }
      this.frame ++;
    }

    // 4 minutes
    if ((this.frame > this.maxFrames) || (this.player.live < 0)) {
      this.finish();
    }
  }

  keyDown(e) {
    this.setKeyValue(e.keyCode, 1);
  }

  keyUp(e) {
    if (!this.finished) {
      this.setKeyValue(e.keyCode, null);
    } else {
      if (e.keyCode == 13) {
        this.startGame();
      }
    }
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

  finish() {
    this.finished = true;
    clearInterval(this.drawElementsInterval);
    clearInterval(this.frameFunctionInterval);
    if (!this.testObjectives()) {
      this.scene.add(this.drawYouLoseTitle());
    } else {
      this.scene.add(this.drawYouWinTitle());
    }
  }

  drawYouLoseTitle() {
    const subtitle = 'Press enter to try again' + (this.frame >= this.maxFrames ? '. You need at last ' + this.itemsMin + ' jewels' : '');

    return ('<text width="300" text-align="center" y="410" text-anchor="middle" ' +
      'x="' + parseInt(this.scene.clientWidth/2) +'"' +
      'font-family="Montserrat Alternates" fill="#FF0000" stroke="#A00000" stroke-width="1" font-size="100">YOU LOSE!</text>'+
      '<text width="300" text-align="center" y="450" text-anchor="middle" ' +
        'x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Montserrat Alternates" fill="#FFFF00" stroke="#A0A000" stroke-width="1" font-size="22">' +
        subtitle +
        '</text>');
  }

  drawYouWinTitle() {
    return ('<text width="300" text-align="center" y="430" text-anchor="middle" ' +
      'x="' + parseInt(this.scene.clientWidth/2) +'"' +
      'font-family="Montserrat Alternates" fill="#40FF40" stroke="#00A000" stroke-width="1" font-size="100">YOU WIN!</text>');
  }

  testObjectives() {
    return (this.player.live > 0) && (this.player.items >= this.itemsMin);
  }

  init() {
    this.player = new Player(this.scene);
    this.elements.push(this.player);

    this.elements.push(new Item(this.scene));
    this.elements.push(new Item(this.scene));

    this.elements.push(new Obstacle(this.scene, 0));
    this.elements.push(new Obstacle(this.scene, 1));
    this.elements.push(new Obstacle(this.scene, 2));

    this.elements.push(new Stone(this.scene, 0));
    this.elements.push(new Stone(this.scene, 1));


    for (let i=0; i<20; i++) {
      this.decorations.push(new WaterShine(this.scene));
    }
    this.decorations.push(new Bridge(this.scene, this.maxFrames));

    console.log('init', this.scene.clientWidth + 'x' + this.scene.clientHeight);

    window.addEventListener("keydown", this.keyDown.bind(this), false);
    window.addEventListener("keyup", this.keyUp.bind(this), false);
  }

  startGame() {

    this.cover.parentNode.removeChild(this.cover);
    const seconds = 1000 / this.framesXsecond;
    this.frame = 0;
    this.finished = false;
    this.gameKeys = [null, null, null, null];

    for(var i = 0; i < this.elements.length; i++) {
      this.elements[i].initPostion();
    }
    for(var i = 0; i < this.decorations.length; i++) {
      this.decorations[i].initPostion();
    }

    this.frameFunctionInterval = setInterval(this.frameFunction.bind(this), seconds);
    this.drawElementsInterval = setInterval(this.drawElements.bind(this), seconds);
  }
}
