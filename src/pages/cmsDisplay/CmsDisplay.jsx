import React from "react";

const Menuoptions = [
  // ... Your menu options data ...
];

export const CmsDisplay = () => {
  const getSubmenuItems = (menuId) => {
    return Menuoptions.filter((item) => item.menu_id === menuId);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">Your Brand</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {Menuoptions.map((item) => {
              if (!item.is_submenu) {
                const submenuItems = getSubmenuItems(item.id);
                return (
                  <li className="nav-item" key={item.id}>
                    <a className="nav-link" href="#">{item.name}</a>
                    {submenuItems.length > 0 && (
                      <ul className="submenu dropdown-menu">
                        {submenuItems.map((submenuItem) => (
                          <li className="dropdown-item" key={submenuItem.id}>
                            <a href="#">{submenuItem.name}</a>
                            {submenuItem.is_submenu && (
                              <ul className="sub-submenu">
                                {getSubmenuItems(submenuItem.id).map(
                                  (subSubmenuItem) => (
                                    <li className="sub-submenu-item" key={subSubmenuItem.id}>
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
        </div>
      </div>
    </nav>
  );
};
