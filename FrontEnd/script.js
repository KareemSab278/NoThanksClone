// const url = 'http://localhost:3000/allcompany'; // for local development
const url = 'https://nothanksclone.onrender.com/allcompany' // new url for production
let companies = [];

// Fetch all companies and store in the companies array
const fetchAllCompanies = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        companies = data; // Store all companies in the array
        displayCompanies(companies); // Display all companies initially
    } catch (error) {
        console.error('Error fetching all companies:', error);
    }
    console.log(`Total companies fetched: ${companies.length}`);
};

// Display companies in the grid
const displayCompanies = (companyList) => {
    const grid = document.getElementById('company-grid');
    grid.innerHTML = ''; // Clear existing content
    const batchSize = 50; // Number of companies to render in each batch
    let currentIndex = 0;

    function renderBatch() {
        const batch = companyList.slice(currentIndex, currentIndex + batchSize);
        batch.forEach(company => {
            grid.innerHTML += `
                <div class="card" data-name="${company.name}" onclick="openPopup(this)">
                    <img src="${company.logo_url || 'default-logo.png'}" alt="${company.name} Logo">
                    <h2>${company.name}</h2>
                    
                    <button class="read-more-btn" onclick="openPopup(this)">Read More</button>
                </div>`;
        });

        currentIndex += batchSize;

        if (currentIndex < companyList.length) {
            setTimeout(renderBatch, 1000); // Schedule the next batch
        }
    }

    renderBatch(); // Start rendering the first batch
};

// Open popup with company details
function openPopup(element) {
    const name = element.getAttribute('data-name'); // Get the company name from data attribute
    const company = companies.find(c => c.name === name); // Find the company by name
    if (!company) return; // Handle case if company not found

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

// Handle company search
const getCompany = () => {
    const searchName = document.getElementById('search').value.trim().toLowerCase();
    if (!searchName) {
        displayCompanies(companies); // Show all companies if search is empty
        return;
    }
    
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchName)
    );
    
    displayCompanies(filteredCompanies); // Display filtered companies
};

// Fetch and display companies on page load
fetchAllCompanies();
