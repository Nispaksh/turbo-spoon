status = "";
objects = [];
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function draw()
{
    //image(img,0,0,640,420);
    //fill("#FF0000");
    //text("Dog", 45, 75);
    //noFill();
    //stroke("#FF0000");
    //rect(30,60,450,350);

    //fill("#FF0000");
    //text("Cat", 320, 120);
    //noFill();
    //stroke("#FF0000");
    //rect(300,90,270,320);

    image(video,0,0,380,380);
    if (status != "")
    {  
       
        objectDetector.detect(video, gotResult);
       for (i = 0; i < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "Status: Object Detected!";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
           fill("FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x +15 , objects[i].y +15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[1].y, objects[i].width, objects[i].height);
       }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error) {
      console.log(error);
    }
    console.log(results);
}