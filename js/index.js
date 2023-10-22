let currentImageIndex = 0;
const images = [
    "../assets/images/featured_artist_1.jpg",
    "../assets/images/featured_artist_2.jpg",
    "../assets/images/featured_artist_3.jpg"
];

const artists = ["Elara Lune", "Miro Stellan", "Celestia Vrai"];
const artistDecriptions = [
    "A mesmerizing fusion of ethereal dream-pop and moody ambient soundscapes, Elara Lune captures the very essence of nocturnal serenity. Her haunting melodies echo under starlit skies, entrancing listeners with a blend of synth and celestial harmonies.", 
    "Channeling the raw energy of rock with a touch of bluesy grit, Miro Stellan delivers powerful anthems that resonate with the rebellious spirit of yesteryears. His raspy vocals and electric guitar riffs are reminiscent of smoky bars and freedom roads.", 
    "With a voice as crisp as mountain air, Celestia Vrai melds folk traditions with modern indie sensibilities. Her songs tell tales of nature's wonders, love's intricacies, and the timeless dance of seasons, all wrapped in acoustic warmth."
];


function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
function scrollToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listener to toggle the display of the chevrons
window.addEventListener('scroll', function() {
const chevronDown = document.querySelector('.footer-chevron-down');
const chevronUp = document.querySelector('.footer-chevron-up');

if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {  // 50 is a buffer
    chevronDown.style.display = 'none';
    chevronUp.style.display = 'inline-block';
} else {
    chevronDown.style.display = 'inline-block';
    chevronUp.style.display = 'none';
}
});


//FEED
document.addEventListener("DOMContentLoaded", function() {
    const feed = document.querySelector('.feed');
    feed.addEventListener('scroll', function() {
    });
});



function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; //if viewing first image and click back, go to last element
    } else if (currentImageIndex > images.length - 1) { //if viewing last image and click forward, go to first
        currentImageIndex = 0;
    }

    document.getElementById('carouselImage').src = images[currentImageIndex];

    // generate the description based on current image index
    let artistInfo = document.getElementById('artistInfo');
    artistInfo.textContent = artistDecriptions[currentImageIndex];

    // generate the image text based on current image index
    let imageTextElement = document.getElementById('imageText');
    imageTextElement.textContent = artists[currentImageIndex];
}

// initialize the carousel's content
changeImage(0);


