import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Projects = () => {
    useEffect(() => {
        window.document.title = "Projects | Cloudguard"
    })
    return(
        <Base title={'Projects'}>
            
        </Base>
    )

}

export default Projects