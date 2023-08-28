import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
<<<<<<< HEAD
import SuspenseLoader from './components/loader/Loader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);
export const routes = () => {
  return (
    <div>routes</div>
  )
}
export const routesWithLogin: RouteObject[] = [
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <DashboardCrypto />
        },
        {
          path: 'home',
          element: <Navigate to="/" replace />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'modals',
          element: <Modals />
        },
  
        {
          path: 'status',
          children: [
            {
              path: '',
              element: <Navigate to="404" replace />
            },
            {
              path: '404',
              element: <Status404 />
            },
            {
              path: '500',
              element: <Status500 />
            },
            {
              path: 'maintenance',
              element: <StatusMaintenance />
            },
            {
              path: 'coming-soon',
              element: <StatusComingSoon />
            }
  
          ]
        },
        {
          path: '*',
          element: <Status404 />
        }
      ]
    },
    {
      path: 'dashboards',
      element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="crypto" replace />
        },
        {
          path: 'crypto',
          element: <Crypto />
        },
        {
          path: 'messenger',
          element: <Messenger />
        },
        {
          path: '*',
          element: <Status404 />
        }
      ]
    },
    {
      path: 'account',
      element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="adduser" replace />
        },
        {
          path: 'adduser',
          element: <EmployeeReg />
        },
        {
          path: 'addrole',
          element: <AddRole />
        },
        {
          path: 'career',
          element: <CarrerForm />
        },
      
        {
          path: 'career/list',
          element: <CareerList />
        },
        {
          path: 'role/list',
          element: <RoleList />
        },
        {
          path: 'user/list',
          element: <UserList />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'changepassword',
          element: <ChangePassword />
        },
        {
          path: 'Category',
          element: <CategoryMaster />
        },
        {
          path: 'subcategory',
          element: <SubCategoryMaster />
        },
        {
          path: 'offerletter',
          element: <OfferLetterMaster />
        },
        {
          path: 'addofferletter/:id',
          element: <AddOfferLetter />
        },
        {
          path: 'appointmentletter',
          element: <AppointmentLetterMaster />
        },
        {
          path: 'role',
          element: <RoleMaster />
        },
        {
          path: 'status',
          element: <StatusMaster />
        },
        {
          path: 'user/management',
          element: <UserManagement />
        },
        {
          path: 'addBank',
          element: <BankMaster />
        },
        {
          path: '*',
          element: <Status404 />
        }
      ]
    },
  
  ];
  export const routesWithoutLogin: RouteObject[] = [
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <Login />
        },
        {
          path: 'login',
          element: <Navigate to="/" replace />
        },
  
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'reg',
          element: <Registration />
        },
        {
          path: '*',
          element: <Login />
        }
      ]
    }
  ];
  
  
=======


import Loader from '../src/components/loader/Loader';
import Home from './pages/home/Home';
import { Cms } from './pages/CMS/Cms';
import New from './pages/new/New';
import Login from './pages/login/Login';




// const LoaderA = (Component) => (props) =>
// (
//   <Suspense fallback={<Loader/>}>
//     <Component {...props} />
//   </Suspense>
// );

// Pages

// const Overview = Loader(lazy(() => import('src/content/overview')));

// // Dashboards

// const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// // Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );
// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );
// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
// const UserSettings = Loader(
//   lazy(() => import('src/content/applications/Users/settings'))
// );

// // Components

// const Buttons = Loader(
//   lazy(() => import('src/content/pages/Components/Buttons'))
// );
// const Modals = Loader(
//   lazy(() => import('src/content/pages/Components/Modals'))
// );
// const Accordions = Loader(
//   lazy(() => import('src/content/pages/Components/Accordions'))
// );
// const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
// const Badges = Loader(
//   lazy(() => import('src/content/pages/Components/Badges'))
// );
// const Tooltips = Loader(
//   lazy(() => import('src/content/pages/Components/Tooltips'))
// );
// const Avatars = Loader(
//   lazy(() => import('src/content/pages/Components/Avatars'))
// );
// const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
// const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// // Status

// const Status404 = Loader(
//   lazy(() => import('src/content/pages/Status/Status404'))
// );
// const Status500 = Loader(
//   lazy(() => import('src/content/pages/Status/Status500'))
// );
// const StatusComingSoon = Loader(
//   lazy(() => import('src/content/pages/Status/ComingSoon'))
// );
// const StatusMaintenance = Loader(
//   lazy(() => import('src/content/pages/Status/Maintenance'))
// );
// const UserManagement = Loader(
//   lazy(() => import('src/content/pages/Users'))
//);

export const routesWithLogig= [
  {
    path: '',
    element: <Home/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
    
      {
        path: 'cms',
        element: <Cms />
      },
    

      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            // element: <Status404 />
          },
         

        ]
      },
      {
        path: '*',
        // element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboards" replace />
      },
      
      // {
      //   path: '*',
      //   element: <Status404 />
      // }
    ]
  },
  {
    path: 'user',
    element: <New />,
    children: [
      {
        path: '',
        element: <Navigate to="adduser" replace />
      },
      {
        path: 'adduser',
        element:<New/> 
      },
     
      
      // {
      //   path: '*',
      //   element: <Status404 />
      // }
    ]
  },

];
export const routesWithoutLogin = [
  {
    path: '/',
    element: <Login />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'login',
        element: <Navigate to="/" replace />
      },
      // {
      //   path: '*',
      //   element: <Login />
      // }
    ]
  }
];

>>>>>>> 05798c4 (minor changes)
