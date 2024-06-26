
const myStoredStepCounter = localStorage.getItem('myStepCounter');
let myStepCounter = JSON.parse(myStoredStepCounter);
console.log('myStepCounter = ' + myStepCounter);
myStepCounter +=1;
localStorage.setItem('myStepCounter', JSON.stringify(myStepCounter));
const myStoredBlindSpotX = localStorage.getItem('blindSpotX');
let blindSpotX = JSON.parse(myStoredBlindSpotX);
//blindSpotX = 400; //for development
//myStepCounter = 3; //for development
console.log('blindSpotX = ' + blindSpotX);




const acceptedResponseDeley = 1000; //response delayed after stimulus is shown must be < stimulusInterval - stimulusIntervalVariation
const repGvo = 1; //not yet implemented
const stimulusDuration = 100; //duration of a stimulus, must be << stimulus interval
const stimulusInterval = 2000; //default 1500, base interval between consecutive stimuli
const stimulusIntervalVariation = 400; //default 250, random deviation of time of stimulus from the set interval
let myParsedMatrix;
let indices = []; 
let myRandomSeq = [];
let keyPressLog = [];
//screen division in which stimuli are shown, numRows*numColumns
let numRows = 4;
let numColumns = 4;
const angleFromBlindSpot = 6; //angle tested around blindspot, default 6 deg.

let testFieldHalfWidth = 2 * blindSpotX; //test field set to 2 * blindspot ~ 30 degree
let testFieldHalfHeight = testFieldHalfWidth* (screen.availHeight / screen.availWidth); //test field height adjusted to screen height/width ratio. cav: report screen height and width for analysis.
let marginLeft = 0.5 - testFieldHalfWidth/screen.availWidth;
let marginTop = 0.5 - testFieldHalfHeight/screen.availHeight;
console.log(screen.availWidth);
console.log(marginLeft);
console.log(screen.availHeight);
console.log(marginTop);


//Declare myGvoMatrix, where all data will be stored, later parsed by gvoResult page via local storage
//myGvoMatrix elements: [response counter, position top %, position left %, timestamp of appearance in rep 1, rep 2, ...]
//const myGvoMatrix = Array.from({length: numRows}, () => Array.from({ length: numColumns }, () => []));

//added an extra array to the top level of the matrix. for storing data of the blindspot and the surrounding points.
const myGvoMatrix = Array.from({ length: numRows + 1 }, (_, rowIndex) => 
    rowIndex === numRows 
      ? Array.from({ length: 9 }, () => []) 
      : Array.from({ length: numColumns }, () => [])
  );


//function to shuffel array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  
//function to show and hide stimulus
function showStimulus(callback){
    document.getElementById('stimulus').style.display = 'block';
    console.log(Date.now());
    setTimeout(() => {
        callback();
    }, stimulusDuration);
}
function hideStimulus(){
    document.getElementById('stimulus').style.display = 'none';
    //console.log(Date.now())
}

//beep for key presses
const beep = document.getElementById("beep");
function playAudio() {
  beep.play();
}

//function to set positions of stimuli based on number of screen sections
function setPosition(top, left) {
    document.getElementById('stimulus').style.top = top;
    document.getElementById('stimulus').style.left = left;
}

//set window to be maximized
window.onload = function() {
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
};

//generate an array myRandomSeq containing random sequence of indices of myGvoMatrix, skipping center index
indices = [];
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j ++) {
        //myGvoMatrix elements: [response counter, position top %, position left %, timestamp of appearance in rep 1, rep 2, ...
        myGvoMatrix[i][j][0] = 0;
        //myGvoMatrix[i][j][1] = String(Math.round((1/numRows/2 + 1/numRows*i)*100)) + "%";
        //myGvoMatrix[i][j][2] = String(Math.round((1/numColumns/2 + 1/numColumns*j)*100)) + "%";
        myGvoMatrix[i][j][1] = String(Math.round((((1/numRows/2 + 1/numRows*i)*2*testFieldHalfHeight/screen.availHeight) + marginTop)*100)) + "%";
        myGvoMatrix[i][j][2] = String(Math.round((((1/numColumns/2 + 1/numColumns*j)*2*testFieldHalfWidth/screen.availWidth) + marginLeft)*100)) + "%";
        //skip center block only if odd by odd divisions
        if ((numRows % 2 == 0 || numColumns % 2 == 0) || (i != Math.floor(numRows/2) || j != Math.floor(numColumns/2))){  
            indices.push([i, j]);
        }
    }
}
//set position of 9 stimuli around blindspot. insert into the 9 element array in myGVOmatrix
/* position as follow, [1,1] is blindspot, at (+15deg, -1.5deg), other positions are 6 deg apart.
[0,0] [0,1] [0,2]
[1,0] [1,1] [1,2]
[2,0] [2,1] [2,2]
*/
function getTanDeg(deg) {
    const rad = (deg * Math.PI) / 180;
    return Math.tan(rad);
}
let userDistance = blindSpotX / getTanDeg(15);
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        myGvoMatrix[numRows][3*i + j][0] = 0;
        myGvoMatrix[numRows][3*i + j][1] = String(Math.round((0.5 + userDistance * getTanDeg(1.5 + (i - 1) * angleFromBlindSpot)/screen.availHeight)*100)) + "%"; //%top
        myGvoMatrix[numRows][3*i + j][2] = String(Math.round((0.5 + userDistance * getTanDeg(15 + (j - 1) * angleFromBlindSpot)/screen.availWidth)*100)) + "%"; //%left
        if (myStepCounter != 1){
            indices.push([numRows, 3*i + j]);
        }
        
    }
}
console.log(myGvoMatrix);



//randomize
myRandomSeq = shuffle(indices);

//function for running the gvo
function runGvo() {
    let myRandomInterval; 
    //showing stimulus in random order stored in myRandomSeq
    for (let i = 0; i < myRandomSeq.length + 1; i++){
        myRandomInterval = Math.floor((Math.random()*2 - 1) * stimulusIntervalVariation);
        if (i === myRandomSeq.length){
            //at the end of run: show results button, generate results, local storage
            setTimeout(function(){
                document.getElementById('showResults').style.display = 'block';
                //setPosition(myGvoMatrix[numRows][4][1],myGvoMatrix[numRows][4][2]); //for development, show blindspot at the end
                //document.getElementById('stimulus').style.display = 'block';
                generateResults();
                console.log(myGvoMatrix); 
                localStorage.setItem('myGvoMatrix', JSON.stringify(myGvoMatrix));
                localStorage.setItem('numRows', JSON.stringify(numRows));
                localStorage.setItem('numColumns', JSON.stringify(numColumns));
            }, (i+1) * stimulusInterval);
        } else {
            //set position of each stimulus, show it, store the timestamp of each stimulus in myGvoMatrix
            setTimeout(function(){
                setPosition(myGvoMatrix[myRandomSeq[i][0]][myRandomSeq[i][1]][1],myGvoMatrix[myRandomSeq[i][0]][myRandomSeq[i][1]][2]);
                myGvoMatrix[myRandomSeq[i][0]][myRandomSeq[i][1]][3] = Date.now();
                showStimulus(hideStimulus);
            }, (i+1) * stimulusInterval + myRandomInterval);
        }
    }      
}
runGvo();
    
//log timestamp of all key presses in an array
document.addEventListener("keydown", event => {
    playAudio();
    keyPressLog.push(Date.now());
})

//register a +1 if at least 1 key press is logged within acceptedResponseDeley after the stimulus is shown
function generateResults(){
    for (r = 3; r <= 3 + repGvo; r++){ //repGvo not yet implemented
        for (i = 0; i < numRows; i++){
            for (j = 0; j < numColumns; j++){
                for (k = 0; k < keyPressLog.length; k++){
                    if (keyPressLog[k] - myGvoMatrix[i][j][r] > 0 && keyPressLog[k] - myGvoMatrix[i][j][r] <= acceptedResponseDeley){
                        myGvoMatrix[i][j][0] ++;
                        break;
                    }
                }
            }
        }

        for (i=0; i < 9; i++) {
            for (k = 0; k < keyPressLog.length; k++){
                if (keyPressLog[k] - myGvoMatrix[numRows][i][r] > 0 && keyPressLog[k] - myGvoMatrix[numRows][i][r] <= acceptedResponseDeley){
                    myGvoMatrix[numRows][i][0] ++;
                    break;
                }
            }
        }
    }
}



    