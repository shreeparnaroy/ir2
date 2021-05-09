//Pro16-Monkey Go Happy -1
//the objective ofnthis projet is to make a monkey game
//File name-Project 16
//created by Shreeparna Roy
//creating variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bananaGroup
var FoodGroup, obstacleGroup
var ground,invisibleGround
var survivalTime
var gameState = 0
//using preload to load animation and images

function preload(){
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png",
  "sprite_2.png","sprite_3.png", "sprite_4.png","sprite_5.png",
  "sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bg =loadImage("j.jpg")
}

//using setup to create sprite to and adding animation and also making scrolling screen

function setup() {
  createCanvas(displayWidth-300,displayHeight-300)
  monkey=createSprite(100,displayHeight-400,20,20)
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.25
  
  ground=createSprite(displayWidth/2,displayHeight-350,2000,20)
  ground.velocityX=-4
  ground.shapeColor ="brown"
  ground.x = ground.width /2;
  
  invisibleGround=createSprite(displayWidth/2,displayHeight-350,200,20)
  invisibleGround.visible=false
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
}

// giving colour to background ,then giving gravity to monkey also making  monkey  jump and displaying survival time
function draw() {
  background(bg);
  if(gameState ===0){
    if(keyDown("space")&& monkey.y >= 240) {
          monkey.velocityY = -12;       
      }
      monkey.velocityY = monkey.velocityY + 0.8  
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      monkey.collide(ground);
      //camera.position.x=displayWidth/2
      camera.position.y=monkey.y

      spawnfood()
      spawnobstacles()  
        
      stroke("black")
      textSize(50)
      survivalTime=Math.ceil(frameCount/frameRate())
      text("survivalTime:"+survivalTime,displayHeight-500,displayHeight-500);

      if(monkey.isTouching(obstacleGroup)){
        survivalTime = 0
      }

      //end condition
      if(survivalTime ===20){
        gameState = 2
      }
  }

  else if(gameState === 2){
    stroke("black")
    textSize(50)
    text("Game Over You Win!!",200,displayHeight-500);
    monkey.velocityX =0;
    monkey.velocityY=0;
    ground.velocityX=0;
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
  }

    drawSprites();
}

// using the same thing used in trex game for clouds
function spawnfood(){
  if(frameCount%100===0){
    var banana=createSprite(displayWidth,165,10,40)
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage)
    banana.velocityX=-3
    banana.lifetime=200
    banana.scale=0.1
    bananaGroup.add(banana)
  }  
}
// using same thing like trex game for making the obstacles an spwan them
function spawnobstacles(){
   if (frameCount % 130 === 0){
     var obstacle = createSprite(displayWidth,displayHeight-400,10,40);
     obstacle.addImage(obstaceImage);
     obstacle.scale=0.2
     obstacle.velocityX = -6
     obstacle.lifetime=300;
     obstacleGroup.add(obstacle);
   
   }
} 