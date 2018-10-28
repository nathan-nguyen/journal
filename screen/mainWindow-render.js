const app = require('electron').remote;
var fs = require('fs');

var dateInput = document.getElementById('dateInput');
dateInput.valueAsDate = new Date();

dateInput.onchange = () => {
    alert(dateInput.value);
};

