import '../styling/portal.scss';
// Relative Imports of Components
import Footer from '../components/layout/footer';
import { Navigate } from 'react-router-dom';
import SideBar from '../components/layout/sidebar';
import DashboardStat from '../features/Portal/Dashsboard';
import DashboardCollapse from '../features/Portal/DashboardComponent';
import GenerateCurrentDate from '../components/common/GenerateCurrentDate';
import PortalHeader from '../features/Portal/PortalHeader';
import GetPermissions from '../features/Portal/GetPermissions';
import GetContactRecords from '../features/Portal/GetRecords';

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
              <GenerateCurrentDate />
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
