const imagePaths = [
    "../assets/images/aphex1.jpg",
    "../assets/images/aphex2.jpg",
    "../assets/images/kendrick.jpg",
    "../assets/images/graduation.jpg",
    "../assets/images/deathcon.jpg",
    "../assets/images/deathgrips.jpg"
];

let currentPlayingAudio;

function fetchSongs(url, containerElement, imagePathArray = null) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach((song, index) => {
                    const songCard = createSongCard(song, imagePathArray ? imagePathArray[index % imagePathArray.length] : song.song_photo);
                    containerElement.appendChild(songCard);
                });
            } else {
                containerElement.textContent = 'No songs found!';
            }
        })
        .catch(error => {
            console.log('error', error);
            containerElement.textContent = 'Error fetching song data.';
        });
}

function createSongCard(song, imagePath) {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';

    const songCover = document.createElement('img');
    songCover.className = 'song-cover';
    songCover.src = imagePath;

    const songInfo = document.createElement('div');
    songInfo.className = 'song-info';

    const songArtist = document.createElement('p');
    songArtist.className = 'song-artist';
    songArtist.textContent = song.artist || song.name;

    const songTitle = document.createElement('p');
    songTitle.className = 'song-title';
    songTitle.textContent = song.title || song.song_title;

    const infoButton = document.createElement('button');
    infoButton.className = 'info-button';
    infoButton.innerHTML = 'i';
    infoButton.addEventListener('click', function() {
        showPopup(song);
    });

    songCard.appendChild(songCover);
    songCard.appendChild(songInfo);
    songCard.appendChild(infoButton);
    songInfo.appendChild(songTitle);
    songInfo.appendChild(songArtist);

    return songCard;
}

function showPopup(song) {
    const popupContainer = document.getElementById('popup');
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

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("song-cover")) {
        const audioElement = event.target.nextElementSibling;
        if (audioElement.paused) {
            if (currentPlayingAudio && currentPlayingAudio !== audioElement) {
                currentPlayingAudio.pause();
                currentPlayingAudio.currentTime = 0;
            }
            audioElement.play();
            currentPlayingAudio = audioElement;
            togglePlaybar(true);
        } else {
            audioElement.pause();
            togglePlaybar(true);
        }

        currentPlayingAudio.ontimeupdate = function() {
            const progress = (currentPlayingAudio.currentTime / currentPlayingAudio.duration) * 100;
            const fill = document.getElementById("fill");
            fill.style.width = progress + '%';
        };
    }
});

function togglePlaybar(show) {
    const playbarContainer = document.querySelector(".playbar-container");
    if (show) {
        playbarContainer.style.display = 'flex';
    } else {
        playbarContainer.style.display = 'none';
    }
}

document.getElementById("closePlaybarButton").addEventListener("click", function() {
    togglePlaybar(false);
    if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
    }
});

const baseUrl = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/musicians/";
const my_website_code = 'shan2';
const queryParams = {
    website_code: my_website_code
};
const queryString = new URLSearchParams(queryParams).toString();
const urlWithParams = baseUrl + "?" + queryString;

fetchSongs(urlWithParams, document.getElementById('songData'), imagePaths);
fetchSongs("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/top10songs/", document.getElementById('topSongs'));
