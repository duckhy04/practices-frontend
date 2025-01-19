fetch('data.json').then(response => response.json()).then(data => { renderMenu(data) });

const itemContainer = document.querySelector(".item-container");

function renderMenu(data) {
    data.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
        <div class="image-item">
            <img class="img" src="${item.image.desktop}" alt="${item.name}" />
            <div class="add-cart">
                <img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart"/>
                <p>Add to Cart</p>
            </div>
        </div>
        <div>
            <p class="category">${item.category}</p>
            <h4 class="name">${item.name}</h4>
            <p class="price">$${item.price.toFixed(2)}</p>
        </div>
      `;
        itemContainer.appendChild(menuItem);
    })
}