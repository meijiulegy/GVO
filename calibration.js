/*
method 1: fixed distance in cm
method 2: relative distance
method 3: blindspot with moving dot
method 4: blindspot with fixed dot
*/

const myStoredStepCounter = localStorage.getItem('myStepCounter');
myStepCounter = JSON.parse(myStoredStepCounter);
console.log(myStepCounter);