var dog, happyDog, database, foodS, foodStock

function preload()
{
  Dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happyDog.png")
}

function setup() {
	createCanvas(500,500);                                   
  
  db = firebase.database();

  dog = createSprite(250,250,10,10);    
  dog.addImage(Dog);
  dog.scale=0.1;
  foodStock = db.ref('Food');
  foodStock.on("value",readStock);

}
function draw() { 
  background(46,139,87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    dog.scale=0.1;
  }

  drawSprites();
  textSize(13);
  fill("white");
  text("Press arrow to feed",130,10);
  text("Food remaining:"+foodS,170,200)
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }



  db.ref('/').update({
    Food:x
  })
}