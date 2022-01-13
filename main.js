img = "";
status ="";
objects = [];
function preload(){
    img = loadImage("https://img.freepik.com/free-photo/happy-smiling-baby-towel-after-bathing_106368-652.jpg?size=626&ext=jpg&ga=GA1.2.1118724270.1639699200");
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}
function draw(){
    image(img, 0, 0, 640, 420)
    if (status != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : Object Dectected";
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "  " +  percent + "%" , objects[i].x + 15, objects[i].y + 70);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "status : Baby found";
            }
        }
    }
}
function model_loaded(){
    console.log("model loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results){
    if (error) {
        console.log(error)
    }
    console.log(results);
    objects = results;      
}
