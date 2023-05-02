function updateLunarDate(date) {
    let lunarDate = solarlunar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());

    const animalTranslations = {
        '鼠': {name: 'Rat', img: '/WISproject/img/zodiac/rat.png'},
        '牛': {name: 'Ox', img: '/WISproject/img/zodiac/ox.png'},
        '虎': {name: 'Tiger', img: '/WISproject/img/zodiac/tiger.png'},
        '兔': {name: 'Rabbit', img: '/WISproject/img/zodiac/rabbit.png'},
        '龙': {name: 'Dragon', img: '/WISproject/img/zodiac/dragon.png'},
        '蛇': {name: 'Snake', img: '/WISproject/img/zodiac/snake.png'},
        '马': {name: 'Horse', img: '/WISproject/img/zodiac/horse.png'},
        '羊': {name: 'Sheep', img: '/WISproject/img/zodiac/sheep.png'},
        '猴': {name: 'Monkey', img: '/WISproject/img/zodiac/monkey.png'},
        '鸡': {name: 'Rooster', img: '/WISproject/img/zodiac/rooster.png'},
        '狗': {name: 'Dog', img: '/WISproject/img/zodiac/dog.png'},
        '猪': {name: 'Pig', img: '/WISproject/img/zodiac/pig.png'}
    };
    const zodiacTranslation = animalTranslations[lunarDate.animal];
    const zodiacName = zodiacTranslation.name;
    const zodiacImg = zodiacTranslation.img;

    const monthTranslations = {
        '1': 'January',
        '2': 'February',
        '3': 'March',
        '4': 'April',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'August',
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    };
    const monthTranslation = monthTranslations[lunarDate.lMonth];

    let lunarMonth;
    if (lunarDate.isLeap) {
        lunarMonth = `Leap ${monthTranslation}`;
    } else {
        lunarMonth = monthTranslation;
    }
    const currentmonth = monthTranslations[lunarDate.cMonth];

    const weekdayTranslations = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday',
    };

    const weekday = weekdayTranslations[lunarDate.nWeek];

    const todayHTML = `
        <p class="today">${lunarDate.cYear} ${currentmonth} ${lunarDate.cDay}, ${weekday}</p>
    `;

    const otherPartsHTML = `
        <p class="des">Chinese Lunar Date</p>
        <p class="day">${lunarDate.lDay}</p>
        <p class="month">${lunarMonth}</p>
        <p class="year">Year of ${zodiacName}</p>
        <img class="zodiac-image" src="${zodiacImg}" alt="pic of ${zodiacName}">
    `;

    return {currentdate: todayHTML, currentlunar: otherPartsHTML};

}

const today = new Date()
const lunarDate = updateLunarDate(today);
document.getElementById('currentdate').innerHTML = lunarDate.currentdate;
document.getElementById('lunar-date').innerHTML = lunarDate.currentlunar;

/*const solarlunar = require('solarlunar');
const lunarDate = solarlunar.solar2lunar(2023, 4, 9);
console.log(lunarDate)*/




