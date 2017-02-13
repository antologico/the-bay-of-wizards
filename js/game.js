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
    this.itemsMin = 50;
    this.started = false;
    this.gameSpeed = 0;
    this.loadSounds();
  }

  loadSounds() {
    this.sounds = [];
    this.sounds['ost'] = new Audio("sound/ost.mp3");
    this.sounds['ost'].loop = true;
    this.sounds['hit']  = new Audio("sound/hit.mp3");
    this.sounds['hit'].volume = 0.5;
    this.sounds['item']  = new Audio("sound/item.mp3");
    this.sounds['item'].volume = 0.2;
    this.sounds['waves']  = new Audio("sound/waves.mp3");
    this.sounds['waves'].volume = 0.5;
    this.sounds['waves'].loop = true;
    this.sounds['cover']  = new Audio("sound/cover.mp3");
    this.sounds['cover'].loop = true;
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

      if (this.frame < 120) {
          html += this.drawGameOptions();
      }

      this.scene.draw(html);
    }
  }

  drawGameOptions() {
    return ('<image x="' + (this.scene.clientWidth/2 - 150) + '" ' +
      'y="300" height="150" width="300" xlink:href="images/game-options.svg" />');
  }

  drawPlayerLive() {
      let live = this.player.live;
      live = live > 0 ? live : 0
      return ('<text width="300" text-align="center" y="55" text-anchor="middle" x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Montserrat Alternates" fill="#FFFFFF" font-size="45">' + live +
        '<tspan font-size="40">&hearts;</tspan></text>');
  }

  drawPlayerItems() {
      return ('<text width="300" text-align="center" y="80" text-anchor="middle" x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Montserrat Alternates" fill="#FFFF00" font-size="20">&#9830; ' + this.player.items + ' / 50</text>');
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
          this.player.live -= 1;
          this.sounds['hit'].play();
        }
      }
      if ((el.type == "item")) {
        if (this.player.testCollision(el) && !el.recolected) {
          el.recolected = true;
          this.player.items ++;
          this.sounds['item'].pause();
          this.sounds['item'].currentTime =  0;
          this.sounds['item'].play();
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

      if (this.frame < 2000) {
          if (this.sounds['cover'].volume != 0) {
            this.sounds['cover'].volume = (2000 - this.frame) / 2000;
          }
          this.sounds['ost'].volume = this.frame / 2000;
      }

      if (this.frame < 100) {
        this.gameSpeed = this.gameSpeed < 1 ? this.gameSpeed + 0.01 : 1;
      } else if (this.frame > this.maxFrames - 200) {
        this.gameSpeed = this.gameSpeed > 0 ? this.gameSpeed - 0.02 : 0;
      } else {
        this.gameSpeed = parseFloat(1 + (this.frame / (this.maxFrames-200))).toFixed(2); // Max 3
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
        this.beginGame();
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
    this.sounds['ost'].pause();
    clearInterval(this.drawElementsInterval);
    clearInterval(this.frameFunctionInterval);
    if (!this.testObjectives()) {
      this.scene.add(this.drawYouLoseTitle());
    } else {
      this.scene.add(this.drawYouWinTitle());
    }
  }

  drawYouLoseTitle() {
    const subtitle = 'Press enter to try again' + (this.frame >= this.maxFrames ? '. You need at least ' + this.itemsMin + ' jewels' : '');

    return ('<text width="300" text-align="center" y="410" text-anchor="middle" ' +
      'x="' + parseInt(this.scene.clientWidth/2) +'"' +
      'font-family="Montserrat Alternates" fill="#FF0000" stroke="#A00000" stroke-width="1" font-size="80">YOU LOSE!</text>'+
      '<text width="300" text-align="center" y="450" text-anchor="middle" ' +
        'x="' + parseInt(this.scene.clientWidth/2) +'"' +
        'font-family="Montserrat Alternates" fill="#FFFFFF" stroke="#AAAAAA" stroke-width="1" font-size="25">' +
        subtitle +
        '</text>');
  }

  drawYouWinTitle() {
    return ('<text width="300" text-align="center" y="430" text-anchor="middle" ' +
      'x="' + parseInt(this.scene.clientWidth/2) +'"' +
      'font-family="Montserrat Alternates" fill="#40FF40" stroke="#00A000" stroke-width="1" font-size="80">YOU WIN!</text>');
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
    this.sounds['cover'].play();

  }

  beginGame() {

    if (!this.started) {
      this.cover.className += " toFadeOut";
    }

    this.sounds['ost'].play();
    this.sounds['waves'].play();
    this.sounds['ost'].volume = 0;

    this.started = true;

    const seconds = 1000 / this.framesXsecond;
    this.frame = 0;
    this.finished = false;
    this.gameSpeed = 0;
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
