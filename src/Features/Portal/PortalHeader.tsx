import { ReactNode } from 'react';

interface PortalHeaderProps {
  isAdmin: any;
  children: ReactNode;
}

export default function PortalHeader({ isAdmin, children }: PortalHeaderProps) {
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
