function start() {
    setQuestion(0);
}

function setWeight() {
    var checkbox = document.getElementById("checkbox-weight");
    if (checkbox.checked) {
        subjects[currentQuestion].weight = true;
    } else {
        subjects[currentQuestion].weight = null;
    }
}

function loadCheckbox(value) {
    if (subjects[value].weight) {
        document.getElementById("checkbox-weight").checked = true;
    } else {
        document.getElementById("checkbox-weight").checked = false;
    }
}