/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'
import Base from "../Components/Base/Base"
import ViewInfo from "../Components/Cards/View/ViewInfo"
import FileList from '../Components/Cards/View/FileList'
import { useParams } from 'react-router-dom'


const View = () => {
    const params = useParams()
    const [project, setProject] = useState(null)
    const [files, setFiles] = useState(null)
    useEffect(() => {
        window.document.title = "View | Cloudguard"
        console.log(params)
        window.electron.ipcRenderer.invoke('get-project-by-id', {
            id: params.id
        })
            .then((data) => {
                setProject(data.project)
                console.log(data)
            })
            .catch((err) => {
                alert("Error: ", err)
            })
            console.log(params.id)
        window.electron.ipcRenderer.invoke('get-files', {
            projectId: params.id
        })
            .then((data) => {
                setFiles(data.files)
            })
            .catch((err) => {
                alert("Error: ", err)
            })

    }, [])

    return (
        <Base title={'View'}>
            <div className="max-w-5xl space-y-8 [font-family:'Lato-Bold',Helvetica]">
                <ViewInfo project={project ? project : []} />
            </div>
            <div>
                <FileList files={files ? files : []} />
            </div>

        </Base>
    )

}

export default View