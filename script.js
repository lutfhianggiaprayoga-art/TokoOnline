// ========================================
// CEK LOGIN
// ========================================

if (localStorage.getItem("sudahLogin") !== "true") {
    window.location.href = "login.html";
}


// ========================================
// DATA KERANJANG
// ========================================

let keranjang = [];


// ========================================
// AMBIL ELEMENT HTML
// ========================================

const tombolBeli =
    document.querySelectorAll(".produk-card button");

const isiKeranjang =
    document.getElementById("isi-keranjang");

const totalHarga =
    document.getElementById("total-harga");

const jumlahKeranjang =
    document.getElementById("jumlah-keranjang");

const tombolCheckout =
    document.getElementById("checkout");

const tombolLogout =
    document.getElementById("logout");


// ========================================
// FORMAT RUPIAH
// ========================================

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);

}


// ========================================
// TOMBOL BELI
// ========================================

tombolBeli.forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".produk-card");

        const nama =
            card.querySelector("h3")
            .textContent
            .trim();

        const hargaText =
            card.querySelector("h4")
            .textContent
            .trim();

        const harga =
            parseInt(
                hargaText.replace(/\D/g, ""),
                10
            );

        const produkAda =
            keranjang.find(function(item) {
                return item.nama === nama;
            });

        if (produkAda) {
            produkAda.jumlah++;
        }

        else {

            keranjang.push({
                nama: nama,
                harga: harga,
                jumlah: 1
            });

        }

        tampilkanKeranjang();

        alert(
            nama +
            " berhasil ditambahkan ke keranjang!"
        );

    });

});


// ========================================
// TAMPILKAN KERANJANG
// ========================================

function tampilkanKeranjang() {

    isiKeranjang.innerHTML = "";

    if (keranjang.length === 0) {

        isiKeranjang.innerHTML = `
            <p>
                Keranjang masih kosong.
            </p>
        `;

        totalHarga.textContent = "Rp0";

        jumlahKeranjang.textContent = "0";

        return;
    }

    let total = 0;
    let jumlah = 0;

    keranjang.forEach(function(item, index) {

        const subtotal =
            item.harga * item.jumlah;

        total += subtotal;
        jumlah += item.jumlah;

        const itemHTML =
            document.createElement("div");

        itemHTML.classList.add(
            "item-keranjang"
        );

        itemHTML.innerHTML = `

            <div>

                <strong>
                    ${item.nama}
                </strong>

                <p>
                    ${formatRupiah(item.harga)}
                </p>

            </div>

            <div>

                <button
                    onclick="kurangiJumlah(${index})"
                >
                    −
                </button>

                <span>
                    ${item.jumlah}
                </span>

                <button
                    onclick="tambahJumlah(${index})"
                >
                    +
                </button>

                <button
                    onclick="hapusProduk(${index})"
                >
                    🗑️
                </button>

            </div>

        `;

        isiKeranjang.appendChild(itemHTML);

    });

    totalHarga.textContent =
        formatRupiah(total);

    jumlahKeranjang.textContent =
        jumlah;

}


// ========================================
// TAMBAH JUMLAH
// ========================================

function tambahJumlah(index) {

    keranjang[index].jumlah++;

    tampilkanKeranjang();

}


// ========================================
// KURANGI JUMLAH
// ========================================

function kurangiJumlah(index) {

    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {

        keranjang.splice(index, 1);

    }

    tampilkanKeranjang();

}


// ========================================
// HAPUS PRODUK
// ========================================

function hapusProduk(index) {

    keranjang.splice(index, 1);

    tampilkanKeranjang();

}


// ========================================
// CHECKOUT
// ========================================

tombolCheckout.addEventListener(
    "click",
    function() {

        if (keranjang.length === 0) {

            alert(
                "Keranjang masih kosong!"
            );

            return;
        }

        let pesan =
            "Halo, saya ingin membeli:%0A%0A";

        let total = 0;

        keranjang.forEach(function(item) {

            const subtotal =
                item.harga *
                item.jumlah;

            total += subtotal;

            pesan +=
                item.nama +
                " x" +
                item.jumlah +
                " = " +
                formatRupiah(subtotal) +
                "%0A";

        });

        pesan +=
            "%0ATotal: " +
            formatRupiah(total);

        const nomorWhatsApp =
            "6285742343058";

        window.open(
            "https://wa.me/" +
            nomorWhatsApp +
            "?text=" +
            pesan,
            "_blank"
        );

    }
);


// ========================================
// LOGOUT
// ========================================

tombolLogout.addEventListener(
    "click",
    function() {

        const konfirmasi =
            confirm(
                "Apakah kamu yakin ingin logout?"
            );

        if (konfirmasi) {

            localStorage.removeItem(
                "sudahLogin"
            );

            window.location.href =
                "login.html";

        }

    }
);


// ========================================
// TAMPILKAN KERANJANG AWAL
// ========================================

tampilkanKeranjang();


// ========================================
// EFEK SALJU ❄️
// ========================================

const jumlahSalju = 50;

for (let i = 0; i < jumlahSalju; i++) {

    const salju =
        document.createElement("div");

    salju.className = "salju";

    salju.innerHTML = "❄";

    salju.style.left =
        Math.random() * 100 + "vw";

    salju.style.fontSize =
        (Math.random() * 12 + 10) + "px";

    salju.style.animationDuration =
        (Math.random() * 7 + 6) + "s";

    salju.style.animationDelay =
        Math.random() * 8 + "s";

    salju.style.opacity =
        Math.random() * 0.6 + 0.4;

    document.body.appendChild(salju);

}