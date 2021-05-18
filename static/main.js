let show_opt = false;
const opt = $('.options');

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