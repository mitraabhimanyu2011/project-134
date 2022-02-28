alarm = "";
rank = "";
objects = [];

function preload()
{
    alarm = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(380, 480);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(rank != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
            if(objects[i].label == "person")
            {
            document.getElementById("status").innerHTML = "Baby is found!";
            console.log("stop");
            alarm.stop();
        }
        else
        {
            document.getElementById("status").innerHTML = "Baby hasn't been found yet. Please wait while we exterminate it for you...";
            console.log("alarm");
            alarm.play();
        }
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    rank = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}