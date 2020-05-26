// RESULT PAGE VISUALISER
resultHandler = function () {
    var _me = this;

    this.votes = [];

    // RESET EVERYTHING BACK TO ZERO TO PREVENT ITEMS STACKING UP
    this.clear = function (element) {
        _me.votes = [];
        for (const party of parties) {
            party.votes = 0;
        }
        element.innerHTML = "";
    };

    // PREPARE THE SORTED ARRAY FOR YOUR BEST MATCHED PARTY
    this.prepareResults = function () {
        for (var i = 1; i <= subjects.length; i++) {
            questions[i].setResults();
        }

        for (const party of parties) {
            var object = {
                name: party.name,
                votes: party.votes
            };
            _me.votes.push(object);
        }
        _me.votes.sort(function (a, b) { return parseFloat(b.votes) - parseFloat(a.votes); });
    };

    // VISUALISE THE RESULT PAGE WITH KNOWN INFORMATION
    this.loadResults = function (element) {
        _me.clear(element);
        _me.prepareResults();

        for (var object of _me.votes) {
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

        _me.setContainer(document.getElementById("result-container"));
        _me.checkFilters();
    };

    // FILTER A PARTY FOR A SPECIFIC KEY ELEMENT
    this.filter = function (element, filterType) {
        if (element.checked) {
            for (var party of parties) {
                switch (filterType) {
                    case "size":
                        if (party.size < 15) {
                            document.getElementById(party.name).classList.add("filter-" + filterType);
                        }
                        break;
                    case "secular":
                        if (!party.secular) {
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
    };

    // CHECK IF THERE IS STILL A FILTER ON AFTER GOING TO A PREVIOUS QUESTION
    this.checkFilters = function () {
        $("#result-container").find("input").each(function (i) {
            if (this.checked) {
                _me.filter(this, this.getAttribute("name"));
            }
        });
    };

};

// QUESTION HTML VISUALISER
questionBase = function () {
    resultHandler.call(this);

    var _me = this;

    // USED FOR SWITCHING THE CONTAINER
    this.setContainer = function (element) {
        var containers = document.getElementsByClassName("containers");
        for (var container of containers) {
            container.classList.add("d-none");
        }
        element.classList.remove("d-none");
    };

    // LOADS [OPINIONS / STATEMENTS] FOR THE QUESTION FROM EVERY PARTY
    this.setOpinions = function (id) {
        var container = document.getElementsByClassName("opinion-container");
        for (var c of container) {
            c.innerHTML = "";
        }

        for (var party of subjects[id].parties) {
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
    };

    // SETS ASSIGNED CHECKBOX VALUE
    this.setCheckbox = function (element) {
        if (_me.important) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    }

    // VISUALISES THE QUESTION PAGE / START PAGE / LAST PAGE
    this.render = function () {
        if (_me.id === "stemwijzer") {
            _me.setContainer(document.getElementById(_me.id + "-container"));
            return;
        }
        if (_me.id === "result") {
            _me.loadResults(document.getElementById(_me.id + "-item-container"));
            return;
        }

        _me.setContainer(document.getElementById("question-container"));
        _me.setOpinions(_me.id);
        _me.setCheckbox(document.getElementById("checkbox-weight"));

        document.getElementById("questionTitle").innerHTML = (_me.id + 1) + ". " + subjects[_me.id].title;
        document.getElementById("questionBox").innerHTML = subjects[_me.id].statement;
    };
};

// QUESTION OBJECT
questionHandler = function (id) {
    questionBase.call(this);

    var _me = this;

    this.id = id;
    this.answer = null;
    this.important = false;

    // STORES RESULTS TO PARTIES VARIABLE
    this.setResults = function () {
        for (const subjectParty of subjects[_me.id].parties) {
            if (subjectParty.position === _me.answer) {
                var party = parties.filter(function (e) {
                    return e.name === subjectParty.name;
                });

                if (_me.important) {
                    party[0].votes += 2;
                } else {
                    party[0].votes += 1;
                }
            }
        }
    };
};