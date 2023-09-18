import React from "react";

const Menuoptions = [
  {
    id: 1,
    name: "Home",
    is_submenu: false,
    menu_id: null,
  },
  {
    id: 2,
    name: "Products",
    is_submenu: false,
    menu_id: null,
  },
  {
    id: 3,
    name: "About Us",
    is_submenu: false,
    menu_id: null,
  },
  {
    id: 4,
    name: "Services",
    is_submenu: false,
    menu_id: null,
  },
  {
    id: 5,
    name: "Services1",
    is_submenu: true,
    menu_id: 4,
  },
  {
    id: 6,
    name: "Services2",
    is_submenu: true,
    menu_id: 4,
  },
  {
    id: 7,
    name: "Home1",
    is_submenu: true,
    menu_id: 1,
  },
  {
    id: 8,
    name: "Aboutus1",
    is_submenu: true,
    menu_id: 3,
  },
  {
    id: 9,
    name: "Categories",
    is_submenu: true,
    menu_id: 2,
  },
  {
    id: 10,
    name: "Jackets",
    is_submenu: true,
    menu_id: 9,
  },
  {
    id: 11,
    name: "Tee",
    is_submenu: true,
    menu_id: 9,
  },
  {
    id: 12,
    name: "Jacket1",
    is_submenu: true,
    menu_id: 10,
  },
  {
    id: 13,
    name: "Jacket2",
    is_submenu: true,
    menu_id: 10,
  },
  {
    id: 14,
    name: "Tee1",
    is_submenu: true,
    menu_id: 11,
  },
  {
    id: 15,
    name: "Tee2",
    is_submenu: true,
    menu_id: 11,
  },
  {
    id: 16,
    name: "jeans",
    is_submenu: true,
    menu_id: 11,
  },
];

export const CmsDisplay = () => {
  // Create a function to filter submenu items based on menu_id
  const getSubmenuItems = (menuId) => {
    return Menuoptions.filter((item) => item.menu_id === menuId);
  };

  return (
    <>
      <ul>
        {Menuoptions.map((item) => {
          if (!item.is_submenu) {
            const submenuItems = getSubmenuItems(item.id);
            return (
              <li key={item.id}>
                <a href="#">{item.name}</a>
                {submenuItems.length > 0 && (
                  <ul>
                    {submenuItems.map((submenuItem) => (
                      <li key={submenuItem.id}>
                        <a href="#">{submenuItem.name}</a>
                        {/* Check for sub-submenu items */}
                        {submenuItem.is_submenu && (
                          <ul>
                            {getSubmenuItems(submenuItem.id).map(
                              (subSubmenuItem) => (
                                <li key={subSubmenuItem.id}>
                                  <a href="#">{subSubmenuItem.name}</a>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};
