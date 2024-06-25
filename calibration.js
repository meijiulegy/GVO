/*
method 1: fixed distance in cm
method 2: relative distance
method 3: blindspot with moving dot
method 4: blindspot with fixed dot
*/

const myStoredStepCounter = localStorage.getItem('myStepCounter');
myStepCounter = JSON.parse(myStoredStepCounter);
console.log(myStepCounter);

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
} else if (myStepCounter == 2){
    /*
    display k pixels on screen
    blindspot horizontal position: + 0.268*k pixel
    blindspot vertical position: - 0.0262*k pixel
    */

} else if (myStepCounter == 3){

    //pass a blindspot position in pixle.
} else if (myStepCounter == 4){

    //pass a blindspot position in pixle.
} else {
    console.log("Error. Please start over at /index.html. Do not return to previous page.")
}
