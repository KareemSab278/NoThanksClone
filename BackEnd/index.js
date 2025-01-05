const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Load JSON file once when the server starts
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// Endpoint to get a specific company's data
app.get('/company/:id', (req, res) => {
    const companyId = req.params.id; // Extract the company ID from the URL
    const company = data.brands[companyId]; // Find company by ID

    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company); // Return the company data
});

// Endpoint to get all companies
app.get('/allcompany', (req, res) => {
    const allCompanies = Object.values(data.brands); // Convert object to array
    res.json(allCompanies); // Return all companies
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
