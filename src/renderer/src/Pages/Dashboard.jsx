import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Dashboard = () => {
    useEffect(() => {
        window.document.title = "Dashboard | Cloudguard"
    })
    return(
        <Base title={'Dashboard'}>
            
        </Base>
    )

}

export default Dashboard