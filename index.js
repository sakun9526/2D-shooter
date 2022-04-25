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


const player = new Player(x, y, 10, 'white')

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

//create enemy 
class Enemy{
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
// store enemies in an array
const enemies = [];

const spawnEnemies = () => {
    setInterval(()=> {
        //size of the enemy set to random between 4 to 30 
        const radius = Math.random() * (30 - 4) + 4;

        let x;
        let y;

        if (Math.random < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height; 
            
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        
        const color = `hsl(${Math.random()*360}, 50%, 50%)`;

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

        const velocity = {
            x : Math.cos(angle),
            y : Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
} 


let animationID; 

function animate() {
    animationID = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.draw() //draw the player after clearing
    projectiles.forEach((projectile, index) => {
        projectile.update();

        //remove projectiles from edges of the screen
        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0);
        }
    }); 
    enemies.forEach((enemy, enemyIndex)=> {
        enemy.update();

        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        //end the game after collision
        if (distance - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationID)
        }


        //distance between the projectiles
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            //objects touch 
            if (distance - enemy.radius - projectile.radius < 1){

                setTimeout(() => {
                    enemies.splice(enemyIndex, 1)
                    projectiles.splice(projectileIndex, 1)
                }, 0);
                
            }
        });
    });  
}

addEventListener('click', (event)=>{
  
    const angle = Math.atan2(
        event.clientY - canvas.height / 2 ,
        event.clientX - canvas.width / 2 
    )
  
    const velocity = {
        x : Math.cos(angle) * 5,
        y : Math.sin(angle) * 5
    }
  
    projectiles.push(
        new Projectile ((canvas.width/2), (canvas.height/2), 5, 'white', velocity) 
    )  
  })

animate();
spawnEnemies();
