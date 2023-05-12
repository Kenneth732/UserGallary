function handleFetchData(query = '') {
    return fetch(`http://localhost:3000/photos?q=${query}`)
      .then((res) => res.json())
      .then((userPhotos) => {
        return userPhotos
          .filter((photo) => photo.title.toLowerCase().includes(query.toLowerCase()))
          .map(({ url, description, id, title, userContact }) => `
            <div class="cards" key=${id}>
              <div class="image">
                <img src="${url}" alt="${title}" class="img">
              </div>
              <p>${title}</p>
              <div class="buttons">
                  <button class="btn btn-primary" onclick="handleButtonToggle('${id}')">View More</button>
              </div>
                <h2>${description}</h2>
                <p>${userContact.name}</p>
                <p>${userContact.job}</p>
                <p>${userContact.address}</p>

            </div>
          `).join(" ");
      });
  }
  
  const handleRenderUser = () => {
    handleFetchData()
      .then(userDataHTML => {
        const outputElement = document.querySelector('#output');
        outputElement.innerHTML = userDataHTML;
      });
  };
  handleRenderUser();
  
  
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFilter();
  });
  
  
  const handleFilter = () => {
    const inputValue = document.querySelector('#input').value;
    handleFetchData(inputValue)
      .then(filteredDataHTML => {
        const outputElement = document.querySelector('#output');
        outputElement.innerHTML = filteredDataHTML;
      });
  };
  