// initialise input variables
const d = new Date();
let timezone = Math.abs(d.getTimezoneOffset());
let date = document.getElementById("date");
let month = document.getElementById("month");
let year = document.getElementById("year");
let earthlyBranch = null;
let dateDict;

// assign the lists and dictionary for life weight calculation
const date_weight = [0.5, 1.0, 0.8, 1.5, 1.6, 1.5, 0.8, 1.6, 0.8, 1.6, 0.9, 1.7, 0.8, 1.7, 1.0, 0.8, 0.9, 1.8, 0.5, 1.5, 1.0, 0.9, 0.8, 0.9, 1.5, 1.8, 0.7, 0.8, 1.6, 0.6];
const month_weight = [0.6, 0.7, 1.8, 0.9, 0.5, 1.6, 0.9, 1.5, 1.8, 0.8, 0.9, 0.5];
const year_weight = [1.2, 0.9, 0.6, 0.7, 0.2, 0.5, 0.9, 0.8, 0.7, 0.8, 1.5, 0.9, 1.6, 0.8, 0.8, 1.9, 1.2, 0.6, 0.8, 0.7, 0.5, 1.5, 0.6, 1.6, 1.5, 0.7, 0.9, 1.2, 1.0, 0.7, 1.5, 0.6, 0.5, 1.4, 1.4, 0.9, 0.7, 0.7, 0.9, 1.2, 0.8, 0.7, 1.3, 0.5, 1.4, 0.5, 0.9, 1.7, 0.5, 0.7, 1.2, 0.8, 0.8, 0.6, 1.9, 0.6, 0.8, 1.6, 1.0, 0.7];
const earthlyBranch_weight = {"ZI": 1.6, "CHOU": 0.6, "YIN": 0.7, "MAO": 1.0, "CHEN": 0.9, "SI": 1.6, "WU": 1.0, "WEI": 0.8, "SHEN": 0.8, "YOU": 0.9, "XU": 0.6, "HAI": 0.6};
const teller = {2.1: 'You have a busy life.', 2.2: 'You are busy at a young age.', 2.3: "You rely on friends' help.", 2.4: 'You end up living far away from home.', 2.5: 'You live with the arts.', 2.6: 'You will be richer and richer.', 2.7: 'You have a life with wisdom.', 2.8: 'You are disciplined and organised.', 2.9: 'You are good at business.', '3.0': 'You will start a family quickly.', 3.1: "You don't need to worry about food and clothes.", 3.2: 'You have a lovely personality.', 3.3: 'You were born into a wealthy family.', 3.4: 'Your partner brings you wealth.', 3.5: "You rely on your partner's wealth.", 3.6: 'You will be outstanding.', 3.7: 'You are smart and blessed.', 3.8: "You don't need to worry about money.", 3.9: 'You will live almost like a noble person.', '4.0': 'You will be helpful to where you work.', 4.1: 'You are good at accounting.', 4.2: 'You have military talent.', 4.3: 'You are likely to start your own business.', 4.4: 'You love studying something new.', 4.5: 'You will have a healthy and happy life.', 4.6: 'You will live long with wealth.', 4.7: 'You will be very knowledgeable.', 4.8: 'You will be well-fed.', 4.9: 'Your obedience brings you success.', '5.0': 'You are good at everything.', 5.1: 'Your job brings you peace after retired.', 5.2: 'You are meant to be in the military.', 5.3: 'You can be a monk.', 5.4: 'You will be a respectful person.', 5.5: 'You have everything you will need.', 5.6: 'A long wealthy life is waiting for you.', 5.7: 'You will be an expert in something.', 5.8: 'Your personality will bring you wealth.', 5.9: 'You will have a prosperous life.', '6.0': 'You will have a glorious life.', 6.1: 'You will be someone powerful.', 6.2: 'You will do something meaningful.', 6.3: 'You can be a general.', 6.4: 'You will be a minister in the government.', 6.5: 'You will be authoritative.', 6.6: 'You should be a prime minister.', 6.7: 'You will be globally famous.', 6.8: 'You will have a happy life.', 6.9: 'You will end up in a management role.', '7.0': 'You are a notable person.', 7.1: 'You will achieve something big.', 7.2: "You have an emperor's life."}
// settings for lunar calendar api
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a8a87afd72msh28a34255b459fcbp136b4ejsn190eb3cd3f5d',
        'X-RapidAPI-Host': 'chinese-lunar-calendar.p.rapidapi.com'
    }
};

// the values of the api are not in proper JSON style
// , so we define regular expression to extract information later
const day_reg = /"lunarDay":\s([0-9]{1,2})/
const month_reg = /"lunarMonth":\s([0-9]{1,2})/
const year_reg = /"lunarYear":\s([0-9]{4})/
const chiZodiac_reg = /"chineseZodiacSigninEnglish":\s"(.*?)"/
// const solar_reg = /"solarTerminEnglish":\s"(.*?)"/

// function for extracting value of time buttons
function timeActive(btn) {
    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        earthlyBranch = null;
    } else {
        const buttons = document.querySelectorAll('.time');
        buttons.forEach((button) => {
            button.classList.remove('active');
            earthlyBranch = null;
        });

        btn.classList.add('active');
        earthlyBranch = btn;
    }
}

// create functions that show and hide the telling part
function showTelling() {
    const telling = document.getElementById("telling");
    telling.classList.remove("hide");
    telling.classList.add("show");}
function hideTelling() {
    const telling = document.getElementById("telling");
    telling.classList.add("hide");
    telling.classList.remove("show");
}

// create a function to empty previous elements
function empty(element) {
    element.innerHTML = "";
}

// call the api when clicking the button
document.getElementById("calculateBtn").addEventListener("click", callApi)
function callApi() {
    hideTelling();

    fetch(`https://chinese-lunar-calendar.p.rapidapi.com/?date=${year.value}${month.value}${date.value}&timezone=${timezone}&simplified=0`, options)
        .then(response => response.json())
        .then(data => {
            // empty the previous printout
            empty(document.getElementById("telling"));
            showTelling();

            // extract information from the result of api
            dateDict = data.result;
            let lunarDay = dateDict.match(day_reg)[1];
            let lunarMonth = dateDict.match(month_reg)[1];
            let lunarYear = dateDict.match(year_reg)[1];
            let chiZodiac = dateDict.match(chiZodiac_reg)[1];
            let life_weight;
            // let solarTerm = dateDict.match(solar_reg)[1];

            // calculate the life weight based on the lunar date
            if (earthlyBranch !== null) {
                life_weight = (date_weight[lunarDay-1] + month_weight[lunarMonth-1] + year_weight[(lunarYear-4)%60] + earthlyBranch_weight[earthlyBranch.value]).toFixed(1);
            }
            // when the life_weight is an int, if can't fetch the information from the dictionary
            // , so I transform it in to a string here
            if (life_weight in [3.0, 4.0, 5.0, 6.0, 7.0]) {
                life_weight = toString(life_weight)
            }

            // print out the lunar birthdate
            document.getElementById("telling")
                .appendChild(document.createElement("p"))
                .appendChild(document.createTextNode(`Your lunar birth date is on ${lunarDay}/${lunarMonth}/${lunarYear}`))

            // print out the Chinese zodiac sign of the lunar date
            document.getElementById("telling")
                .appendChild(document.createElement("p"))
                .appendChild(document.createTextNode(`Your Chinese zodiac sign is ${chiZodiac}`))

            document.getElementById("telling")
                .appendChild(document.createElement("p"))
                .appendChild(document.createTextNode(`And your life weights......`))

            // print out the life weight
            // if the birth time is not given, print out indication
            if (earthlyBranch !== null) {
                let theWeight = document.createElement("p");
                theWeight.id = "weight"

                document.getElementById("telling")
                    .appendChild(theWeight)
                    .appendChild(document.createTextNode(`~ ${life_weight} liang (兩) ~`))
                document.getElementById("telling")
                    .appendChild(document.createElement("p"))
                    .appendChild(document.createTextNode(`${teller[life_weight]}`))
            } else {
                document.getElementById("telling")
                    .appendChild(document.createElement("p"))
                    .appendChild(document.createTextNode(`Birth time is needed for calculation`))
            }
        })
        .catch(error => {
            // print out warning if the api returns error
            document.getElementById("telling")
                .appendChild(document.createElement("p"))
                .appendChild(document.createTextNode(`Invalid, the date should be: DD/MM/YYYY`))
            document.getElementById("telling")
                .appendChild(document.createElement("p"))
                .appendChild(document.createTextNode(`(P.S. Only accepts years 1900 ~ 2100)`))
        });
}