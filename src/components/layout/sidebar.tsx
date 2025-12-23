import '../../styling/sidebar.scss';
import AdminAction from '../../Features/Portal/PortalActionButtons';
interface UserLevel {
  levelOfUser: boolean;
}

export default function Sidebar({ levelOfUser }: UserLevel) {
  return (
    <div className='sideBarContainer'>
      <div className='levelContainer'>
        <h1 className='leveluserText'>Level of user: </h1>
        <h2 className='levelText'>{levelOfUser ? 'Admin' : 'Non Admin'}</h2>
      </div>
      {levelOfUser && <AdminAction />}
    </div>
  );
}
