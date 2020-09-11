var
player,obstacleGroup,background1,score,foodGroup,ground;

var backDrop,player_running,bananaImage,obstacleImage;



function preload(){

  bananaImage= loadImage("banana.png")
  
  obstacleImage= loadImage("stone.png")

  backDrop= loadImage("jungle.jpg")

  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  createCanvas(400, 400);

  background1 = createSprite(0,0,800,500);
  background1.addImage("jungle.png",backDrop);
  background1.x = background1.width /2;
  background1.velocityX = -4;

  //invisibleGround = createSprite(200,380,400,10);
  //nvisibleGround.visible = false;
  
  player = createSprite(50,340,20,50);
  player.addAnimation("running",player_running);
  player.scale=0.2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  score=0 
  foodGroup = new Group();
  obstacleGroup= new Group();
  
}



function draw() {
  //background("green");
  
  if(background1.x<0) {
    background1.x=background1.width/2;
  }
     
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
   if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  
  
  if(player.isTouching(foodGroup)){
     score=score+2
     foodGroup.destroyEach()
  }
 
     switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
  if(player.isTouching(obstacleGroup)){
    // just reduce size of player
    player.scale=0.08;
    
  
  }

  
  spawnObstacles();
  spawnFruits();
  
  drawSprites();

  stroke("white")
  textSize(20)
  fill("white")
  text("Score:"+score,100,50)

}

function spawnFruits() {
  if(frameCount % 60 === 0) {
    banana =createSprite(400,Math.round(random(120,200)),10,40);
    banana.addImage(bananaImage)
    banana.velocityX = -4;
    banana.scale = 0.05;
    banana.lifetime = 300;
    
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -4;
    
              
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}