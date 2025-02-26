const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Load JSON file once when the server starts
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

// Endpoint to get a specific company's data
app.get('/company/:id', (req, res) => {
    const companyId = req.params.id; // extract the company ID from the URL
    const company = data.brands[companyId]; // find company by ID

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

app.post('/newbrand', (req, res) => { //New endpoint for adding new companies to boycott list
    const newBrand = {
        "id": req.body.id,
        "name": req.body.name,
        "status": req.body.status,
        "description": req.body.description,
        "reasons": req.body.reasons,
        "countries": req.body.countries,
        "categories": req.body.categories,
        "logo_url": req.body.logo_url,
        "alternatives": req.body.alternatives,
        "stakeholders": req.body.stakeholders
    }
    data.brands[req.body.id] = newBrand;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); 
    res.json(data.brands);
    console.log(brands.hasOwnProperty(id))
})


