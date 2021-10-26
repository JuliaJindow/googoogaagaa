var objects = [];
var alarm;
function preload() {
    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    
}

function modelLoaded() {
    console.log("The model is loaded!!");
    status = true;
}

function gotResult(error, results){
if (results){
console.log(results);
objects = results;
}
else{
console.log(error);
}
}
function draw() {
    image(video,0,0,380,380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";   
            fill(r,g,b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        if (objects[i].label == "person") {
            alarm.stop();
            document.getElementById("baby✅❎").innerHTML = "BABY FOUND";
            document.getElementById("status").innerHTML = "Status = Objects Detected";
        }
        else {
            alarm.play();
            document.getElementById("baby✅❎").innerHTML = "BABY NOT FOUND";
            document.getElementById("status").innerHTML = "Status = Objects Detected";
        }
    } 

    }
}