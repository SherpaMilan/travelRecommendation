// Wait for the DOM content to be fully loaded before executing
document.addEventListener("DOMContentLoaded", fetchRecommendations);

document
  .getElementById("searchField")
  .addEventListener("input", searchRecommendations);

function fetchRecommendations() {
  // Fetch data from the JSON file
  fetch("travel_recommendation_api.json")
    .then((response) => response.json()) // converting the data from fetch to JSON format
    .then((jsonData) => {
      console.log(jsonData);
      // displayRecommendations(jsonData)
    
    })
    .catch((error) => console.error("Error fetching data:", error)); // Log any errors
}

// Function to display recommendations on the webpage
function displayRecommendations(data) {
  // Get the recommendations container element
  const recommendationsDiv = document.getElementById("recommendations");

  // Clear previous recommendations by setting innerHTML to an empty string
  recommendationsDiv.innerHTML = "";

  // Loop through each category of recommendations (e.g., countries, temples, beaches)
  for (let category in data) {
    // Check if the category is a direct property of the data object (not inherited)
    if (data.hasOwnProperty(category)) {
      // Get the recommendations for the current category
      const categoryRecommendations = data[category];

      // Iterate over each recommendation in the current category
      categoryRecommendations.forEach((rec) => {
        // Create a new div element for the recommendation
        const recDiv = document.createElement("div");

        // Add a CSS class to the div for styling purposes
        recDiv.classList.add("recommendation");

        // Set the innerHTML of the div to display the recommendation's details
        recDiv.innerHTML = `
          <h2>${rec.name}</h2>
          <img src="${rec.imageUrl}" alt="${rec.name}">
          <p>${rec.description}</p>
        `;

        // Append the recommendation div to the recommendations container
        recommendationsDiv.appendChild(recDiv);
      });
    }
  }
}



function searchRecommendations() {
  // Get the search query from the input field and convert it to lowercase
  const searchField = document
    .getElementById("searchField")
    .value.toLowerCase();

  // Fetch data from the JSON file
  fetch("travel_recommendation_api.json")
    .then((response) => response.json()) // Parse JSON response
    .then((jsonData) => {
      // Filter data based on search field
      const filteredData = {
        // Filter countries array based on country name
        countries: jsonData.countries.filter((country) =>
          country.name.toLowerCase().includes(searchField)
        ),
        // Filter temples array based on temple name
        temples: jsonData.temples.filter((temple) =>
          temple.name.toLowerCase().includes(searchField)
        ),
        // Filter beaches array based on beach name
        beaches: jsonData.beaches.filter((beach) =>
          beach.name.toLowerCase().includes(searchField)
        ),
      };

      // Display the filtered recommendations only if there is a search query
      if (searchField.trim() !== "") {
        displayRecommendations(filteredData);
      } else {
        // If search query is empty, clear the recommendations
        const recommendationsDiv = document.getElementById("recommendations");
        recommendationsDiv.innerHTML = "";
      }
    })
    .catch((error) => console.error("Error fetching data:", error)); // Log any errors
}