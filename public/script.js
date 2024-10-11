// Tampilan Popup
  window.onload = function() {
    const popup = document.getElementById('popup');
    const popupBackdrop = document.getElementById('popup-backdrop');

    // Full Kode Di Github Saya : https://github.com/Lenwyy/

    // Animasi 
    setTimeout(() => {
      popup.classList.add('active');
      popupBackdrop.classList.add('active');
    }, 100); // Delay Animasi
  };

  // Tombol X
  document.getElementById('close-popup').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    const popupBackdrop = document.getElementById('popup-backdrop');

    // Tutup Popup
    popup.classList.remove('active');
    popupBackdrop.classList.remove('active');
  });


// Full Kode Di Github Saya : https://github.com/Lenwyy/

// Full Kode Di Github Saya : https://github.com/Lenwyy/

// Copy Dari Tag Pre
function copyToClipboard() {
var textToCopy = document.getElementById('codeBlock').innerText;
navigator.clipboard.writeText(textToCopy).then(function() {

    var popup = document.getElementById('copyPopup');
    popup.classList.add('show');
    popup.classList.remove('hide');

    setTimeout(function() {
        popup.classList.add('hide');
        popup.classList.remove('show');
    }, 2000);
}, function(err) {
    console.error('Gagal menyalin teks:', err);
});
}

// Event Tombol Copy
document.getElementById('copyButton').addEventListener('click', copyToClipboard);


  // Animasi Folder
function toggleFolder(folderId, folderElement) {
  const folder = document.getElementById(folderId);
  const icon = folderElement.querySelector('.icon');

  if (folder.classList.contains('open')) {
    folder.classList.remove('open');
    icon.classList.remove('rotated');
  } else {
    folder.classList.add('open');
    icon.classList.add('rotated');
  }
}

document.addEventListener('DOMContentLoaded', function() {

  // Full Kode Di Github Saya : https://github.com/Lenwyy/

  // Update Waktu
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('jam').textContent = timeString;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // Update Tanggal
  function updateDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateString = `${day}-${month}-${year}`;
    document.getElementById('tanggal').textContent = dateString;
  }
  updateDate();
});