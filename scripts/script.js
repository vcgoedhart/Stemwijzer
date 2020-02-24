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

function filter(element, filterType) {
    if (element.checked) {
        for (var party of parties) {
            switch (filterType) {
                case "size":
                    if (party.size < maxPartySize) {
                        document.getElementById(party.name).classList.add("filter-" + filterType);
                    }
                    break;
                case "secular":
                    if (party.secular) {
                        document.getElementById(party.name).classList.add("filter-" + filterType);
                    }
                    break;
            }
        }
    } else {
        var filteredElements = document.getElementsByClassName("filter-" + filterType);
        while (filteredElements[0]) {
            filteredElements[0].classList.remove("filter-" + filterType);
        }
    }
}