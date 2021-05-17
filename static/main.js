function $(handler) {
	return document.querySelector(handler);
}

$('.sending-button').addEventListener('click', (event) => {
	$('.conversation-input').value = '';
});