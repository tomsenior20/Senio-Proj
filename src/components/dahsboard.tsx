import { useEffect, useState } from "react"
import "../styling/dashboard.scss";

interface DashboardValue {
    dashboardName: string
}

interface DashboardRow {
  id: number;
  statName: string;
  description: string;
  ticket_created: string;
}

function GenerateStats({ orderedDates }: { orderedDates: DashboardRow[] }) {
    const seenDate = new Set<string>();
    let countMap: Record<string,number> = {};

    const unqiqueDate = orderedDates.filter(item => {
        const day = new Date(item.ticket_created).toISOString().split("T")[0];
        countMap[day] = (countMap[day] || 0) + 1;

        if(seenDate.has(day)){
            return false;
        }

        seenDate.add(day);
        return true;
    })
    return (
        <>
            {unqiqueDate.map(item => {
                const day = new Date(item.ticket_created).toISOString().split("T")[0];

                return(
                    <div className="recordDateContainer" key={item.id}>
                        <p className="recordDateText" key={item.id}>{new Date(item.ticket_created).toLocaleDateString()} - {countMap[day]}</p>
                    </div>
                )
            })}
        </>
    );
}

export default function DashboardStat({dashboardName} : DashboardValue){
    const [dashboardSetting,setDashboardSetting] = useState<DashboardRow[]>([]);
    const [orderedDates, setOrderedDates] = useState<DashboardRow[]>([]);

    function OrderDatesForStats(date : DashboardRow[]){
        var orderedDates : DashboardRow[] = date.sort((a,b) => { return new Date(a.ticket_created).getTime() - new Date(b.ticket_created).getTime() });
        setOrderedDates(orderedDates);
    }


    const isLocalhost = window.location.hostname === "localhost";
    const baseUrl =  isLocalhost ? `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}` : `${import.meta.env.VITE_LAN_API_URL}:${import.meta.env.VITE_LAN_API_PORT}` ;
    
    useEffect(() => {
        fetch(`${baseUrl}/api/getDashboardStart?dashboardName=${dashboardName}`)
        .then(res => res.json())
        .then(json => {
        setDashboardSetting(json); 
        OrderDatesForStats(json);
        })
    .catch(console.error);
    }, [])
    return(
        <div className="dashStatMain">
            {dashboardSetting.length > 0 ? (
                <>
                <div className="dashboardStatContainer">
                    <h3 className="statName">{dashboardSetting[0].statName}</h3>
                    <p className="statDesc">{dashboardSetting[0].description}</p>
                    <p className="dashboardVal">{dashboardSetting.length}</p>
                    <GenerateStats orderedDates={orderedDates} />
                </div>
                </>
            ) : (
                <>
                    No Dashboard Stats Avaliable
                </>
            )}
        </div>
    )
}