
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var fruitGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var PLAY=0;
var gameState=PLAY;
var END;
var monkey_stop;

var RESET;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 fruitGroup = new Group();
  obstacleGroup = new Group();
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-2;
  console.log(ground.x);
  
}


function draw() {
  background(1000,1000);

   monkey.velocityY=5;
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime "+ survivalTime,100,50);
  
  if(monkey.y>120){
  if(keyDown("space")){
    monkey.velocityY=-30;
  }
  }
  if (ground.x < 0 && gameState===PLAY){
      ground.x = ground.width/2;
    }
  
  bananaFruit();
  obstacles();
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  if(gameState===END){
    
    monkey.velocityX=0;
    
    ground.velocityX=0;
    
    obstacleGroup.destroyEach();
     fruitGroup.destroyEach();
    
  }
  if(keyDown("s")){
    gameState=PLAY;  
  }
  if(monkey.isTouching(fruitGroup)){
    score=score+1;
    fruitGroup.destroyEach();
  }
  
 
    
  
  
  monkey.collide(ground);
   
  
 drawSprites(); 
   text("score "+score,250,50);
  
}

function bananaFruit(){
  if(frameCount%80===0){
  fruit= createSprite(300,200,20,20);
  fruit.addImage(bananaImage);
  fruit.scale=0.1;
  fruit.y=Math.round(random(120,200));
  fruit.velocityX=-6;
  fruit.setLifetime=200;
  
    fruitGroup.add(fruit);
  } 
}

function obstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(380,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.setLifetime=200;
    
    obstacleGroup.add(obstacle); 
  }
}





