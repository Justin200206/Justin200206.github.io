//  Get references to the video element and various control buttons
let videoElement = document.getElementById("videoElement");

let playButton = document.getElementById("playButton");
let rewindButton = document.getElementById("rewindButton");
let fastForwardButton = document.getElementById("fastForwardButton");
let stopButton = document.getElementById("stopButton");
let muteButton = document.getElementById("muteButton");
let progressBar = document.getElementById("progressBar");



videoElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";

// Remove the default video controls and display custom controls
videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});

// Set the maximum value of the progress bar to the video duration
videoElement.addEventListener("playing", () => {
 
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});

function playPause() {
  if (videoElement.paused || videoElement.ended) {
    videoElement.play();
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
  } else {
    videoElement.pause();
    playButton.style.backgroundImage = "url('./icons/play.svg')";
  }
}

/*This functionality is achieved using the fullScreen(). the full-screen button is also important, as it allows users to view the video in full-screen mode, 
which can improve the viewing experience by removing any distractions or irrelevant content on the screen.*/

function fullScreen() {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.webkitRequestFullscreen) {
    videoElement.webkitRequestFullscreen();
  } else if (videoElement.msRequestFullscreen) {
    videoElement.msRequestFullscreen();
  }
  FullScreen.style.backgroundImage = "url('./icons/fullScreen.svg')";
}

/* This functionality is achieved using the muteUnmute(). The mute/unmute button is also an important feature, as it allows users to control the audio playback of the video. Sometimes,
 users may not want to listen to the audio for various reasons, and the mute button enables them to turn off the sound with ease.*/

function muteUnmute() {
  if (videoElement.muted) {
    videoElement.muted = false;
    muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
  } else {
    videoElement.muted = true;
    muteButton.style.backgroundImage = "url('./icons/mute.svg')";
  }
}

/*This functionality is achieved using the fastForward() and rewind() functions that adjust the currentTime property of the video element accordingly.
The design choice for the fast-forward and rewind buttons is a commonly used double-arrow shape with a transparent background that displays a "fast forward" or
 "rewind" icon depending on the button type. The icon is changed dynamically in the respective functions using the backgroundImage property of the button element.*/

 /*Overall, these features are important to the overall usability of the video player as they provide basic controls for users to navigate and control the playback of the video. 
 They are commonly used and expected by users, and their design choices are based on widely recognized and familiar iconography to make them easily identifiable and intuitive to use.*/

function rewind() {
  videoElement.currentTime -= 10;
  rewindButton.style.backgroundImage = "url('./icons/rewind.svg')";
}
function fastForward() {
  videoElement.currentTime += 10;
  fastForwardButton.style.backgroundImage = "url('./icons/fastForward.svg')";
}


playButton.addEventListener('click', playPause);
FullScreen.addEventListener('click', fullScreen);
muteButton.addEventListener('click', muteUnmute);
fastForwardButton.addEventListener('click', fastForward);
rewindButton.addEventListener('click', rewind);





progressBar.addEventListener('input', () => {
  videoElement.currentTime = progressBar.value;
});

videoElement.addEventListener('timeupdate', () => {
  progressBar.max = videoElement.duration;

  progressBar.value = videoElement.currentTime;
  videoElement.currentTime = newTime;
  progress.style.width = `${percentage}%`;
  currentTime.textContent = formatTime(currentTimeValue);
});


/*one that triggers the "scrubToTime" function when the user clicks on the progress bar, and another that adds event 
listeners to the window object for when the user moves their mouse and when the user releases their mouse click.
This allows the user to drag their mouse along the progress bar to scrub through the video and seek to a specific time. 
The code uses a clampZeroOne function to ensure that the user does not scrub to a time outside of the video's duration.*/
function scrubToTime(e){

  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}


progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {

  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});


/* add an event listener for the elapsed time and then define it's functionality */

media.addEventListener("timeupdate", setTime);

function setTime(){
  console.log("update")
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);

  let minuteValue = minutes.toString().padStart(2, "0");
  let secondValue = seconds.toString().padStart(2, "0");

  let mediaTime = `${minuteValue}:${secondValue}`;
  
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = `${barLength}px`;
}


/* HELPER FUNCTIONS */

function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

document.getElementsByClassName("Fscreen")[0].onclick = function(e){
  if(media.RequestFullScreen){
    media.RequestFullScreen();
  } else if (media.webkitRequestFullScreen) {
    media.webkitRequestFullScreen();
  } else if (media.mozRequestFullScreen) {
    media.mozRequestFullScreen();
  }
}