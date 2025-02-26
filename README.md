# Company Boycott List

This project is a web-based application that displays a list of companies for users to browse and search. It aims to raise awareness about specific companies and their business practices by providing a searchable and filterable list of boycott targets.
The dataset I used came from this github repo: https://github.com/TechForPalestine/boycott-israeli-consumer-goods-dataset/tree/main

## Features

- **Search Functionality**: Users can search for companies by name or by typing letters to filter the list dynamically.
- **Popup Information**: Clicking on a company displays a popup with detailed information about the company.
- **Lazy Rendering**: Companies are rendered in batches to improve performance when handling large datasets.
- **Dynamic Fetching**: The list of companies is fetched from a backend API and displayed on the page.

## How It Works

1. The frontend fetches company data from the backend at `http://localhost:3000/allcompany`.
2. The data is displayed in batches of 50 companies at a time, with a delay to prevent browser freezing.
3. Users can click on any company card to view more information in a popup.
4. The search bar allows users to filter companies by name or letters in real-time.
5. The popup can be closed by clicking the "Close" button.

## Future Improvements

While the core functionality is complete, there are several enhancements planned for the future:

### 1. Pagination
- Implementing pagination to display only **100 companies per page**.
- Users will be able to click through different pages or choose to view companies by **letters** (e.g., A-Z).
- This will improve both **speed** and **usability**, especially for large datasets.

### 2. Popup Enhancements
- Fixing the popup’s CSS to improve its visual appeal.
- Addressing the issue where the **company URL overlaps** the popup card, making the interface look unprofessional.
- Using JavaScript’s `split` method to extract URLs from the description and render them as **clickable links**.
- Adding functionality to close the popup when the user clicks **outside** of it.

### 3. User-Generated Submissions
- Allowing users to **submit new companies** for the boycott list.
- Providing an option for users to request **removal of companies** from the list.
- Implementing a review system to manually approve or reject submissions.

## Current Limitations

- The site may become slow when rendering large datasets, despite lazy rendering.
- The popup design needs further improvements for a better user experience.

## Development Status

Currently, I am focusing on **university assignments**, so these future improvements are planned but not actively being worked on.

## How to Run

1. Clone the repository from GitHub.
2. Start the backend server to serve the company data at `http://localhost:3000/allcompany`.
3. Open `index.html` in a browser to view the application.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **Fetch API** for data retrieval

## Contact

please dont contact me :) 

