/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Keys = () => {
    useEffect(() => {
        window.document.title = "Keys | Cloudguard"
    })
    return(
        <Base title={'Keys'}>
            
        </Base>
    )

}

export default Keys