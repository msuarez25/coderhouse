// Envia valor en el header de autorizacion.
// const isAdmin = ''; // no admin
const isAdmin = '1'; //admin;

//revisar si el usuario tiene un carrito asignado, sino lo crea y lo guarda en el localStorage
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});
const checkCarId = async () => {
  const userCarId = localStorage.getItem('userCarId');
  if (userCarId == null || userCarId == undefined) {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        myauthorization: isAdmin,
      },
    };
    try {
      const response = await fetch('/api/carrito', settings);
      const data = await response.json();
      localStorage.setItem('userCarId', data[0]._id);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log('userCarId: ', userCarId);
  }
};
checkCarId();

const runFunc = (container, cb) => {
  cb(container);
};

const displayProducts = async (container) => {
  const pContainer = document.querySelector(container);
  if (pContainer !== null) {
    try {
      const response = await fetch('/api/productos');
      if (response.status === 200) {
        const products = await response.json();
        products.map((product) => {
          const card = `<div class="col-6 col-md-4 col-xl-3 mb-4"><div class="card">
            <img src="${product.foto}" class="card-img-top" alt="foto de ${product.nombre}">
            <div class="card-body">
              <h5 class="card-title">${product.nombre}</h5>
              <p class="card-text">Código del producto: ${product.code}</p>
              <button data-prod-id="${product._id}" class="btn btn-primary add-to-cart mb-3" >Agregar al carrito</button>
              <a href="/editar/${product._id}" class="btn btn-warning edit-product mb-3">Editar producto</a>
              <button data-prod-id="${product._id}" class="btn btn-danger delete-product mb-3" >Eliminar producto</button>
            </div>
            <div class="card-footer text-muted">
                Precio: ${product.precio}
            </div>
            </div></div>`;
          pContainer.insertAdjacentHTML('beforeend', card);
        });
        addToCarListeners();
        deleteProdListener(pContainer);
      }
    } catch (e) {
      console.error(e);
    }
  }
};

const postCarData = async (url = false, method = 'POST') => {
  const userCarId = localStorage.getItem('userCarId');
  if (userCarId !== null) {
    if (url) {
      const settings = {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          myauthorization: isAdmin,
        },
      };
      try {
        const response = await fetch(url, settings);
        const data = await response.json();
        return data;
      } catch (e) {
        return e;
      }
    }
  }
  return false;
};
const getCarData = async (url = false) => {
  const userCarId = localStorage.getItem('userCarId');
  if (userCarId !== null) {
    if (url) {
      const settings = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          myauthorization: isAdmin,
        },
      };
      try {
        const response = await fetch(url, settings);
        const data = await response.json();
        return data[0].productos;
      } catch (e) {
        return e;
      }
    }
  }
  return false;
};

const addToCar = async (url, prodId) => {
  await postCarData(`${url}/${prodId}`);
};

const addToCarListeners = () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  const userCarId = localStorage.getItem('userCarId');

  if (buttons !== null && userCarId !== null) {
    buttons.forEach((button) => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        const prodId = button.getAttribute('data-prod-id');
        const url = `/api/carrito/${userCarId}/productos`;
        addToCar(url, prodId);
        this.setAttribute('disabled', 'disabled');
        this.innerText = 'Agregado';
        this.classList.add('btn-secondary');
      });
    });
  }
};

const displayCarrito = async (container) => {
  const pContainer = document.querySelector(container);
  const userCarId = localStorage.getItem('userCarId');
  if (pContainer !== null && userCarId !== null) {
    try {
      const response = await fetch(`/api/carrito/${userCarId}/productos`);
      if (response.status === 200) {
        const carProducts = await response.json();
        // console.log(carProducts);
        const products = carProducts;
        if (products.length > 0) {
          displayCarritoHTML(products, pContainer);
        } else {
          pContainer.innerHTML = `<div class="alert alert-warning" role="alert">
          Tu carrito esta vacio. Ve a <a href="/productos">La tienda</a> para agregar productos a tu carrito.
        </div>`;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};

const displayCarritoHTML = (products, pContainer) => {
  pContainer.innerHTML = '';
  let total = 0;
  products.map((product) => {
    total = total + parseInt(product.precio);
    let card = `<div class="col-12 mt-5">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <img src="${product.foto}" class="card-img-top" alt="foto de ${product.nombre}">
                </div>
                <div class="col-md-5">
                <p class="h5 card-title">${product.nombre}</p>
                <p class="card-text">Código del producto: ${product.code}</p>
                </div>
                <div class="col-md-3">                
                  Precio: ${product.precio}
                </div>
                <div class="col-md-2">
                <button data-prod-id="${product._id}" class="btn btn-danger remove-from-cart">X</a>
                </div>
              </div>
              </div>`;
    pContainer.insertAdjacentHTML('beforeend', card);
  });
  pContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="row justify-content-end"><div class="col-md-12 d-flex justify-content-end py-5 h5">TOTAL: ${formatter.format(
      total
    )}</div></div>`
  );
  removeFromCarListeners(pContainer);
};

const removeFromCarListeners = (pContainer) => {
  const buttons = document.querySelectorAll('.remove-from-cart');
  const userCarId = localStorage.getItem('userCarId');

  if (buttons !== null && userCarId !== null) {
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const prodId = button.getAttribute('data-prod-id');
        const url = `/api/carrito/${userCarId}/productos`;
        removeFromCar(url, prodId, pContainer);
      });
    });
  }
};

const removeFromCar = async (url, prodId, pContainer) => {
  await postCarData(`${url}/${prodId}`, 'DELETE');
  const carData = await getCarData(url);
  displayCarritoHTML(carData, pContainer);
};

const fillForm = async (prodId, formSelector) => {
  const form = document.querySelector(formSelector);
  try {
    const response = await fetch(`/api/productos/${prodId}`);
    if (response.status === 200) {
      const product = await response.json();
      const productObj = product[0];

      for (const property in productObj) {
        const field = form.querySelector(`#${property}`);
        if (field !== null && property !== 'foto') {
          field.value = productObj[property];
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const activeFotoField = () => {
  document
    .querySelector('.edit-foto')
    .addEventListener('click', function (event) {
      event.preventDefault();
      const fotoField = `<div class="mb-3">
    <label for="foto" class="form-label">Imagen</label>
    <input class="form-control" type="file" id="foto" name="foto" />
    </div>`;
      this.insertAdjacentHTML('beforebegin', fotoField);
      this.remove();
    });
};

const deleteProdListener = (pContainer) => {
  const buttons = document.querySelectorAll('.delete-product');
  if (buttons !== null) {
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const prodId = button.getAttribute('data-prod-id');
        const url = `/api/productos`;
        deleteProd(url, prodId, pContainer);
      });
    });
  }
};

const deleteProd = async (url, prodId, pContainer) => {
  try {
    await postCarData(`${url}/${prodId}`, 'DELETE');
    pContainer.innerHTML = '';
    displayProducts('#lista-productos');
  } catch (e) {
    console.error(e);
  }
};
