// 1. Gerekli DOM elementlerini seçme
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// LocalStorage'da kullanacağımız anahtar kelime
const STORAGE_KEY = 'feedback-form-state';

// 2. Sayfa yüklendiğinde LocalStorage'ı kontrol edip formu doldurma
populateForm();

// 3. Formda her tuşa basıldığında (input olayı) verileri kaydetme
form.addEventListener('input', onFormInput);

// 4. Form gönderildiğinde (submit olayı) işlemleri yapma
form.addEventListener('submit', onFormSubmit);


// --- FONKSİYONLAR ---

function onFormInput(event) {
  // Mevcut form değerlerini alıp kenar boşluklarını temizliyoruz (.trim())
  const formData = {
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };

  // Objeyi JSON string formatına çevirip LocalStorage'a kaydediyoruz
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  // Sayfanın yenilenmesini engelliyoruz
  event.preventDefault();

  // Mentor Kriteri: Her iki alanın da doldurulduğunu kontrol et
  if (emailInput.value.trim() === '' || messageInput.value.trim() === '') {
    return alert('Lütfen tüm alanları doldurun!');
  }

  // Konsola gönderilecek son veriyi yazdırıyoruz
  const finalData = {
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };
  console.log(finalData);

  // Formu ve LocalStorage'ı temizliyoruz
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm() {
  // LocalStorage'dan veriyi çekiyoruz
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  // Eğer kaydedilmiş bir veri varsa (null değilse) işlemlere başla
  if (savedMessage) {
    // String halindeki JSON verisini tekrar JavaScript objesine çeviriyoruz
    const parsedData = JSON.parse(savedMessage);

    // Mentor Kriteri: 'undefined' yazılmasını engellemek için kontrol yapıyoruz
    // Eğer o alan daha önce doldurulmuşsa değerini, doldurulmamışsa boş string atıyoruz
    emailInput.value = parsedData.email || '';
    messageInput.value = parsedData.message || '';
  }
}""