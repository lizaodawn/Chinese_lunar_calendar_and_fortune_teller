/*const solarlunar = require('solarlunar');*/

const solarTerms = [
    {term: "Moderate cold", fetchterm: "小寒", chterm: "小寒", month: 1},
    {term: "Severe cold", fetchterm: "大寒", chterm: "大寒", month: 1},
    {term: "Spring commences", fetchterm: "立春", chterm: "立春", month: 2},
    {term: "Rain water", fetchterm: "雨水", chterm: "雨水", month: 2},
    {term: "Insects waken", fetchterm: "惊蛰", chterm: "驚蟄", month: 3},
    {term: "Vernal equinox", fetchterm: "春分", chterm: "春分", month: 3},
    {term: "Bright and clear", fetchterm: "清明", chterm: "清明", month: 4},
    {term: "Corn rain", fetchterm: "谷雨", "chterm": "穀雨", month: 4},
    {term: "Summer commences", fetchterm: "立夏", chterm: "立夏", month: 5},
    {term: "Corn forms", fetchterm: "小满", chterm: "小滿", month: 5},
    {term: "Corn on ear", fetchterm: "芒种", chterm: "芒種", month: 6},
    {term: "Summer solstice", fetchterm: "夏至", chterm: "夏至", month: 6},
    {term: "Moderate heat", fetchterm: "小暑", chterm: "小暑", month: 7},
    {term: "Great heat", fetchterm: "大暑", chterm: "大暑", month: 7},
    {term: "Autumn commences", fetchterm: "立秋", chterm: "立秋", month: 8},
    {term: "End of heat", fetchterm: "处暑", chterm: "處暑", month: 8},
    {term: "White dew", fetchterm: "白露", chterm: "白露", month: 9},
    {term: "Autumnal equinox", fetchterm: "秋分", chterm: "秋分", month: 9},
    {term: "Cold dew", fetchterm: "寒露", chterm: "寒露", month: 10},
    {term: "Frost", fetchterm: "霜降", chterm: "霜降", month: 10},
    {term: "Winter commences", fetchterm: "立冬", chterm: "立冬", month: 11},
    {term: "Light snow", fetchterm: "小雪", chterm: "小雪", month: 11},
    {term: "Heavy snow", fetchterm: "大雪", chterm: "大雪", month: 12},
    {term: "Winter solstice", fetchterm: "冬至", chterm: "冬至", month: 12}
];

function getSolarTermEffect(date) {
    const lunarDate = solarlunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const term = lunarDate.term || '';
    const isTerm = lunarDate.isTerm;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let displayterm1 = '';
    let displayterm2 = '';
    let diffInMs1 = 0;
    let diffInMs2 = 0;
    let dif1 = 0;
    let dif2 = 0;

    if (isTerm) {
        const matchedTerm = solarTerms.find(t => t.fetchterm.includes(term));
        return `<p class = "termdes">${matchedTerm.term} <span class="chterm">${matchedTerm.chterm}</span></p>`;
    } else {
        const solarTerm1 = solarTerms[month * 2 - 2].term;
        const solarTerm2 = solarTerms[month * 2 - 1].term;
        const solarTerm1date = new Date(year, solarTerms[month * 2 - 2].month - 1, solarlunar.getTerm(year, month * 2 - 1));
        const solarTerm2date = new Date(year, solarTerms[month * 2 - 1].month - 1, solarlunar.getTerm(year, month * 2));

        let lastMonthTermDate = null;
        let nextMonthTermDate = null;
        if (date < solarTerm1date) {
            const lastMonthSolarTerm = solarTerms[month * 2 - 3]?.term || solarTerms[23].term;
            const lastMonth = month - 1 || 12;
            const lastYear = lastMonth === 12 ? year - 1 : year;
            if (lastMonth === 12) {
                lastMonthTermDate = new Date(lastYear, 11, solarlunar.getTerm(lastYear, 24));
            } else {
                lastMonthTermDate = new Date(lastYear, lastMonth - 1, solarlunar.getTerm(lastYear, month * 2 - 2));
            }
            displayterm1 = lastMonthSolarTerm;
            displayterm2 = solarTerm1;
            diffInMs1 = Math.abs(date - lastMonthTermDate);
            diffInMs2 = Math.abs(solarTerm1date - date);
            dif1 = Math.ceil(diffInMs1 / (1000 * 3600 * 24)) - 1;
            dif2 = Math.ceil(diffInMs2 / (1000 * 3600 * 24));

        }

        // handle dates after the last solar term
        else if (date > solarTerm2date) {
            const nextMonthSolarTerm = solarTerms[(month) * 2]?.term || solarTerms[0].term;
            const nextMonth = month + 1 === 13 ? 1 : month + 1;
            const nextYear = nextMonth === 1 ? year + 1 : year;
            if (nextMonth === 1) {
                nextMonthTermDate = new Date(nextYear, 0, solarlunar.getTerm(nextYear, 1));
            } else {
                nextMonthTermDate = new Date(nextYear, nextMonth - 1, solarlunar.getTerm(nextYear, nextMonth * 2 - 1));
            }
            displayterm1 = solarTerm2;
            displayterm2 = nextMonthSolarTerm;
            diffInMs1 = Math.abs(date - solarTerm2date);
            diffInMs2 = Math.abs(nextMonthTermDate - date);
            dif1 = Math.ceil(diffInMs1 / (1000 * 3600 * 24)) - 1;
            dif2 = Math.ceil(diffInMs2 / (1000 * 3600 * 24));


        } else {
            displayterm1 = solarTerm1;
            displayterm2 = solarTerm2;
            diffInMs1 = Math.abs(date - solarTerm1date);
            diffInMs2 = Math.abs(solarTerm2date - date);
            dif1 = Math.ceil(diffInMs1 / (1000 * 3600 * 24)) - 1;
            dif2 = Math.ceil(diffInMs2 / (1000 * 3600 * 24));

        }
        const chterm1 = solarTerms.find(term => term.term === displayterm1).chterm;
        const chterm2 = solarTerms.find(term => term.term === displayterm2).chterm;
        const solartermoutput = `
        <p>N/A</p>
        <p class="termdes">Previous term:</p> 
        <p class="termcontent">${displayterm1}<span class="chterm"> ${chterm1}</span> (${dif1} days ago)</p>
        <p class="termdes">Next term:</p> 
        <p class="termcontent">${displayterm2}<span class="chterm"> ${chterm2}</span> (in ${dif2} days)</p>
    `;
        return solartermoutput;
    }
}

let currentDate = new Date();

function updateDate(offset) {
    currentDate.setDate(currentDate.getDate() + offset);

    const lunarDate = updateLunarDate(currentDate);
    document.getElementById('currentdate').innerHTML = lunarDate.currentdate;
    document.getElementById('lunar-date').innerHTML = lunarDate.currentlunar;

    const moonPhase = getMoonPhase(currentDate);
    document.getElementById('moon-phase').innerHTML = moonPhase;

    const solartermtoday = getSolarTermEffect(currentDate);
    document.getElementById("solar-term").innerHTML = `${solartermtoday}`;

    // Clear the contents of the dosList and dontsList
    dosList.innerHTML = '';
    dontsList.innerHTML = '';

    // Shuffle the items and divide them into dos and donts
    const shuffledItems = dosndonts.sort(() => 0.5 - Math.random());
    const dosItems = shuffledItems.slice(0, 5);
    const dontsItems = shuffledItems.slice(5, 10);

    // Populate the dosList and dontsList with the new items
    dosItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = item;
        dosList.appendChild(listItem);
    });

    dontsItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = item;
        dontsList.appendChild(listItem);
    });


}

document.getElementById('previous-day').addEventListener('click', function () {
    updateDate(-1);
});

document.getElementById('next-day').addEventListener('click', function () {
    updateDate(1);
});

document.getElementById('currentdate').addEventListener('click', function () {
    currentDate = new Date();
    updateDate(0);
});

const solarTermDiv = document.getElementById("solar-term");
/*testday = new Date(2023, 3, 5)*/
const solartermtoday = getSolarTermEffect(today);
solarTermDiv.innerHTML = `${solartermtoday}`;






