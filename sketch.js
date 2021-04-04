
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0
var gameState=1
var PLAY=1
var END=0




function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  
FoodGroup = createGroup();
obstacleGroup = createGroup()  ;
}


function draw() {
background("lightyellow");
  
  if(gameState===PLAY){
    ground.visible=true;
    monkey.visible=true;
    
   if(monkey.isTouching(FoodGroup))
    {
      FoodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }
  }
  
    else if(gameState===END)
  {
    ground.velocityX=0
    FoodGroup.setVelocityEach(0);
    FoodGroup.destroyEach();
    obstacleGroup.setVelocityEach(0);
    obstacleGroup.destroyEach();
  }

  
  
  
  
  
  
  
  
  stroke("white")
  textSize(20);
  fill("white")
  
  stroke("red");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival  time : " +survivalTime,100,50);
  
  monkey.collide(ground);
  if (ground.x > 0) {
    ground.x = width / 2
  }
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY += 0.8;
  
  
  if (monkey.isTouching(obstacleGroup)) {
    FoodGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    monkey.velocityY=0;
    survivalTime=0;
    
    
  }
  
  food()
  obstacle()
  drawSprites()
}

function food() {
  if (frameCount % 100 == 0) {
  banana = createSprite(400, Math.round(random(120, 200)));
    
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime = 100;
    banana.velocityX = -4;
    FoodGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    rock = createSprite(400, 330);
    rock.addImage(obstaceImage);
    rock.scale=0.1;
    rock.velocityX = -4;
    rock.lifetime = 100;
    obstacleGroup.add(rock);
  } 
}