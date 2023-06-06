let username
let socket = io();
console.log('socket', socket);
do {
    username = prompt("Enter your name")
} while (!username)

const textarea = document.querySelector('#textarea');
const submitBtn = document.querySelector('#submitBtn');
const commentBox = document.querySelector('#commentBox');
const typingDiv = document.querySelector('.typingDiv');

textarea.addEventListener('keyup', (e) => {
    socket.emit('typing', { username: username })
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let comment = textarea.value

    if(!comment) {
        return
    }

    postComment(comment);


})

function postComment(comment) {
    let data = {
        username, comment
    }

    appendToDom(data)

    textarea.value = '';

    // BOARD CAST COMMENT WITH THE HELP OF SOCKET.IO
    broadcastComment(data)
}

function broadcastComment(data) {
    // Socket
    socket.emit('comment', data);
}

socket.on('comment', (data) => {
    appendToDom(data);
})

let timerId = null;

function debounce(func, timer) {

    if(timer) {
        clearInterval(timerId)
    }

    timerId = setTimeout(() => {
        func();
    }, timer)
}

socket.on('typing', (data) => {
    typingDiv.innerHTML = `${data.username} is typing...`

    debounce(function () {
        typingDiv.innerHTML = ''
    }, 1000)
})

function appendToDom(data) {
    let lTag = document.createElement('div');
    lTag.classList.add('comment', 'mb-3')

    let markup = `
        <div class="card mb-3 border-light">
            <div class="card-body">
                <h6>${data.username}</h6>
                <p>${data.comment}</p>
            </div>
        </div>
    `

    lTag.innerHTML = markup;
    commentBox.prepend(lTag);
}

