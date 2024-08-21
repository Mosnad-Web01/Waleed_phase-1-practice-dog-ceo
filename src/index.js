document.addEventListener("DOMContentLoaded", () => {
  fetchDogImages();
  fetchDogBreeds();
});

// Fetch and display dog images
function fetchDogImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      const imageContainer = document.getElementById("dog-image-container");
      data.message.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "A cute dog"; // Accessibility enhancement
        imageContainer.appendChild(img);
      });
    });
}

// Store breeds for filtering
const breeds = [];

// Fetch and display dog breeds
function fetchDogBreeds() {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      const breedList = document.getElementById("dog-breeds");
      Object.keys(data.message).forEach((breed) => {
        breeds.push(breed);
        const li = document.createElement("li");
        li.textContent = breed;
        breedList.appendChild(li);

        // Add click event to change color
        li.addEventListener("click", function () {
          this.style.color = "blue"; // Change color on click
        });
      });
    });
}

// Filter breeds based on dropdown selection
document
  .getElementById("breed-dropdown")
  .addEventListener("change", function () {
    const selectedLetter = this.value;
    const breedList = document.getElementById("dog-breeds");
    breedList.innerHTML = ""; // Clear existing list

    const filteredBreeds = selectedLetter
      ? breeds.filter((breed) => breed.startsWith(selectedLetter))
      : breeds;

    filteredBreeds.forEach((breed) => {
      const li = document.createElement("li");
      li.textContent = breed;
      breedList.appendChild(li);

      li.addEventListener("click", function () {
        this.style.color = "blue"; // Change color on click
      });
    });
  });
