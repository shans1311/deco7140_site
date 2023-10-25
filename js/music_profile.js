
//-----------------------------------------FETCHING MUSIC PROFILE SONGS-----------------------------------------

const baseUrl = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/musicians/";


const songsContainer = document.getElementById("musicProfile"); 
songsContainer.innerHTML = "";


const my_website_code = "shan2";
const queryParams = {
    website_code: my_website_code
};


const queryString = new URLSearchParams(queryParams).toString();
const urlWithParams = baseUrl + "?" + queryString;

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const imagePaths = [
    "../assets/images/aphex1.jpg",
    "../assets/images/aphex2.jpg",
    "../assets/images/kendrick.jpg",
    "../assets/images/graduation.jpg",
    "../assets/images/deathcon.jpg",
    "../assets/images/deathgrips.jpg"
];
// Fetch data from the specified URL with the provided options
fetch(urlWithParams, requestOptions)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Get the container element for songs by its ID
        // Check if data exists and has more than 0 elements
        const miloSongs = data.filter(song => song.name && song.name.toLowerCase() === "milo");
        if (miloSongs && miloSongs.length > 0) {
            // Iterate over each song in the data
            miloSongs.forEach((song, index) => {  
                
                // Create a new div element for the song card
                const songCard = document.createElement("div");
                songCard.className = "song-card";

                // Create an image element for the song cover
                const songCover = document.createElement("img");
                songCover.className = "song-cover";
                songCover.src = imagePaths[index % imagePaths.length];

                // Create an audio element for the song
                const songAudio = document.createElement("audio");
                const songSource = document.createElement("source");
                songSource.src = song.audio_file;
                songSource.type = "audio/mpeg";
                songAudio.appendChild(songSource);

                // Create a div element for song information
                const songInfo = document.createElement("div");
                songInfo.className = "song-info";

                // Create a paragraph element for the song artist
                const songArtist = document.createElement("p");
                songArtist.className = "song-artist";
                songArtist.textContent = song.name;

                // Create a paragraph element for the song title
                const songTitle = document.createElement("p");
                songTitle.className = "song-title";
                songTitle.textContent = song.song_title;

                // Store genre, description, and message in the songCard using data-* attributes
                // (We dont display this on the discover page)
                songCard.setAttribute("data-genre", song.genre);
                songCard.setAttribute("data-description", song.description);
                songCard.setAttribute("data-message", song.message);

                // Create an info button for the song details
                const infoButton = document.createElement("button");
                infoButton.className = "info-button";
                infoButton.innerHTML = "i";
                infoButton.addEventListener("click", function() {
                    showPopup(song);
                });
                
                // Append the info button to the song card

                // Append everything
                songCard.appendChild(songCover);
                songCard.appendChild(songAudio);
                songCard.appendChild(songInfo);
                songCard.appendChild(infoButton);
                songInfo.appendChild(songTitle);
                songInfo.appendChild(songArtist);
                songsContainer.appendChild(songCard);


                // Put this in here to access data, handles redirecting to songpage
            document.addEventListener("dblclick", function(event) {
            if (event.target.classList.contains("song-cover")) {
                const songElement = event.target.parentNode;
                const songIndex = Array.from(songElement.parentNode.children).indexOf(songElement);
                const songData = data[songIndex]; // Access data
                
                sessionStorage.setItem("selectedSong", JSON.stringify(songData));
                window.location.href = "songpage.html";
            }
        });
            });
        } else {
            // If no songs were found, display a message in the container
            songsContainer.textContent = "No songs found for milo!";
        }

    })
    .catch(error => {
        // Handle errors by logging them and displaying an error message
        console.log("error", error);
        document.getElementById("songData").textContent = "Error fetching song data.";
    }
);
/* 
const name = document.getElementById("name"); 
function fetchForUser(name){
    fetch(urlWithParams, requestOptions)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Get the container element for songs by its ID
        // Check if data exists and has more than 0 elements
        const miloSongs = data.filter(song => song.name && song.name.toLowerCase() === "name");
        if (nameSongs && nameSongs.length > 0) {
            // Iterate over each song in the data
            nameSongs.forEach((song, index) => {  
                
                // Create a new div element for the song card
                const songCard = document.createElement("div");
                songCard.className = "song-card";

                // Create an image element for the song cover
                const songCover = document.createElement("img");
                songCover.className = "song-cover";
                songCover.src = imagePaths[index % imagePaths.length];

                // Create an audio element for the song
                const songAudio = document.createElement("audio");
                const songSource = document.createElement("source");
                songSource.src = song.audio_file;
                songSource.type = "audio/mpeg";
                songAudio.appendChild(songSource);

                // Create a div element for song information
                const songInfo = document.createElement("div");
                songInfo.className = "song-info";

                // Create a paragraph element for the song artist
                const songArtist = document.createElement("p");
                songArtist.className = "song-artist";
                songArtist.textContent = song.name;

                // Create a paragraph element for the song title
                const songTitle = document.createElement("p");
                songTitle.className = "song-title";
                songTitle.textContent = song.song_title;

                // Store genre, description, and message in the songCard using data-* attributes
                // (We dont display this on the discover page)
                songCard.setAttribute("data-genre", song.genre);
                songCard.setAttribute("data-description", song.description);
                songCard.setAttribute("data-message", song.message);

                // Create an info button for the song details
                const infoButton = document.createElement("button");
                infoButton.className = "info-button";
                infoButton.innerHTML = "i";
                infoButton.addEventListener("click", function() {
                    showPopup(song);
                });
                
                // Append the info button to the song card

                // Append everything
                songCard.appendChild(songCover);
                songCard.appendChild(songAudio);
                songCard.appendChild(songInfo);
                songCard.appendChild(infoButton);
                songInfo.appendChild(songTitle);
                songInfo.appendChild(songArtist);
                songsContainer.appendChild(songCard);


                // Put this in here to access data, handles redirecting to songpage
            document.addEventListener("dblclick", function(event) {
            if (event.target.classList.contains("song-cover")) {
                const songElement = event.target.parentNode;
                const songIndex = Array.from(songElement.parentNode.children).indexOf(songElement);
                const songData = data[songIndex]; // Access data
                
                sessionStorage.setItem("selectedSong", JSON.stringify(songData));
                window.location.href = "songpage.html";
            }
        });
            });
        } else {
            // If no songs were found, display a message in the container
            songsContainer.textContent = "No songs found for user!";
        }

    })
    .catch(error => {
        // Handle errors by logging them and displaying an error message
        console.log("error", error);
        document.getElementById("songData").textContent = "Error fetching song data.";
    }
);

}
 */