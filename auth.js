
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        message.innerHTML = "Please wait...";

        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                message.style.color = "red";
                message.innerHTML = error.message;
                return;
            }

            message.style.color = "green";
            message.innerHTML = "Login Successful";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } catch (err) {

            console.error(err);

            message.style.color = "red";
            message.innerHTML = err.message;

        }

    });

});
