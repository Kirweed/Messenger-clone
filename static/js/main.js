import $ from './functions/handler.js';
import Conversation from './classes/Conversation.js';
import User from './classes/User.js';

export let USER_OBJ = {};
export let user;
let show_opt = false;
const opt = $('.options');
const add_friend_btn = $(".add-friend-button");
const USER_ID = $('.id');

function clicks(event) {
    if(event.keyCode === 13) {
        user.afterSend();
    }
}

opt.addEventListener('click', (event) => {

    const opt_w = $('.options-wrapper');
    let calc;

    if(show_opt === false) {
        opt_w.style.top = opt.offsetTop + opt.offsetHeight + "px";
        opt_w.style.display = 'block';
        calc = window.outerWidth - opt.offsetLeft - opt.offsetWidth;
        opt_w.style.right = calc + "px";
        show_opt = true;
    } else {
        opt_w.style.display = 'none';
        show_opt = false;
    }
});

add_friend_btn.addEventListener('click', () => {
    const overlay = $(".add-friend-overlay");
    overlay.style.display = 'block';
    overlay.addEventListener('click', removeOverlay);

    function removeOverlay(event) {
        if(event.target === overlay) {
            overlay.style.display = 'none';
            overlay.removeEventListener('click', removeOverlay);
        }
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
    user = new User(USER_OBJ);

    $('.sending-button').addEventListener('click', user.afterSend);
    document.addEventListener('keydown', clicks);

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
    user.pushConversation(json_data.conversation);
    user.addEvents();
    user.displayCurrentConversation();
})
.catch((e) => console.log(e));