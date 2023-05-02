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
const teller = {2.1: '一生衣食奔波勞碌之命', 2.2: '幼年勞碌中年清泰之命', 2.3: '先難後易出外求人之命', 2.4: '智巧多能離家求食之命', 2.5: '身閒心不閒九流藝術之命', 2.6: '先貧後富勞碌之命', 2.7: '聰明近貴衣祿之命', 2.8: '自卓為人才能近貴之命', 2.9: '客商才能達變智慧之命', "3.0": '衣食有餘近貴成家之命', 3.1: '先貧後富近貴衣食足用之命', 3.2: '性巧過人衣食到老近貴之命', 3.3: '衣食豐滿富貴根基之命', 3.4: '財穀有餘主得內助富貴之命', 3.5: '先難後易過房入贅近貴之命', 3.6: '超群拔類衣祿厚重之命', 3.7: '聰明富貴有福壽之命', 3.8: '財帛豐厚宜稱之命', 3.9: '利上近貴有福有祿之命', "4.0": '富貴近益生匯鼎盛機關之命', 4.1: '稅戶近貴專才衣祿之命', 4.2: '兵權有職富貴才能之命', 4.3: '財祿厚重白手成家之命', 4.4: '才能好學近貴財祿之命', 4.5: '福祿豐盈極富且貴之命', 4.6: '富貴有餘福壽雙全之命', 4.7: '高官厚祿學業飽滿之命', 4.8: '官員財祿厚重之命', 4.9: '性巧精乖倉庫財祿之命', "5.0": '文武才能財穀豐富之命', 5.1: '官職財祿榮民富貴之命', 5.2: '掌握兵權富貴長壽之命', 5.3: '僧道門中近貴之命', 5.4: '有權威富貴財祿之命', 5.5: '官職財祿豐堅之命', 5.6: '官職長享榮華富貴之命', 5.7: '官職文章壓眾精通之命', 5.8: '官祿旺相才能性直富貴之命', 5.9: '官職財祿厚重之命', "6.0": '官職榮華福壽財祿之命', 6.1: '官掌風雷權柄之命', 6.2: '官職有權柄之命', 6.3: '指揮太守萬戶封侯之命', 6.4: '官職尚書侍郎之命', 6.5: '威權無盡財福祿全之命', 6.6: '公侯駙馬丞相之命', 6.7: '冠世萬國來朝上格之命', 6.8: '溫和幸福富貴極吉之命', 6.9: '受職高位功名顯達之命', "7.0": '權力共備志望上流之命', 7.1: '大志大業勢如破竹之命', 7.2: '號令天下統御萬民帝王之命'}
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