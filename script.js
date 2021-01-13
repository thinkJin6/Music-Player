const musicContainer = document.getElementById('music--container');
const btnPrev = document.getElementById('btn--prev');
const btnPlay = document.getElementById('btn--play');
const btnNext = document.getElementById('btn--next');
const btnVolume = document.querySelector('.btn--volume');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress--container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const volume = document.querySelector('.volume__bar');
const volumeContainer = document.querySelector('.volume__bar--container');

// Song title
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Volume Storage
let volumeStorage = 0.4;

// Toggle volume button switch
let isMute = false;

// Update song details
const loadSong = function (song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

// Play song
const playSong = function () {
  musicContainer.classList.add('play');
  btnPlay.querySelector('i.fas').classList.remove('fa-play');
  btnPlay.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};

// PauseSong
const pauseSong = function () {
  musicContainer.classList.remove('play');
  btnPlay.querySelector('i.fas').classList.remove('fa-pause');
  btnPlay.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
};

// Previous Song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

// Update progress bar
const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
};

// Set progress bar
const setProgress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

// Display volume size
const displayVolumeSize = function (volumeSize) {
  const volumePercent = volumeSize * 100;
  volume.style.width = `${volumePercent}%`;
};

// Display volume button
const displayVolumeBtn = function (a, b) {
  btnVolume.querySelector('i.fas').classList.remove(`fa-volume-${a}`);
  btnVolume.querySelector('i.fas').classList.add(`fa-volume-${b}`);
};

// Change volume
const changeVolume = function (e) {
  const volumeSize = e.offsetX / this.clientWidth;

  audio.volume = volumeSize;
  volumeStorage = volumeSize;
  displayVolumeSize(volumeSize);
  displayVolumeBtn('mute', 'up');
};

// Mute volume
const muteVolume = function () {
  audio.volume = 0;
  displayVolumeBtn('up', 'mute');
  displayVolumeSize(0);
  isMute = true;
};

// Unmute Volume
const unMuteVolume = function () {
  audio.volume = volumeStorage;
  displayVolumeBtn('mute', 'up');
  displayVolumeSize(audio.volume);
  isMute = false;
};

// Initially load song detail to DOM
const init = function () {
  loadSong(songs[songIndex]);
  audio.volume = volumeStorage;
  displayVolumeSize(audio.volume);
};

init();

// Event listener
btnPlay.addEventListener('click', function () {
  const isPlaying = musicContainer.classList.contains('play');

  isPlaying ? pauseSong() : playSong();
});

// toggle volume button to mute and unmute
btnVolume.addEventListener('click', function () {
  isMute ? unMuteVolume() : muteVolume();
});

// Change song
btnPrev.addEventListener('click', prevSong);
btnNext.addEventListener('click', nextSong);

// Time song update
audio.addEventListener('timeupdate', updateProgress);

// Volume change and volume bar as well
volumeContainer.addEventListener('click', changeVolume);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
