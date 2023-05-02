/*const solarlunar = require('solarlunar');*/

const solarTerms = [
    {term: "Moderate cold", chterm: "小寒", month: 1},
    {term: "Severe cold", chterm: "大寒", month: 1},
    {term: "Spring commences", chterm: "立春", month: 2},
    {term: "Rain water", chterm: "雨水", month: 2},
    {term: "Insects waken", chterm: "惊蛰", month: 3},
    {term: "Vernal equinox", chterm: "春分", month: 3},
    {term: "Bright and clear", chterm: "清明", month: 4},
    {term: "Corn rain", chterm: "谷雨", month: 4},
    {term: "Summer commences", chterm: "立夏", month: 5},
    {term: "Corn forms", chterm: "小满", month: 5},
    {term: "Corn on ear", chterm: "芒种", month: 6},
    {term: "Summer solstice", chterm: "夏至", month: 6},
    {term: "Moderate heat", chterm: "小暑", month: 7},
    {term: "Great heat", chterm: "大暑", month: 7},
    {term: "Autumn commences", chterm: "立秋", month: 8},
    {term: "End of heat", chterm: "处暑", month: 8},
    {term: "White dew", chterm: "白露", month: 9},
    {term: "Autumnal equinox", chterm: "秋分", month: 9},
    {term: "Cold dew", chterm: "寒露", month: 10},
    {term: "Frost", chterm: "霜降", month: 10},
    {term: "Winter commences", chterm: "立冬", month: 11},
    {term: "Light snow", chterm: "小雪", month: 11},
    {term: "Heavy snow", chterm: "大雪", month: 12},
    {term: "Winter solstice", chterm: "冬至", month: 12}
];

function getSolarTermEffect(date) {
    const lunarDate = solarlunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const term = lunarDate.term || '';
    const isTerm = lunarDate.isTerm;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (isTerm) {
        const matchedTerm = solarTerms.find(t => t.term.includes(term));
        return `${matchedTerm.term} ${matchedTerm.chterm}`;
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
                lastMonthTermDate = new Date(lastYear, lastMonth - 1, solarlunar.getTerm(lastYear, lastMonth + 3));
            }
            let diffInMs1 = Math.abs(date - lastMonthTermDate);
            let diffInMs2 = Math.abs(solarTerm1date - date);
            let dif1 = Math.ceil(diffInMs1 / (1000 * 3600 * 24));
            let dif2 = Math.ceil(diffInMs2 / (1000 * 3600 * 24));

            return `<p>N/A</p>
                    <p class="termdes">Previous term:</p>
                    <p class="termcontent">${lastMonthSolarTerm} (${dif1} days ago)</p> 
                    <p class="termdes">Next term:</p>
                    <p class="termcontent">${solarTerm1} (in ${dif2} days)</p>`
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
            let diffInMs1 = Math.abs(date - solarTerm2date);
            let diffInMs2 = Math.abs(nextMonthTermDate - date);
            let dif1 = Math.ceil(diffInMs1 / (1000 * 3600 * 24)) - 1;
            let dif2 = Math.ceil(diffInMs2 / (1000 * 3600 * 24));
            return `<p>N/A</p>
                    <p class="termdes">Previous term:</p> 
                    <p class="termcontent">${solarTerm2} (${dif1} days ago)</p> 
                    <p class="termdes">Next term:</p> 
                    <p class="termcontent">${nextMonthSolarTerm} (in ${dif2} days)</p>`

        } else {
            let diffInMs1 = Math.abs(date - solarTerm1date);
            let diffInMs2 = Math.abs(solarTerm2date - date);
            let dif1 = Math.ceil(diffInMs1 / (1000 * 3600 * 24));
            let dif2 = Math.ceil(diffInMs2 / (1000 * 3600 * 24));
            return `<p>N/A</p>
                    <p class="termdes">Previous term:</p> 
                    <p class="termcontent">${solarTerm1} (${dif1} days ago)</p> 
                    <p class="termdes">Next term:</p> 
                    <p class="termcontent">${solarTerm2} (in ${dif2} days)</p>`
        }
    }
}

const solarTermDiv = document.getElementById("solar-term");
/*const testdate = new Date(2023, 3, 20)*/
const solartermtoday = getSolarTermEffect(today);
solarTermDiv.innerHTML = `${solartermtoday}`;

/*const today = new Date(2023, 4, 28)
console.log(getSolarTermEffect(today));*/
/*const test = solarlunar.getTerm(2023, 8);
console.log(test)*/

