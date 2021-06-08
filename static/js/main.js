import $ from './functions/handler.js';
import Conversation from './classes/Conversation.js';

export let USER_OBJ = {};
let show_opt = false;
const opt = $('.options');
const USER_ID = $('.id');

const CONVERSATION_ARR = new Array;

export function returnActiveConversation() {
    for(let conv of CONVERSATION_ARR) {
        if(conv.active === true) {
            return conv;
        }
    }
}

function clicks(event) {
    if(event.keyCode === 13) {
        afterSend();
    }
}

function afterSend() {

    const conv = returnActiveConversation();
    const input_text = $('.conversation-input').value;
    conv.sendMessage(input_text).then( () => {
        conv.addMessage(input_text);
    });
	$('.conversation-input').value = '';

}

$('.sending-button').addEventListener('click', afterSend);
document.addEventListener('keydown', clicks);

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
    USER_OBJ = JSON.parse(json_data);
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

    for(let conv of json_data.conversation) {

        const USERS_ARR = [];

        for(let user of conv.user) {

            if(user.id !== parseInt(USER_ID.textContent)) {
                USERS_ARR.push(user);
            }
        }
        CONVERSATION_ARR.push(new Conversation(USERS_ARR, conv.messages, conv.id));
    }

    for(let conv of CONVERSATION_ARR) {

        conv.div.addEventListener('click', function() {

            for(let convv of CONVERSATION_ARR) {

                if(convv.active === true) {

                    convv.div.classList.remove("active-conversation");
                    convv.active = false;
                }
            }

            this.classList.add("active-conversation");
            conv.active = true;
            $('.conversation-window').innerHTML = "";
            conv.displayMessages();
        });
    }

    displayCurrentConversation();
})
.catch((e) => console.log(e));

function displayCurrentConversation() {

    const c = CONVERSATION_ARR[0];
    c.div.classList.add("active-conversation");
    c.active = true;
    $('.conversation-window').innerHTML = "";
    c.displayMessages();
}