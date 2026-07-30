import { supabase } from "./supabase.js";


const saveBtn = document.getElementById("saveBtn");


saveBtn.addEventListener("click", async()=>{


const title = document.getElementById("title").value;
const slug = document.getElementById("slug").value;
const content = document.getElementById("content").value;
const image = document.getElementById("image").value;



const {error} = await supabase
.from("blogs")
.insert([
{
title:title,
slug:slug,
content:content,
image_url:image
}
]);


if(error){

alert(error.message);

}
else{

alert("Blog Saved Successfully!");

window.location.href="dashboard.html";

}


});
