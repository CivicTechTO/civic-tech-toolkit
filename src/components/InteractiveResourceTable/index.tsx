/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Select from "react-select"; // Import react-select for multi-select dropdowns
import styles from "./styles.module.css"; // Import the CSS module for styling

// Define the structure of the Resource object
interface Resource {
  title: string | null;
  description: string | null;
  url: string | null;
  category_name: string | null;
  tag_array: string[] | null;
}

// Define the structure for sorting configuration
interface SortConfig {
  field: keyof Resource;
  order: "asc" | "desc";
}

const InteractiveResourceTable: React.FC = () => {
  // State to hold all resources and the filtered list
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  // States for filters and search query
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State to manage sorting configuration
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "title",
    order: "asc",
  });

  // Fetch resources from the JSON file on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/civicsaurus/json/resources.json");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data: Resource[] = await response.json();
        setResources(data);
        setFilteredResources(data); // Initialize filtered resources with the full list
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let filtered = resources;

    // Filter resources by selected categories (OR logic)
    if (categoryFilter.length) {
      filtered = filtered.filter(
        (resource) =>
          resource.category_name &&
          categoryFilter.includes(resource.category_name)
      );
    }

    // Filter resources by selected tags (OR logic)
    if (tagFilter.length) {
      filtered = filtered.filter(
        (resource) =>
          resource.tag_array &&
          resource.tag_array.some((tag) => tagFilter.includes(tag))
      );
    }

    // Filter resources based on the search query (case-insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          (resource.title || "").toLowerCase().includes(query) ||
          (resource.description || "").toLowerCase().includes(query)
      );
    }

    // Sort the filtered resources based on the selected field and order
    filtered.sort((a, b) => {
      const fieldA = (a[sortConfig.field] || "").toString().toLowerCase();
      const fieldB = (b[sortConfig.field] || "").toString().toLowerCase();
      return sortConfig.order === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

    setFilteredResources(filtered);
  }, [categoryFilter, tagFilter, searchQuery, resources, sortConfig]);

  // Generate unique category and tag options for filters
  const uniqueCategories = Array.from(
    new Set(
      resources.map((resource) => resource.category_name || "Unknown Category")
    )
  );
  const uniqueTags = Array.from(
    new Set(resources.flatMap((resource) => resource.tag_array || []))
  );

  // Toggle sort order or set a new sort field
  const handleSort = (field: keyof Resource) => {
    setSortConfig((prevConfig) => ({
      field,
      order:
        prevConfig.field === field && prevConfig.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Helper function to handle changes in the multi-select dropdowns
  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (selectedOptions: any) => {
      const values = selectedOptions
        ? selectedOptions.map((opt: any) => opt.value)
        : [];
      setter(values);
    };

  // Options for react-select components
  const tagOptions = uniqueTags.map((tag) => ({ value: tag, label: tag }));
  const categoryOptions = uniqueCategories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className={styles.container}>
      {/* Filter controls */}
      <div className={styles.filterContainer}>
        {/* Search input for text-based filtering */}
        <label>
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
          />
        </label>

        {/* Category filter using react-select */}
        <label>
          Category Filter:
          <Select
            isMulti
            options={categoryOptions}
            onChange={handleSelectChange(setCategoryFilter)}
            className={`react-select ${styles.multiSelect}`}
            classNamePrefix="react-select"
            placeholder="Select categories..."
          />
        </label>

        {/* Tag filter using react-select */}
        <label>
          Tag Filter:
          <Select
            isMulti
            options={tagOptions}
            onChange={handleSelectChange(setTagFilter)}
            className={`react-select ${styles.multiSelect}`}
            classNamePrefix="react-select"
            placeholder="Select tags..."
          />
        </label>
      </div>

      {/* Resource table */}
      {filteredResources.length === 0 ? (
        <p className={styles.noResources}>
          No resources found for the selected criteria.
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                className={styles.sortable}
                onClick={() => handleSort("title")}
              >
                Resource
                {sortConfig.field === "title" && (
                  <span
                    className={`${styles.sortIndicator} ${
                      sortConfig.order === "asc"
                        ? styles.ascending
                        : styles.descending
                    }`}
                  ></span>
                )}
              </th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource, index) => (
              <tr key={index}>
                <td>
                  <a
                    href={resource.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title || "Untitled Resource"}
                  </a>{" "}
                  <span className={styles.category}>
                    {resource.category_name || "null"}
                  </span>
                  <br />
                  {resource.description || "No description available"}
                  <br />
                  <small>{resource.url || "No URL available"}</small>
                  <br />
                </td>
                <td>
                  {resource.tag_array
                    ? resource.tag_array.map((tag, idx) => (
                        <span key={idx} className={styles.pill}>
                          {tag}
                        </span>
                      ))
                    : "No tags"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InteractiveResourceTable;
