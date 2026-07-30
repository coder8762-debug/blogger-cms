import { supabase } from "./supabase.js";


// Elements

const adminEmail = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutBtn");
const totalBlogs = document.getElementById("totalBlogs");



// Check User Login

const { data } = await supabase.auth.getSession();


if(!data.session){

    window.location.href = "login.html";

}
else{

    adminEmail.innerText = data.session.user.email;

}



// Get Total Blogs Count

async function loadBlogCount(){


    const { count, error } = await supabase
    .from("blogs")
    .select("*", { count:"exact", head:true });



    if(error){

        console.log(error.message);

    }
    else{

        totalBlogs.innerText = count;

    }


}



loadBlogCount();




// Logout

logoutBtn.addEventListener("click", async()=>{


    await supabase.auth.signOut();

    window.location.href="login.html";


});
