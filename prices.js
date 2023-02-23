//create object of vendors with prices and options
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
//let this file be accessible from other files

export {prices};

