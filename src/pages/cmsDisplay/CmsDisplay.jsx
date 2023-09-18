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
    is_submenu: true,
    menu_id: 1,
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
    is_submenu: true,
    menu_id: 1,
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

// export default Navbar;
