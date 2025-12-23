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
        <summary className='collapse-title font-semibold'>{title}</summary>
        <section className='dashboardMain' id={idProp}>
          <div className='collapse-content text-sm' />
          {children}
        </section>
      </details>
    </div>
  );
}
