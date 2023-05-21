// Add Keydown Event
window.addEventListener("keydown", playSound);


// Event Functions
function playSound(event){

    // Get Sound and Key
    const audio = document.querySelector(`audio[data-key ="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key ="${event.keyCode}"]`);

    // Null check
    if(!audio) return null;

    // For animation adding class
    key.classList.add("playing");

    // Stop and Play
    audio.currentTime = 0;
    audio.play();

    // For animation remove class
    setTimeout(() =>{
        key.classList.remove("playing")
    },200);

}

