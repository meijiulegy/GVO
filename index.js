let myStepCounter = 0;
let blindSpotX = screen.availWidth/4;
console.log('myStepCounter = ' + myStepCounter);

localStorage.setItem('myStepCounter', JSON.stringify(myStepCounter));
localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));
