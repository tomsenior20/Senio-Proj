import { ReactNode, useEffect, useState } from 'react';
import '../styling/portal.scss';
import Footer from '../components/footer';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/sidebar';
import DashboardStat from '../components/dahsboard';
import DashboardCollapse from '../components/DashboardComponent';
import GetAPI from '../components/api/api';

interface LoggedIn {
  admin: boolean;
  userloggedIn: string;
}

function PortalHeader({
  isAdmin,
  children,
}: {
  isAdmin: any;
  children: ReactNode;
}) {
  return (
    <div className='loggedinLeftContainer'>
      {children}
      <div className='userLoggedinContainer'>
        <h1 className='loggedinUserText'>
          Welcome back: {isAdmin?.userloggedIn}
        </h1>
        <h3 className='loggedInSubText'>
          Always Stay Connected with modern tools, and features
        </h3>
      </div>
    </div>
  );
}

function GetCurrentYear() {
  const date = new Date();
  const dateString = date.toDateString();
  return (
    <div className='currentDateContainer'>
      <p className='curDateText'>{dateString}</p>
    </div>
  );
}

function GetPermissions() {
  const [LoggedIn, setLoggedInObj] = useState<LoggedIn | null>(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const name = localStorage.getItem('logged_in_name');

        const data = await GetAPI<any[], { name: string }>({
          APIEndPoint: 'CheckSignonTableByName',
          body: { name },
        });

        if (data) {
          for (var item of data) {
            setLoggedInObj({
              admin: item.admin === 1,
              userloggedIn: item.name,
            });
          }
        } else {
          console.log('No Valid Data Present for User');
        }
      } catch (error) {
        console.log('Error fetching perm by name');
      }
    }
    fetchPermissions();
  }, []);
  // Return interface object
  return LoggedIn;
}

export default function Portal() {
  const loggedIn = localStorage.getItem('logged_in_name');
  if (!loggedIn) return <Navigate to='/' replace />;
  const isAdmin = GetPermissions();
  return (
    <>
      <main>
        <div className='mainPortalContainer'>
          {/* Side Bar */}
          <SideBar levelOfUser={!!isAdmin?.admin} />
          <div className='loggedInMainContainer'>
            {/* Main Header Section  */}
            <PortalHeader isAdmin={isAdmin}>
              <GetCurrentYear />
            </PortalHeader>
            {/* Containers containing dasboard stats */}
            <DashboardCollapse title='Dashboard Stats'>
              <DashboardStat dashboardName='Views' />
              <DashboardStat dashboardName='Ticket Logged' />
              <DashboardStat dashboardName='Views' />
              <DashboardStat dashboardName='Ticket Logged' />
            </DashboardCollapse>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
