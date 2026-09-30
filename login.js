// ========================================
// FORM LOGIN
// ========================================

const formLogin =
    document.getElementById("form-login");


const pesanLogin =
    document.getElementById("pesan-login");


// ========================================
// LOGIN
// ========================================

formLogin.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document.getElementById(
                "username"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        // Username dan password
        const usernameBenar =
            "lutfhi";


        const passwordBenar =
            "12345";


        // ========================================
        // CEK LOGIN
        // ========================================

        if (
            username === usernameBenar &&
            password === passwordBenar
        ) {


            // Simpan status login

            localStorage.setItem(
                "sudahLogin",
                "true"
            );


            alert(
                "Login berhasil!"
            );


            // Masuk ke toko

            window.location.href =
                "index.html";

        }

        else {


            pesanLogin.textContent =
                "Username atau password salah!";


            pesanLogin.style.color =
                "red";

        }

    }
);