var questions = [];
var currentQuestionId = 0;

getCurrentQuestion = function () {
    return questions[currentQuestionId];
}

createElement = function (tagName, objects, content) {
    var element = document.createElement(tagName);

    if (objects) {
        for (var object in objects) {
            element.setAttribute(object, objects[object]);
        }
    }

    if (content) {
        element.innerHTML = content;
    }

    return element;
};