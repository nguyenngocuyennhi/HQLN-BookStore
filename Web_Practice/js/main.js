// ======================================================
// TÌM KIẾM SẢN PHẨM + HIỆN HÌNH ẢNH
// ======================================================

function searchWebsite(e){

    e.preventDefault();

    // LẤY TỪ KHÓA
    let keyword =
        document.getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    // KIỂM TRA RỖNG
    if(keyword === ""){

        alert("Vui lòng nhập từ khóa!");

        return;
    }

    // LẤY TẤT CẢ SẢN PHẨM
    let products =
        document.querySelectorAll(".product-item");

    // BOX HIỂN THỊ KẾT QUẢ
    let resultBox =
        document.getElementById("searchResult");

    let html = "";

    let found = false;

    products.forEach((item)=>{

        // LẤY TÊN
        let name =
            item.querySelector(".product-name")
            .innerText
            .toLowerCase();

        // NẾU KHỚP
        if(name.includes(keyword)){

            found = true;

            // LẤY HÌNH
            let img =
                item.querySelector("img").src;

            // LẤY GIÁ
            let price =
                item.querySelector(".product-price")
                .innerText;

            // HTML
            html += `
            <div class="col-lg-3 col-md-4 col-6 mb-4">

                <div class="card h-100 shadow-sm">

                    <img
                    src="${img}"
                    class="card-img-top"
                    style="height:250px;
                    object-fit:cover;">

                    <div class="card-body text-center">

                        <h6>
                            ${name}
                        </h6>

                        <p class="text-danger fw-bold">
                            ${price}
                        </p>

                    </div>

                </div>

            </div>
            `;
        }

    });

    // KHÔNG TÌM THẤY
    if(!found){

        html = `
        <p class="text-center text-danger fw-bold">
            Không tìm thấy sản phẩm!
        </p>
        `;
    }

    // HIỂN THỊ
    resultBox.innerHTML = html;
}

// ======================================================
// GỌI FORM SEARCH
// ======================================================

let searchForm =
    document.getElementById("searchForm");

if(searchForm){

    searchForm.onsubmit =
        searchWebsite;
}

// ======================================================
// HÀM ĐĂNG KÝ
// ======================================================
function register(e){
    e.preventDefault();
    // LẤY DỮ LIỆU
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let fullname = document.getElementById("fullname").value.trim();
    let birthday = document.getElementById("birthday").value;
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    // REGEX
    let regexEmail =/^\S+@\S+\.\S+$/;
    let regexPhone =/^[0-9]{10}$/;
    let regexName =/^[A-Za-zÀ-ỹ\s]+$/;
    // KIỂM TRA RỖNG
    if(
        username === "" ||
        password === "" ||
        fullname === "" ||
        birthday === "" ||
        email === "" ||
        phone === ""
    ){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    // GIỚI TÍNH
    if(!gender){
        alert("Vui lòng chọn giới tính!");
        return;
    }
    // HỌ TÊN
    if(!regexName.test(fullname)){
        alert("Họ tên không hợp lệ!");
        return;
    }
    // USERNAME
    if(username.length < 3){
        alert("Tên đăng nhập phải từ 3 ký tự!");
        return;

    }
    // PASSWORD
    if(password.length < 6){
        alert("Mật khẩu phải từ 6 ký tự!");
        return;
    }
    // EMAIL
    if(!regexEmail.test(email)){
        alert("Email không hợp lệ!");
        return;
    }
    // PHONE
    if(!regexPhone.test(phone)){
        alert("Số điện thoại phải gồm 10 số!");
        return;
    }
    // KIỂM TRA TÀI KHOẢN
    let oldUser = JSON.parse(localStorage.getItem("user"));
    if(oldUser){
        if(
            oldUser.username === username ||
            oldUser.email === email
        ){
            alert("Tài khoản này đã được đăng ký!");
            return;
        }
    }
    // TẠO USER
    let user = {
        username : username,
        password : password,
        fullname : fullname,
        birthday : birthday,
        gender : gender.value,
        email : email,
        phone : phone
    };
    // LƯU
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
    alert("Đăng ký thành công!");
    window.location.href = "DangNhap.html";
}
// GỌI HÀM REGISTER
let registerForm = document.getElementById("registerForm");
if(registerForm){ registerForm.onsubmit = register;
}

// ======================================================
// HÀM ĐĂNG NHẬP
// ======================================================
function login(e){
    e.preventDefault();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("loginPass").value.trim();
    // KIỂM TRA RỖNG
    if(username === "" || password === ""){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    // LẤY USER
    let user = JSON.parse(localStorage.getItem("user"));
    // CHƯA CÓ USER
    if(!user){
        alert("Chưa có tài khoản!");
        return;
    }
    // KIỂM TRA LOGIN
    if(
        username === user.username &&
        password === user.password
    ){
        alert("Đăng nhập thành công!");
        localStorage.setItem(
            "loginUser",
            user.username
        );
        window.location.href = "index.html";
    }
    else{
        alert("Sai tài khoản hoặc mật khẩu!");
    }
}

// GỌI HÀM LOGIN
let loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.onsubmit = login;
}
// QUÊN MẬT KHẨU
function forgotPassword(e){
    e.preventDefault();
    let oldBox = document.getElementById("forgotBox");
    // NẾU ĐÃ CÓ MẬT KHẨU
    if(oldBox){
        oldBox.remove();
        return;
    }
    // TẠO BOX
    let box = document.createElement("div");
    box.id = "forgotBox";
    box.className = "text-center mt-4";
    box.innerHTML = `
        <div class="border rounded p-4 bg-light">
            <h5 class="mb-3"> Khôi phục mật khẩu </h5>
            <input type="text" id="recoverInput" class="form-control mb-3" placeholder="Nhập email hoặc số điện thoại">
            <button class="btn btn-warning" onclick="recoverPassword()">Xác nhận</button>
        </div>
    `;
    let loginBox = document.querySelector(".login-box");
    if(loginBox){
        loginBox.appendChild(box);
    }
}

// ======================================================
// KHÔI PHỤC MẬT KHẨU
// ======================================================
function recoverPassword(){
    let input = document.getElementById("recoverInput").value.trim();
    if(input === ""){
        alert("Vui lòng nhập email hoặc số điện thoại!");
        return;
    }
    let user = JSON.parse(localStorage.getItem("user"));
    if(!user){ alert("Chưa có tài khoản!");
        return;
    }
    if(
        input === user.email ||
        input === user.phone
    ){
        alert(
            "Mật khẩu của bạn là: " +
            user.password
        );

    }
    else{
        alert("Thông tin không đúng!");
    }
}
// NÚT QUÊN MẬT KHẨU
let forgotBtn = document.getElementById("forgotBtn");
if(forgotBtn){
    forgotBtn.onclick = forgotPassword;
}
// HIỂN THỊ USER
function showUser(){
    let loginUser = localStorage.getItem("loginUser");
    let userName = document.getElementById("userName");
    if(loginUser && userName){
        userName.innerText = loginUser;
    }
}

// ======================================================
// ĐĂNG XUẤT
// ======================================================
function logout(){
    localStorage.removeItem("loginUser");
    location.reload();
}

// ======================================================
// THÊM GIỎ HÀNG
// ======================================================
function addToCart(name, price, img){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = false;
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    if(!found){
        cart.push({
            name : name,
            price : price,
            img : img,
            quantity : 1,
            checked : true
        });
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    alert("Đã thêm vào giỏ hàng!");

}

// ======================================================
// MUA NGAY
// ======================================================
function buyNow(name, price, img){
    let cart = [
        {
            name : name,
            price : price,
            img : img,
            quantity : 1,
            checked : true
        }

    ];
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    window.location.href ="ThanhToan.html";

}

// ======================================================
// HIỂN THỊ GIỎ HÀNG
// ======================================================
function renderCart(){
    let cart = JSON.parse(localStorage.getItem("cart"))|| [];
    let html = "";
    let subtotal = 0;
    cart.forEach((item, i)=>{
        if(item.checked === undefined){
            item.checked = true;
        }
        let qty = item.quantity;
        let total = item.price * qty;
        if(item.checked){
            subtotal += total;
        }
        html += `
        <tr>
            <td>
                <input type="checkbox" ${item.checked ? "checked" : ""} onchange="toggleCheck(${i})">
            </td>
            <td>
                <img src="${item.img}" width="60">
            </td>
            <td>${item.name}</td>
            <td>
                ${item.price.toLocaleString()}đ
            </td>
            <td>
                <button onclick="decreaseQty(${i})">
                    ➖
                </button>
                ${qty}
                <button onclick="increaseQty(${i})">
                    ➕
                </button>
            </td>
            <td>
                ${total.toLocaleString()}đ
            </td>
            <td>
                <button onclick="deleteItem(${i})">
                    ❌
                </button>
            </td>
        </tr>
        `;
    });
    let cartBox = document.getElementById("cart");
    if(cartBox){
        cartBox.innerHTML = html;
    }
    // SHIP
    let area = document.getElementById("area")?.value;
    let speed = document.getElementById("speed")?.value;
    let ship = 0;
    if(area === "city"){
        ship = 10000;
    }
    else if(area === "near"){
        ship = 20000;
    }
    else if(area === "far"){
        ship = 30000;
    }
    // GIAO NHANH
    if(speed === "fast"){
        ship += 10000;
    }
    // FREESHIP
    if(subtotal >= 500000){
        ship = 0;
    }
    let finalTotal = subtotal + ship;
    let subtotalBox = document.getElementById("subtotal");
    if(subtotalBox){
        subtotalBox.innerText = subtotal.toLocaleString() + "đ";

    }
    let shipBox = document.getElementById("ship");
    if(shipBox){
        shipBox.innerText = ship.toLocaleString() + "đ";
    }
    let totalBox = document.getElementById("total");
    if(totalBox){
        totalBox.innerText = finalTotal.toLocaleString() + "đ";
    }
    // LƯU
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    localStorage.setItem(
        "summary",
        JSON.stringify({
            subtotal : subtotal,
            ship : ship,
            total : finalTotal,
            area : area,
            speed : speed
        })
    );
}

// ======================================================
// TÍCH CHỌN
// ======================================================
function toggleCheck(i){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[i].checked = !cart[i].checked;
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();

}

// ======================================================
// TĂNG SL
// ======================================================
function increaseQty(i){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[i].quantity++;
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();
}

// ======================================================
// GIẢM SL
// ======================================================
function decreaseQty(i){
    let cart = JSON.parse(localStorage.getItem("cart"))|| [];
    if(cart[i].quantity > 1){
        cart[i].quantity--;
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();

}

// ======================================================
// XÓA SP
// ======================================================
function deleteItem(i){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i, 1);
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    renderCart();
}

// ======================================================
// CHUYỂN TRANG THANH TOÁN
// ======================================================
function goCheckout(){
    //LẤY DỮ LIỆU TỪ GIỎ HÀNG
    renderCart();
    window.location.href ="ThanhToan.html";

}

// ======================================================
// HIỂN THỊ CHECKOUT
// ======================================================
function renderCheckout(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let summary = JSON.parse(localStorage.getItem("summary")) || {};
    let html = "";
    let subtotal = 0;
    cart.forEach((item)=>{
        if(item.checked !== false){
            let total = item.price * item.quantity;
            subtotal += total;
            html += `
            <div class="d-flex align-items-center mb-3 border-bottom pb-3">
                <img src="${item.img}" width="70" class="me-3 rounded">
                <div class="flex-grow-1">
                    <h6 class="mb-1">
                        ${item.name}
                    </h6>
                    <p class="mb-1">
                        SL: ${item.quantity}
                    </p>
                    <span class="fw-bold text-danger">
                        ${total.toLocaleString()}đ
                    </span>
                </div>
            </div>
            `;
        }
    });
    let ship = summary.ship || 0;
    // GIẢM GIÁ
    let discount = 0;
    if(subtotal >= 500000){
        discount += 20000;
    }
    else if(subtotal >= 300000){
        discount += 10000;
    }
    else if(subtotal >= 100000){
        discount += 5000;
    }
    // PAYMENT
    let pay = document.querySelector('input[name="pay"]:checked');
    if(pay){
        if(pay.value !== "cod"){
            discount += 10000;
        }
    }
    let finalTotal = subtotal + ship - discount;
    if(finalTotal < 0){
        finalTotal = 0;
    }
    let productList = document.getElementById("productList");
    if(productList){
        productList.innerHTML = html;
    }
    let subtotalBox = document.getElementById("subtotal");
    if(subtotalBox){
        subtotalBox.innerText = subtotal.toLocaleString() + "đ";
    }
    let shipBox = document.getElementById("ship");
    if(shipBox){
        shipBox.innerText =  ship.toLocaleString() + "đ";

    }
    let discountBox = document.getElementById("discount");
    if(discountBox){
        discountBox.innerText ="-" + discount.toLocaleString() + "đ";
    }
    let grandTotal = document.getElementById("grandTotal");
    if(grandTotal){
        grandTotal.innerText = finalTotal.toLocaleString() + "đ";
    }

}

// ======================================================
// ĐẶT HÀNG
// ======================================================
function checkout(){
    let fullname = document.getElementById("fullname").value.trim();

    let phone = document.getElementById("phone").value.trim();

    let email = document.getElementById("email").value.trim();

    let address = document.getElementById("address").value.trim();
    let pay = document.querySelector( 'input[name="pay"]:checked');
    let regexEmail = /^\S+@\S+\.\S+$/;
    let regexPhone = /^[0-9]{10}$/;
    if(
        fullname === "" ||
        phone === "" ||
        email === "" ||
        address === ""
    ){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if(!regexEmail.test(email)){
        alert("Email không hợp lệ!");
        return;
    }
    if(!regexPhone.test(phone)){
        alert("Số điện thoại không hợp lệ!");
        return;
    }
    if(!pay){
        alert("Vui lòng chọn phương thức thanh toán!");
        return;
    }
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    window.location.href ="index.html";

}

// ======================================================
// REFRESH
// ======================================================
function refreshPageData(){
    if(document.getElementById("cart")){
        renderCart();
    }
    if(document.getElementById("productList")){
        renderCheckout();
    }
}

// ======================================================
// LOAD
// ======================================================
document.addEventListener(
    "DOMContentLoaded",
    function(){
        showUser();
        refreshPageData();
        let payMethods = document.querySelectorAll('input[name="pay"]');
        payMethods.forEach((item)=>{
            item.onchange = renderCheckout;
        });
    }
);