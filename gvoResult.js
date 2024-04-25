
 //parse stored data
const myStoredMatrix = localStorage.getItem('myGvoMatrix');
const myStoredNumColums = localStorage.getItem('numColumns');
const myStoredNumRows = localStorage.getItem('numRows');
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
      section.style.width = sectionWidth - 1 + 'px';
      section.style.height = sectionHeight - 1 + 'px';
      section.style.left = j * sectionWidth - 2 + 'px';
      section.style.top = i * sectionHeight - 2 + 'px';
      
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
}
showResults(numColumns,numRows);
localStorage.removeItem('myGvoMatrix');