const socket = io();

socket.on('mensajeAgragado', (data) => {
  const oriMessages = data;
  let mensajes = '';
  const messages = [];
  oriMessages.forEach((msg) => {
    let date = new Date(msg.date);

    messages.push({
      email: msg.author.email,
      text: msg.text,
      date: date,
      alias: msg.author.alias,
      avatar: msg.author.avatar,
    });
  });
  messages.map((msg) => {
    mensajes += `<li>
            <span class="email"> ${msg.alias}</span> 
            <time>[${msg.date}]</time> 
            <span class="mensaje">${msg.text}</span>
        </li>
      `;
  });
  document.querySelector('main .mensajes').innerHTML = mensajes;
  document.querySelector('form#chat').reset();
});

socket.on('mensajeError', (data) => {
  console.log(data.error);
});

const addMessage = (e) => {
  let formElements = [...e.target.elements];
  formElements.pop();
  const message = {};
  const author = {};
  formElements.map((ele) => {
    const name = ele.getAttribute('name');
    if (name !== 'text') {
      author[name] = ele.value;
    } else {
      message.text = ele.value;
    }
    author.id = `autho-id-${Date.now()}`;
    message.date = Date.now();
    message.author = author;
  });

  socket.emit('mensajeEnviado', {
    message: message,
  });
};

document.querySelector('form#chat').addEventListener('submit', (e) => {
  e.preventDefault();
  addMessage(e);
});
