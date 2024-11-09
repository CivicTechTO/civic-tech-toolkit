// scripts/exportResources.js
import fetch from "node-fetch";
import fs from "fs";
import { config } from "@dotenvx/dotenvx";

// Load environment variables from .env file
config();
config({ path: ".env.local" });

const API_URL = process.env.NOCODB_API_URL;
const API_KEY = process.env.NOCODB_API_KEY;

const exportData = async () => {
  try {
    if (!API_URL || !API_KEY) {
      throw new Error("API_URL or API_KEY is missing. Check your .env file.");
    }

    const response = await fetch(API_URL, {
      headers: {
        accept: "application/json",
        "xc-token": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    const resourceList = data.list;

    // Save the data to resources.json in the root directory
    fs.writeFileSync(
      "static/json/resources.json",
      JSON.stringify(resourceList, null, 2)
    );
    console.log("Success");
  } catch (error) {
    console.error("Error:", error);
  }
};

exportData();
