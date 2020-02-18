function start() {
    setQuestion(0);
}

function setQuestion(value) {
    showContainer(document.getElementById("question-container"));
    document.getElementById("questionTitle").innerHTML = (value + 1) + ". " + subjects[value].title;
    document.getElementById("questionBox").innerHTML = subjects[value].statement;
}

function next() {
    currentQuestion++;

    if (subjects[currentQuestion]){
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
    console.log(parties);
    subjects[currentQuestion].answer = answer;
}

function loadResults(element) {
    showContainer(element);
    setResults();
}

function setResults() {
    loadVotes();

    for (var subject of subjects) {
        for (var subjectParty of subject.parties) {
            if (subjectParty.position === subject.answer) {
                for (var party of parties) {
                    if (party.name === subjectParty.name){
                        party.votes++;
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

    for (var index in votesList) {
        var vote = votesList[index];
        var meta = vote.split(":");

        var matchPercentage = (meta[0] / votesTotal) * 100;
        
        var paragraph = document.getElementsByClassName("place-container-text")[index];
        var progress_bar = document.getElementsByClassName("progress_bar")[index];

        paragraph.innerHTML = meta[1] + ": " + Math.round(matchPercentage) + "%";

        progress_bar.style.width = matchPercentage + "%";

        if (index >= 2) return;
    }
}

// function animateProgressBar(element, from, to) {
//     var width = 1; 
//     setInterval(() => {
//         width+=3;
//         element.style.width = width + "%";
//     }, 10);
// }