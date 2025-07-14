const email = localStorage.getItem("loggedInUser");
if (!email){
  alert("you must login first");
  window.location.href = "login.html";
}

const user = JSON.parse(localStorage.getItem(email));
document.getElementById("userName").textContent = user.name;
document.getElementById("userEmail").textContent = user.email;
document.getElementById("userPhone").textContent = user.phone;
document.getElementById("userGender").textContent = user.gender;
document.getElementById("userDob").textContent = user.dob;
document.getElementById("userAddress").textContent = user.address;
document.getElementById("userCity").textContent = user.city;
document.getElementById("userSkills").textContent = user.skill.join(", ");

if(user.profilePic){
  document.getElementById("userpic").src = user.profilePic;
}


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});
