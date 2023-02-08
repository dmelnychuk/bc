//create object of vendors with prices and options
const prices = {
  backblaze: {
    name: "backblaze.com",
    storage: 0.005,
    transfere: 0.01,
    minpay: 7,
   },
   bunny: {
    name: "bunny.net",
    options: {hdd, ssd},
    storage: {ssd: 0.02, hdd: 0.01},
    transfere: 0.01,
    },
    scaleway: {
    name: "scaleway.com",
    maxpay: 10,
    options: {multi, single},
    storage: {multi: 0.06, single: 0.03},
    transfere: 0.02,
    free: 75,
    },
    vultr: {
    name: "vultr.com",
    minpay: 5,
    storage: 0.01,
    transfere: 0.01,
    }
    };

//let this file be accessible from other files
module.exports = prices;

