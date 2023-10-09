let currentImageIndex = 0;
const images = [
    "../assets/images/1.jpeg",
    "../assets/images/2.jpeg",
    "../assets/images/3.jpeg"
];

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; //if viewing first image and click back, go to last element
    } else if (currentImageIndex > images.length - 1) { //if viewing last image and click forward, go to first
        currentImageIndex = 0;
    }

    document.getElementById('carouselImage').src = images[currentImageIndex];

    // generate the description based on current image index
    let artistInfo = document.querySelector('.artist-info-container p');
    artistInfo.textContent = "info " + (currentImageIndex + 1);

    // generate the image text based on current image index
    let imageTextElement = document.getElementById('imageText');
    imageTextElement.textContent = "artist " + (currentImageIndex + 1);
}

// initialize the carousel's content
changeImage(0);
