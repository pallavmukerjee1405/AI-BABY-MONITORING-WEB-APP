status_quo="";
objects=[];

function preload(){
    alarm=loadSound('alarm.mp3');
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded(){
    console.log('Model Loaded!');
    status_quo=true;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,640,420);
    
    if(status_quo != ""){
     r=random(255);
     g=random(255);
     b=random(255);
    
     object_detector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            
            percent=floor(objects[i].confidence*100);
            fill(r,g,b);
            text(objects[i].label + " " + percent + "%" + objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }

        if(objects[i].label=="person"){
            document.getElementById("baby_found").innerHTML="Baby Found";
            alarm.stop();
        }
        else{
            document.getElementById("baby_found").innerHTML="Baby Not Found";
            alarm.play();
        }
        if(objects[i].length<0){
            document.getElementById("baby_found").innerHTML="Baby Not Found";
            alarm.play();
        }
    }
}