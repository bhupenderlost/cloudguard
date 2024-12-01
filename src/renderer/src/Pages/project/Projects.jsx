/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Base from "../../Components/Base/Base"
import ProjectCard from '../../Components/Cards/Projects/ProjectCard'
import ProjectList from '../../Components/Cards/Projects/ProjectList'

const Projects = () => {
    const [projects, setProjects] = useState(null)
    useEffect(() => {
        window.document.title = "Projects | Cloudguard"
        window.electron.ipcRenderer.invoke('get-projects')
            .then((data) => {
                console.log(data)
                setProjects(data.projects)
            })
            .catch((err) => {
                alert("Error: ", err)
            })
    }, [])

    return(
        <Base title={'Projects'}>
            <div className="p-2 flex gap-8 text-[#343C6A]">
                <div className="mb-8">
                    <h2 className="text-lg [font-family:'Lato-Bold',Helvetica] font-bold mb-4">Add New Project</h2>
                    <ProjectCard isAddNew />
                </div>
                <div className="mb-12">
                    <h2 className="text-lg [font-family:'Lato-Bold',Helvetica] font-bold mb-4">Running Projects</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <Link to="/View"><ProjectCard /></Link>
                        <ProjectCard />
                    </div>
                </div>
                </div>
                <div className="w-full">
                    <h3 className="text-lg [font-family:'Lato-Bold',Helvetica] font-bold mb-2 text-[#343C6A]">All Projects</h3>
                    <div className="bg-[#1814F3] h-1 rounded-tl-[10px] rounded-tr-[10px] mb-4 w-28"></div>
                    <ProjectList projects={projects ? projects : []} />
                </div>
            
        </Base>
    )
}

export default Projects
