'use strict';

const app = require('electron').remote;
var fs = require('fs');

document.getElementById('saveButton').onclick = () => saveData();

var dateInput = document.getElementById('dateInput');
dateInput.valueAsDate = new Date();
loadData();

dateInput.onchange = () => loadData();

function loadData() {
    var customDate = new Date(dateInput.value);
    var dailyFileName = './data/' + customDate.getFullYear() + '-' + (customDate.getMonth() + 1) + '-' + customDate.getDate() + '.jdat';
    console.log(dailyFileName);
    readFile(dailyFileName);
}

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
    var textArea = document.getElementById('content');
    textArea.value = "";
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        textArea.value = data;
    });
}


