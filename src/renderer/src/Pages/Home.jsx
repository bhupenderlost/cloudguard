import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        window.document.title = "Home | Cloudguard"
    })
    return(
        <div>
            <button onClick={() => navigate('/dashboard')}>Go To Dashboard</button>
        </div>
    )

}

export default Home