const url = window.location.href;
const { origin } = new URL(url);
 
const socket = io.connect(origin, { 'forceNew': true });
socket.on('message', function (data) {
    render(data);
});

function render(data) {
    let html = data.map(function (message, index) {
        return (`
            <div class="message">
                <strong>${message.username}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');
    
    /* Keep focus of last message */
    let message = document.getElementById('message'); 
    message.innerHTML = html;
    message.scrollTop = message.scrollHeight;
}

window.onload = () => {
    document.getElementById('button-send').style.display = 'none';

    let username = document.getElementById('username');
    let textMessage = document.getElementById('text-message');
    let buttonSend = document.getElementById('button-send'); 

    /* validate username */
    username.addEventListener('keyup', () => {
        if (username.value.length > 0 && textMessage.value.length > 0) {
            buttonSend.style.display = 'block';
        } else {
            buttonSend.style.display = 'none';
        }
    });
    
    /* validate text message */
    textMessage.addEventListener('keyup', () => {
        if (username.value.length > 0 && textMessage.value.length > 0) {
            buttonSend.style.display = 'block';
        } else {
            buttonSend.style.display = 'none';
        }
    });

    buttonSend.addEventListener('click', (e) => {
        e.preventDefault();

        let message = {
            username: username.value,
            text: textMessage.value
        }

        /* send message to server */
        socket.emit('add-message', message);
        
        /* After sending the message */
        username.style.display = 'none';
        textMessage.value = '';
        buttonSend.style.display = 'none';
        textMessage.focus();
        return false;
    });
}