To add more data, use postman and fill in with data:

{
  "id": "pepsi",
  "name": "Pepsi",
  "status": "active",
  "description": "PepsiCo owns SodaStream and 50% of Sabra both of which had taken advantage of the Israeli occupation of Palestine.",
  "reasons": ["support_for_israel"],
  "countries": ["global"],
  "categories": ["beverages", "snacks"],
  "logo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pepsi_logo_2014.svg/1024px-Pepsi_logo_2014.svg.png",
  "alternatives": ["coca-cola", "sprite"],
  "stakeholders": [
    {
      "id": "pepsico",
      "type": "owner"
    }
  ]
}


use post method with url endpoint /newbrand.
body => raw.