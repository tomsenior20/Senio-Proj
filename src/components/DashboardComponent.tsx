import { ReactNode } from 'react';

interface DashboardCollapseProps {
  title: string;
  children: ReactNode;
  open?: boolean;
}

export default function DashboardCollapse({
  title,
  children,
  open = true,
}: DashboardCollapseProps) {
  return (
    <div className='dashstatsContainer'>
      <details className='collapse border w-full dashboardCollapse' open={open}>
        <summary className='collapse-title font-semibold'>{title}</summary>
        <section className='dashboardMain'>
          <div className='collapse-content text-sm' />
          {children}
        </section>
      </details>
    </div>
  );
}
