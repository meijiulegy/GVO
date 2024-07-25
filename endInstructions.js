document.addEventListener('DOMContentLoaded', () => {
    const myStoredDataHandle = localStorage.getItem('myDataHandle');
    const myDataHandle = JSON.parse(myStoredDataHandle);
    const emailLink1 = document.getElementById('emailLink1');
    const emailLink2 = document.getElementById('emailLink2');

    function copyToClipboard() {
        var textField = document.getElementById("dataField");
        textField.select();
    
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy was ' + msg);
        } catch (err) {
            console.error('Unable to copy', err);
        }
        window.getSelection().removeAllRanges();
    }
    
    function downloadData() {
        const blob = new Blob([myStoredDataHandle], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'myStoredDataHandle.json';
        document.body.appendChild(a);
        a.click();
    
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const email = "y.gu@umcg.nl";
    const subject = "My online visual field test results.";
    const body = `Hello:
    
    (Please stay anonymous.)
    My test results (no need to paste again or attach the file if data is shown): 

    ${myStoredDataHandle}`;

    document.getElementById('dataField').value = myStoredDataHandle;
    emailLink1.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    emailLink2.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById('copyData').addEventListener('click', copyToClipboard);
    document.getElementById('downloadButton').addEventListener('click', downloadData);

    console.log(myDataHandle);
});

