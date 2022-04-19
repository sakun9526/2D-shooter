const canvas = document.querySelector('canvas');

// initiate canvas context 
const ctx = canvas.getContext('2d');

//set canvas width and height
canvas.width = innerWidth;
canvas.height = innerHeight;

// create player 
class Player {
    constructor(x, y, radius, color){
        this.x = x
        this.y = y 
        this.radius = radius
        this.color = color
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

// center the player regardless of the window size
const x = canvas.width/2
const y = canvas.height/2


const player = new Player(x, y, 30, 'blue')

// create projectiles 
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y 
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()    
    }

    //update class properties
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }
}

// store projectiles in an array 

const projectiles = [];

addEventListener('click', (event)=>{
  
  const angle = Math.atan2(
      event.clientY - canvas.height / 2 ,
      event.clientX - canvas.width / 2 
  )

  const velocity = {
      x : Math.cos(angle),
      y : Math.sin(angle)
  }

  projectiles.push(
      new Projectile ((canvas.width/2), (canvas.height/2), 5, 'red', velocity) 
  )  
})

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw() //draw the player after clearing
    projectiles.forEach((projectile) => {
        projectile.update();
    });   
}

animate();
