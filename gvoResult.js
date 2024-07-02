
 //parse stored data
const myStoredMatrix = localStorage.getItem('myGvoMatrix');
const myStoredNumColums = localStorage.getItem('numColumns');
const myStoredNumRows = localStorage.getItem('numRows');
const myStoredStepCounter = localStorage.getItem('myStepCounter');
let myStepCounter = JSON.parse(myStoredStepCounter);
const resultCircleDiameter = "10px";

function showButton(){
  if (myStepCounter >= 5) {
    document.getElementById("goToEndInstructions").style.display = "block";
  } else {
    let buttonToShow = 'goToCalibration' + myStepCounter.toString();
    document.getElementById(buttonToShow).style.display = "block";
  }
}


if (myStoredMatrix) {
  myParsedMatrix = JSON.parse(myStoredMatrix);
  numRows = JSON.parse(myStoredNumRows);
  numColumns = JSON.parse(myStoredNumColums);
  console.log(myParsedMatrix); 
} else {
  console.log("No matrix data found. You need to do the GVO first. See /gvo.html"); 
}

//devide the result diagram, then color the sections
const resultDiagram = document.getElementById('resultDiagram');
function showResults(x, y) {
  const sectionWidth = resultDiagram.offsetWidth / x;
  const sectionHeight = resultDiagram.offsetHeight / y;

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      const section = document.createElement('div');
      section.classList.add('section');
      section.style.width = resultCircleDiameter; //sectionWidth - 1 + 'px';
      section.style.height = resultCircleDiameter; //sectionHeight - 1 + 'px';
      section.style.borderRadius = "50%";
      section.style.left = (j + 0.5) * sectionWidth - 2 + 'px';
      section.style.top = (i + 0.5) * sectionHeight - 2 + 'px';
      section.style.transform = "translate(-50%, -50%)";
      
      //color missed section black
      if (myParsedMatrix[i][j][0] === 0) {
          section.style.backgroundColor = 'black';
      }
      //overwrite center section with yellow color
      if ((numRows % 2 == 1 && numColumns % 2 == 1) && (i == Math.floor(numRows/2) && j == Math.floor(numColumns/2))){
          section.style.backgroundColor = 'yellow';
      }
      //bundle
      resultDiagram.appendChild(section);
    }
  }

  if (myStepCounter != 1) {
    for (let i = 0; i < 9; i++) {
      const section = document.createElement('div');
      section.classList.add('section');
      section.style.width = resultCircleDiameter; //sectionWidth - 1 + 'px';
      section.style.height = resultCircleDiameter; //sectionHeight - 1 + 'px';
      section.style.borderRadius = "50%";
      section.style.top = myParsedMatrix[numRows][i][1];
      section.style.left = myParsedMatrix[numRows][i][2];
      section.style.transform = "translate(-50%, -50%)";
      
      //color missed section black
      if (myParsedMatrix[numRows][i][0] === 0) {
          section.style.backgroundColor = 'black';
      }
      //bundle
      resultDiagram.appendChild(section);
    }
  }

  //add a center section with yellow color if even by even grid
  if (numRows % 2 == 0 || numColumns % 2 == 0) {
    const midPoint = document.createElement('div');
    midPoint.classList.add('section');
    midPoint.style.width = resultCircleDiameter; //sectionWidth - 1 + 'px';
    midPoint.style.height = resultCircleDiameter; //sectionHeight - 1 + 'px';
    midPoint.style.borderRadius = "50%";
    midPoint.style.left = resultDiagram.offsetWidth / 2 + 'px';
    midPoint.style.top = resultDiagram.offsetHeight / 2 + 'px';
    midPoint.style.transform = "translate(-50%, -50%)";
    midPoint.style.backgroundColor = 'yellow';
    resultDiagram.appendChild(midPoint);
  }


  showButton();
}
showResults(numColumns,numRows);
localStorage.removeItem('myGvoMatrix');