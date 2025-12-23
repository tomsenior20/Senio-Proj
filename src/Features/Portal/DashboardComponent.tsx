import { ReactNode } from 'react';

interface DashboardCollapseProps {
  title: string;
  idProp: string;
  children: ReactNode;
  open?: boolean;
}

export default function DashboardCollapse({
  title,
  idProp,
  children,
  open = true,
}: DashboardCollapseProps) {
  return (
    <div className='dashstatsContainer'>
      <details className='collapse border w-full dashboardCollapse' open={open}>
        <summary className='collapse-title font-semibold m-2!'>{title}</summary>

        <div className='collapse-content text-sm' id={idProp}>
          {children}
        </div>
      </details>
    </div>
  );
}
