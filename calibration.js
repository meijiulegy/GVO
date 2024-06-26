/*
method 1: fixed distance in cm
method 2: relative distance
method 3: blindspot with moving dot
method 4: blindspot with fixed dot
*/

const myStoredStepCounter = localStorage.getItem('myStepCounter');
let myStepCounter = JSON.parse(myStoredStepCounter);
//myStepCounter = 1; //for development
console.log('myStepCounter = ' + myStepCounter);
let blindSpotX;

if (myStepCounter == 1){
    /*
    standard ID card = 86*54mm, A4 paper = 297*210mm, 
    tan(15 deg) = 0.268,  297mm*tan(15deg) = 79.6mm, 
    tan(1.5deg) = 0.0262, 297mm*tan(1.5deg) = 7.8mm
    let user resize a rectangle, length = x pixel, calibration: (x/86) pixel/mm
    at distance = 297mm
    +15 deg blindspot horizontal position: + (79.6/86)*x pixel
    -1.5 deg blindspot vertical position: - (7.8/86)*x pixel
    horizontal +9 deg: +tan(9)*297/86 *x pixel
    horizontal +21 deg: +tan(21)*297/86 *x pixel
    */
    const myCardImg = document.getElementById('bankCard');
    let currentWidth = myCardImg.width;
    console.log(currentWidth);

    function makeSmaller(){
        currentWidth -= 20;
        myCardImg.style.width = currentWidth + 'px';
        console.log('card width = ' + currentWidth);
    }
    function makeBigger(){
        currentWidth += 20;
        myCardImg.style.width = currentWidth + 'px';
        console.log('card width = ' + currentWidth);
    }

    function calculateBlindSpot(){
        blindSpotX = Math.floor(currentWidth * 0.9256);
        console.log('blindSpotX = ' + blindSpotX);
        localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));
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
    console.log('blindSpotX = ' + blindSpotX);
    localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));
    

} else if (myStepCounter == 3){
    let fixationPositionX;
    let blindSpotPositionX;
    console.log('fixationPoint is at' + document.getElementById('fixationPoint').getBoundingClientRect().left);
    console.log('blindSpotLocator is at' + document.getElementById('blindSpotLocator').getBoundingClientRect().left);
    
    function startCalibration(callback){
        fixationPositionX = document.getElementById('fixationPoint').getBoundingClientRect().left;
        document.getElementById('blindSpotLocator').style.display = 'block';
        document.getElementById('blindSpotLocator').classList.add('locatorStartMoving');
        setTimeout(() => {
            callback();
        }, 10000);

        document.addEventListener("keydown", event => {
            //playAudio();
            fixationPositionX = document.getElementById('fixationPoint').getBoundingClientRect().left;
            blindSpotPositionX = document.getElementById('blindSpotLocator').getBoundingClientRect().left;
            blindSpotX = Math.floor(blindSpotPositionX - fixationPositionX);
            console.log('blindSpotX = ' + blindSpotX);
            localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));
            document.getElementById('blindSpotLocator').style.display = 'none';
            document.getElementById('startBlindSpotCalibration').style.display = 'none';
            //document.getElementById('redoBlindSpotCalibration').style.display = 'block';
            document.getElementById('blindSpotCalibrationStartGVO').style.display = 'block';
        })
    }
    function stopCalibration(){
        document.getElementById('blindSpotLocator').classList.remove('locatorStartMoving');
    }

    function redoCalibration(){
        document.getElementById('blindSpotLocator').pause();
        //startCalibration(stopCalibration());
    }


    const beep = document.getElementById("beep");
    function playAudio() {
        beep.play();
    }


} else if (myStepCounter == 4){
    let fixationPositionX;
    let blindSpotPositionX;
    document.getElementById('blindSpotLocator').style.left = "55%";
    fixationPositionX = document.getElementById('fixationPoint').getBoundingClientRect().left;
    blindSpotPositionX = document.getElementById('blindSpotLocator').getBoundingClientRect().left;
    blindSpotX = Math.floor(blindSpotPositionX - fixationPositionX);
    console.log('blindSpotX = ' + blindSpotX);
    localStorage.setItem('blindSpotX', JSON.stringify(blindSpotX));

} else {
    console.log("Error. Please start over at /index.html. Do not return to previous page.")
}

