document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("لطفاً تمامی فیلدها را پر کنید.");
            return;
        }

        alert("پیام شما با موفقیت ارسال شد!");
        form.reset();
    });
});