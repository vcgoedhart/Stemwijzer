function loadQuestion(value) {
    setQuestion(value);
    setCheckbox(value);
    setOpinions(value);
}

function setQuestion(value) {
    showContainer(document.getElementById("question-container"));
    document.getElementById("questionTitle").innerHTML = (value + 1) + ". " + subjects[value].title;
    document.getElementById("questionBox").innerHTML = subjects[value].statement;
}

function next() {
    currentQuestion++;

    if (subjects[currentQuestion]) {
        loadQuestion(currentQuestion);
    } else {
        loadResults(document.getElementById("result-container"));
    }
}

function back() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    } else {
        showContainer(document.getElementById("stemwijzer-container"));
    }
}

function save(answer) {
    subjects[currentQuestion].answer = answer;
}

function loadResults(element) {
    showContainer(element);
    setResults(document.getElementById("result-item-container"));
}

function setResults(element) {
    loadVotes();

    for (var subject of subjects) {
        for (var subjectParty of subject.parties) {
            if (subjectParty.position === subject.answer) {
                for (var party of parties) {
                    if (party.name === subjectParty.name) {
                        if (subject.weight && subject.weight === true) {
                            party.votes += 2;
                        } else {
                            party.votes++;
                        }
                    }
                }
            }
        }
    }

    for (var party of parties) {
        var object = {
            name: party.name,
            votes: party.votes
        };
        votesList.push(object);
    }

    votesList.sort(function (a, b) { return parseFloat(b.votes) - parseFloat(a.votes); });

    element.innerHTML = "";
    for (var object of votesList) {
        var matchPercentage = Math.round((object.votes / subjects.length) * 100);

        var container = createElement("div", { "id": object.name, "class": "place-container" });
        var paragraph = createElement("p", { "class": "place-container-text text-center m-0" }, "<strong>" + object.name + "</strong> " + matchPercentage + "%");
        var progress_container = createElement("div", { "class": "progress" });
        var progress_bar = createElement("span", { "class": "progress_bar" });
        var progress_animation = createElement("span", { "class": "progress_animation" });

        progress_bar.style.width = matchPercentage + "%";

        progress_bar.appendChild(progress_animation);
        progress_container.appendChild(progress_bar);
        container.appendChild(paragraph);
        container.appendChild(progress_container);
        element.appendChild(container);
    }

    $("#result-container").find("input").each(function (i) {
        if (this.checked) {
            filter(this, this.getAttribute("name"));
        }
    });
}                                                                                    