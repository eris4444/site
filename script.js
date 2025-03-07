// تابع برای بارگذاری محصولات از فایل JSON
async function loadProducts() {
    const response = await fetch('products.json');
    const products = await response.json();
    const productList = document.querySelector('.product-list');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;
        productDiv.addEventListener('click', () => showProductDetail(product));
        productList.appendChild(productDiv);
    });
}

// تابع برای نمایش جزئیات محصول
function showProductDetail(product) {
    const detailSection = document.getElementById('product-detail');
    document.getElementById('detail-image').src = product.image;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-description').textContent = product.description;
    document.getElementById('detail-price').textContent = product.price;
    detailSection.style.display = 'flex';
}

// تابع برای بستن بخش جزئیات محصول
document.getElementById('close-detail').addEventListener('click', () => {
    document.getElementById('product-detail').style.display = 'none';
});

// تابع برای سفارش از طریق واتساپ
function orderOnWhatsApp() {
    const productName = document.getElementById('detail-name').textContent;
    const phoneNumber = "989123456789"; // شماره واتساپ شما
    const message = `سلام، من می‌خوام محصول "${productName}" رو سفارش بدم.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// بارگذاری محصولات هنگام لود صفحه
window.onload = loadProducts;
