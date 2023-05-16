/*function generateSentence() {*/
// 存储十个句子的数组
let sentences = [
    "After endless mountains and rivers that leave doubt whether there is a path out,\nsuddenly one encounters the shade of a willow, bright flowers and a lovely village.\n山重水復疑無路，柳暗花明又一村。",
    "The last one tenth of the journey demands half the effort.\nA thing is yet to be done until it is done.\n行百裏者半九十。",
    "In the face of all blows, not bending low, it still stands fast. \nWhether from east, west, south or north the wind doth blast.\n千磨萬擊還堅勁，任爾東西南北風。",
    "Readiness to converge with others makes a mountain high and a river mighty.\n山積而高，澤積而長。",
    "Aspirations can reach any place however far it is, \neven over mountains and seas.\n誌之所趨，無遠勿屆，窮山距海，不能限也。",
    "Aspirations can break through \nany defense however tough it is, \neven as strong as the best armor and shield.\n誌之所嚮，無堅不入，銳兵精甲，不能禦也。",
    "Contemplating good and pursuing it, \nas if you could not reach it;\n contemplating evil, and shrinking from it, \nas you would from thrusting a hand into boiling water.\n見善如不及，見不善如探湯。",
    "As an old Chinese saying goes, \n“a long journey proves the stamina of a horse,\nand the passage of time reveals the heart of a person.\n路遙知馬力，日久見人心。",
    "Cut a way through when confronted by mountains,\nand build a bridge when blocked by a river.\n逢山開路,遇水架橋。",
    "A wise man changes his way as circumstances change; \na knowledgeable person alters his means as times evolve.\n明者因時而變，知者隨世而制。",
    "One ship sinks, a thousand sails go by;\n one tree stricken, \nspring brings ten thousand more to bloom. \n沉舟側畔仟帆過，病樹前頭萬木春。",
    "To listen to both sides, one will be enlightened, \nbut if heeding only one side, one will be benighted.\n兼聽則明，偏信則暗。",
    "As an ancient Chinese saying goes,\n'After making a good start, \nwe should ensure that the cause achieves fruition.'\n靡不有初，鮮克有終。",
    "Long, long had been my road and far, far was the journey;\nI would go up and down to seek my heart's desire.\n路漫漫其修遠兮,吾將上下而求索。",
    "Over the sea grows the moon bright;\nwe gaze on it far, far apart.\n海上生明月,天涯共此時。",
    "Be man of men while you’re alive,\nand soul of souls if you’re dead.\n生當作人傑，死亦為鬼雄。",
    "No water is wide enough when you have crossed the sea;\nno cloud is beautiful but that which crowns the peak.\n曾經滄海難為水，除卻巫山不是雲。",
    "All worldly noises are quieted here,\nI only hear temple bells ringing clear.\n萬籟此俱寂，但余鐘磬音。",
    "if you have friends who know your heart, \ndistance cannot keep you apart.\n海內存知己，天涯若比鄰。",
    "If you’ll enjoy a grander sight,\nyou’d climb up to a greater height.\n欲窮仟裏目，更上一層樓。",
    "Such feeling cannot be recalled again;\nit seemed lost even when it was felt then.\n此情可待成追憶，只是當時已惘然。",
    "My conscience stays untainted \nin spite of rumors and slanders from the outside.\n人或加訕，心無疵兮。",
    "It is only with reform that we can ensure continuous existence and growth.\n如將不盡，與古為新。",
    "There are people who will appreciate what I have done,\nbut there are also people who will criticize me, \nultimately, history will have the final say.\n知我罪我，其惟春秋。",
    "For the ideal that I hold dear to my heart, \nI'd not regret a thousand times to die.\n亦余心之所善兮，雖九死其尤未悔。",
    "No matter how high the mountain is, \none can always ascend to its top.\n華山再高，頂有過路。",
    "Even mountains and seas \ncannot distance people with common aspirations.\n誌合者，不以山海為遠。",
    "What you do not want done to yourself,\ndo not do to others.\n己所不欲，勿施於人。",
    "The sky is unlimited for birds to fly at ease,\nas the ocean is boundless for fish to leap at will.\n山高任鳥飛，海闊憑魚躍。",
    "The mechanic, who wishes to do his work well,\n must first sharpen his tools.\n工欲善其事，必先利其器。",
    "When I walk along with two others,\nthey may serve as my teachers.\n三人行，必有我師焉。"

];

let main = document.getElementsByClassName("main")[0];

function generateSentence() {
    // 随机选择一个句子
    let randomIndex = Math.floor(Math.random() * sentences.length);
    let sentence = sentences[randomIndex];

    // 在网页上显示句子
    let sentenceElement = document.getElementById("sentence");
    sentenceElement.style.whiteSpace = "pre-wrap";
    sentenceElement.innerHTML = "";
    sentenceElement.style.width = "600px";
    sentenceElement.style.height = "200px";


    let count = 0;
    let words = sentence.split("");
    let writeInterval = setInterval(function () {
        if (words.length > 0) {
            let span = document.createElement("span");
            let letter = words.shift();
            span.innerHTML = letter;
            sentenceElement.appendChild(span);

            let opc = 0;
            let fadeInterval = setInterval(function () {
                opc++;
                span.style.opacity = opc / 10;
                span.style.color = "transparent";
                span.style.textShadow =
                    "0 0 5px #57606f,0 0 10px #57606f,0 0 4px #57606f,0 0 12px #ffa502";
                span.style.filter = "blur(" + (10 / opc - 1) + "px)";
                if (opc >= 10) {
                    clearInterval(fadeInterval);
                    span.style.color = "#2f3542";
                }
            }, 50);
        } else {
            clearInterval(writeInterval);
        }
    }, 50);


}

//轮播图效果
class Slide {
    constructor() {
        this.slideBoxDOM = document.querySelector('.slide-box');
        this.slideLeftBtnDOM = this.slideBoxDOM.querySelector(".slide-left-btn");
        this.slideRightBtnDOM = this.slideBoxDOM.querySelector(".slide-right-btn");
        this.bannerBoxDOM = this.slideBoxDOM.querySelector(".banner-box");
        this.paginationBoxDOM = this.slideBoxDOM.querySelector(".pagination-box");
        //计数器
        this._currentIndex = 0;
        this._bannerItemDOMs = null;

        //banneritemDOMs lenth
        this._bannerItemDOMsLen = 0;

        //图片对象数据
        this.banners = [
            {imageName: 'shutter01.jpg',},
            {imageName: 'shutter02.jpg',},
            {imageName: 'shutter03.jpg',},
            {imageName: 'shutter04.jpg',},
            {imageName: 'shutter05.jpg',},
            {imageName: 'shutter06.jpg',},
        ];
        this.imageUrl = 'img/';

        //定时器
        this.timer = null;
    };

    get currentIndex() {
        return this._currentIndex;
    }

    //监听计数器变化，根据变化来改变当前的横幅
    set currentIndex(num) {
        //将所有横幅归于初始
        Object.values(this.bannerItemDOMs).forEach((item, i) => {
            item.classList.remove('left', 'middle', 'right');
            item.onclick = null;
            this.paginationBoxDOM.children[i].classList.remove('chose');
        });
        if (num < 0) {
            this._currentIndex = this.bannerItemDOMsLen - 1;
        } else if (num >= this.bannerItemDOMsLen) {
            this._currentIndex = 0;
        } else {
            this._currentIndex = num;
        }
        this.paginationBoxDOM.children[this._currentIndex].classList.add('chose');
        if (this._currentIndex === 0) {
            this.showCurrentBanner(this.bannerItemDOMsLen - 1, this._currentIndex, this._currentIndex + 1);

        } else if (this._currentIndex === this.bannerItemDOMsLen - 1) {
            this.showCurrentBanner(this._currentIndex - 1, this._currentIndex, 0)
        } else {
            this.showCurrentBanner(this._currentIndex - 1, this._currentIndex, this._currentIndex + 1);
        }
    }

    showCurrentBanner(leftIndex, middleIndex, rightIndex) {
        this.bannerItemDOMs[leftIndex].classList.add('left');
        this.bannerItemDOMs[middleIndex].classList.add('middle');
        this.bannerItemDOMs[rightIndex].classList.add('right');
        this.bannerItemDOMs[leftIndex].onclick = () => {
            this._currentIndex--;
        }
        this.bannerItemDOMs[rightIndex].onclick = () => {
            this._currentIndex++;
        }
    }

    getBannerItemDOMs() {
        return this.slideBoxDOM.querySelectorAll('.banner-item');
    }

    /*获取banner-itemdom字符串，用来渲染dom*/
    getBannerItemHTML(imageName) {
        return `<div class="banner-item"><img src="${this.imageUrl + imageName}" alt=""></div>`;

    }

    drawDOM(banners) {
        this.bannerBoxDOM.innerHTML = banners.reduce((html, item) => {
            return html + this.getBannerItemHTML(item.imageName);
        }, '');
        this.banners.forEach((item, i) => {
            const span = document.createElement('span');
            span.addEventListener('mouseover', () => {
                this._currentIndex = 1;
            });
            this.paginationBoxDOM.append(span);
        });
    }

    //启动定时器
    openTimer() {
        this.timer = setInterval(() => {
            this.currentIndex++;
        }, 3000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    init() {
        this.drawDOM(this.banners);
        this.bannerItemDOMs = this.getBannerItemDOMs();
        this.bannerItemDOMsLen = this.bannerItemDOMs.length;
        this.currentIndex = 0;

        //监听事件
        this.slideLeftBtnDOM.addEventListener('click', () => {
            this.currentIndex--;
        })
        this.slideRightBtnDOM.addEventListener('click', () => {
            this.currentIndex++;
        })
        //自动轮播
        this.openTimer();
        this.slideBoxDOM.addEventListener('mouseover', () => {
            this.stopTimer();
        });
        this.slideBoxDOM.addEventListener('mouseout', () => {
            this.openTimer();
        })
    }


}

new Slide().init();
