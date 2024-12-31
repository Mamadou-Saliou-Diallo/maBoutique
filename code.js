const products = {
    ordinateurs: [
      {name: 'hp 1030 x360', description: 'Ordinateur puissant pour les tâches professionnelles.', price: 230000, img: 'images/del.jpeg'},
      {name: 'AMD Raysen 7 pro', description: 'Ordinateur léger et portable.', price: 275000, img: 'images/o1.jpeg'},
      {name: 'PC MacBook Air', description: 'Ordinateur puissant pour les tâches professionnelles.', price: 285000, img: 'images/mac2.jpeg'},
      {name: 'hp', description: 'Ordinateur léger et portable.', price: 140000, img: 'images/o2.jpeg'},
      {name: 'Macbook-pro', description: 'Ordinateur puissant pour les tâches professionnelles.', price: 1450000, img: 'images/mac3.jpeg'},
      {name: 'Ordinateur-bureau', description: 'Ordinateur léger et portable.', price: 285000, img: 'images/o3.jpeg'},
    ],
    telephones: [
      {name: 'iPhone 15-pro', description: 'Smartphone haut de gamme.', price: 550000, img: 'images/iphone 15 pro.avif'},
      {name: 'iPhone 14-pro', description: 'Smartphone Android performant.', price: 540000, img: 'images/i2.avif'},
      {name: 'iPhone Xr-pro', description: 'Smartphone haut de gamme.', price: 230000, img: 'images/i3.avif'},
      {name: 'Fold', description: 'Smartphone Android performant.', price: 900000, img: 'images/f1.avif'},
      {name: 'Samsung A52', description: 'Smartphone haut de gamme.', price: 175000, img: 'images/f2.avif'},
      {name: 'Fold', description: 'Smartphone Android performant.', price: 7500000, img: 'images/f3.avif'},
    ],
    montres: [
      {name: 'Montre A', description: 'Montre élégante et durable.', price: 10000, img: 'images/m1.avif'},
      {name: 'Montre B', description: 'Montre connectée avec suivi de santé.', price: 20000, img: 'images/m2.avif'},
      {name: 'Montre C', description: 'Montre élégante et durable.', price: 10000, img: 'images/m3.avif'},
      {name: 'Montre D', description: 'Montre connectée avec suivi de santé.', price: 20000, img: 'images/m4.avif'},
      {name: 'Montre E', description: 'Montre élégante et durable.', price: 10000, img: 'images/m5.avif'},
      {name: 'Montre F', description: 'Montre connectée avec suivi de santé.', price: 20000, img: 'images/m6.avif'},
    ],
    chargeurs: [
      {name: 'Chargeur USB-C', description: 'Chargeur rapide pour appareils compatibles USB-C.', price: 3000, img: 'images/c1.avif'},
      {name: 'Chargeur sans fil', description: 'Chargeur sans fil pour téléphone.', price: 1500, img: 'images/c2.avif'},
      {name: 'Chargeur USB-C', description: 'Chargeur rapide pour appareils compatibles USB-C.', price: 2000, img: 'images/c3.avif'},
      {name: 'Chargeur sans fil', description: 'Chargeur sans fil pour téléphone.', price: 3000, img: 'images/c4.avif'},
      {name: 'Chargeur USB-C', description: 'Chargeur rapide pour appareils compatibles USB-C.', price: 2000, img: 'images/c5.avif'},
      {name: 'Chargeur sans fil', description: 'Chargeur sans fil pour téléphone.', price: 3000, img: 'images/c6.avif'},
    ]
  };

  document.querySelectorAll('.btn-view-more').forEach(button => {
    button.addEventListener('click', (e) => {
      const category = e.target.dataset.categorie;
      showCategoryDetails(category);
    });
  });

  document.getElementById('btn-retour').addEventListener('click', () => {
    document.getElementById('categories').classList.remove('hidden');
    document.getElementById('details').classList.add('hidden');
  });

  function showCategoryDetails(category) {
    const detailsSection = document.getElementById('details');
    const title = document.getElementById('details-title');
    const detailsList = document.getElementById('details-list');
    
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    detailsList.innerHTML = '';
    products[category].forEach(product => {
      detailsList.innerHTML += `
        <div class="col-md-3">
          <div class="card product-card">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5>${product.name}</h5>
              <p>${product.description}</p>
              <p class="price">${product.price} FCFA</p>
              <button class="btn-add-to-cart" data-name="${product.name}" data-price="${product.price}">Ajouter au panier</button>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById('categories').classList.add('hidden');
    detailsSection.classList.remove('hidden');
  }

  let cart = [];

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-to-cart')) {
      const product = {
        name: e.target.dataset.name,
        price: parseInt(e.target.dataset.price)
      };
      cart.push(product);
      updateCart();
    }
  });

  function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalAmountDiv = document.getElementById('total-amount');
    const btnFinalize = document.getElementById('btn-finalize');
    
    cartItemsDiv.innerHTML = '';
    let totalAmount = 0;
    cart.forEach(item => {
      cartItemsDiv.innerHTML += `<p>${item.name} - ${item.price} FCFA</p>`;
      totalAmount += item.price;
    });
    totalAmountDiv.textContent = totalAmount;
    
    if (cart.length > 0) {
      btnFinalize.disabled = false;
    } else {
      btnFinalize.disabled = true;
    }
  }

  document.getElementById('btn-finalize').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('finalizeModal'));
    modal.show();
  });

  document.getElementById('btn-submit-order').addEventListener('click', () => {
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const email = document.getElementById('client-email').value;
    const address = document.getElementById('client-address').value;
    
    const orderDetails = `
      Nom: ${name}
      Téléphone: ${phone}
      E-mail: ${email}
      Adresse: ${address}
      Produits: ${cart.map(item => `${item.name} - ${item.price} FCFA`).join(', ')}
      Total: ${cart.reduce((total, item) => total + item.price, 0)} FCFA
    `;
    
    const message = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/777087976?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    cart = [];
    updateCart();
    const modal = bootstrap.Modal.getInstance(document.getElementById('finalizeModal'));
    modal.hide();
  });