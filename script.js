const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = innerWidth * 0.90;
canvas.height = innerHeight * 0.50;


class _Terrain {
    constructor(numPoints) {
      this.numPoints = numPoints;
      this.points = [];
      this.generateTerrain();
    }
  
    generateTerrain() {
      // Generate the terrain points
      for (let i = 0; i < this.numPoints; i++) {
        this.points.push({
          x: (canvas.width / (this.numPoints - 1)) * i,
          y: canvas.height / 2 + Math.sin((Math.PI / this.numPoints) * i) * (canvas.height / 4)
        });
      }
    }
  
    draw() {
      // Set the stroke style to green
      context.strokeStyle = 'green';
      // Begin the path
      context.beginPath();
      // Set the starting position to the first point
      context.moveTo(this.points[0].x, this.points[0].y);
      // Draw lines between the points
      for (let i = 1; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
      }
      // Draw the path on the canvas
      context.stroke();
    }
  }




class _Bombs{
    constructor(x,y){

      



        this.x = x;
        this.y = y;

        this.bombSpeed = 3;
        
        this.bombWidth = 6;
        this.bombHeigth = 10;



        this.isOnBottom = false;
    }



    #Draw(){
        context.fillStyle = "red";
        context.fillRect(this.x,this.y, this.bombWidth,this.bombHeigth);
    }

    Update() {
        this.isOnBottom = false;

        // Check for collision with the terrain points
        if (this.y + this.bombHeigth >= Terrain.points[Math.floor(this.x / (canvas.width / Terrain.numPoints))].y) {
            this.isOnBottom = true;
        }

        if (!this.isOnBottom) {
            this.#Draw();
            this.y = this.y + this.bombSpeed;
        }
    }

}


class _Bomber{

constructor(x,y, xSpeed,ySpeed){
    this.bomberWidth = 50;
    this.bomberHeigth = 15;

    this.activeBombs = [];
    this.maxBombs = 2;


    this.x = x;
    this.y = y;

    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;



}



    #Draw(){
        context.fillStyle = "gray";
        context.fillRect(this.x,this.y, this.bomberWidth,this.bomberHeigth);

    }


    DropBomb(){

        if( (this.activeBombs.length) > this.maxBombs ){

             
            
        }else{
            this.activeBombs.push(new _Bombs(this.x,this.y));

        }


    }






    UpdateBomber(){

        if(this.x + this.bomberWidth  > canvas.width || this.x - 0 < 0){
            this.xSpeed = -this.xSpeed;
    
    
        }

    
        // if(this.y + this.radius > canvas.height || this.y - this.radius < 0 ){
        //     this.ySpeed = -this.ySpeed;
    
    
        // }


        this.x += this.xSpeed;
        // this.y += this.ySpeed;

        this.#Draw();
    }


    //chat gpt explanation

    /*

    To delete the bomb, the method uses the splice method to remove the element 
    at the current index (i) from the activeBombs array.

    After deleting the bomb, the method decrements the value of i by 1 to 
    ensure that the loop continues to process the correct elements 
    in the activeBombs array.

    */

    UpdateBombs() {
        for(let i = 0; i < this.activeBombs.length; i++){
            
            this.activeBombs[i].Update();
            
            if (this.activeBombs[i].isOnBottom) {
                this.activeBombs.splice(i, 1);
                i--;
            }

        }

    }



}




const Bomber = new _Bomber(30,30,5,5);
const Terrain = new _Terrain(20,40,70);



const DropBomb = document.querySelector("button");
DropBomb.addEventListener("click", ()=>{
    
    Bomber.DropBomb();
});

function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0,0, canvas.width,canvas.height);

    Terrain.draw();


    Bomber.UpdateBomber();
    Bomber.UpdateBombs();
    // console.log(Bomber.activeBombs);
}



animate();