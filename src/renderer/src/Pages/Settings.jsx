import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Settings = () => {
    useEffect(() => {
        window.document.title = "Settings | Cloudguard"
    })
    return(
        <Base title={'Settings'}>
            
        </Base>
    )

}

export default Settings