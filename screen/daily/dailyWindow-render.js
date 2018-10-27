const app = require('electron').remote;
var fs = require('fs');

var today = new Date();
var dailyFileName = './data/' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '.jdat';
console.log(dailyFileName);

readFile(dailyFileName);
document.getElementById('saveButton').onclick = () => saveData();

function saveData() {
    var content = document.getElementById('content').value;
    if (!content) {
        alert('Cannot save data! Content is empty!');
        return;
    }
    fs.writeFile(dailyFileName, content, (err) => {
        if (err) {
            alert('An error occurred when saving the file!');
            console.log(err);
            return;
        }
        alert('The notes have been successfully saved!');
    });
}

function readFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        var textArea = document.getElementById('content');
        textArea.value = data;
    });
}


