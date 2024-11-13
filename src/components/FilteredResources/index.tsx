import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Import the CSS module for styling

// Interface for a single resource item
interface Resource {
  title: string;
  description: string;
  url: string;
  category_name: string;
  section_name: string;
  tag_array: string[];
}

// Props for the component, allowing optional tag and section filters
interface FilteredResourcesProps {
  matchTag?: string; // Optional tag to filter by
  matchSection?: string; // Optional section to filter by
}

const FilteredResources: React.FC<FilteredResourcesProps> = ({
  matchTag,
  matchSection,
}) => {
  // State to store grouped resources by category
  const [groupedResources, setGroupedResources] = useState<{
    [category: string]: Resource[];
  }>({});

  // Effect to fetch and filter resources when the component mounts or props change
  useEffect(() => {
    fetch("/civicsaurus/json/resources.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Resource[]) => {
        // Initial filtering of resources based on provided props
        let filteredResources = data;

        // Filter by matchTag if provided
        if (matchTag) {
          filteredResources = filteredResources.filter((resource) =>
            resource.tag_array.includes(matchTag)
          );
        }

        // Filter by matchSection if provided
        if (matchSection) {
          filteredResources = filteredResources.filter(
            (resource) => resource.section_name === matchSection
          );
        }

        // Group resources by category
        const grouped: { [category: string]: Resource[] } = {};
        filteredResources.forEach((resource) => {
          if (!grouped[resource.category_name]) {
            grouped[resource.category_name] = [];
          }
          grouped[resource.category_name].push(resource);
        });

        // Update state with grouped resources
        setGroupedResources(grouped);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [matchTag, matchSection]); // Dependencies to trigger the effect

  return (
    <div className={styles.wrapper}>
      {/* If no resources match, show a message */}
      {Object.entries(groupedResources).length === 0 ? (
        <p>No resources found for the selected criteria.</p>
      ) : (
        // Render each category and its corresponding resources
        Object.entries(groupedResources).map(([category, resources]) => (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title}
                  </a>{" "}
                  | {resource.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default FilteredResources;
