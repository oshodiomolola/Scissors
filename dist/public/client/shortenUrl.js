const token = localStorage.getItem('token');
const Loader = document.querySelector('.loader');
const newListContainer = document.querySelector('.newlink-container');
const formEl = document.querySelector('#urlForm');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.querySelector('#urlInput').value.trim();
  Loader.textContent = 'Shortening URL...';

  try {
    const response = await axios.post(
      '/shorten/createUrl',
      { originalUrl: urlInput },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { status, message, newDoc } = response.data;

    if (status === 'success') {
      const { shortUrl, newUrl } = newDoc;

      const listItem = document.createElement('li');
      listItem.classList.add('list-child');
      listItem.innerHTML = `
        <span class="new-link">New Link :</span>
        <a href="${newUrl}" class="new-link-a">${shortUrl}</a>
      `;
      newListContainer.appendChild(listItem);

      Loader.textContent = '';
    } else {
      console.error(message);
    }
  } catch (error) {
    console.error('Error:', error);
    Loader.textContent = '';
  }
});