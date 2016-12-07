window.onload = function() {

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var food01 = document.getElementById("icecream");
  var food02 = document.getElementById("hamburger");
  var food03 = document.getElementById("broccoli");
  var food04 = document.getElementById("potato");
  var bkgd = document.getElementById('background-img');
  var player= document.getElementById('monster')
  player.onload = drawPlayer;
  context.drawImage(bkgd, 0, 0, canvas.width, canvas.height);

  var foodArray = [food01, food02, food03, food04];

  var particles = {},
      particleIndex = 0,
      settings = {
        density: 3,
        particleSize: 70,
        startingY: -70
      };

  var playerSettings = {
      x: 0,
      y: canvas.height-120,
      w: 120,
      h: 120
  }

  function Particle() {
  // Establish starting positions and velocities
    this.w = settings.particleSize;
    this.h = settings.particleSize;
    this.x = (Math.random() * (canvas.width - settings.particleSize));
    this.y = settings.startingY;

    // Determine original Y-axis speed based on random value
    this.vy = (Math.random() * 2) + 2;

    // Randomly select an image from the image array
    this.img = foodArray[Math.floor(Math.random()*foodArray.length)];

    // Add new particle to the index
    // Object used as it's simpler to manage that an array
    particleIndex ++;
    particles[particleIndex] = this;
    this.id = particleIndex;

  }

  // Some prototype methods for the particle's "draw" function
  Particle.prototype.draw = function() {
    this.y += this.vy;

    // If Particle is off the screen, it goes in the chamber for renewal
    if (this.y >= canvas.height) {
      delete particles[this.id];
    }

    // Create the shapes
    context.drawImage(this.img, this.x, this.y, settings.particleSize, settings.particleSize);

    hitDetect(this, playerSettings, particles);
  };

  //hit detection
  function hitDetect(m, e, particles){

    if(m.x+m.w >= e.x && m.x <= e.x+e.w && m.y >= e.y && m.y <= e.y+e.h){
      delete particles[m.id];
    }
  }

  function drawPlayer (e){
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    playerSettings.x = posx;
  }

  window.addEventListener('mousemove', drawPlayer, false);

  function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
  }

  // document.addEventListener('mousemove', handleMouseEvent);

  setInterval(function() {
    // Redraw the background
    
    // drawPlayer(e);
    // console.log(playerX);
    context.drawImage(bkgd, 0, 0, canvas.width, canvas.height);
    context.drawImage(player, playerSettings.x, playerSettings.y, playerSettings.w, playerSettings.h);

    // Draw the particles
    for (var i = 0; i < settings.density; i++) {
      if (Math.random() > 0.99) {
        // Introducing a random chance of creating a particle
        // corresponding to an chance of 1 per second,
        // per "density" value
        new Particle();
      }
    }

    for (var i in particles) {
      particles[i].draw();
      // this.hitDetect(this.particles[i],i);
    }
  }, 30);

};
