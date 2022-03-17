//Variables for all the stuff that I am using

let faceapi;
let detections = []; 
let emotions = ["angry", "fearful", "happy", "neutral", "sad", "surprised"];
let video;
let canvas;
let activeemotion = "unknown";
let current, test;
let points;

//Font stuff
let font;
let emotionfont;
let angryF, fearfulF, happyF, neutralF, sadF, suprisedF;

//Colour stuff
let rcol, gcol, bcol;

//Loading the font
function preload(){
  font = loadFont('data/Lufga-Medium.otf');
  angryF = loadFont('data/AngryFont.otf');
  fearfulF = loadFont('data/FearfulFont.otf');
  happyF = loadFont('data/HappyFont.otf');
  neutralF = loadFont('data/NeutralFont.otf');
  sadF = loadFont('data/SadFont.otf');
  surprisedF = loadFont('data/SurprisedFont.otf');
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //This pulls up the webcam so that there can be input. 
  //It hides it so that it isn't visible to the use (I'll figure out an indicator for it)
  video = createCapture(VIDEO);
  video.hide();
  
  //This constant defines what options I will be using from the faceApi. 
  //I'm only using expressions and making sure that it has a minimum confidence of 0.5 (or 50%)
  const faceOptions = {
   withLandmarks: true,
   withExpressions: true,
   withDescriptors: false,
   minConfidence: 0.5,
  };
  
  
  //This calls the api so we can use it.
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
  
  rcol = 20;
  gcol = 20;
  bcol = 20;
  
}

  //This is to make sure it picks up a face
function faceReady(){
  faceapi.detect(gotFaces); 
}

  //This checks if it's detected a face or not.
function gotFaces(error,result){
 if(error){
   console.log(error);
   return;
 }
 detections = result;
 faceapi.detect(gotFaces);
}

//The main function where everything happens
function draw() {
  
  emotionfont = font;
  //If this isn't here, it will call stuff that doesn't exist yet, causing errors.
  if(detections.length > 0){
    //Sets the test values to 0;
    test = 0;
    current = 0;
    activeemotion = "unknown";
    
    //Pulls all the from the api emotions and assigns them to values.
    //They are all rounded to 3 (otherwise there are too many decimals)
    //The api has 7 emotions it can detect.
    emotions["neutral"] = round(detections[0].expressions.neutral, 3);
    emotions["happy"] = round(detections[0].expressions.happy,3);
    emotions["sad"] = round(detections[0].expressions.sad,3);
    emotions["angry"] = round(detections[0].expressions.angry,3);
    emotions["fearful"] = round(detections[0].expressions.fearful,3);
    emotions["surprised"] = round(detections[0].expressions.surprised,3);
    
    //The main loop to check which emotion is currently the highest.
    for (var i = 0; i < emotions.length; i++){
      var currentemotion = emotions[i];
      test = emotions[currentemotion];
      if(test >= current){
        current = test
        activeemotion = emotions[i]
      }  
    }
    
    if(activeemotion == "neutral"){
      emotionfont = neutralF;
      rcol = 166;
      gcol = 166;
      bcol = 166;
      
    }
    
    if(activeemotion == "happy"){
      emotionfont = happyF;
      rcol = 252;
      gcol = 255;
      bcol = 59;
      
      //252, 255, 59
    }
    
    if(activeemotion == "sad"){
      emotionfont = sadF;
      rcol = 41;
      gcol = 101;
      bcol = 255;
      
      //41, 101, 255
    }
    
    if(activeemotion == "angry"){
      emotionfont = angryF;
      rcol = 252;
      gcol = 38;
      bcol = 38;
    }
    
    if(activeemotion == "fearful"){
      emotionfont = fearfulF;
      rcol = 255;
      gcol = 41;
      bcol = 41;
      
      //255, 41, 41
    }
    
    if(activeemotion == "surprised"){
      emotionfont = surprisedF;
      rcol =38;
      gcol = 233;
      bcol = 255;
      
      //38, 233, 255
    }
    
    
  }
    //This thing draws stuff.
    push();
    background(rcol-20, gcol-20,bcol-20);
    push();
//       if(detections.length > 0){
//         translate(windowWidth/2-(windowWidth/4), height/2);
//         points = detections[0].landmarks.positions;
//         for(let l = 0; l<points.length; l++){
//           stroke(rcol - 100, gcol - 100, bcol - 100);
//           strokeWeight(4);
//           point(points[l]._x+random(-1,1), points[l]._y+random(-1,1));
//         }
//       }
    pop();
      fill(255);
      noStroke();
      translate(width/2, height/2);
      textAlign(CENTER,CENTER);
      textFont(emotionfont);
      textSize(width/4);
      text('FEEL',0,0);
      push();
        textFont(font);
        fill(255);
        noStroke();
        textSize(width/36);
        text("Feeling " + activeemotion, 0, -200);
      pop();
    pop();
  }

//This changes the screen to be more accurate
function windowResized(){
 resizeCanvas(windowWidth, windowHeight); 
}
