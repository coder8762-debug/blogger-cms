document.addEventListener("DOMContentLoaded", async () => {

    // Check Login Session
    const { data, error } = await window.db.auth.getSession();

    if (!data.session) {
        window.location.href = "index.html";
        return;
    }

    // Show Logged-in Email
    document.getElementById("adminEmail").innerText =
        data.session.user.email;

    // Total Blogs
    const { count } = await window.db
        .from("blogs")
        .select("*", { count: "exact", head: true });

    document.getElementById("totalBlogs").innerText = count ?? 0;

});


// Logout

document.getElementById("logoutBtn").addEventListener("click", async () => {

    await window.db.auth.signOut();

    window.location.href = "index.html";

});
