const enter=document.querySelector(".enter"), audio=document.querySelector("#audio"), music=document.querySelector(".music");
const tracks=["/music/track.mp3","/music/music.mp3","/music/song.mp3"];let ti=0;
async function startAudio(){
 if(!audio)return;
 audio.src=tracks[ti];
 try{await audio.play();if(music)music.style.display="flex"}catch(e){if(music)music.style.display="none"}
}
document.querySelector(".enter button")?.addEventListener("click",()=>{enter.classList.add("hide");startAudio()});
audio?.addEventListener("ended",()=>{ti=(ti+1)%tracks.length;audio.src=tracks[ti];audio.play().catch(()=>{})});

const slides=[...document.querySelectorAll(".slide")], track=document.querySelector(".track"), dots=[...document.querySelectorAll(".dots button")];
let current=Math.max(0,slides.findIndex(x=>x.dataset.current==="true")); let locked=false;
function go(n){
 current=Math.max(0,Math.min(slides.length-1,n));
 track.style.transform=`translate3d(${-current*100}vw,0,0)`;
 dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}
function next(){go(current+1)} function prev(){go(current-1)}
window.addEventListener("wheel",e=>{
 if(Math.abs(e.deltaY)<8 && Math.abs(e.deltaX)<8)return;
 if(locked)return;
 locked=true;
 if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.deltaX>0?next():prev()}else{e.deltaY>0?next():prev()}
 setTimeout(()=>locked=false,800);
},{passive:true});
window.addEventListener("keydown",e=>{if(["ArrowRight","ArrowDown","PageDown"].includes(e.key))next();if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key))prev()});
let sx=0;
window.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
window.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)(dx<0?next:prev)()},{passive:true});
dots.forEach((d,i)=>d.onclick=()=>go(i)); go(current);
