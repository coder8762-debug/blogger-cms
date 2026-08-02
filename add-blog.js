const imageFile=document.getElementById("imageFile");
let editor;

class SupabaseUploadAdapter{

constructor(loader){

this.loader=loader;

}

async upload(){

const file=await this.loader.file;

const fileName=Date.now()+"-"+file.name;

const {error}=await window.db.storage
.from("blog-images")
.upload(fileName,file);

if(error){

throw error;

}

const {data}=window.db.storage
.from("blog-images")
.getPublicUrl(fileName);

return{

default:data.publicUrl

};

}

abort(){}

}

imageFile.addEventListener("change",uploadFeaturedImage);

async function uploadFeaturedImage(){

const file=imageFile.files[0];

if(!file) return;

const fileName=Date.now()+"-"+file.name;

const {error}=await window.db.storage

.from("blog-images")

.upload(fileName,file);

if(error){

alert(error.message);

return;

}

const {data}=window.db.storage

.from("blog-images")

.getPublicUrl(fileName);

document.getElementById("image").value=data.publicUrl;

document.getElementById("previewImage").src=data.publicUrl;

document.getElementById("previewImage").style.display="block";

document.getElementById("previewText").style.display="none";

}
document.addEventListener("DOMContentLoaded", async () => {

    // Check Login
    const { data } = await window.db.auth.getSession();

    if (!data.session) {
        window.location.href = "index.html";
        return;
    }

    const form = document.getElementById("blogForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const slug = document.getElementById("slug").value.trim();
        const author = document.getElementById("author").value.trim();
        const category = document.getElementById("category").value;
        const image = document.getElementById("image").value.trim();
        const description = document.getElementById("description").value.trim();
       const content = editor.getData();

        message.style.color = "black";
        message.innerText = "Publishing...";

        const { error } = await window.db
            .from("blogs")
            .insert([
                {
                    title,
                    slug,
                    author,
                    category,
                    image,
                    description,
                    content
                }
            ]);

        if (error) {
            console.error(error);

            message.style.color = "red";
            message.innerText = error.message;
            return;
        }

        message.style.color = "green";
        message.innerText = "Blog Published Successfully.";

        form.reset();

    });

});
