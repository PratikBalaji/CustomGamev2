var bgImg, asteroidImg, spaceshipImg;
var player;
var asteroidArray, laserArray;
var blastOffImg;
var timerValue = 3;
function preload(){
  bgImg=loadImage("Sprites/bg.jpg");
  asteroidImg=loadAnimation("Sprites/astroid.png");
  spaceshipImg=loadAnimation("Sprites/Spaceship.png");
  laserImg=loadImage("Sprites/laser.png");
  blastOffImg=loadAnimation("Sprites/Blastoff.png");
}
function setup() {
  createCanvas(displayWidth,displayHeight-150);
  player=createSprite(displayWidth/2,displayHeight/2+200);
  player.addAnimation("SpaceShip",spaceshipImg);
  player.scale=0.3;
  edges = createEdgeSprites();
  asteroidArray= new Group();
  laserArray= new Group();
}
function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}

function draw() {
  background(bgImg);  
  moveShip();
  spawnObstacles();
  drawSprites();
  shootLasers();
  asteroidDestroy();
  if (player.isTouching(edges[0]) || player.isTouching(edges[1])) 
  { 
    player.bounceOff(edges[0]); 
    player.bounceOff(edges[1]); }
}
function moveShip(){
  if (keyWentDown("LEFT_ARROW")) {
  player.velocityX=-10;
  }
  if (keyWentUp("LEFT_ARROW")){
    player.velocityX=0;
  }
  if (keyWentDown("RIGHT_ARROW")) {
    player.velocityX=10;
    }
    if (keyWentUp("RIGHT_ARROW")){
      player.velocityX=0;
    }
}

function spawnObstacles(){
  console.log("spawnObstacles");
  if (frameCount % 60 ===0) {
    var asteroid = createSprite(displayWidth/2,-10, 10, 20);
    asteroid.x = Math.round(random(50,displayWidth-100));
    asteroid.addAnimation("asteroidImg",asteroidImg);
    asteroid.addAnimation("Blastoff", blastOffImg);
    asteroid.scale=0.3;
    asteroid.velocityY = 3;
    asteroid.lifetime = displayHeight/3;
    asteroidArray.add(asteroid);
  }
}

function shootLasers(){
  if(keyWentDown("SPACE")){
    var laser = createSprite(player.x,player.y);
    laser.velocityY = -10;
    laser.addImage(laserImg);
    laser.scale=0.3;
    laser.rotateToDirection=true;
    laser.lifetime = 60;
    laserArray.add(laser);
  }
}

function asteroidDestroy(){
  for(var i = 0; i < asteroidArray.length; i = i+1){
    if(laserArray.isTouching(asteroidArray.get(i))){
      //asteroidArray.get(i).lifetime=0;
      asteroidArray.get(i).changeAnimation("Blastoff",blastOffImg);
      setInterval(timeIt, 1000);
      if (timerValue == 0) {
      asteroidArray.get(i).lifetime=0;
      timerValue = 3;

      }
      
    }
   
  }
}

