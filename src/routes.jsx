import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
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
  
  
