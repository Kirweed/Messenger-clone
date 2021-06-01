import $ from './functions/handler.js';
import Conversation from './classes/Conversation.js';

let show_opt = false;
const opt = $('.options');
const USER_ID = $('.id');

const CONVERSATION_ARR = new Array;

class Message {

    constructor(to, from, text) {
        this.to = to;
        this.from = from;
        this.text = text;
    }
}

$('.sending-button').addEventListener('click', (event) => {
	$('.conversation-input').value = '';
});

opt.addEventListener('click', (event) => {

    const opt_w = $('.options-wrapper');
    let calc;

    if(show_opt === false) {
        opt_w.style.top = opt.offsetTop + opt.offsetHeight + "px";
        opt_w.style.display = 'block';
        calc = window.outerWidth - opt.offsetLeft - opt.offsetWidth;
        console.log(calc);
        opt_w.style.right = calc + "px";
        show_opt = true;
    } else {
        opt_w.style.display = 'none';
        show_opt = false;
    }
});

function init() {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../rest/users/' + USER_ID.textContent, true)

    let p = new Promise(function(resolve, reject){
        xhr.onload = function() {
            if(xhr.status >= 200 && xhr.status < 400) {
                resolve(xhr.responseText);
            } else {
                reject(new Error("Some error occurred"));
            }
        }

        xhr.onerror = function() {
            reject(new Error("Some error occurred"));
        };
    });

    xhr.send();

    return p;
}

init()
.then(json_data => {
    const NICK_DIV = $('.user-nick'),
          PHOTO_DIV = $('.user-photo'),
          {username: NICK, info: { image }} = JSON.parse(json_data);
    NICK_DIV.textContent = NICK;
    PHOTO_DIV.innerHTML = `<img src = " ${image} ">`;
})
.then(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../rest/user_conversations/' + USER_ID.textContent, true)
    let p = new Promise(function(resolve, reject){
        xhr.onload = function() {
            if(xhr.status >= 200 && xhr.status < 400) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error("Some error occurred"));
            }
        }

        xhr.onerror = function() {
            reject(new Error("Some error occurred"));
        };
    });

    xhr.send();

    return p;
})
.then( json_data => {

    const USERS_ARR = [];

    for(let user of json_data.conversation[0].user) {
        if(user.id !== parseInt(USER_ID.textContent)) {
            USERS_ARR.push(user);
        }
    }
    CONVERSATION_ARR.push(new Conversation(USERS_ARR));
})
.catch((e) => console.log(e));