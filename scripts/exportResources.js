// A script to fetch nocodb table payload for resource list capabilities.

import fetch from "node-fetch"; // Import node-fetch for making HTTP requests
import fs from "fs"; // Import Node's file system module to handle file operations
import { config } from "@dotenvx/dotenvx"; // Import dotenvx to load environment variables

// Load environment variables from .env and .env.local files
config(); // Load default .env file
config({ path: ".env.local" }); // Load .env.local file if present

// Retrieve API URL and API Key from environment variables
const API_URL = process.env.NOCODB_API_URL;
const API_KEY = process.env.NOCODB_API_KEY;

// Function to fetch and export data from the API
const exportData = async () => {
  try {
    // Check if API URL and API Key are available
    if (!API_URL || !API_KEY) {
      throw new Error("API_URL or API_KEY is missing. Check your .env file.");
    }

    // Make a request to the API with appropriate headers
    const response = await fetch(API_URL, {
      headers: {
        accept: "application/json", // Specify that we expect a JSON response
        "xc-token": API_KEY, // Include the API key in the request headers
      },
    });

    // Check if the response status is not OK (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`); // Throw an error with the status code
    }

    // Parse the JSON response from the API
    const data = await response.json();
    const resourceList = data.list; // Extract the 'list' of resources from the response

    // Write the resource list to a local JSON file in the static directory
    fs.writeFileSync(
      "static/json/resources.json",
      JSON.stringify(resourceList, null, 2) // Format the JSON with 2-space indentation
    );
    console.log("Success"); // Log a success message to the console
  } catch (error) {
    // Catch and log any errors that occur during the process
    console.error("Error:", error);
  }
};

// Invoke the exportData function to execute the script
exportData();
