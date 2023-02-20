//const prices = require("./prices.js"); //access prices.js file where we have all prices and conditions
console.log("test");

const prices = [
    {
      name: "backblaze.com",
      storage: 0.005,
      transfere: 0.01,
      minpay: 7,
     },
     {
      name: "bunny.net",
      options: {hdd: 0, ssd: 1},
      storage: {ssd: 0.02, hdd: 0.01},
      transfere: 0.01,
      maxpay: 10,
      },
       {
      name: "scaleway.com",
      maxpay: 10,
      options: {multi: 0, single: 1},
      storage: {multi: 0.06, single: 0.03},
      transfere: 0.02,
      freegb: 75,
      },
     {
      name: "vultr.com",
      minpay: 5,
      storage: 0.01,
      transfere: 0.01,
      }
    ];

// create variables that picks up ids of sliders from html body
const sliderStorage = document.getElementById("sliderstorage");
const sliderTransfere = document.getElementById("slidertransfere");
//set base slider positions
let sliderTransferePosition = 100; 
let sliderStoragePosition = 100;

//draw a list of vendors with and without radio buttons
prices.forEach((price) => {
    if (price.options) { 

        //if object property has options create radiobutton for these options using option key as radiobutton label
        let options = Object.keys(price.options);
        let radioButtons = options.map((option) => {
            return `<input type="radio" name="${price.name}" option="${option}" >${option}</input>`
        })

        //draw a list of vendors with radio buttons
        document.getElementById("infographic").innerHTML += `<li class="radio" id="radio-${price.name}">${price.name} ${radioButtons.join(" ")}</li>`
    } else {
        //draw a list of vendors without radio buttons
        document.getElementById("infographic").innerHTML += `<li>${price.name}</li>`
    }
})


//create function that checks if radio button is checked or not and add checked or unchecked property to the radio button
const checkRadio = () => {
    console.log(`checkRadio function starts...`)
    //loop through all radio buttons with option property
    let radios = document.querySelectorAll("input[option]");
    radios.forEach((radio) => {
        //if radio button is checked, add checked property to this radio button
        if (radio.checked) {
            radio.checked = true;
            radio.value = "checked";
        }
        //if radio button is not checked, add unchecked property to this radio button
        else {
            radio.checked = false;
            radio.value = "unchecked";
        }

    })
}

//add event listener to check if any radio button is checked
document.getElementById("infographic").addEventListener("click", checkRadio);

// create function that picks up input id slidestorage position and store to the variable
sliderStorage.oninput = function() {
    //create variable that indicates the position of the slider
    sliderStoragePosition = sliderStorage.value;
    console.log(`slider works:  ${sliderStoragePosition}`);
    //change value-storage id value to sliderStoragePosition
    document.getElementById("value-storage").innerHTML = sliderStoragePosition;
    total();
}

// create function that picks up input id slidetransfere position and store to the variable
sliderTransfere.oninput = function() {
    //create variable that indicates the position of the slider
    sliderTransferePosition = sliderTransfere.value;
    console.log(`slider works:  ${sliderTransferePosition}`);// testing output value
    //change value-transfere id value to sliderTransferePosition
    document.getElementById("value-transfere").innerHTML = sliderTransferePosition;
    total();
}


//loop through prizes array return a new array of objects with names and total price
const total = () => {
const total = prices.map((price) => {
    
    let storagePrice = price.storage * sliderStoragePosition;
    //console.log(`storagePrice is ${storagePrice}`)
    let transferePrice = price.transfere * sliderTransferePosition;
    //console.log(`transferePrice is ${transferePrice}`)
    let totalPrice = storagePrice + transferePrice;
    //console.log(`totalPrice is ${totalPrice}`)

//if price has an options property, use checked radiobutton of relevant vendor to calculate price picked from storage with the same option key
     if (price.options) {
        let radios = document.querySelectorAll(`input[name="${price.name}"]`);
        let ttlPrice = 0;
        radios.forEach((radio) => {
            if (radio.value === "checked") {
                let option = radio.getAttribute("option");
                // console.log(`Option if: 111 option is ${option}`)
                let stPrice = price.storage[option] * sliderStoragePosition;
                // console.log(`stPrice is ${stPrice}`)
                let trnsPrice = price.transfere * sliderTransferePosition;
                // console.log(`trtrnsPrice is ${trnsPrice}`)
                ttlPrice = stPrice + trnsPrice;
                // console.log(`ttlPrice is ${ttlPrice}`)
                totalPrice = ttlPrice;
            }
            console.log(`${price.name}, total: ${totalPrice} - (first if)`)
            return {name: price.name, total: totalPrice}
        })
    }

    //if price has a minpay property and totalPrice is less than minpay, return minpay
    else if (price.minpay && totalPrice < price.minpay) {
        console.log(`${price.name}, total:${price.minpay} - (second if)`);
        return {name: price.name, total: price.minpay} }
    //if price has a maxpay property and totalPrice is more than maxpay, return maxpay
    else if (price.maxpay && totalPrice > price.maxpay) {
        console.log(`${price.name}, total:${price.maxpay} - (third if)`);
        return {name: price.name, total: price.maxpay} }

    //if freegb property is less than sliderStoragePosition and sliderTransferePosition, return 0. 
 
    else if (price.freegb && price.freegb < sliderStoragePosition && price.freegb < sliderTransferePosition) {
        console.log(`${price.name}, total: 0 - (forth if)`);

        return {name: price.name, total: 0} }
    //if freegb property is more than sliderStoragePosition or sliderTransferePosition, return totalPrice
    else if (price.freegb && price.freegb > sliderStoragePosition || price.freegb > sliderTransferePosition) {
        // console.log(price.name);
        console.log(`${price.name}, total: ${totalPrice} - (fifth if)`);
        return {name: price.name, total: totalPrice} }
    //if none of the above conditions are met, return totalPrice
        else{
        console.log(`${price.name}, total: ${totalPrice} - (else)`);
        return {name: price.name, total: totalPrice}}
})
}


