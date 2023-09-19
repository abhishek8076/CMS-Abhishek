export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
export const option = [
  {
    id: 1,
    name: 'File',
  },
  {
    id: 2,
    name: 'Link',
  },
  {
    id: 3,
    name: 'HTML',
  },
];
export const option2 = [
  {
    id: 1,
    name: 'File',
  },
  {
    id: 2,
    name: 'Link',
  },
  {
    id: 3,
    name: 'HTML',
  },
  
];
//  export const Menuoptions = [
//   {
//     id: 1,
//     "name": "Home",
//     "is_submenu": false,
//     "menu_id": null
//   },
//   {
//     id: 2,
//     "name": "Products",
//     "is_submenu": true,
//     "menu_id": 1
//   },
//   {
//     id: 3,
//     "name": "About Us",
//     "is_submenu": false,
//     "menu_id": null
//   },
//   {
//     id: 4,
//     "name": "Services",
//     "is_submenu": true,
//     "menu_id": 1
//   },
//   {
//     id: 5,
//     "name": "Services1",
//     "is_submenu": true,
//     "menu_id": 4
//   },
//   {
//     id: 6,
//     "name": "Services2",
//     "is_submenu": true,
//     "menu_id": 4
//   },
//   {
//     id: 7,
//     "name": "Home1",
//     "is_submenu": true,
//     "menu_id": 1
//   },
//   {
//     id: 8,
//     "name": "Aboutus1",
//     "is_submenu": true,
//     "menu_id": 3
//   }
// ]
 export const Menuoptions = [
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
    content_data: "<h1> my name is abhshek</h1>", // Content data (URL, file path, HTML code, etc.)
  },
  
  // ... continue with other menu items
];