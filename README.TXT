Author: Y. Gu <cv2019_gy@163.com>
Supervisor: dr. N. Jansonius
This is a prototype for online visual field test.
This is for educational purposes only. 
April 2024

Adjustable parameters in gvo.js
numRows & numColumns //controls screen division for stimuli position, recommend set to odd numbers 
acceptedResponseDeley //response delayed after stimulus is shown must be < stimulusInterval - stimulusIntervalVariation
repGvo //not yet implemented
stimulusDuration //duration of a stimulus, must be << stimulus interval
stimulusInterval //base interval between consecutive stimuli
stimulusIntervalVariation //random deviation of time of stimulus from the set interval 
angleFromBlindSpot //angle of stimuli around the blindspot 
testFieldHalfWidth //angle of the entire field


ToDo: 
update website
window size?
repGvo
where should i send the results? email? printscreen?
