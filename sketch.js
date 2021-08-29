var human,human_running,human_collided;
var ground,ground_image;
var coin,coin_image,coGroup,coinsoun
var obstacle1,obstacle2,obstacle3,obGroup;
var score=0;
var coin=0;
var lives=3;
var PLAY=0
var END=1
var SERVE=2
var Gamestate=PLAY
var gameover,gameoverimg,gameoversound
var restart,restartimg,restartsound
var won,win
var playi,playimg,playsound
var caught;


function preload(){
human_running=loadAnimation("human.png");
human_collided=loadAnimation("fall.png")
ground_image=loadImage("groud.jpg")
coin_image=loadImage("coin.jpg")
//ghost
obstacle1=loadImage("ghost.png")
obstacle3=loadImage("double.png")
caught=loadImage("caught.png")
obstacle2=loadImage("lastob.png")
//ghost^
gameoverimg=loadImage("gameover.png")
restartimg=loadImage("restart.png")
win=loadImage("win.png")
playimg=loadImage("play.png")
}

function setup() {
createCanvas(500,200)

human=createSprite(55,130,20,20);
human.addAnimation("running",human_running)
human.addAnimation("collided",human_collided)
human.scale=0.5
  
ground=createSprite(245,200,600,30); ground.addImage(ground_image)
ground.scale=2
ground.velocityX=-4
  
gameover=createSprite(225,60,20,20)
gameover.addImage(gameoverimg)
gameover.scale=0.2
  
restart=createSprite(225,120,20,20)
restart.addImage(restartimg)
restart.scale=0.2

won=createSprite(225,80,30,30)
won.addImage(win)
won.scale=0.5
  
playi=createSprite(225,160,20,20)
playi.addImage(playimg)
playi.scale=0.2
  
obGroup=new Group();
coGroup=new Group();
}

function draw() {
 background("white");
 // human.debug=true  
textSize(20)
text("score:"+score,10,20)
text("lives:"+lives,200,20)
text("coins:"+coin,400,20)
  
  if(Gamestate===PLAY){
 
  score=score+Math.round(getFrameRate()/60);
     
    
  if(keyDown("space")&& human.y >=120){
    human.velocityY=-12 
  }
  human.velocityY = human.velocityY + 0.8
    
  if(obGroup.isTouching(human)){
    Gamestate= END
    lives=lives-1
    gameoversound.play();
  }
    
   if(coGroup.isTouching(human)){
     coin = coin+1
     coGroup[0].destroy()
     coinsoun.play();
   }
    
  if(ground.x<220){
    ground.x=ground.width  
  }
    
   if(lives===0){
   Gamestate=SERVE;
  }
  
    Coin();
  Obstacle();
    
    restart.visible=false;
    gameover.visible=false;
    won.visible=false;
    playi.visible=false
  }

  else if (Gamestate===END){
  restart.visible=true  
  gameover.visible=true
    
  human.changeAnimation("collided",human_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)){
    reset();
    restartsound.play();
   }
  }
  
  else if(Gamestate===SERVE){
    won.visible=true
    playi.visible=true
    human.changeAnimation("collided",human_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(playi)){
    winning();
    playsound.play();
  }
    
  }
  
human.collide(ground)
human.setCollider("rectangle",0,0,human.width,human.height) 
  
  
 drawSprites();
}

function Coin() {
if(frameCount % 80 ===0) {
 var coins=createSprite(400,150,20,20) 
 coins.y=Math.round(random(80,150))
 coins.addImage(coin_image)
  coins.scale=0.1
  coins.velocityX=-3
  coins.lifetime=200
  coGroup.add(coins)
}
}


function Obstacle(){
if(frameCount%60===0){
   var obstacles = createSprite(400,145,10,40); 
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(obstacle2);
              break;
      case 2: obstacles.addImage(obstacle1);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
}
  obstacles.velocityX=-6
  obstacles.scale=0.2
  obstacles.lifetime=300
  obGroup.add(obstacles);
}
}

function reset(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  human.changeAnimation("running",human_running);
  ground.velocityX=-4
} 

function winning(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  lives=3
  human.changeAnimation("running",human_running);
  ground.velocityX=-4
}
