var currentQuestion = 0;

showContainer = function (element) {
    var containers = document.getElementsByClassName("containers");
    for (var container of containers) {
        container.classList.add("d-none");
    }
    element.classList.remove("d-none");
}

function init() {
    for (var party of parties) {
        party.votes = 0;
    }
}

function start() {
    showContainer(document.getElementById("question-container"));
    setQuestion();
}

function setQuestion() {
    if (subjects[currentQuestion]) {
         document.getElementById("questionTitle").innerHTML = (currentQuestion + 1) + ". " + subjects[currentQuestion].title;
         document.getElementById("questionBox").innerHTML = subjects[currentQuestion].statement;
    } else {
        setResults(document.getElementById("result-container"));
        showContainer(document.getElementById("result-container"));
    }
}

function saveQuestion(answer){
    // Adds votes to the parties with the same answer
    for (var subjectParty of subjects[currentQuestion].parties){
        if (subjectParty.position === answer){
            for (var party of parties) {
                if (party.name === subjectParty.name){
                    party.votes++;
                }
            }
        }
    }

    // Next question
    currentQuestion++;
    setQuestion()
}

function setResults(element) {   
    var votes = [],
        totalVotes = 0;

    console.log(parties);
    for (var party of parties){
        votes.push(party.votes + ":" + party.name);
        totalVotes += party.votes;
    }
    console.log(totalVotes, votes);
    votes.sort().reverse();
    for (var i = 0; i < 3; i++) {
        var meta = votes[i].split(":");

        var partyVotes = meta[0];
        var partyName = meta[1];

        var matchPercentage = (partyVotes / totalVotes) * 100;

        var p = document.createElement("p");
        var textNode = document.createTextNode("Partij: " + partyName + ", Stemmen: " + matchPercentage + "%");

        p.appendChild(textNode);
        element.appendChild(p);
    }
    console.log(votes);
}