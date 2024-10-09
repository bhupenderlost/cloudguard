import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Plans = () => {
    useEffect(() => {
        window.document.title = "Plans | Cloudguard"
    })
    return(
        <Base title={'Plans'}>
            
        </Base>
    )

}

export default Plans