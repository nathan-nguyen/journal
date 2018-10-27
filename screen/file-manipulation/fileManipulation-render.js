var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

document.getElementById('createButton').onclick = () => {
    dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
            alert("Undefined file name");
            return;
        }

        var content = document.getElementById('content').value;
        fs.writeFile(fileName, content, (err) => {
            if (err) console.log(err);
            alert("The file has been successfully saved!");
        });
    });
};

document.getElementById('openButton').onclick = () => {
    dialog.showOpenDialog((fileName) => {
        if (fileName === undefined) {
            alert("No file selected!");
        } else {
            readFile(fileName[0]);
        }
    });
};

document.getElementById('updateButton').onclick = () => {
    dialog.showOpenDialog((fileName) => {
        if (fileName === undefined) {
            alert('No file selected!');
        } else {
            var content = document.getElementById('content').value;
            fs.writeFile(fileName[0], content, (err) => {
                if (err) {
                    alert('An error occurred updating the file!');
                    console.log(err);
                    return;
                }
                alert('The file has been successfully updated!');
            });
        }
    });
};

function readFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            alert('An error occured while reading the file.');
            console.log(err);
            return;
        }

        var textArea = document.getElementById('output');
        textArea.value = data;
    });
}


