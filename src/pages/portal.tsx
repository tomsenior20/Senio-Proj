import { ReactNode, useEffect, useState } from 'react';
import '../styling/portal.scss';
import Footer from '../components/layout/footer';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/layout/sidebar';
import DashboardStat from '../features/Portal/Dashsboard';
import DashboardCollapse from '../features/Portal/DashboardComponent';
import GetAPI from '../api/api';
import APIGet from '../api/GetAPI';

interface LoggedIn {
  admin: boolean;
  userloggedIn: string;
}

interface ContactRecordProps {
  email: string;
  message: string;
  name: string;
  number: number;
  product: string;
  date_logged: string;
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

function GetContactRecords() {
  const [contactRecords, setContactRecords] = useState<ContactRecordProps[]>(
    []
  );

  useEffect(() => {
    // Get Records
    async function GetRecords() {
      const data = await APIGet({
        APIEndPoint: 'getContactRecords',
        parameter: '',
        value: '',
      });

      console.log(data);
      setContactRecords(data);
    }
    GetRecords();
  }, []);

  return (
    <div className='overflow-x-auto bg-gray-200 text-black w-full'>
      <table className='table-lg w-full border border-black'>
        <thead>
          <tr>
            <th className='text-neutral text-lg border border-black p-2!'>
              Name
            </th>
            <th className='text-neutral text-lg border border-black p-2!'>
              Message
            </th>
            <th className='text-neutral text-lg border border-black p-2!'>
              Email
            </th>
            <th className='text-neutral text-lg border border-black p-2!'>
              Product
            </th>
            <th className='text-neutral text-lg border border-black p-2!'>
              Number
            </th>
            <th className='text-neutral text-lg border border-black p-2!'>
              Date Logged
            </th>
          </tr>
        </thead>
        <tbody>
          {contactRecords.map((item) => (
            <tr key={`${item.name}-${item.message}`}>
              <td className='text-neutral text-md  border border-black p-1!'>
                {item.name}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.message}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.email}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.product}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.number}
              </td>
              <td className='text-neutral text-md border border-black p-1!'>
                {item.date_logged}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            <DashboardCollapse title='Dashboard Stats' idProp='dashboardStats'>
              <DashboardStat dashboardName='Views' />
              <DashboardStat dashboardName='Ticket Logged' />
              <DashboardStat dashboardName='Views' />
              <DashboardStat dashboardName='Ticket Logged' />
            </DashboardCollapse>
            <DashboardCollapse
              title='Open Contact Records'
              idProp='contactRecords'
            >
              <GetContactRecords />
            </DashboardCollapse>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
