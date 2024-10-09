import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Dashboard = () => {
    useEffect(() => {
        window.document.title = "Dashboard | Cloudguard"
    })
    return(
        <Base title={'Dashboard'}>
            <div className="flex flex-row justify-evenly h-1/2 w-full">
                <div className="w-2/3">
                    <h1>Weekly Activity</h1>
                </div>
                <div className="w-1/3">
                    <h1>Recent Transactions</h1>
                </div>
            </div>
            <div className="h-1/2 w-full">
                <h1>Recent Projects</h1>
            </div>
        </Base>
    )

}

export default Dashboard