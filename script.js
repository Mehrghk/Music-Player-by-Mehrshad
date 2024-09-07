const audio = document.getElementById("audio");
const play = document.getElementById('play');
// const pause = document.getElementById('pause');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const titlee = document.getElementById('author');
const cover = document.getElementById('cover');
const timeend = document.getElementById('timeend');

// Song titles
const songs = ['Lost in City Lights', 'Forest Lullaby'];
const authors = ['Cosmo Sheldrake', 'Lesfm'];
const times = ['01:12', '02:18'];
 
// Keep track of song
let songIndex = 0;
let AuthorIndex = 0;
let TimeIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex], authors[AuthorIndex], times[TimeIndex]);


// Update song details
function loadSong(song, author, time) {
  title.innerText = song;
  titlee.innerText = author;
  timeend.innerText = time;
  audio.src = `${song}.mp3`;
  cover.src = `${song}.png`;
}

// Previous song
function prevSong() {
  songIndex--;
  AuthorIndex--;
  TimeIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  if (AuthorIndex < 0) {
    AuthorIndex = authors.length - 1;
  }
  if (TimeIndex < 0) {
    TimeIndex = times.length - 1;
  }
  loadSong(songs[songIndex], authors[AuthorIndex], times[TimeIndex]);
  audio.play();
  // toggleAudioStatus();
}

// Next song
function nextSong() {
  songIndex++;
  AuthorIndex++;
  TimeIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  if (AuthorIndex > authors.length - 1) {
    AuthorIndex = 0;
  }
  if (TimeIndex > times.length - 1) {
    TimeIndex = 0;
  }
  loadSong(songs[songIndex], authors[AuthorIndex], times[TimeIndex]);
  audio.play();
  // toggleAudioStatus();
}

// Play & pause audio
function toggleAudioStatus() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
}

// update play/pause icon
function updatePlayIcon() {
  if (audio.paused) {
    play.innerHTML = '<img src="Play_fill.svg">';
  } else {
    play.innerHTML = '<img src="icons8-pause-24.png" style="height: 32px;">';
    // play.classList.remove('play');
    // play.classList.add('pause');
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (audio.currentTime /audio.duration) * 100;

  // Get the minutes
  let mins = Math.floor(audio.currentTime / 60);
  if(mins < audio.duration){
    mins = '0' + String(mins);
  }

  // Get Seconds
  let secs = Math.floor(audio.currentTime % 60);
  if(secs < 10){
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setAudioProgress() {
  audio.currentTime = (+progress.value * audio.duration) / 100;
}

play.addEventListener('click', toggleAudioStatus);
audio.addEventListener('pause', updatePlayIcon);
audio.addEventListener('play', updatePlayIcon);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('change', setAudioProgress);
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// Song ends
audio.addEventListener('ended', nextSong);