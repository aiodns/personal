const enter=document.querySelector(".enter");
const button=document.querySelector(".enter button");
const audio=document.querySelector("#audio");
const music=document.querySelector(".music");
const tracks=["/music/track.mp3","/music/music.mp3","/music/song.mp3"];
let track=0;
button?.addEventListener("click",async()=>{
  enter.classList.add("hidden");
  if(!audio)return;
  audio.src=tracks[track];
  try{await audio.play();music.style.display="flex"}catch{}
});
if(audio)audio.addEventListener("ended",()=>{track=(track+1)%tracks.length;audio.src=tracks[track];audio.play().catch(()=>{})});
