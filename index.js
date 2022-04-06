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
console.log(player)

player.draw()
