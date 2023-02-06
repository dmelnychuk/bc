console.log("test");



// create variables that picks up ids of sliders from html body
const sliderStorage = document.getElementById("sliderstorage");
const sliderTransfere = document.getElementById("slidertransfere");

// create function that picks up input id slidestorage position and store to the variable
sliderStorage.oninput = function() {
    //create variable that indicates the position of the slider
    let sliderStoragePosition = sliderStorage.value;
    console.log(`slider works:  ${sliderStoragePosition}`);
    //change value-storage id value to sliderStoragePosition
    document.getElementById("value-storage").innerHTML = sliderStoragePosition;
}

// create function that picks up input id slidetransfere position and store to the variable
sliderTransfere.oninput = function() {
    //create variable that indicates the position of the slider
    let sliderTransferePosition = sliderTransfere.value;
    console.log(`slider works:  ${sliderTransferePosition}`);// testing output value
    //change value-transfere id value to sliderTransferePosition
    document.getElementById("value-transfere").innerHTML = sliderTransferePosition;
}


