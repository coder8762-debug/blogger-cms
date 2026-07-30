document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        message.style.color = "black";
        message.innerText = "Signing in...";

        const { data, error } = await window.db.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            message.style.color = "red";
            message.innerText = error.message;
            return;
        }

        message.style.color = "green";
        message.innerText = "Login Successful";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    });

});
