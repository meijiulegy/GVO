const myStoredDataHandle = localStorage.getItem('myDataHandle');
const myDataHandle = JSON.parse(myStoredDataHandle);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dataField').value = myStoredDataHandle;
    console.log(myDataHandle);
});

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
