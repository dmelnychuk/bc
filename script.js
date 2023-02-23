import {prices} from "./prices.js"; 

// variables for ids of sliders from html body
const sliderStorage = document.getElementById("sliderstorage");
const sliderTransfere = document.getElementById("slidertransfere");



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


//for each li with radio class set last child input to checked
let radios = document.querySelectorAll("li.radio");
radios.forEach((radio) => {
    radio.lastChild.checked = true;
})


//check if radio button is checked or not 
const checkRadio = () => {
    let radios = document.querySelectorAll("input[option]");
    radios.forEach((radio) => {
        if (radio.checked) {
            radio.checked = true;
            radio.value = "checked";
        }
        else {
            radio.checked = false;
            radio.value = "unchecked";
        }
    })
    run();
}



//event listener to check if any radio button is checked
document.getElementById("infographic").addEventListener("click", checkRadio);

// create function that picks up input id slidestorage position and store to the variable
sliderStorage.oninput = function() {
    document.getElementById("value-storage").value = sliderStorage.value;
    run();
}

const  storageInput = document.getElementById("value-storage");
storageInput.oninput = function() {
    sliderStorage.value = storageInput.value;
    run();
}


// create function that picks up input id slidetransfere position and store to the variable
sliderTransfere.oninput = function() {
    document.getElementById("value-transfere").value = sliderTransfere.value;
    run();
}

const transferInput = document.getElementById("value-transfere");
transferInput.oninput = function() {
    sliderTransfere.value = transferInput.value;
    sliderStorage.value = transferInput.value;
    run();
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
            //console.log(`${price.name}, object updated`)
            
            return {name: price.name}
        })
    }
    else {totalCost.push({name: price.name, storageCost: price.storage, transfereCost: price.transfere, minpay: price.minpay, maxpay: price.maxpay, freegb: price.freegb})}

})
}

let info = []

//function to calculate total cost respective to discounts
const total = () => {
    info.length = 0;
const total = totalCost.map((price) => {
    
    let storagePrice = price.storageCost * sliderStorage.value;
    let transferePrice = price.transfereCost * sliderTransfere.value;
    let totalPrice = storagePrice + transferePrice;
    totalPrice = totalPrice.toFixed(2);
 
    //minpay condition
    if (price.minpay && totalPrice < price.minpay) {
        console.log(`${price.name}, total:${price.minpay} - (second if)`);
        info.push({name: price.name, total: price.minpay})
        return {name: price.name, total: price.minpay} }
    //maxpay condition
    else if (price.maxpay && totalPrice > price.maxpay) {
        console.log(`${price.name}, total:${price.maxpay} - (third if)`);
        info.push({name: price.name, total: price.maxpay})
        return {name: price.name, total: price.maxpay} }

    //freegb condition
 
    else if (price.freegb && price.freegb > sliderStorage.value && price.freegb > sliderTransfere.value) {
        console.log(`${price.name}, total: 0 - (forth if)`);
        info.push({name: price.name, total: 0})
        return {name: price.name, total: 0} }

    else if (price.freegb && price.freegb <= sliderStorage.value) {
        totalPrice = totalPrice - (price.freegb * price.storageCost);
        totalPrice = totalPrice - (price.freegb * price.transfereCost);
        totalPrice = totalPrice.toFixed(2);
        console.log(`${price.name}, total: ${totalPrice} - (fifth if)`);
        info.push({name: price.name, total: totalPrice})
        return {name: price.name, total: totalPrice} }

    //no condition
        else{
        console.log(`${price.name}, total: ${totalPrice} - (else)`);
        info.push({name: price.name, total: totalPrice})
        return {name: price.name, total: totalPrice}}
})
}

const run = () => {
    totalCost.length = 0;
    optionCosts();
    total();
    infoDataUpdate();
    color();
    draw();
}


let labels = [];
let values = [];
let bgcolor = [];

//assigncolor to the lowest value
const color = () => {
    bgcolor.length = 0;
    values.forEach((value) => {
        if (value === Math.min(...values)) {
            bgcolor.push("aquamarine");
        }
        else {
            bgcolor.push("lavender");
        }
    })
}

//update labels and values arrays
const infoDataUpdate = () => {
    labels.length = 0;
    values.length = 0;
const labelsData = info.map ((name) => {
    labels.push(name.name);
    return name.name;
})

const valuesData = info.map ((total) => {
    let totalValue = total.total;
    totalValue = parseFloat(totalValue);
    values.push(totalValue);
    return total.total;
})

// console.table(labels);
// console.table(values);
// console.table(bgcolor);
}

//setup block
const data = {
    labels: labels,
    datasets: [{
      label: 'Total price',
      data: values,
      borderWidth: 1,
      backgroundColor: bgcolor,
    //   borderColor: ["#FF6384"]
    }]
  }
//config block
const config = {
    type: 'bar',
    data,
    options: {
        indexAxis: 'x',
        animation : { duration: 0 },
        scales: {
            y: {
                //ticks: { color: bgcolor },
                beginAtZero: true
            }
        }
    },
    plugins: [ChartDataLabels]
}

const config2 = {
    type: 'bar',
    data,
    options: {
        indexAxis: 'y',
        animation : { duration: 0 },
        scales: {
            x: {
                //ticks: { color: bgcolor },
                beginAtZero: true
            }
        }
    },
    plugins: [ChartDataLabels]
};

//init block
let ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, config);

const draw = () => {
//destroy existing chart before rendering new one
const destroy = () => {
    myChart.destroy();
}
destroy();

//render new chart
const render = () => {
    myChart = new Chart(ctx, config);
}
render();
};

//change config for myChart on resize the screen
window.addEventListener("resize", () => {
    draw();
    let indexAxis = myChart.config.options.indexAxis;
    console.log(indexAxis);

    if (indexAxis == 'x' && window.innerWidth >= 600) {
        console.log('convert to Y')
        myChart.destroy();

        myChart = new Chart(
            ctx,
            config2
            
        );
    }
    if (indexAxis == 'y' && window.innerWidth < 600) {
        //console.log('convert to X')
        myChart.destroy();

        myChart = new Chart(
            ctx,
            config
        );
    }

})

run();

