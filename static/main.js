let show_opt = false;
const opt = $('.options');

const CONVERSATION_ARR = new Array;

class Message {

    constructor(to, from, text) {
        this.to = to;
        this.from = from;
        this.text = text;
    }
}

class Conversation {

    constructor(user, messages = null, last_message_time = null) {
        const MESSAGE_ARR = new Array;

        this.user= user;
        this.messages = messages;
        this.last_message_time = last_message_time;
    }

    appendToInbox() {
        let HTML_string =
            `<div class = "conversation">
				<div class = "person-conversation-label">
				    Anadrzej:
				</div>
				<div class = "message-conversation-label">
					Hej, co tam?
				</div>
			</div>`
    }
}

function $(handler) {
	return document.querySelector(handler);
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
    const USER_ID = $('.id');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../rest/users/' + USER_ID.textContent, true)

    p = new Promise(function(resolve, reject){
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
.catch(() => console.log("AJAX ERROR"));