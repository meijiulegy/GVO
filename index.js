let myStepCounter = 0;
let blindSpotX = screen.availWidth/4;

/*
const myStoredDataHandle = localStorage.getItem('myDataHandle');
if (myStoredDataHandle) {
    const myDataHandle = JSON.parse(myStoredDataHandle);

}else{
    const myDataHandle = Array.from({length: 5}, () => Array.from({ length: 4}, () => []));
}
*/

const myDataHandle = Array.from({length: 5}, () => Array.from({ length: 5}, () => []));
console.log('myStepCounter = ' + myStepCounter);
console.log('myDataHandle = ' + myDataHandle);

const practiceRoundButton = document.getElementById("practiceRoundButton");
let testEyeRad = document.querySelectorAll("input[name='testEye']");
let testEye;

testEyeRad.forEach(rb => rb.addEventListener("change", function(){
    practiceRoundButton.disabled = false;
    testEye = document.querySelector("input[name='testEye']:checked").value;
    console.log('testEye = ' + testEye);
}));

function registerTestEye(){
    myDataHandle[0][0] = blindSpotX;
    myDataHandle[0][2] = parseInt(testEye);
    console.log(myDataHandle);
    localStorage.setItem('myStepCounter', JSON.stringify(myStepCounter));
    localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));
    localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
}
