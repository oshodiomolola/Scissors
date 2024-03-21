document.addEventListener('DOMContentLoaded', function() {
  const shortenedUrlElement = document.getElementById('shortenedUrl'); 
  const formEl = document.querySelector('#yourFormId');

  // formEl.addEventListener("submit", shortenUrl);

  async function shortenUrl(event) {
    event.preventDefault();
    const urlInput = document.querySelector('#urlInput').value.trim();

    if (!urlInput) {
      document.querySelector('#urlInputFeedback').textContent = "URL cannot be empty";
      return;
    } else {
      document.querySelector('#urlInputFeedback').textContent = "";
    }

    shortenedUrlElement.textContent = 'Shortening URL...';

    try {
      const response = await fetch("http://localhost:8000/users/shortenUrl", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          originalUrl: urlInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      shortenedUrlElement.textContent = "Shortened URL: " + data.shortUrl;

      setTimeout(() => {
        location.assign('/views/qrcode');
      }, 1000);
    } catch (error) {
      shortenedUrlElement.textContent = 'Error: ' + error.message;
    }
  }
});

  