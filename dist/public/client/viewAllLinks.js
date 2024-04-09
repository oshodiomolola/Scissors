const token = localStorage.getItem('token');
const listContainer = document.querySelector('.link-container');
const loader = document.querySelector('.loader');

async function fetchUserLinks() {
  try {
    loader.textContent = 'Fecthing...';
    let num = 1;
    const response = await axios.get('/shorten/findAll', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;
    const { data: dataArr } = data;

    dataArr.forEach((element, i) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-child');

      listItem.innerHTML = `
        <div class="childeren-wrapper"><span class="list-sp" id="${
          element._id
        }">${num <= 9 ? '0' : ''}${num}</span>
            <a href="${element.newUrl}" class="link">${
        element.shortUrl
      }</a></div>
      `;
      listContainer.appendChild(listItem);
      num++;
    });
    if (dataArr !== null || dataArr === undefined || !dataArr) {
      loader.textContent = '';
    }
  } catch (error) {
    console.error('Error:', error);
    loader.textContent = '';
  }
}

fetchUserLinks();