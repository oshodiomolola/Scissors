const urlEl = document.querySelector(".shortenedUrl");

async function shortenUrl(event) {
  event.preventDefault();
  const urlInput = document.querySelector('#urlInput').value.trim();
  const shortenedUrlElement = document.querySelector('#shortenedUrl');
  shortenedUrlElement.textContent = 'Shortening URL...';
  shortenedUrlElement.style.display = 'block';

  if (!urlInput) {
    // Check if the URL input is empty
    return alert('Please enter a valid URL');
  }

  try {
    const response = await fetch("http://localhost:8000/users/shortenUrl", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        longUrl: urlInput,
      }),
    });
console.log(response)

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
  const shortenedUrlElement = document.getElementById('shortenedUrl');
  shortenedUrlElement.textContent = "Shortened URL: Loading...";
  shortenedUrlElement.style.display = "block";
  
  setTimeout(() => {
    shortenedUrlElement.textContent = 'Shortened URL: http://localhost:8000/views/shortenUrl';
  }, 1500); 

  const formEl = document.querySelector('#yourFormId');
  formEl.addEventListener("submit", shortenUrl);




