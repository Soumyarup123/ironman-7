// creating the variables
var ironman;
var background;
var ironimg;
var bgimg;
var stoneimg;
var stonegroup;
var diamondimg;
var diamondgroup;
var diamondcount=0;
var spike;
var spikegroup;
var spikeimg;
var gamestate="PLAY";
var restart;
var restartimg;

function preload() 
{
  // loading the images
  ironimg=loadImage("images/iron.png");
  bgimg=loadImage("images/bg.jpg");
  stoneimg=loadImage("images/stone.png");
  diamondimg=loadImage("images/diamond.png");
  spikeimg=loadImage("images/spikes.png");
  restartimg=loadImage("images/restart.png");
}


function setup() {
  createCanvas(1200,600); // creating canvas
  edges=createEdgeSprites(); // creating the edges
  // creating groups for stones, diamonds and spikes
  background=createSprite(600,300,1200,600)
  background.addImage(bgimg)
  ironman=createSprite(300,300,30,30) // creating ironman sprite
  ironman.addImage(ironimg); // adding the image to ironman
  ironman.scale=0.3; // adjusting ironman's size
  stonegroup=new Group(); 
  diamondgroup=new Group();
  spikegroup=new Group();
  restart=createSprite(500,300,50,50);
  restart.addImage(restartimg);
  restart.visible=false;
}

function draw()
{
  if (gamestate==="PLAY")
  {
    background.scale=2;// adjusting background size
    background.velocityY=6;
    if (background.y>600)
    {
      background.y=300;
    }
    ironman.setCollider("rectangle",100,0,200,400); // adding collider in ironman
    // creating the boundary
    ironman.bounceOff(edges[0]);
    ironman.bounceOff(edges[1]);
    ironman.bounceOff(edges[2]);
    // making ironman able to move on pressing the keys
    if(keyDown("up"))
    {
      ironman.velocityY=-10;
    }
    if(keyDown("left"))
    {
      ironman.x=ironman.x-10;
    }
    if(keyDown("right"))
    {
      ironman.x=ironman.x+10;
    }
    ironman.velocityY=ironman.velocityY+0.5; // adding downwards pull
    generatePlatforms() // generating the stones
    // making ironman able to stand and collide with the stones
    for(i=0;i<(stonegroup).length;i++)
    {
      var temp=stonegroup.get(i);
      if(temp.isTouching(ironman))
      {
        ironman.collide(temp);
      }
    }
    generateDiamonds() // generating the diamonds
    // making ironman able to collect the diamonds and increasing score on collecting diamonds
    for(var i=0;i<(diamondgroup).length;i++)
    {
      var temp1=(diamondgroup).get(i) ;
      if(temp1.isTouching(ironman))
      {
        diamondcount++;
        temp1.destroy();
        temp1=null;
      }
    }
    generatespikes() //generating the spikes
    // making ironman able to collect the spikes and decreasing score on collecting spikes
    for(var j=0;j<(spikegroup).length;j++)
    {
      var temp2=(spikegroup).get(j) ;
      if(temp2.isTouching(ironman))
      {
        diamondcount=diamondcount-5;
        temp2.destroy();
        temp2=null;
      }
    }
    if(ironman.y>640)
    {
      gamestate='END';
    }
    if(diamondcount<=-10)
    {
      gamestate='END';
    }
  }
  else if(gamestate==='END')
  {
    background.velocityY=0;
    ironman.velocityY=0;
    diamondgroup.setVelocityYEach(0);
    spikegroup.setVelocityYEach(0);
    stonegroup.setVelocityYEach(0);
    diamondgroup.setLifetimeEach(-1);
    spikegroup.setLifetimeEach(-1);
    stonegroup.setLifetimeEach(-1);
    diamondcount=0;
    restart.visible=true;
    textSize(20);
    text("Game Over",500,100)
    if(mousePressedOver(restart))
    {
     restartgame();
    }
  }
  drawSprites() // drawing the sprites
  textSize(20); // adding text size
  fill("white"); // text color
  text("diamonds collected : "+diamondcount,500,50); // displaying score
}

// function for generating the diamonds
function generatePlatforms() 
{
  if (frameCount % 60 === 0) 
  {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50,850);
    brick.addImage(stoneimg);
    brick.velocityY = 5;
    brick.lifetime = 250;
    stonegroup.add(brick);
  }
}

// function for generating the stones
function generateDiamonds()
{
  if (frameCount % 40 === 0)
  {
    var dmnd = createSprite(1200, 10, 40, 10);
    dmnd.x = random(40,860);
    dmnd.addImage(diamondimg);
    dmnd.scale=0.5;
    dmnd.velocityY = 3;
    dmnd.lifetime = 250;
    diamondgroup.add(dmnd);
  }
}

// function for generating the spikes
function generatespikes()
{
  if (frameCount % 50 === 0)
  {
    var spks = createSprite(1200, 10, 40, 10);
    spks.x = random(40,860);
    spks.addImage(spikeimg);
    spks.scale=0.5;
    spks.velocityY = 6;
    spks.lifetime = 250;
    spikegroup.add(spks);
  }
}

function restartgame()
{
  gamestate="PLAY";
  stonegroup.destroyEach();
  diamondgroup.destroyEach();
  spikegroup.destroyEach();
  diamondcount=0;
  ironman.y=300;
  restart.visible=false;
}