const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/musicians/";

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var formdata = new FormData();
    formdata.append("name", document.getElementById("name").value);
    formdata.append("song_title", document.getElementById("song_title").value);
    formdata.append("genre", document.getElementById("genre").value);
    formdata.append("description", document.getElementById("description").value);
    formdata.append("message", document.getElementById("message").value);
    formdata.append("audio_file", document.getElementById("audio_file").files[0]);
    formdata.append("website_code", "shan2");

    var requestOptions = {
        method: "POST",
        body: formdata,
    };

    fetch(baseURL, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        alert("Song uploaded successfully!");
        document.getElementById("uploadForm").reset();  // Reset the form fields

    })
    .catch(error => {
        console.log("error", error);
        alert("Failed to upload the song. Please try again.");
    });
});