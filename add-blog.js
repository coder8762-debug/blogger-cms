// ======================================
// GLOBAL VARIABLES
// ======================================

let editor;

const form = document.getElementById("blogForm");

const message = document.getElementById("message");

const imageFile = document.getElementById("imageFile");

const imageInput = document.getElementById("image");

const previewImage = document.getElementById("previewImage");

const previewText = document.getElementById("previewText");

// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", async () => {

    // Check Login

    const { data } = await window.db.auth.getSession();

    if (!data.session) {

        location.href = "index.html";

        return;

    }

    // Initialize CKEditor

    initEditor();

    // Auto Slug

    document.getElementById("title")

    .addEventListener("input", generateSlug);

    // SEO Counter

    document.getElementById("metaTitle")

    .addEventListener("input", updateMetaTitleCounter);

    document.getElementById("metaDescription")

    .addEventListener("input", updateMetaDescriptionCounter);

    // Featured Image Upload

    imageFile.addEventListener("change", uploadFeaturedImage);

    // Publish

    form.addEventListener("submit", publishBlog);

});

// ======================================
// CKEDITOR
// ======================================

async function initEditor(){

editor = await ClassicEditor.create(

document.querySelector("#content"),

{

toolbar:[

'heading',

'|',

'bold',

'italic',

'link',

'bulletedList',

'numberedList',

'blockQuote',

'insertTable',

'undo',

'redo'

]

}

);

}

// ======================================
// AUTO SLUG
// ======================================

function generateSlug(){

const title=document.getElementById("title").value;

document.getElementById("slug").value=

title

.toLowerCase()

.trim()

.replace(/[^a-z0-9 ]/g,"")

.replace(/\s+/g,"-");

}

// ======================================
// SEO COUNTERS
// ======================================

function updateMetaTitleCounter(){

const value=document.getElementById("metaTitle").value.length;

document.getElementById("metaTitleCount").innerText=

value+" / 60";

}

function updateMetaDescriptionCounter(){

const value=document.getElementById("metaDescription").value.length;

document.getElementById("metaDescCount").innerText=

value+" / 160";

}
// ======================================
// FEATURED IMAGE UPLOAD
// ======================================

async function uploadFeaturedImage() {

    const file = imageFile.files[0];

    if (!file) return;

    message.style.color = "#2563eb";
    message.innerText = "Uploading image...";

    const fileName = Date.now() + "-" + file.name.replace(/\s+/g, "-");

    const { error } = await window.db.storage
        .from("blog-images")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        });

    if (error) {

        console.error(error);

        message.style.color = "red";
        message.innerText = error.message;

        return;

    }

    const { data } = window.db.storage
        .from("blog-images")
        .getPublicUrl(fileName);

    imageInput.value = data.publicUrl;

    previewImage.src = data.publicUrl;

    previewImage.style.display = "block";

    previewText.style.display = "none";

    message.style.color = "green";

    message.innerText = "Featured image uploaded.";

}

// ======================================
// IMAGE PREVIEW RESET
// ======================================

function resetPreview(){

    imageInput.value="";

    previewImage.src="";

    previewImage.style.display="none";

    previewText.style.display="block";

}

// ======================================
// RESET FORM
// ======================================

function clearForm(){

    form.reset();

    resetPreview();

    if(editor){

        editor.setData("");

    }

    document.getElementById("metaTitleCount").innerText="0 / 60";

    document.getElementById("metaDescCount").innerText="0 / 160";

}
// ======================================
// PUBLISH BLOG
// ======================================

async function publishBlog(e){

    e.preventDefault();

    const title=document.getElementById("title").value.trim();

    const slug=document.getElementById("slug").value.trim();

    const author=document.getElementById("author").value.trim();

    const category=document.getElementById("category").value;

    const description=document.getElementById("description").value.trim();

    const image=imageInput.value;

    const content=editor.getData();

    const metaTitle=document.getElementById("metaTitle").value.trim();

    const metaDescription=document.getElementById("metaDescription").value.trim();

    const focusKeyword=document.getElementById("focusKeyword").value.trim();

    const canonical=document.getElementById("canonical").value.trim();

    const status=document.getElementById("status").value;

    const featured=document.getElementById("featured").checked;

    const comments=document.getElementById("comments").checked;

    if(title===""){

        alert("Enter Blog Title");

        return;

    }

    if(content===""){

        alert("Write Blog Content");

        return;

    }

    message.style.color="#2563eb";

    message.innerText="Publishing...";

    const {error}=await window.db

    .from("blogs")

    .insert([{

        title,

        slug,

        author,

        category,

        image,

        description,

        content,

        meta_title:metaTitle,

        meta_description:metaDescription,

        focus_keyword:focusKeyword,

        canonical,

        status,

        featured,

        comments

    }]);

    if(error){

        console.error(error);

        message.style.color="red";

        message.innerText=error.message;

        return;

    }

    message.style.color="green";

    message.innerText="Blog Published Successfully.";

    clearForm();

}
