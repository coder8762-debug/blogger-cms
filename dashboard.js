import { supabase } from "./supabase.js";


const adminEmail = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutBtn");


// Check Login

const { data } = await supabase.auth.getSession();


if(!data.session){

    window.location.href = "login.html";

}
else{

    adminEmail.innerText = data.session.user.email;

}



// Logout

logoutBtn.addEventListener("click", async()=>{


    await supabase.auth.signOut();

    window.location.href="login.html";


});
