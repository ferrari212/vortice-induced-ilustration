// import utils from './utils.js'
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

var colors = [
  '#011C40',
  '#8AA6BF',
  '#DCE8F2',
  '#295773',
  '#A60D0D'
];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init();
});

// Create Circunference
function Circle() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.radius = 50;
    this.color = '#000000';
    // this.velocity = 2;
    // this.omega = 0;
    // this.domega = 0.05;
    // this.lastMouse = {x: x, y: y};

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius , 0, Math.PI*2, false);
      // Remember to insert here the function of velocity
      // c.fillStyle = colorArray[Math.floor(Math.random()*colorArray.length)];
      c.fillStyle = this.color;
      c.fill();
      c.strokeStyle = 'black';
      c.stroke();
      c.closePath();
    }

    // this.draw();
}

// Create Particles
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = color;
    this.velocity = 2;
    this.omega = 0;
    this.domega = 0.05;
    this.lastMouse = {x: x, y: y};
}

Particle.prototype.draw = function(lastPoint) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.fillStyle = this.color
    // c.fill()
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.arc(this.x, this.y, this.radius , 0, Math.PI*2, false);
    c.closePath();
}

Particle.prototype.update = function() {
    const lastPoint = {x: this.x + this.velocity, y: this.y};

    if (lastPoint.x > canvas.width) {
      lastPoint.x = 0;
    }

    // Move Points over time
    this.omega = 0;

    // Drag Effect
    // this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    // this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // circular mortion
    // this.x = Math.cos(this.omega);
    // this.y = Math.sin(this.omega);
    this.x = lastPoint.x + Math.cos(this.omega);
    this.y = lastPoint.y + Math.sin(this.omega);
    this.draw(lastPoint);

}

// Implementation
let circle;
let particles;
let x;
let y;

function init() {
    circle = [];
    particles = [];

    circle = new Circle();
    circle.draw();

    for (let i = 0; i < 1000; i++) {
      const radius = (Math.random() * 2) + 1;
      x = randomIntFromRange(0,  canvas.width);
      y = randomIntFromRange(0,  canvas.height);
      particles.push( new Particle(x, y, radius, randomColor(colors)))
    }
    // console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    // c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(255, 255, 255, 0.01)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    particles.forEach(particle => {
     particle.update()
   });

   circle.draw();
}

init();
animate();
