function load() {
    getCurrentQuestion().render();
}

function save(value) {
    getCurrentQuestion().answer = value;
}

function next() {
    currentQuestionId++;
    load();
}

function back() {
    currentQuestionId--;
    load();
}

function filter(element, filterType) {
    getCurrentQuestion().filter(element, filterType);
}

(function () {
    questions.push(new questionHandler("stemwijzer"));
    for (const i in subjects) {
        questions.push(new questionHandler(Number(i)));
    }
    questions.push(new questionHandler("result"));
})();