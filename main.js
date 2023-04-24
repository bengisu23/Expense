const harcamaInput = document.querySelector("#form-harcama");
const fiyatInput = document.querySelector("#form-fiyat");
const formBtn = document.querySelector(".ekle-btn");

const liste = document.querySelector("#liste");
const toplamSpan = document.querySelector("#toplam-bilgi");
const durumInput = document.querySelector("#durum");

const nameInput = document.querySelector("#name-input");

const selectInput = document.querySelector("select");

// butonu izleme
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectInput.addEventListener("change", handleFilter);

// toplamın statei
let toplam = 0;

// toplamı kısmını güncelleme

function updateToplam(e) {
  toplam += Number(e);
  toplamSpan.innerText = toplam;
}

// harcama oluşturma------------------------------
function addExpense(e) {
  e.preventDefault();
  // doğrulama yapma
  if (!harcamaInput.value && !fiyatInput.value) return;

  // div oluşturma
  const harcamaDiv = document.createElement("div");
  // class ekleme
  harcamaDiv.classList.add("harcama");

  // eğer ödendiyse yeni klas verme
  if (durumInput.checked) {
    harcamaDiv.classList.add("odendi");
  }

  //  içeriği belirleme
  harcamaDiv.innerHTML = `
           <h2 class="harcama-title">${harcamaInput.value}</h2>
            <h2 class="harcama-fiyat">${fiyatInput.value}</h2>
            <div class="harcama-buttons">
                <img  id="payment" src="images/creditcard.png">
                <img id="remove"  src="images/delete.png">
            </div>
    `;
  //   oluşan elemana htmle yönledndirme
  liste.appendChild(harcamaDiv);

  //   toplamı güncelleme
  updateToplam(fiyatInput.value);

  //   inputları sıfırlama
  harcamaInput.value = "";
  fiyatInput.value = "";
  durumInput.checked = false;
}

// SİLMA ve EDIT İŞLEMİ

function handleClick(e) {
  // tıklanılan eleman
  const eleman = e.target;

  // eğer tıklanannın idsi remove ise sil
  if (eleman.id === "remove") {
    const kapsayıcıEleman = eleman.parentElement.parentElement;

    // silenecek elemana animasyon ekleme
    kapsayıcıEleman.classList.add("fall");

    // animasyonun bitşini bekleme
    kapsayıcıEleman.addEventListener("transitionend", () => {
      kapsayıcıEleman.remove();
    });

    // toplam biligisini güncelleme
    const fiyat = +kapsayıcıEleman.querySelector(".harcama-fiyat").innerText;
    toplam -= fiyat;
    toplamSpan.innerText = toplam;
  }

  // eğer tıklanannın idsi payment ise güncelle
  if (eleman.id === "payment") {
    const kapsayıcıEleman = eleman.parentElement.parentElement;

    kapsayıcıEleman.classList.toggle("odendi");
  }
}

//Kullanıcı adı kayıt etme

nameInput.addEventListener("change", () => {
  localStorage.setItem("username", e.target.value);
});

const username = localStorage.getItem("username");

nameInput.value = username;

//Filtreleme alanı-------------------------

function handleFilter(e) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
        case 'Hepsi':
          item.style.display = 'flex';
          break;
  
        case 'Ödendi':
          if (item.classList.contains('odendi')) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
          break;
  
        case 'Ödenmedi':
          // kodlar
          if (!item.classList.contains('odendi')) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
          break;
    }
  });
}
