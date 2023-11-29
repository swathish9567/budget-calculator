function signup() {
    window.location = './signup.html'
   }
   function registeruser() {
    let regdet = {
        uname: uname.value,
        email: email.value,
        pswd: pswd.value
    };
   
    if (regdet.uname === "" || regdet.pswd === "" || regdet.email === "") {
        alert("Please fill all fields");
    } else {
        if (regdet.uname in localStorage) {
            alert("User already exists");
            document.getElementById("regform").reset();
        } else {
            localStorage.setItem(regdet.uname, JSON.stringify(regdet));
            alert("User Details Successfully Added");
            window.location = './index.html';
        }
    }
   }
   
   // Function for login
   function login() {
    let uname = document.getElementById("uname").value;
    let pass = document.getElementById("pswd").value;
   
    if (uname === "" || pass === "") {
        alert("Please enter username and password");
    } else {
        // Check if user details exist
        if (uname in localStorage) {
            let regdetails = JSON.parse(localStorage.getItem(uname));
            if (pass === regdetails.pswd) {
                localStorage.setItem('loggedobj',JSON.stringify(regdetails))
                localStorage.setItem('loggedkey',uname)
                alert("Login successful");
                window.location = './home.html';
            } else {
                alert("Invalid username or password");
            }
        } else {
            alert("User does not exists");
        }
    }
   }