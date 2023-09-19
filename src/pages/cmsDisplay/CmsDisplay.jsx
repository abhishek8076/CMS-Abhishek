import React from "react";

const Menuoptions = [
  {
    id: 1,
    name: "Home",
    has_submenu: 1,
    is_submenu: 0,
    menu_id: null,
    content_id: 1, // Content ID for this item
    content_type: "link", // Content type (e.g., "link", "file", "html")
    content_data: "https://example.com", // Content data (URL, file path, HTML code, etc.)
  },
  {
    id: 2,
    name: "Products",
    has_submenu: 0,
    is_submenu: 0,
    menu_id: null,
    content_id: 2, // Content ID for this item
    content_type: "file", // Content type (e.g., "link", "file", "html")
    content_data: "/path/to/pdf.pdf", // Content data (URL, file path, HTML code, etc.)
  },
  {
    id: 3,
    name: "About Us",
    has_submenu: 1,
    is_submenu: 0,
    menu_id: null,
    content_id: 3, // Content ID for this item
    content_type: "html", // Content type (e.g., "link", "file", "html")
    content_data: "<h1> About Us HTML Content</h1>", // Content data (URL, file path, HTML code, etc.)
  },
  {
    id: 4,
    name: "About Us1",
    has_submenu: 1,
    is_submenu: 1,
    menu_id: 3,
    content_id: 3, // Content ID for this item
    content_type: "html", // Content type (e.g., "link", "file", "html")
    content_data: "<h1> my</h1>", // Content data (URL, file path, HTML code, etc.)
  },
  
  // ... continue with other menu items
];

const Submenu = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href="#">{item.name}</a>
          {item.has_submenu === 1 && <Submenu items={getSubmenuItems(item.id)} />}
          <div>
            {getContent(item.content_type, item.content_data)}
          </div>
        </li>
      ))}
    </ul>
  );
};

const getSubmenuItems = (menuId) => {
  return Menuoptions.filter((item) => item.menu_id === menuId && item.is_submenu === 1);
};

const getContent = (contentType, contentData) => {
  if (contentType === "link") {
    return <a href={contentData}>Link</a>;
  } else if (contentType === "file") {
    return (
      <div>
        <p>File Content:</p>
        <a href={contentData} download>Download File</a>
      </div>
    );
  } else if (contentType === "html") {
    return <div dangerouslySetInnerHTML={{ __html: contentData }} />;
  }
};

export const CmsDisplay = () => {
  const topLevelItems = Menuoptions.filter((item) => item.menu_id === null && item.is_submenu === 0);

  return (
    <ul>
      {topLevelItems.map((item) => (
        <li key={item.id}>
          <a href="#">{item.name}</a>
          {item.has_submenu === 1 && <Submenu items={getSubmenuItems(item.id)} />}
          <div>
            {getContent(item.content_type, item.content_data)}
          </div>
        </li>
      ))}
    </ul>
  );
};
