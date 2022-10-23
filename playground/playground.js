// Utils
const {$, createElm, bindEvent} = sweetDom;
const showElm = (elm) => elm.classList.remove('invisible');
const hideElm = (elm) => elm.classList.add('invisible');
const capitalizeFirstLetter = (str) => {
    const upperFirst = str[0].toUpperCase();
    return upperFirst + str.substr(1);
};

let navBar;

const topicElems = {};
const topicList = [
    'form',
    'list',
    'article',
    'flex',
    'others',
];

function init () {
    navBar = $('#topic-navigation');

    topicList.forEach((topic, i) => {
        // Elements
        const btnText = capitalizeFirstLetter(topic);
        const navBtn = createElm('button.nav-btn', btnText);
        const topicElm = $(`#${topic}`);
        
        // Keep References
        topicElems[topic] = [navBtn, topicElm];

        // Initial Visibility
        if (i === 0) {
            showElm(topicElm);
            navBtn.classList.add('selected');
        }
        else {
            hideElm(topicElm);
            navBtn.classList.remove('selected');
        }
        
        // Bind Click
        bindEvent(navBtn, 'click', () => switchTo(topic));

        // Append to DOM
        navBar.append(navBtn);
    }, topicElems);
}

function switchTo (wantedTopic) {
    topicList.forEach((topic) => {
        const topicNavBtn = topicElems[topic][0];
        const topicContainer = topicElems[topic][1];

        if (topic === wantedTopic) {
            showElm(topicContainer);
            topicNavBtn.classList.add('selected');
        }
        else {
            hideElm(topicContainer);
            topicNavBtn.classList.remove('selected');
        }
    });
}