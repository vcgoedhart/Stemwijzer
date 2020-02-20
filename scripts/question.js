function setQuestion(value) {
    showContainer(document.getElementById("question-container"));
    document.getElementById("questionTitle").innerHTML = (value + 1) + ". " + subjects[value].title;
    document.getElementById("questionBox").innerHTML = subjects[value].statement;

    loadCheckbox(value);
}

function next() {
    currentQuestion++;

    if (subjects[currentQuestion]) {
        setQuestion(currentQuestion);
    } else {
        loadResults(document.getElementById("result-container"));
    }
}

function back() {
    if (currentQuestion > 0) {
        currentQuestion--;
        setQuestion(currentQuestion);
    } else {
        showContainer(document.getElementById("stemwijzer-container"));
    }
}

function save(answer) {
    subjects[currentQuestion].answer = answer;
}

function loadResults(element) {
    showContainer(element);
    setResults(element);
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
        votesList.push(party.votes + ":" + party.name);
        votesTotal += party.votes;
    }

    votesList.sort().reverse();
    console.log(votesList);
    for (var index in votesList) {
        console.log(votesList[index]);

        var vote = votesList[index];
        var meta = vote.split(":");

        var matchPercentage = (meta[0] / votesTotal) * 100;

        var container = $("<div class='place-container' />");
        var paragraph = $("<p class='place-container-text text-center m-0 mb-2' >" + meta[1] + " " + Math.round(matchPercentage) + "%" + "</p>");
        var progress = $("<div class='progress' />");
        var progress_bar = $("<span class='progress_bar'><span class='progress_animation'/></span>");

        progress_bar.first()[0].style.width = Math.round(matchPercentage) + "%";

        progress.append(progress_bar);
        container.append(paragraph);
        container.append(progress);

        $(element).append(container);
        // var container = document.createElement("div");
        // container.classList.add("place-container");

        // var paragraph = document.createElement("p");

        // var container = document.getElementById("place-container");
        // var clone = container.cloneNode(true);
        // clone.classList.remove("d-none");

        // var paragraph = document.getElementsByClassName("place-container-text")[index];
        // var progress_bar = document.getElementsByClassName("progress_bar")[index];

        // paragraph.innerHTML = "<strong>" + meta[1] + "</strong> " + Math.round(matchPercentage) + "%";
        // progress_bar.style.width = matchPercentage + "%";

        // console.log(element)
        // element.appendChild(clone);

        // var paragraph = document.getElementsByClassName("place-container-text")[index];
        // var progress_bar = document.getElementsByClassName("progress_bar")[index];

        // paragraph.innerHTML = "<strong>" + meta[1] + "</strong> " + Math.round(matchPercentage) + "%";

        // progress_bar.style.width = matchPercentage + "%";

        // if (index >= 2) return;
    }
}