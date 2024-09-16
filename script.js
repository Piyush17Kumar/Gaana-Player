// console.log("Hello javaScript")

//Variables
let songIndex=0;
let audioElement= new Audio("songs/2.mp3");
let masterPlay= document.getElementById("masterPlay");
let gif= document.getElementById("gif");
let progressiveBar= document.getElementById("progressiveBar");
let songLists=Array.from(document.getElementsByClassName("songList"));
let songItemPlay=Array.from(document.getElementsByClassName("songItemPlay"));
let masterSongName=document.getElementById("masterSongName");
let nextPlay=document.getElementById("nextPlay");
let prevPlay=document.getElementById("prevPlay");
let timestamp=Array.from(document.getElementsByClassName("timestamp"));

// console.log(timestamp);

//Arrays

let songs = [
    {id: 0,songName: "Slow Show – The National", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {id: 1,songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {id: 2,songName: "DEAF KEV - Invincible ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {id: 3,songName: "White Winter Hymnal – Fleet Foxes ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {id: 4,songName: "Janji-Heroes-Tonight-feat-Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {id: 5,songName: "Song for Zula – Phosphorescent", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {id: 6,songName: "Skinny Love – Bon Iver", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {id: 7,songName: "Cigarettes  – Rufus Wainwright", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {id: 8,songName: "Chocolate Milk - Ian Deover", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {id: 9,songName: "Night Sky - Bob Marlina", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]


//Inserting cover photo,songName 
songLists.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;

})

// Function to format time in mm:ss
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

//Inserting time duration for each song
makeAllSongsDuration();
function makeAllSongsDuration(){
    const audioElements = songs.map(song => new Audio(song.filePath));

    // Ensure the number of timestamps matches the number of songs
    if (timestamp.length !== audioElements.length) {
        console.error("The number of timestamps does not match the number of songs.");
    } else {
        // Iterate through each audio element and update the corresponding timestamp
        audioElements.forEach((audioElement, index) => {
            audioElement.addEventListener('loadedmetadata', () => {
                const fullTime = audioElement.duration;
                const formattedFullTime = formatTime(fullTime);
                timestamp[index].getElementsByTagName("span")[0].innerText = formattedFullTime;
            });
        });
    }
}




//Handle play/pause event for masterPlay 
masterPlay.addEventListener("click",()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");

        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity=1;

        songItemPlay[songIndex].classList.remove("fa-play-circle");
        songItemPlay[songIndex].classList.add("fa-pause-circle");
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;

        makeAllPlays();
    }

})


//Handle progressBar and the timestamp update
audioElement.addEventListener("timeupdate",()=>{

    progress= parseInt((audioElement.currentTime)/(audioElement.duration)*100);
    progressiveBar.value=progress;

    const currentTime = audioElement.currentTime;
    const formattedTime = formatTime(currentTime);
    
    timestamp[songIndex].getElementsByTagName("span")[0].innerText=formattedTime;


})

progressiveBar.addEventListener("change",()=>{
    audioElement.currentTime= (progressiveBar.value * audioElement.duration)/100;
})

//Handle play/pause event for songItemPlay
const makeAllPlays=()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

// console.log(songItemPlay);
songItemPlay.forEach((element)=>{
    element.addEventListener("click",(e)=>{

        makeAllPlays();
        makeAllSongsDuration();

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();

        // console.log(masterSongName);
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//Handle nextPlay button for next song
nextPlay.addEventListener("click",()=>{
    makeAllSongsDuration();
    

    songItemPlay[songIndex].classList.remove("fa-pause-circle");
    songItemPlay[songIndex].classList.add("fa-play-circle");

    songIndex=(songIndex+=1)%(songItemPlay.length);
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();

    songItemPlay[songIndex].classList.remove("fa-play-circle");
    songItemPlay[songIndex].classList.add("fa-pause-circle");
    

    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;



})

//Handle prevPlay button for prev song

prevPlay.addEventListener("click", () => {
    makeAllSongsDuration();

    songItemPlay[songIndex].classList.remove("fa-pause-circle");
    songItemPlay[songIndex].classList.add("fa-play-circle");

    songIndex = (songIndex - 1 + songItemPlay.length) % songItemPlay.length;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    songItemPlay[songIndex].classList.remove("fa-play-circle");
    songItemPlay[songIndex].classList.add("fa-pause-circle");

    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
});