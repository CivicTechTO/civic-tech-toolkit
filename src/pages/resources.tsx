import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Define a TypeScript interface for your resource data
interface Resource {
  title: string;
  description: string;
  category: string;
  url: string;
  tags: string[];
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  useEffect(() => {
    fetch(`${baseUrl}json/resources.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Resource[]) => {
        console.log("Fetched data:", data); // Log the data
        setResources(data);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  return (
    <div>
      <h1>Resource Database</h1>
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>{" "}
            | {resource.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
