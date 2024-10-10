import { useEffect } from 'react'
import Base from "../Components/Base/Base"


const Wallet = () => {
    useEffect(() => {
        window.document.title = "Wallet | Cloudguard"
    })
    return(
        <Base title={'Wallet'}>
           
        </Base>
    )

}

export default Wallet