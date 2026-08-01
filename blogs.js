document.addEventListener("DOMContentLoaded", async () => {

    const { data } = await window.db.auth.getSession();

    if (!data.session) {

        location.href = "index.html";
        return;

    }

    loadBlogs();

});

async function loadBlogs() {

    const { data, error } = await window.db
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.log(error);
        return;

    }

    const table = document.getElementById("blogTable");

    table.innerHTML = "";

    data.forEach(blog => {

        table.innerHTML += `

<tr>

<td>${blog.title}</td>

<td>${blog.category}</td>

<td>${blog.author}</td>

<td>${new Date(blog.created_at).toLocaleDateString()}</td>

<td>

<button class="view">View</button>

<button
class="edit"
onclick="location.href='edit-blog.html?id=${blog.id}'">

Edit

</button>

<button
class="delete"
onclick="deleteBlog(${blog.id})">

Delete

</button>

</td>

</tr>

`;

    });

}

async function deleteBlog(id){

    if(!confirm("Delete this blog?")) return;

    const { error } = await window.db
        .from("blogs")
        .delete()
        .eq("id",id);

    if(error){

        alert(error.message);
        return;

    }

    loadBlogs();

}
