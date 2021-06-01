var boy;
var pathImg,boyImg,cashImg,diamondsImg,jewlleryImg,swordImg,endImg,restartImg;
var gameOver;
var startButton;
var playButton;
var treasureScore = 0;
var speed = 0
var restart;


//Game States
var PLAY = 2;
var END = 3;
var gameState= PLAY;

function preload()
{
  pathImg = loadImage("Road.png");
  
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  
  boyStopImg = loadImage("Runner-1.png");
  
  cashImg = loadImage("cash.png");
  
  diamondsImg = loadImage("diamonds.png");
  
  jewlleryImg = loadImage("jwell.png");
  
  swordImg = loadImage("sword.png");
  
  endImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png")
}

function setup()
{
  createCanvas(windowWidth,windowHeight);

  //creating road as a sprite
  path = createSprite(width/2,height/3);
  
  //code to add image to the road 
  path.addImage(pathImg);
  
  //code to make the road invisible
  path.visible = true;

  //creating boy as a sprite
  boy = createSprite(70,380,20,20);
  
  //code to add animation to the boy 
  boy.addAnimation("Boy Running",boyImg);
  
  //code to assign size to the boy
  boy.scale=0.08;
  
  
  //creating game over as a sprite to display when the game is over
  gameOver = createSprite(width/2,height/2 - 70);
  
  //code to add image to the game over
  gameOver.addImage(endImg);
  
  //code to assign size to the game over
  gameOver.scale = 0.7;
  
  //code to make the game over invisible
  gameOver.visible = false;
  
  restart = createSprite(width/2,height/2);
  restart.scale = 0.3;
  restart.addImage(restartImg);
  restart.visible = false;
  
  //creating groups to add sprites in it
  cashGroup = new Group();
  jewlleriesGroup = new Group();
  diamondsGroup = new Group();
  swordsGroup = new Group();
  
  //code to make the sensor of the boy to the size of the boy
  boy.setCollider("circle",0,4,600);
  
  //code to make the sensor of the boy invisible
  boy.debug = false;

}

function draw() 
{
  //set background colour
  background(0);
  
  drawSprites();
  
  //code to make speed to increase the speed of the boy as the game goes to make the game challenging
  textSize(20);
  fill("white");
  text("speed:" + speed,-300,200);
  
  //code when the game state is in instruction
  
      
  //code when the game state is in restart
   
      
  //code when the game state is in play
   if(gameState == PLAY)
    {
      gameOver.visible = false;
    
      restart.visible = false;
    
      //code to make the boy visible when the game state is in the play
      boy.visible = true;
    
      //code to display the treasure score
      textSize(20);
      fill("gold");
      text("Treasure:" + treasureScore,width - 150,30);
  
      boy.x = World.mouseX;
    
      //code to increase the velocity of the road for each and every speed
      path.velocityY = (4 + 2*speed/100);
  
      //code to create background edges
      edges= createEdgeSprites();
    
      //code to make the boy collide with the background edges
      boy.collide(edges);
  
      //code to make to move the road like an infinite road by making its Y position to half of its height when the path Y position is greater than 400 
      if(path.y > 400 )
        {
          path.y = height/2
        }
    
      //code to increase speed after every 70 frames
      speed = speed + (getFrameRate()/70);
    
      //code to make the score increase by 10 when the boy is touching the cash and makes the cash disappear
      if(boy.isTouching(cashGroup))
        {
          treasureScore = treasureScore + 10;
          cashGroup.destroyEach();
        }
    
      //code to make the score increase by 20 when the boy is touching the jewellery and makes the jewellery disappear 
      if(boy.isTouching(jewlleriesGroup))
        {
          treasureScore = treasureScore + 20;
          jewlleriesGroup.destroyEach();
        }
    
      //code to make the score increase by 30 when the boy is touching the diamond and makes the diamond disappear
      if(boy.isTouching(diamondsGroup))
        {
          treasureScore = treasureScore + 30;
          diamondsGroup.destroyEach();
        }
    
      //code to make a variable for selecting things
      var select_things = Math.round(random(1,2));
    
      //code to make the sword to come when the random number is 1
      if(select_things == 1)
        {
          //this function is to create sword
          createSword();
        }
      
      //code to make the treasure to come when the random number is 1
      else if(select_things == 2)
        {
          //this function is to create treasure
          createTreasure();
        }
      
      //code to change the game state to the end when the boy is touching the sword
      if(boy.isTouching(swordsGroup))
        {
          gameState = END;
        }
  }
  
  //code when the game state is in the end
  if(gameState == END)
    {
      boy.visible = false;

    textSize(20);
      fill("gold");
      text("Treasure:" + treasureScore,width - 150,30);
      //code to make the game over visible when the game state is in the end
      gameOver.visible = true;
    
      restart.visible = true;
      //code to make the road stop moving when the game state is in the end
      path.velocityY = 0;
    
      //setting the velocity of each and every cash in the background 0 when the game state is in the end
      cashGroup.setVelocityYEach(0);
    
      //setting the velocity of each and every jewellery in the background 0 when the game state is in the end
      jewlleriesGroup.setVelocityYEach(0);
    
      //setting the velocity of each and every diamond in the background 0 when the game state is in the end
      diamondsGroup.setVelocityYEach(0);
    
      //setting the velocity of each and every sword in the background 0 when the game state is in the end
      swordsGroup.setVelocityYEach(0);
    
      //code to disappear each and every cash in the background when the game state is in the end
      cashGroup.destroyEach();
    
      //code to disappear each and every jewellery in the background when the game state is in the end
      jewlleriesGroup.destroyEach();
    
      //code to disappear each and every diamond in the background when the game state is in the end
      diamondsGroup.destroyEach();
    
      //code to disappear each and every sword in the background when the game state is in the end
      swordsGroup.destroyEach();
    
      //code to make the boy invisible when the game state is in the end
      boy.visible = false;
      
      if(mousePressedOver(restart) || touches.lenght>0) 
        {
          restart1();
          touches = [];
        }
    
      
      //code to change the game state to instruction when the mouse is pressing on the restart button 

  }
}

function createSword()
{
  //code to make to come each and every sword after every 70 frames
  if(frameCount%70 == 0)
    {
      //creating sword as a sprite and making the sword to come at random X positions between 50 and 350    
      var sword = createSprite(random(50,width - 50),30,10,10);
      
      //code to increase the velocity of the sword after each and every speed    
      sword.velocityY = (3 + speed/100);
      
      //code to add image to the sword
      sword.addImage("sword",swordImg);
      
      //code to assign size to the sword
      sword.scale = 0.1;
      
      //code to assign lifetime to the sword so that it will destroy the sword after sometime and it don"t makes memory leak
      sword.lifetime = 200;
      
      //code to make the depth of the sword and the depth of the boy equal and then increase the depth of the boy by 1 so that the sword will come infront of the boy
      sword.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      //code to add sword to the swords group   
      swordsGroup.add(sword)
  }
}

function createTreasure()
{
  //code to make a variable for selecting random treasures
  var select_treasure = Math.round(random(1,3));
  
  //code to make the cash to come if the random number is 1
  if(select_treasure == 1)
    {
      //this function is to create cash
      createCash();
    }
  
  //code to make the jewellery to come if the random number is 2
  else if(select_treasure == 2)
    {
      //this function is to create jewellery
      createJewllery();
    }
  
  //code to make the diamond to come if the random number is 3
  else if(select_treasure == 3)
    {
      //this function is to create diamond
      createDiamond();
    }
}

function createCash()
{
  //code to make to come each and every cash after every 75 frames
  if(frameCount%75 == 0)
    {
      //creating cash as a sprite and making the cash to come at random X positions between 50 and 350
      var cash = createSprite(random(50,width - 50),30,10,10);
      
      //code to increase the velocity of the cash after each and every speed
      cash.velocityY = (3 + speed/100);
      
      //code to add image to the cash
      cash.addImage("cash",cashImg);
      
      //code to assign size to the cash
      cash.scale = 0.12;
      
      //code to assign lifetime to the cash so that it will destroy the cash after sometime and it don't makes memory leak 
      cash.lifetime = 200;
      
      //code to make the depth of the cash and the depth of the boy equal and then increase the depth of the boy by 1 so that the cash will come infront of the boy
      cash.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      //code to add cash to the cash group
      cashGroup.add(cash);
  }
}

function createJewllery()
{
  //code to make to come each and every jewellery after every 80 frames
  if(frameCount%80 == 0)
    {
      //creating jewellery as a sprite and making the jewellery to come at random X positions between 50 and 350
      var jewllery = createSprite(random(50,width - 50),30,10,10);
      
      //code to increase the velocity of the jewellery after each and every speed
      jewllery.velocityY = (3 + speed/100);
      
      //code to add image to the jewellery
      jewllery.addImage("jewellery",jewlleryImg);
      
      //code to assign size to the jewellery
      jewllery.scale = 0.12;
      
      //code to assign lifetime to the jewellery so tht it will destroy the jewellery after sometime and it don't makes memory leak
      jewllery.lifetime = 200;
      
      //code to make the depth of the jewellery and the depth of the boy equal and then increase the depth of the boy by 1 so that the jewellery will come infront of the boy
      jewllery.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      //code to add jewellery to the jewelleries group
      jewlleriesGroup.add(jewllery);
  }
}

function createDiamond()
{
  //code to make to come each and every diamond after every 85 frames
  if(frameCount%85 == 0)
    {
      //creating diamond as a sprite and making the diamond to come at random X positions between 50 and 350
      var diamond = createSprite(random(50,width - 50),30,10,10);
      
      //code to increase the velocity of the diamond after each and every speed
      diamond.velocityY = (3 + speed/100);
      
      //code to add image to the diamond
      diamond.addImage("diamond",diamondsImg);
      
      //code to assign size to the diamond
      diamond.scale = 0.03;
      
      //code to assign lifetime to the diamond so that it will destroy the diamond after sometime and it don't makes memory leak
      diamond.lifetime = 200;
      
      //code to make the depth of the diamond and the depth of the boy equal and then increase the depth of the boy by 1 so that the diamond will come infront of the boy
      diamond.depth = boy.depth;
      boy.depth = boy.depth + 1;
      
      //code to add diamond to the diamonds group
      diamondsGroup.add(diamond);
  }
}

function restart1()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  treasureScore = 0;
  speed = 0;
  
}
