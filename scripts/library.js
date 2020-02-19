var currentQuestion = 0;
var votesTotal, votesList;

loadVotes = function (){
    votesTotal = 0;
    votesList = [];

    for (var party of parties) {
        party.votes = 0;
    }
}

showContainer = function (element) {
    var containers = document.getElementsByClassName("containers");
    for (var container of containers) {
        container.classList.add("d-none");
    }
    element.classList.remove("d-none");
};