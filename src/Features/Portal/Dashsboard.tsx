import { Children, ReactNode, useEffect, useRef, useState } from 'react';
import '../../styling/dashboard.scss';
import APIGet from '../../api/GetAPI';
import gsap from 'gsap';

interface DashboardValue {
  dashboardName: string;
}

interface DashboardRow {
  id: number;
  statName: string;
  description: string;
  ticket_created: string;
}

interface StatCardProps {
  dashboardObject: DashboardRow[];
  children: ReactNode;
}

function CreateStatCard({ dashboardObject, children }: StatCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, { opacity: 0 });
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power3.inOut',
    });
  }, []);
  return (
    <div className='dashboardStatContainer' ref={containerRef}>
      <h3 className='statName'>{dashboardObject[0].statName}</h3>
      <p className='statDesc'>{dashboardObject[0].description}</p>
      <p className='dashboardVal'>{dashboardObject.length}</p>
      {children}
    </div>
  );
}

function GenerateStats({ orderedDates }: { orderedDates: DashboardRow[] }) {
  const seenDate = new Set<string>();
  let countMap: Record<string, number> = {};

  const unqiqueDate = orderedDates.filter((item) => {
    const day = new Date(item.ticket_created).toISOString().split('T')[0];
    countMap[day] = (countMap[day] || 0) + 1;

    if (seenDate.has(day)) {
      return false;
    }

    seenDate.add(day);
    return true;
  });
  return (
    <>
      <div className='recordDateContainer'>
        {unqiqueDate.map((item) => {
          const day = new Date(item.ticket_created).toISOString().split('T')[0];

          return (
            <p className='recordDateText' key={item.id}>
              {new Date(item.ticket_created).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
              })}
              - {countMap[day]}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default function DashboardStat({ dashboardName }: DashboardValue) {
  const [dashboardSetting, setDashboardSetting] = useState<DashboardRow[]>([]);
  const [orderedDates, setOrderedDates] = useState<DashboardRow[]>([]);

  function OrderDatesForStats(date: DashboardRow[]) {
    var orderedDates: DashboardRow[] = date.sort((a, b) => {
      return (
        new Date(a.ticket_created).getTime() -
        new Date(b.ticket_created).getTime()
      );
    });
    setOrderedDates(orderedDates);
  }

  useEffect(() => {
    async function GetDashboardName() {
      const data = await APIGet({
        APIEndPoint: 'getDashboardStart',
        parameter: 'dashboardName',
        value: dashboardName,
      });

      if (data) {
        setDashboardSetting(data);
        OrderDatesForStats(data);
      }
    }
    // Call Async function
    GetDashboardName();
  }, []);

  return (
    <div className='dashStatMain'>
      {dashboardSetting.length > 0 ? (
        <CreateStatCard dashboardObject={dashboardSetting}>
          <GenerateStats orderedDates={orderedDates} />
        </CreateStatCard>
      ) : (
        <>No Dashboard Stats Avaliable</>
      )}
    </div>
  );
}
