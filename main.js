song1 = "";
song2 = "";

rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;


function preload() {
          song1 = loadSound("music.mp3");
          song2 = loadSound("music2.mp3");
}

function setup() {
          canvas = createCanvas(600 , 500);
          canvas.center()

          video = createCapture(VIDEO);
          video.hide()

          poseNet = ml5.poseNet(video ,modelLoaded);
          poseNet.on('pose' , gotposes);
}

function modelLoaded() {
          console.log("PoseNet is Initialized");
}

function draw() {
  image(video, 0, 0, 600, 500);

  song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

  if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}

}

function gotposes(results) {
          if (results.length > 0) {
            console.log(results);

            scoreLeftWrist = results[0].pose.keypoints[9].score;
            //scoreRightWrist = results[0].pose.keypoints[10].score;

            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;

            console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);

            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;

            console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
          }
}