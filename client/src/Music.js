import React, { useState, useRef, useEffect } from 'react';
import './Parent.css'

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const [song, setSong] = useState('')

  let songIndex = Math.floor(Math.random()*5) + 1
  if (song ===''){
    if(songIndex === 1){
      setSong('/songs/music0.mp3')
    }
    if(songIndex === 2){
      setSong('/songs/music1.mp3')
    }
    if(songIndex === 3){
      setSong('/songs/music2.mp3')
    }
    if(songIndex === 4){
      setSong('/songs/music3.mp3')
    }
    if(songIndex === 5){
      setSong('/songs/music4.mp3')
    }
  }
  // Function to toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Update progress bar based on audio current time
  const updateProgress = () => {
    const audio = audioRef.current;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  // Use an interval to update the progress while audio is playing
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(updateProgress, 500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Reset progress and play button when audio ends
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Seek function to allow clicking on the progress bar
  const handleSeek = (event) => {
    const audio = audioRef.current;
    const seekTime = (event.nativeEvent.offsetX / event.target.clientWidth) * audio.duration;
    audio.currentTime = seekTime;
    setProgress((seekTime / audio.duration) * 100);
  };

  return (
    <div className="music">
      <button 
        onClick={togglePlayPause} 
        className={`play-pause-button ${isPlaying ? 'playing' : ''}`}>
      </button>
      <div className="progress-container" onClick={handleSeek}>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <audio 
        ref={audioRef} 
        src = {song} //{song}
        onEnded={handleAudioEnd}
      />
    </div>
  );
}

export default AudioPlayer;