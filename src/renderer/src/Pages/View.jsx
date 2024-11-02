/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import Base from "../Components/Base/Base"
import ViewInfo from "../Components/Cards/View/ViewInfo"
import FileList from '../Components/Cards/View/FileList'
import ProjectList from '../Components/Cards/Projects/ProjectList'


const View = () => {
    useEffect(() => {
        window.document.title = "View | Cloudguard"
    })
    return(
        <Base title={'View'}>
            <div className="max-w-5xl space-y-8 [font-family:'Lato-Bold',Helvetica]">
                <ViewInfo/>
            </div>
            <div>
            <FileList/>
            </div>
            <div className="w-full">
                    <h3 className="text-lg [font-family:'Lato-Bold',Helvetica] font-bold mb-2 text-[#343C6A]">All Projects</h3>
                    <div className="bg-[#1814F3] h-1 rounded-tl-[10px] rounded-tr-[10px] mb-4 w-28"></div>
                    <ProjectList />
                </div>
        </Base>
    )

}

export default View