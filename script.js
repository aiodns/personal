const enter=document.querySelector(".enter"), audio=document.querySelector("#audio"), music=document.querySelector(".music");
const tracks=["/music/sakura.ogg","/music/music.mp3","/music/song.mp3"];
async function startAudio(){
 if(!audio)return;
 audio.src=tracks[Math.floor(Math.random()*tracks.length)];
 audio.loop=true;
 try{await audio.play();if(music)music.style.display="flex"}catch(e){if(music)music.style.display="none"}
}
document.querySelector(".enter button")?.addEventListener("click",()=>{
 enter.classList.add("hide");startAudio();
 document.querySelectorAll(".handle.glow").forEach(h=>{h.classList.remove("glow");void h.offsetWidth;h.classList.add("glow")});
});

const slides=[...document.querySelectorAll(".slide")], track=document.querySelector(".track"), dots=[...document.querySelectorAll(".dots button")];
let current=Math.max(0,slides.findIndex(x=>x.dataset.current==="true")); let locked=false;
function go(n){
 current=Math.max(0,Math.min(slides.length-1,n));
 track.style.transform=`translate3d(${-current*100}vw,0,0)`;
 dots.forEach((d,i)=>d.classList.toggle("active",i===current));
}
function next(){go(current+1)} function prev(){go(current-1)}
let wheelAccum=0,wheelResetTimer=null;
window.addEventListener("wheel",e=>{
 if(locked)return;
 const primary=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
 wheelAccum+=primary;
 clearTimeout(wheelResetTimer);
 wheelResetTimer=setTimeout(()=>{wheelAccum=0},150);
 if(Math.abs(wheelAccum)<45)return;
 locked=true;
 (wheelAccum>0?next:prev)();
 wheelAccum=0;
 setTimeout(()=>locked=false,850);
},{passive:true});
window.addEventListener("keydown",e=>{if(["ArrowRight","ArrowDown","PageDown"].includes(e.key))next();if(["ArrowLeft","ArrowUp","PageUp"].includes(e.key))prev()});
let sx=0;
window.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
window.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)(dx<0?next:prev)()},{passive:true});
dots.forEach((d,i)=>d.onclick=()=>go(i)); go(current);