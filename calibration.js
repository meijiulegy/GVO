/*
method 1: fixed distance in cm
method 2: relative distance
method 3: blindspot with moving dot
method 4: blindspot with fixed dot
*/

const myStoredStepCounter = localStorage.getItem('myStepCounter');
let myStepCounter = JSON.parse(myStoredStepCounter);
//myStepCounter = 3; //for development
console.log('myStepCounter = ' + myStepCounter);
localStorage.setItem('myStepCounter', JSON.stringify(myStepCounter)); // for development
let blindSpotX;
const myStoredDataHandle = localStorage.getItem('myDataHandle');
const myDataHandle = JSON.parse(myStoredDataHandle);

if (myStepCounter == 1){
    /*
    standard ID card = 86*54mm, A4 paper = 297*210mm, 
    tan(15 deg) = 0.268,  297mm*tan(15deg) = 79.6mm, 
    let user resize a rectangle, length = x pixel, calibration: (x/86) pixel/mm
    at distance = 297mm
    +15 deg blindspot horizontal position: + (79.6/86)*x pixel
    */
    const myCardImg = document.getElementById('bankCard');
    let currentWidth = myCardImg.width;
    console.log(currentWidth);

    function makeSmaller(){
        currentWidth -= 10;
        myCardImg.style.width = currentWidth + 'px';
        console.log('card width = ' + currentWidth);
    }
    function makeBigger(){
        currentWidth += 10;
        myCardImg.style.width = currentWidth + 'px';
        console.log('card width = ' + currentWidth);
    }

    function calculateBlindSpot(){
        blindSpotX = Math.floor(currentWidth * 297 / 86 * getTanDeg(15));
        myDataHandle[1][0] = blindSpotX;
        localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
    }

    function getTanDeg(deg) {
        const rad = (deg * Math.PI) / 180;
        return Math.tan(rad);
    }


} else if (myStepCounter == 2){
    /*
    display k pixels on screen
    blindspot horizontal position: + 0.268*k pixel
    blindspot vertical position: - 0.0262*k pixel
    */
    document.getElementById('lineDiv').style.height = 0.2*window.innerWidth + 'px'
    document.getElementById('doubleArrow').style.width = 0.75*window.innerWidth + 'px';
    blindSpotX = Math.floor(0.75*0.268*window.innerWidth);
    myDataHandle[2][0] = blindSpotX;
    localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
    console.log(myDataHandle);
    console.log('blindSpotX = ' + blindSpotX);

} else if (myStepCounter == 3){
    root = document.documentElement;
    root.style.setProperty('--blindSpotMovement', myDataHandle[0][2] * window.innerWidth/2 + "px");
    let fixationPositionX;
    let blindSpotPositionX;
    console.log('fixationPoint is at' + document.getElementById('fixationPoint').getBoundingClientRect().left);
    console.log('blindSpotLocator is at' + document.getElementById('blindSpotLocator').getBoundingClientRect().left);
    //console.log('blindSpotLocation is at' + document.getElementById('blindSpotLocation').getBoundingClientRect().left);
    function startCalibration(callback){
        fixationPositionX = document.getElementById('fixationPoint').getBoundingClientRect().left;
        document.getElementById('blindSpotLocator').style.display = 'block';
        document.getElementById('blindSpotLocator').classList.add('locatorStartMoving');
        setTimeout(() => {
            callback();
        }, 10000);

        document.addEventListener("keydown", processBlindSpotX);
    }
    function stopCalibration(){
        document.getElementById('blindSpotLocator').classList.remove('locatorStartMoving');
    }
    function processBlindSpotX(){
        document.removeEventListener('keydown', processBlindSpotX);
        fixationPositionX = document.getElementById('fixationPoint').getBoundingClientRect().left;
        blindSpotPositionX = document.getElementById('blindSpotLocator').getBoundingClientRect().left;
        blindSpotX = Math.abs(Math.floor(blindSpotPositionX - fixationPositionX));
        console.log(blindSpotX);
        myDataHandle[3][0] = blindSpotX;
        localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
        console.log(myDataHandle);
        console.log('blindSpotX = ' + blindSpotX);
        document.getElementById('blindSpotLocator').style.display = 'none';
        document.getElementById('startBlindSpotCalibration').style.display = 'none';
        document.getElementById('blindSpotCalibrationStartGVO').style.display = 'block';
        document.getElementById('redoBlindSpotCalibration').style.display = 'block';
    }

    function redoCalibration(){
        window.location.reload();
    }

    const beep = document.getElementById("beep");
    function playAudio() {
        beep.play();
    }


} else if (myStepCounter == 4){
    let fixationPositionX;
    let blindSpotPositionX;
    let blindSpotXPercent;
    blindSpotXPercent = 50 + myDataHandle[0][2] * 25
    document.getElementById('blindSpotLocator').style.left = blindSpotXPercent.toString() + '%';
    document.getElementById('blindSpotLocator').style.display = 'block';
    fixationPositionX = document.getElementById('fixationPoint').getBoundingClientRect().left;
    blindSpotPositionX = document.getElementById('blindSpotLocator').getBoundingClientRect().left;
    blindSpotX = Math.abs(Math.floor(blindSpotPositionX - fixationPositionX));
    myDataHandle[4][0] = blindSpotX;
    localStorage.setItem('myDataHandle', JSON.stringify(myDataHandle));
    console.log(myDataHandle);
    console.log('blindSpotX = ' + blindSpotX);

} else {
    console.log("Error. Please start over at /index.html. Do not return to previous page.")
}

