var dog, dogImg, dogImg1;
var database;
var foodS, foodStock;

function preload() {
  dogImg = loadImage("Dog.png");
  dogImg1 = loadImage("happyDog.png");
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 300, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}

// function to display UI
function draw() {
  background(46, 139, 87);

  if (keyDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  
  fill("white");
  textFont("Mistral")
  textSize(20);
  text("F-o-o-d  R-e-m-a-i-n-i-n-g :- " + foodS, 150, 200);

  fill("white");
  textFont("Mistral")
  textSize(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 100, 50);
}

//Function to read values from Database
function readStock(data) {
  foodS = data.val();
}

//Function to write values in Database
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}
