// Storing an alternate flat filtered resource list.

import React, { useEffect, useState } from "react";

interface Resource {
  title: string;
  description: string;
  category_name: string;
  section_name: string;
  url: string;
  tag_array: string[];
}

interface FilteredResourcesProps {
  matchTag?: string; // Tag to filter resources by (optional)
  matchSection?: string; // Section to filter resources by (optional)
}

const FilteredResources: React.FC<FilteredResourcesProps> = ({
  matchTag,
  matchSection,
}) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  useEffect(() => {
    // Fetch the resources.json file
    fetch("/civicsaurus/json/resources.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Resource[]) => {
        setResources(data);
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  useEffect(() => {
    // Filter resources based on matchTag or matchSection
    const filtered = resources.filter((resource) => {
      const tagMatch = matchTag ? resource.tag_array.includes(matchTag) : true;
      const sectionMatch = matchSection
        ? resource.section_name === matchSection
        : true;
      return tagMatch && sectionMatch;
    });

    setFilteredResources(filtered);
  }, [resources, matchTag, matchSection]);

  return (
    <div>
      <h2>
        Resources {matchTag && `Tagged with "${matchTag}"`}{" "}
        {matchSection && `in Section "${matchSection}"`}
      </h2>
      {filteredResources.length === 0 ? (
        <p>No resources found for the selected criteria.</p>
      ) : (
        <ul>
          {filteredResources.map((resource, index) => (
            <li key={index}>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {resource.title}
              </a>{" "}
              | {resource.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredResources;
