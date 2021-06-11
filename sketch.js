//Create variables here
var dog;
var dogImg1, dogImg2;
var milk;
var foodStock, foodS;
var fedTime, lastFed;
var foodObj;
var database;
var feed;
var addFood;
function preload()
{
	//load images here
  dogImg1 = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png");
  // milk = loadImage("Milk.png");
}

function setup() {
	createCanvas(1600, 800);
  database = firebase.database();
  dog = createSprite(1400,200,20,20);
  dog.addImage(dogImg1);
  dog.scale = 0.3;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  
  
}


function draw() {  
  background(46,139,87);

  drawSprites();
  //add styles here

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
});

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Fed : "+ lastFed % 12 + "PM", 350,20);
}else if(lastFed == 0){
  text("Last Fed : 12 AM", 350,30);
}else{
  text("Last Fed : "+ lastFed + "AM",)
}


    foodObj.display();
}
  
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dogImg2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
  




