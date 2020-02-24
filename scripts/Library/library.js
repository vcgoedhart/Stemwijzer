var currentQuestion = 0;
var votesTotal, votesList;

const maxPartySize = 15;

loadVotes = function () {
    votesTotal = 0;
    votesList = [];

    for (var party of parties) {
        party.votes = 0;
    }
};

showContainer = function (element) {
    var containers = document.getElementsByClassName("containers");
    for (var container of containers) {
        container.classList.add("d-none");
    }
    element.classList.remove("d-none");
};

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