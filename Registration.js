const togglePassword =document.querySelector("#togglepassword");
const password = document.querySelector("#password");

  togglePassword.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  })

const toggleConfirmPassword = document.getElementById("toggleconfirmPassword")
const confirmpassword = document.querySelector("#confirmPassword");

  toggleConfirmPassword.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = confirmpassword.getAttribute("type") === "password" ? "text" : "password";
    confirmpassword.setAttribute("type", type);
  })


document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const phone = document.getElementById("phone").value;

  const genderInput = document.querySelector('input[type="radio"][name="gender"]:checked')
  const gender = genderInput ? genderInput.value : "";
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const skill = [...document.querySelectorAll(".skill:checked")].map(cb => cb.value);
  const otherSkill = document.getElementById("otherSkill").value;
  const terms = document.getElementById("terms").checked;
  const profilePic = document.getElementById("profilePic").files[0];

  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  errorSpan.classList.add("visible");
  
}

  function clearError(errorSpan) {
  errorSpan.textContent = "";
}
  
  if (!name || !email || !password || !dob || !address || !city || !gender) {
    alert("Please fill all required fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if(!emailRegex.test(email)){
    showError(email,"please enter a valid email");
    return;
  } else {
    clearError(email);
  }

  if(!/^\d{10}$/.test(phone)){
    alert("Phone number must be have 10 digits");
    return;
  }

  const age=getAge(dob);
  if(age<18){
    alert("you must be at least 18 year old");
    return;
  }

  if(address.length < 10){
    alert("Address must be 10 character long");
    return;
  }

  if(skill.length === 0 && !otherSkill){
    alert("please add atleast 1 skill");
    return;
  }

  if (!terms) {
    alert("Please accept the Terms and Conditions");
    return;
  }

  if (otherSkill) {
    skill.push(otherSkill);
  }

  function getAge(dobString) {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  
  const reader = new FileReader();
  reader.onload = function(e){
    const base64Image = e.target.result;
    const userData = {
      name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      city,
      skill,
      profilePic:base64Image
    };
  
  localStorage.setItem(email, JSON.stringify(userData));
  alert("Registered successfully!");
  window.location.href = "login.html";
  };

  const saveUser = (base64Image) => {
  const userData = {
    name, email, password, phone, gender, dob, address, city,
    skill: skill,
    profilePic: base64Image
  };
  localStorage.setItem(email, JSON.stringify(userData));
  alert("Registered successfully!");
  window.location.href = "login.html";
};

  if(profilePic){
    reader.readAsDataURL(profilePic);
  }else{
    saveUser("");
  }
});