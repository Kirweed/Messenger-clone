import $ from '../functions/handler.js';
import Conversation from './Conversation.js';

export default class User {

    constructor(user_info) {
        const { id, username , info } = user_info;
        this.id = id;
        this.username = username;
        this.CONVERSATION_ARR = [];

        if (typeof info === 'object' && info !== null) {
            this.image = info.image;
        }

        this.loadUser();
    }

    loadUser() {

        const NICK_DIV = $('.user-nick'),
              PHOTO_DIV = $('.user-photo');

        NICK_DIV.textContent = this.username;

        if(typeof this.image === 'string') {
            PHOTO_DIV.innerHTML = `<img src = " ${this.image} ">`;
        } else {
            PHOTO_DIV.innerHTML = this.generateBasicAvatar();
        }
    }

    generateBasicAvatar() {
        const first_letter = this.username.charAt(0);
        const html_string = `<p>${first_letter}</p>`
        return html_string;
    }

    displayCurrentConversation() {

        const c = this.CONVERSATION_ARR[0];
        c.div.classList.add("active-conversation");
        c.active = true;
        $('.conversation-window').innerHTML = "";
        c.displayMessages();
    }

    returnActiveConversation() {
        for(let conv of this.CONVERSATION_ARR) {
            if(conv.active === true) {
                return conv;
            }
        }
    }

    pushConversation(data) {

        for(let conv of data) {

            const USERS_ARR = [];

            for(let user of conv.user) {

                if(user.id !== this.id) {
                    USERS_ARR.push(user);
                }
            }
            this.CONVERSATION_ARR.push(new Conversation(USERS_ARR, conv.messages, conv.id));
        }
    }

    addEvents() {
        const self = this;

        for(let conv of this.CONVERSATION_ARR) {

            conv.div.addEventListener('click', function() {

                for(let convv of self.CONVERSATION_ARR) {

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
    }

    afterSend() {

        const conv = this.returnActiveConversation();
        const input_text = $('.conversation-input').value;
        conv.sendMessage(input_text).then( () => {
            conv.addMessage(input_text);
        });
        $('.conversation-input').value = '';

    }
}