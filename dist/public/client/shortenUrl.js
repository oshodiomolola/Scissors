const token = localStorage.getItem("token");

if (!token) {
  console.error("Token not found in localStorage.");
  window.location.href = "/users/qrCode"; // Added quotes around the URL and a semicolon at the end
}

console.log(typeof token);
console.log(token);

async function shortenUrl(event) {
  event.preventDefault();
  const urlInput = document.querySelector('#urlInput').value.trim();
  const shortenedUrlElement = document.querySelector('#shortenedUrl'); // Correct ID used

  if (!urlInput) {
    document.querySelector('#urlInputFeedback').textContent = "URL cannot be empty";
    return;
  } else {
    document.querySelector('#urlInputFeedback').textContent = "";
  }

  shortenedUrlElement.textContent = 'Shortening URL...';

  try {
    const response = await fetch("/shorten/createUrl", {
      method: 'POST',
      headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"},
      body: JSON.stringify({
        originalUrl: urlInput,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    console.log(data)
    shortenedUrlElement.textContent = "Shortened URL: " + data.shortUrl;

    // setTimeout(() => {
    //   location.assign('/views/qrcode');
    // }, 1000);
  } catch (error) {
    // shortenedUrlElement.textContent = 'Error: ' + error.message;
    console.log(error)
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const formEl = document.querySelector('#urlInput');
  formEl.addEventListener("submit", shortenUrl);
});





// const token = localStorage.getItem("token");

// if (!token) {
//   console.error("Token not found in localStorage.");
//   window.location.href = "/users/qrCode"};
// console.log(typeof token);
// console.log(token);

// async function shortenUrl(event) {
//   event.preventDefault();
//   const urlInput = document.querySelector('#urlInput').value.trim();
//   const shortenedUrlElement = document.querySelector('#shortenedUrl'); // Correct ID used

//   if (!urlInput) {
//     document.querySelector('#urlInputFeedback').textContent = "URL cannot be empty";
//     return;
//   } else {
//     document.querySelector('#urlInputFeedback').textContent = "";
//   }

//   shortenedUrlElement.textContent = 'Shortening URL...';

//   try {
//     const response = await fetch("/shorten/createUrl", {
//       method: 'POST',
//       headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"},
//       body: JSON.stringify({
//         originalUrl: urlInput,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to shorten URL");
//     }

//     const data = await response.json();
//     console.log(data)
//     shortenedUrlElement.textContent = "Shortened URL: " + data.shortUrl;

//     // setTimeout(() => {
//     //   location.assign('/views/qrcode');
//     // }, 1000);
//   } catch (error) {
//     // shortenedUrlElement.textContent = 'Error: ' + error.message;
//     console.log(error)
//   }
// }


// document.addEventListener('DOMContentLoaded', function() {
//   const formEl = document.querySelector('#urlInput');
//   formEl.addEventListener("submit", shortenUrl);
// });

  