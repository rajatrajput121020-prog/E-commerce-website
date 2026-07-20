let cartIcon = document.getElementById("cart-icon");
let body = document.body;
let closeBtn = document.querySelector(".close");
let cartList = document.querySelector(".listcart");
let cartCount = document.querySelector(".cart-item-count");
let totalBox = document.getElementById("cart-total-price");
let cart = [];


cartIcon.onclick = function () {
    body.classList.add("showcart");
};

closeBtn.onclick = function () {
    body.classList.remove("showcart");
};

let buttons = document.querySelectorAll(".addcart");

buttons.forEach(function (btn) {
    btn.onclick = function () {

        let card = btn.parentElement;

        let name = card.querySelector("h3").innerText;
        let priceText = card.querySelectorAll("h3")[1].innerText;
        let price = parseInt(priceText.replace(/[^0-9]/g, ""));
        let img = card.querySelector("img").src;

        let found = false;

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === name) {
                cart[i].qty++;
                found = true;
                break;
            }
        }

        if (!found) {
            cart.push({
                name: name,
                price: price,
                img: img,
                qty: 1
            });
        }

        updateCart();
    };
});

function updateCart() {

    cartList.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {

        let item = cart[i];

        totalItems += item.qty;
        totalPrice += item.price * item.qty;

        let div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <div class="image">
                <img src="${item.img}">
            </div>
            <div class="name">${item.name}</div>
            <div class="totalprice">Rs.${item.price * item.qty}/-</div>
            <div class="quantity">
                <span class="minus" data-i="${i}"><</span>
                <span>${item.qty}</span>
                <span class="plus" data-i="${i}">></span>
            </div>
        `; 

        cartList.appendChild(div);
    }

    totalBox.innerText = "Rs." + totalPrice;


    if (totalItems > 0) {
        cartCount.style.visibility = "visible";
        cartCount.innerText = totalItems;
    } else {
        cartCount.style.visibility = "hidden";
    }

    changeQty();
}

function changeQty() {

    let plusBtns = document.querySelectorAll(".plus");
    let minusBtns = document.querySelectorAll(".minus");

    plusBtns.forEach(function (btn) {
        btn.onclick = function () {
            let i = btn.getAttribute("data-i");
            cart[i].qty++;
            updateCart();
        };
    });

    minusBtns.forEach(function (btn) {
        btn.onclick = function () {
            let i = btn.getAttribute("data-i");

            if (cart[i].qty > 1) {
                cart[i].qty--;
            } else {
                cart.splice(i, 1); 
            }

            updateCart();
        };
    });
}