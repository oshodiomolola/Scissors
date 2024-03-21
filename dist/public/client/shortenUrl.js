const shortenedUrlElement = document.getElementById('.shortenedUrl');
shortenedUrlElement.textContent = ""; 
shortenedUrlElement.style.display = "none"; 

async function shortenUrl(event) {
  event.preventDefault();
  const urlInput = document.querySelector('#urlInput').value.trim();
  const shortenedUrlElement = document.querySelector('.shortenedUrl');

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
console.log(data)

  } catch (error) {
    shortenedUrlElement.textContent = 'Error: ' + error.message;
  }
}

const formEl = document.querySelector('#yourFormId');
formEl.addEventListener("submit", shortenUrl);

  