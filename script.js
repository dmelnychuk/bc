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
    totalCost.length = 0;
    optionCosts();
    total();
}


//event listener to check if any radio button is checked
document.getElementById("infographic").addEventListener("click", checkRadio);

// create function that picks up input id slidestorage position and store to the variable
sliderStorage.oninput = function() {
    //create variable that indicates the position of the slider
    sliderStoragePosition = sliderStorage.value;
    console.log(`slider works:  ${sliderStoragePosition}`);
    //change value-storage id value to sliderStoragePosition
    document.getElementById("value-storage").innerHTML = sliderStoragePosition;
    totalCost.length = 0;
    optionCosts();
    total();
}

// create function that picks up input id slidetransfere position and store to the variable
sliderTransfere.oninput = function() {
    //create variable that indicates the position of the slider
    sliderTransferePosition = sliderTransfere.value;
    console.log(`slider works:  ${sliderTransferePosition}`);// testing output value
    //change value-transfere id value to sliderTransferePosition
    document.getElementById("value-transfere").innerHTML = sliderTransferePosition;
    totalCost.length = 0;
    optionCosts();
    total();
}


//array to store vendors name and total cost
let totalCost = [];

//function to calculate total cost for vendors with options
const optionCosts = () => {
const optionCosts = prices.map((price) => {
    if (price.options) {
        let radios = document.querySelectorAll(`input[name="${price.name}"]`);
        radios.forEach((radio) => {
            if (radio.value === "checked") {
               
                let option = radio.getAttribute("option");
                let stCost = price.storage[option];
                totalCost.push({name: price.name, storageCost: stCost, transfereCost: price.transfere, minpay: price.minpay, maxpay: price.maxpay, freegb: price.freegb});
               
            }
            console.log(`${price.name}, object updated`)
            
            return {name: price.name}
        })
    }
    else {totalCost.push({name: price.name, storageCost: price.storage, transfereCost: price.transfere, minpay: price.minpay, maxpay: price.maxpay, freegb: price.freegb})}

})
}


//function to calculate total cost respective to discounts
const total = () => {
const total = totalCost.map((price) => {
    
    let storagePrice = price.storageCost * sliderStoragePosition;
    let transferePrice = price.transfereCost * sliderTransferePosition;
    let totalPrice = storagePrice + transferePrice;
 
    //minpay condition

    if (price.minpay && totalPrice < price.minpay) {
        console.log(`${price.name}, total:${price.minpay} - (second if)`);
        return {name: price.name, total: price.minpay} }
    //maxpay condition
    else if (price.maxpay && totalPrice > price.maxpay) {
        console.log(`${price.name}, total:${price.maxpay} - (third if)`);
        return {name: price.name, total: price.maxpay} }

    //freegb condition
 
    else if (price.freegb && price.freegb > sliderStoragePosition && price.freegb > sliderTransferePosition) {
        console.log(`${price.name}, total: 0 - (forth if)`);

        return {name: price.name, total: 0} }

    else if (price.freegb && price.freegb < sliderStoragePosition) {

        console.log(`${price.name}, total: ${totalPrice} - (fifth if)`);
        return {name: price.name, total: totalPrice} }


    //no condition
        else{
        console.log(`${price.name}, total: ${totalPrice} - (else)`);
        return {name: price.name, total: totalPrice}}
})
}


