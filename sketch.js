let sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8;
let originalSound;
let playButton, stopButton, answerButton, originalButton;
let player, fileName, fSize;

function preload() {
  sound1 = loadSound('assets/Eno_DigitalClip_6dB.mp3');
  sound2 = loadSound('assets/Eno_DigitalClip_12dB.mp3');
  sound3 = loadSound('assets/Eno_DigitalClip_18dB.mp3');
  sound4 = loadSound('assets/Eno_DigitalClip_24dB.mp3');

  // 🔊 original file (NOT part of random pool)
  originalSound = loadSound('assets/EnoOriginal.mp3');
}

function setup(){  
  createCanvas(windowWidth, windowHeight);
  background(0);

  fSize = width / 10;
  textAlign(CENTER);
  fill(255);

  // Title
  let titleSize = fSize / 2;
  textSize(titleSize);
  text("Digital Clipping Practice", width / 2, height / 9);

  // Subtitle
  let subtitleSize = fSize / 4;
  textSize(subtitleSize);
  let lineSpacing = subtitleSize * 1.5;
  text("+6, +12, +18, +24", width / 2, height / 9 + lineSpacing);

  // choose first random sound
  chooseSound();

  // Button sizing + layout
  let btnW = width * 0.25;
  let btnH = 60;
  let buttonYStart = height / 3;

  // PLAY button
  playButton = createButton('PLAY');
  playButton.size(btnW, btnH);
  playButton.position(width/2 - btnW/2, buttonYStart);
  playButton.style('font-size', '20px');
  playButton.style('background-color','#00E938');
  playButton.style('color','#000000');  
  playButton.mousePressed(togglePlay);

  // STOP button
  stopButton = createButton('STOP');
  stopButton.size(btnW, btnH);
  stopButton.position(width/2 - btnW/2, buttonYStart + btnH + 20);
  stopButton.style('font-size', '20px');
  stopButton.style('background-color','#F80F05');
  stopButton.style('color','#FDFAFA');
  stopButton.mousePressed(stopSound);

  // ANSWER button
  answerButton = createButton('ANSWER');
  answerButton.size(btnW, btnH);
  answerButton.position(width/2 - btnW/2, buttonYStart + (btnH + 20) * 2);
  answerButton.style('font-size', '20px');
  answerButton.style('background-color','#03A9F4');
  answerButton.style('color','#000000');  
  answerButton.mousePressed(showAnswer);

  // ⭐ original button
  originalButton = createButton('ORIGINAL SOUND');
  originalButton.size(btnW, btnH);
  originalButton.position(width/2 - btnW/2, buttonYStart + (btnH + 20) * 3);
  originalButton.style('font-size', '20px');
  originalButton.style('background-color','#FFC107');
  originalButton.style('color','#000000');  
  originalButton.mousePressed(playOriginalSound);
}

function togglePlay() {
  if (player && player.isPlaying()) {
    // optional: player.pause();
  } else {
    chooseSound();
    player.amp(0.8);
    player.loop();
    answerButton.html("ANSWER");
  }
}

function stopSound(){
  if (player) player.stop();
  if (originalSound.isPlaying()) originalSound.stop(); // also stop original if active
}

function showAnswer() {
  answerButton.html(fileName);
}

function playOriginalSound() {
  stopSound(); // stop any currently playing sounds first
  originalSound.amp(0.8);
  originalSound.loop();
}

let lastChoice = -1;
let secondLastChoice = -1;

function chooseSound() {
  let choice;
  do {
    choice = int(random(4));  // 0–3
  } while (choice === lastChoice && choice === secondLastChoice);

  secondLastChoice = lastChoice;
  lastChoice = choice;

  if (choice === 0) {
    player = sound1; fileName = "+6 Digital Clipping";
  } else if (choice === 1) {
    player = sound2; fileName = "+12 Digital Clipping";
  } else if (choice === 2) {
    player = sound3; fileName = "+18 Digital Clipping";
  } else if (choice === 3) {
    player = sound4; fileName = "+24 Digital Clipping";
  }
}
