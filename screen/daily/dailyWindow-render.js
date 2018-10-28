'use strict';

const app = require('electron').remote;
var fs = require('fs');

document.getElementById('saveButton').onclick = () => saveData(getDailyFileName());

var dateInput = document.getElementById('dateInput');
dateInput.valueAsDate = new Date();
var graph = [];
loadData();

dateInput.onchange = () => loadData();

function getDailyFileName() {
    var customDate = new Date(dateInput.value);
    return './data/' + customDate.getFullYear() + '-' + (customDate.getMonth() + 1) + '-' + customDate.getDate() + '.jdat';
}

function loadData() {
    var dailyFileName = getDailyFileName();
    console.log(dailyFileName);
    readFile(dailyFileName);
}

function saveData(dailyFileName) {
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
    parsingFileData(content);
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
        parsingFileData(data);
    });
}

function parsingFileData(data) {
    var textArea = document.getElementById('graph-container');
    var lines=filterElement(data.split('\n'));
    var result = '';
    graph=[];
    lines.forEach(line => {
        if (line.substring(0, 3) == '(*)') {
            var componentChain = filterElement(line.substring(4).split('->'));
            componentChain.forEach(component => parseObject(component));
        }
    });

    graph.forEach(node => result += node.id + '-' + node.description + '-' + node.status + '<br>');
    textArea.innerHTML = result;
}

function filterElement(array) {
    var result = [];
    array.forEach(element => {
        if (element.length > 0) result.push(element.trim());
    });
    return result;
}

function parseObject(object) {
    var array = filterElement(object.split('|'));
    var id = array[0];
    var description, status;
    if (array.length > 1) description = array[1];
    if (array.length > 2) status = array[2];

    addNode(id, description, status);
}

function addNode(id, description, status) {
    var found = false;
    graph.forEach(element => {
        if (element.id === id) {
            found = true;
            return;
        }
    });
    if (!found) graph.push(new Node(id, description, status));
}

function Node(id, description, status) {
    this.id = id;
    this.description = description;
    this.status = status;
}


