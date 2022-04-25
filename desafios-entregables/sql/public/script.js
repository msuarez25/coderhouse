const socket = io();

socket.on('productoAgragado', (data) => {
  let productos = '';
  data.map((prod) => {
    productos += `<tr>
      <td>
      ${prod.title}
      </td>
      <td>
          $${prod.price}
      </td>
      <td>
          <img src="${prod.thumbnail}" alt="imagen de ${prod.title}">
      </td>
  </tr>`;
  });
  document.querySelector('main table tbody').innerHTML = productos;
  document.querySelector('form#add-product').reset();
});

socket.on('productoError', (data) => {
  console.log(data.error);
});

socket.on('mensajeAgragado', (data) => {
  let mensajes = '';
  data.map((msg) => {
    mensajes += `<li>
            <span class="email"> ${msg.email}</span> 
            <time>[${msg.date}]</time> 
            <span class="mensaje">${msg.message}</span>
        </li>
      `;
  });
  document.querySelector('main .mensajes').innerHTML = mensajes;
  document.querySelector('form#chat').reset();
});

socket.on('mensajeError', (data) => {
  console.log(data.error);
});

const addProduct = (e) => {
  const formElements = e.target.elements;
  const formData = {
    title: formElements.title.value,
    price: formElements.price.value,
    thumbnail: formElements.uploaded_file.value,
  };
  socket.emit('formularioEnviado', {
    formData,
  });
};

document.querySelector('form#add-product').addEventListener('submit', (e) => {
  e.preventDefault();
  addProduct(e);
});

const addMessage = (e) => {
  const formElements = e.target.elements;
  const formData = {
    email: formElements.email.value,
    message: formElements.message.value,
  };
  socket.emit('mensajeEnviado', {
    formData,
  });
};

document.querySelector('form#chat').addEventListener('submit', (e) => {
  e.preventDefault();
  addMessage(e);
});
