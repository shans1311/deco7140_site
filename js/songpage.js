const selectedSong = JSON.parse(sessionStorage.getItem("selectedSong")); // get item from the session (we are still in the same session)
console.log("selected not found")

if (selectedSong) {

    console.log(selectedSong)
    document.getElementById("songTitle").textContent = selectedSong.song_title;
    document.getElementById("songArtist").textContent = selectedSong.name;
    document.querySelector("#songGenre .content").textContent = selectedSong.genre;
    document.querySelector("#songDescription .content").textContent = selectedSong.description;
    document.querySelector("#songMessage .content").textContent = selectedSong.message;

    var audioElement = document.getElementById("songAudio");
    audioElement.children[0].src = selectedSong.audio_file;
    audioElement.load();
    
} else {
    console.error("No song data found!");
}
sessionStorage.removeItem("selectedSong");
