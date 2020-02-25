function start() {
    loadQuestion(0);
}

function setWeight() {
    var checkbox = document.getElementById("checkbox-weight");
    if (checkbox.checked) {
        subjects[currentQuestion].weight = true;
    } else {
        subjects[currentQuestion].weight = null;
    }
}

function setCheckbox(value) {
    if (subjects[value].weight) {
        document.getElementById("checkbox-weight").checked = true;
    } else {
        document.getElementById("checkbox-weight").checked = false;
    }
}

function setOpinions(value) {
    var container = document.getElementsByClassName("opinion-container");
    for (var c of container) {
        c.innerHTML = "";
    }

    for (var party of subjects[value].parties) {
        if (party.position === "pro") {
            container = document.getElementById("opinion-eens-container");
        } else if (party.position === "contra") {
            container = document.getElementById("opinion-oneens-container");
        } else {
            container = document.getElementById("opinion-none-container");
        }

        var paragraph = createElement("p", { "class": "mb-1" }, party.name);
        var span = createElement("span", { "class": "text-muted" }, party.opinion);
        var hr = document.createElement("hr");

        paragraph.style.cursor = "pointer";
        span.style.fontSize = "14px";
        span.hidden = true;

        paragraph.onclick = function () {
            if (this.nextSibling.hidden) {
                this.nextSibling.hidden = false;
            } else {
                this.nextSibling.hidden = true;
            }
        }

        container.appendChild(paragraph);
        container.appendChild(span);
        container.appendChild(hr);
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