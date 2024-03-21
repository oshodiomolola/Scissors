document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.querySelector('generateBtn');
  const qrText = document.querySelector('qrText');
  const qrCodeContainer = document.querySelector('qrCodeContainer');

  generateBtn.addEventListener('click', function() {
    const text = qrText.value.trim();
    
    if (text === '') {
      alert('Please enter text or URL');
      return;
    }
    
    generateQRCode(text);
  });

  function generateQRCode(text) {
    fetch(`/generate?text=${encodeURIComponent(text)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      return response.blob();
    })
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      qrCodeContainer.innerHTML = `<img src="${imageUrl}" alt="QR Code">`;
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to generate QR code. Please try again.');
    });
  }
});

