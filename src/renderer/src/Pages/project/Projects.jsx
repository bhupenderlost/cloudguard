/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import Base from "../../Components/Base/Base"
import ProjectCard from '../../Components/Cards/Projects/ProjectCard'
import ProjectList from '../../Components/Cards/Projects/ProjectList'

const Projects = () => {
    useEffect(() => {
        window.document.title = "Projects | Cloudguard"
    })

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
                        <ProjectCard />
                        <ProjectCard />
                    </div>
                </div>
                </div>
                <div className="w-full">
                    <h3 className="text-lg [font-family:'Lato-Bold',Helvetica] font-bold mb-2 text-[#343C6A]">All Projects</h3>
                    <div className="bg-[#1814F3] h-1 rounded-tl-[10px] rounded-tr-[10px] mb-4 w-28"></div>
                    <ProjectList />
                </div>
            
        </Base>
    )
}

export default Projects
