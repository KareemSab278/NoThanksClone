const url = 'https://nothanksclone.onrender.com/allcompany';
let companies = []; // Store all fetched companies
let displayedCompanies = []; // Track displayed companies
let currentIndex = 0;
const batchSize = 50;

// Fetch all companies initially (only once)
const fetchAllCompanies = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        companies = data; // Store all fetched companies
        loadMoreCompanies(); // Load the first batch of companies
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

// Display companies in the grid
const displayCompanies = (companyList) => {
    const grid = document.getElementById('company-grid');
    companyList.forEach(company => {
        grid.innerHTML += `
            <div class="card" data-name="${company.name}" onclick="openPopup(this)">
                <img src="${company.logo_url || 'default-logo.png'}" alt="${company.name} Logo">
                <h2>${company.name}</h2>
                <button class="read-more-btn" onclick="openPopup(this)">Read More</button>
            </div>`;
    });
};

// Load more companies on button click
const loadMoreCompanies = () => {
    const nextBatch = companies.slice(currentIndex, currentIndex + batchSize);
    displayCompanies(nextBatch);
    displayedCompanies = displayedCompanies.concat(nextBatch);
    currentIndex += batchSize;

    // Hide "Load More" button if all companies are loaded
    if (currentIndex >= companies.length) {
        toggleLoadMoreButton(false);
    }
};

// Toggle visibility of "Load More" button
const toggleLoadMoreButton = (show) => {
    const loadMoreButton = document.getElementById('load-more-btn');
    loadMoreButton.style.display = show ? 'block' : 'none';
};

// Open popup with company details
function openPopup(element) {
    const name = element.getAttribute('data-name');
    const company = companies.find(c => c.name === name);
    if (!company) return;

    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');

    popupText.innerHTML = `
        <h2 color="black">${company.name}</h2>
        <p>${company.description || "No description available"}</p>`;

    popup.classList.add('open-popup');
}

// Close popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('open-popup');
}

// Handle company search with debounce
let debounceTimer;
const getCompany = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const searchName = document.getElementById('search').value.trim().toLowerCase();
        if (!searchName) {
            displayCompanies(displayedCompanies); // Show currently loaded companies if search is empty
            toggleLoadMoreButton(currentIndex < companies.length); // Show "Load More" button if more companies can be loaded
            return;
        }
        const filteredCompanies = companies.filter(company =>
            company.name.toLowerCase().includes(searchName)
        );
        document.getElementById('company-grid').innerHTML = ''; // Clear existing grid
        displayCompanies(filteredCompanies); // Display filtered companies
        toggleLoadMoreButton(false); // Hide "Load More" button during search
    }, 300); // 300ms debounce time
};

// Fetch and display companies on page load
fetchAllCompanies();
