var currentQuestion = 0;
for (var party of parties) party.votes = 0;

<<<<<<< HEAD
showContainer = function (element) {
    var containers = document.getElementsByClassName("containers");
    for (var container of containers) {
        container.classList.add("d-none");
    }
    element.classList.remove("d-none");
};
=======
function start() {
    showContainer(document.getElementById("question-container"));
    setQuestion();
}
>>>>>>> 4f9d3fce9b3fdcba11b0379c0938f77803ee07cb

function next() {
    currentQuestion--;
    setQuestion(currentQuestion)
}

function back() {
    currentQuestion--;
    setQuestion(currentQuestion)
}

<<<<<<< HEAD
function setQuestion() {
    if (subjects[currentQuestion]) {
        document.getElementById("questionTitle").innerHTML = currentQuestion + 1 + ". " + subjects[currentQuestion].title;
        document.getElementById("questionBox").innerHTML = subjects[currentQuestion].statement;
=======
function setQuestion(value) {
    if (subjects[value]) {
        document.getElementById("questionTitle").innerHTML = (value + 1) + ". " + subjects[value].title;
        document.getElementById("questionBox").innerHTML = subjects[value].statement;
>>>>>>> 4f9d3fce9b3fdcba11b0379c0938f77803ee07cb
    } else {
        setResults(document.getElementById("result-container"));
        showContainer(document.getElementById("result-container"));
    }
}

function saveQuestion(answer) {
    // Adds votes to the parties with the same answer
<<<<<<< HEAD
    for (var subjectParty of subjects[currentQuestion].parties) {
        if (subjectParty.position === answer) {
            for (var party of parties) {
                if (party.name === subjectParty.name) {
                    party.votes++;
                }
            }
        }
    }

    // Next question
    currentQuestion++;
    setQuestion();
}

function setResults(element) {
    var votes = [],
        totalVotes = 0;

    console.log(parties);
    for (var party of parties) {
        votes.push(party.votes + ":" + party.name);
        totalVotes += party.votes;
    }
    console.log(totalVotes, votes);
    votes.sort().reverse();
    for (var i = 0; i < 3; i++) {
        var meta = votes[i].split(":");
=======
    // for (var subjectParty of subjects[currentQuestion].parties){
    //     if (subjectParty.position === answer){
    //         for (var party of parties) {
    //             if (party.name === subjectParty.name){
    //                 party.votes++;
    //             }
    //         }
    //     }
    // }
    subjects.answer = answer;

    // Next question
    currentQuestion++;
    setQuestion(currentQuestion)
}

// function setResults(element) {   
//     var votes = [],
//         totalVotes = 0;

//     console.log(parties);
//     for (var party of parties){
//         votes.push(party.votes + ":" + party.name);
//         totalVotes += party.votes;
//     }
//     console.log(totalVotes, votes);
//     votes.sort().reverse();
//     for (var i = 0; i < 3; i++) {
//         var meta = votes[i].split(":");
>>>>>>> 4f9d3fce9b3fdcba11b0379c0938f77803ee07cb

//         var partyVotes = Number(meta[0]);
//         var partyName = meta[1];

//         var p = document.createElement("p");

<<<<<<< HEAD
        if (totalVotes > 0) {
            var matchPercentage = (partyVotes / totalVotes) * 100;
            var textNode = document.createTextNode("Partij: " + partyName + ", Stemmen: " + matchPercentage + "%");
            p.appendChild(textNode);
            element.appendChild(p);
        } else {
            var textNode = document.createTextNode(":(");
            p.appendChild(textNode);
            element.appendChild(p);
            return;
        }
    }
    console.log(votes);
}
=======
//         if (totalVotes > 0){
//             var matchPercentage = (partyVotes / totalVotes) * 100;
//             var textNode = document.createTextNode("Partij: " + partyName + ", Stemmen: " + Math.round(matchPercentage) + "%");
//             p.appendChild(textNode);
//             element.appendChild(p);
//         } else {
//             var textNode = document.createTextNode(":(");
//             p.appendChild(textNode);
//             element.appendChild(p);
//             return;
//         }
//     }
//     console.log(votes);
// }
>>>>>>> 4f9d3fce9b3fdcba11b0379c0938f77803ee07cb
