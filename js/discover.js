
//-----------------------------------------FETCHING RECENTLY MADE SONGS-----------------------------------------
const baseUrl = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/musicians/";
const my_website_code = 'shan2';
const queryParams = {
    website_code: my_website_code
};


const queryString = new URLSearchParams(queryParams).toString();
const urlWithParams = baseUrl + "?" + queryString;

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const imagePaths = [
    "../assets/images/aphex1.jpg",
    "../assets/images/aphex2.jpg",
    "../assets/images/kendrick.jpg",
    "../assets/images/graduation.jpg",
    "../assets/images/deathcon.jpg",
    "../assets/images/deathgrips.jpg"
];


const songsContainer = document.getElementById('songData');
songsContainer.innerHTML = '';


// Fetch data from the specified URL with the provided options
fetch(urlWithParams, requestOptions)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        // Get the container element for songs by its ID
        // Check if data exists and has more than 0 elements
        if (data && data.length > 0) {
            // Iterate over each song in the data
            data.forEach((song, index) => {  
                // Create a new div element for the song card
                const songCard = document.createElement('div');
                songCard.className = 'song-card';

                // Create an image element for the song cover
                const songCover = document.createElement('img');
                songCover.className = 'song-cover';
                // Set the source attribute of the image to cycle through imagePaths
                songCover.src = imagePaths[index % imagePaths.length];

                // Create an audio element for the song
                const songAudio = document.createElement('audio');
                const songSource = document.createElement('source');
                // Set the source and type of the audio element
                songSource.src = song.audio_file;
                songSource.type = 'audio/mpeg';
                // Append the source to the audio element
                songAudio.appendChild(songSource);

                // Create a div element for song information
                const songInfo = document.createElement('div');
                songInfo.className = 'song-info';

                // Create a paragraph element for the song artist
                const songArtist = document.createElement('p');
                songArtist.className = 'song-artist';
                // Set the text content to the artist's name
                songArtist.textContent = song.name;

                // Create a paragraph element for the song title
                const songTitle = document.createElement('p');
                songTitle.className = 'song-title';
                // Set the text content to the song title
                songTitle.textContent = song.song_title;

                // Create an info button for the song details
                const infoButton = document.createElement('button');
                infoButton.className = 'info-button';
                infoButton.innerHTML = 'i';
                infoButton.addEventListener('click', function() {
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


            });
        } else {
            // If no songs were found, display a message in the container
            songsContainer.textContent = 'No songs found!';
        }
    })
    .catch(error => {
        // Handle errors by logging them and displaying an error message
        console.log('error', error);
        document.getElementById('songData').textContent = 'Error fetching song data.';
    }
);

const popupContainer = document.getElementById('popup');

function showPopup(song) {
    console.log("Function called"); // Debugging line

    // Create the popup to display song details
    const popup = document.createElement('div');
    popup.className = 'song-popup';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-popup';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', function() {
        popupContainer.removeChild(popup);
    });

    const genre = document.createElement('p');
    genre.textContent = 'Genre: ' + song.genre;

    const message = document.createElement('p');
    message.textContent = 'Message: ' + song.message;

    const description = document.createElement('p');
    description.textContent = 'Description: ' + song.description;

    popup.appendChild(closeBtn);
    popup.appendChild(genre);
    popup.appendChild(message);
    popup.appendChild(description);

    popupContainer.appendChild(popup);
}






//-----------------------------------------LOGIC FOR THE MUSIC PLAYER BAR-----------------------------------------

// Define a variable to keep track of the currently playing audio element
let currentPlayingAudio;

// Select necessary HTML elements by their IDs or classes
const playbarContainer = document.querySelector(".playbar-container");
const playbar = document.getElementById("playbar");
const fill = document.getElementById("fill");
const playPauseButton = document.getElementById("playPauseButton");
const closePlaybarButton = document.getElementById("closePlaybarButton");


// Add a click event listener to the document
document.addEventListener("click", function(event) {
    // Check if the clicked element has a class "song-cover"
    if (event.target.classList.contains("song-cover")) {
        // Get the audio element that follows the clicked cover image
        const audioElement = event.target.nextElementSibling;

        // Check if the audio element is paused
        if (audioElement.paused) {
            // If another audio is playing, pause and reset it
            if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
                currentPlayingAudio.pause();
                currentPlayingAudio.currentTime = 0; // Reset the time if you want to start from the beginning
            }
            // Start playing the clicked audio element
            audioElement.play();
            // Update the current playing audio
            currentPlayingAudio = audioElement;
            // Show the playbar when a song starts
            togglePlaybar(true);
        } else {
            // Pause the currently playing audio
            audioElement.pause();
            // Keep playbar shown when a song is paused
            togglePlaybar(true);
        }

        // Add the ontimeupdate event to update the progress bar in real-time
        currentPlayingAudio.ontimeupdate = function() {
            // Calculate the progress percentage
            const progress = (currentPlayingAudio.currentTime / currentPlayingAudio.duration) * 100;
            // Update the width of the fill element to reflect the progress
            fill.style.width = progress + '%';
        };
    }
});

// Function to handle play/pause button click
function playPause() {
    if (currentPlayingAudio) {
        if (currentPlayingAudio.paused) {
            // If paused, play the audio
            currentPlayingAudio.play();
        } else {
            // If playing, pause the audio
            currentPlayingAudio.pause();
        }
    }
}

// Function to toggle the visibility of the playbar
function togglePlaybar(show) {
    if (show) {
        // Show the playbar by setting its display style to 'flex'
        playbarContainer.style.display = 'flex';
    } else {
        // Hide the playbar by setting its display style to 'none'
        playbarContainer.style.display = 'none';
    }
}

closePlaybarButton.addEventListener("click", function() {
    // Close the playbar
    togglePlaybar(false);

    // Pause the currently playing audio (if any)
    if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;

    }
});




//-----------------------------------------FETCHING TOP 10 SONGS-----------------------------------------

const topURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/top10songs/";

// Assuming imagePaths is an array you've defined elsewhere
const topSongsContainer = document.getElementById('topSongs'); 

fetch(topURL)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            data.forEach((song, index) => {  
                const songCard = document.createElement('div');
                songCard.className = 'song-card';

                const songCover = document.createElement('img');
                songCover.className = 'song-cover';
                songCover.src = song.song_photo;

                const songInfo = document.createElement('div');
                songInfo.className = 'song-info';

                const songArtist = document.createElement('p');
                songArtist.className = 'song-artist';
                songArtist.textContent = song.artist;

                const songTitle = document.createElement('p');
                songTitle.className = 'song-title';
                songTitle.textContent = song.title;

                const infoButton = document.createElement('button');
                infoButton.className = 'info-button';
                infoButton.innerHTML = 'i';
                infoButton.addEventListener('click', function() {
                    showPopup(song);
                });
                
                songCard.appendChild(songCover);
                songInfo.appendChild(songTitle);
                songInfo.appendChild(songArtist);
                songCard.appendChild(songInfo);
                songCard.appendChild(infoButton);
                topSongsContainer.appendChild(songCard);
            });
        } else {
            topSongsContainer.textContent = 'No songs found!';
        }
    })
    .catch(error => {
        console.log('error', error);
        topSongsContainer.textContent = 'Error fetching song data.';
    }
);
