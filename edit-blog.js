const id = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", async () => {

    const { data: session } = await window.db.auth.getSession();

    if (!session.session) {
        location.href = "index.html";
        return;
    }

    loadBlog();

});

async function loadBlog() {

    const { data, error } = await window.db
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    title.value = data.title;
    slug.value = data.slug;
    author.value = data.author;
    category.value = data.category;
    image.value = data.image;
    description.value = data.description;
    content.value = data.content;

}

editForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const { error } = await window.db
        .from("blogs")
        .update({

            title:title.value,
            slug:slug.value,
            author:author.value,
            category:category.value,
            image:image.value,
            description:description.value,
            content:content.value

        })
        .eq("id",id);

    if(error){

        message.style.color="red";
        message.innerHTML=error.message;
        return;

    }

    message.style.color="green";
    message.innerHTML="Blog Updated Successfully";

});
