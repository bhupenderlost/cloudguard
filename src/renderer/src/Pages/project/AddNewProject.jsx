/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'
import Base from "../../Components/Base/Base"
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { generateRSAKeyPair } from '../../Helpers/Encryption/index'
import { useNavigate } from 'react-router-dom'

// Custom dropdown component
const CustomSelect = ({ options, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(value || placeholder)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (option) => {
        setSelected(option)
        onChange(option)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="border border-red px-4 py-2 rounded-md w-full h-12 text-left bg-white dark:bg-darkbg2"
            >
                {selected}
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 text-[#333333] cursor-pointer hover:text-black "
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const AddNewProject = () => {
    const [step, setStep] = useState(1)
    const [loginWindow, setLoginWindow] = useState(false)
    const [projectData, setProjectData] = useState({
        projectName: '',
        cloudPlatform: '',
        description: '',
        'gcpBucketId': ''
    })
    const [accessTokens, setAccessTokens] = useState(null)
    const [summary, setSummary] = useState({
        projectName: '',
        cloudPlatform: '',
        description: '',
    })

    useEffect(() => {
        window.document.title = "Add Project | Cloudguard"
    }, [])
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProjectData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleNext = () => {
        setSummary((prevSummary) => ({
            ...prevSummary,
            ...projectData,
        }))
        setStep((prevStep) => prevStep + 1)
    }

    const handleBack = () => {
        setAccessTokens(null)
        setStep((prevStep) => prevStep - 1)
    }

    const handleSubmit = async () => {
        try {

            const rsaPair = await generateRSAKeyPair()
            let data = {
                projectName: projectData.projectName,
                projectDescription: projectData.projectName,
                cloudPlatfrom: projectData.cloudPlatform,
                publicKey: rsaPair.publicKey,
                privateKey: rsaPair.privateKey,
                accessTokens: accessTokens
            }
            projectData.gcpBucketId !== '' ? data.gcpBucketId = projectData.gcpBucketId : null
            const response = await window.electron.ipcRenderer.invoke('create-project', data)
            if (response.success) {
                alert('Project Created!')
                navigate('/projects')
            }
        } catch (err) {
            alert(err)
        }
    }

    const handleAuthentication = async () => {
        try {
            if (projectData.cloudPlatform === "Amazon Web Services (AWS)") {
                alert("Not Active")
            } else if (projectData.cloudPlatform === "Google Cloud Platform") {
                setLoginWindow(true)
                const responseOAuth = await window.electron.ipcRenderer.invoke('login-with-google', { type: 'Google Cloud Platform' })
                setAccessTokens(JSON.stringify(responseOAuth))
                setSummary((prevSummary) => ({
                    ...prevSummary,
                    ...projectData,
                }))
                setLoginWindow(false)
                setStep((prevStep) => prevStep + 1)

            } else if (projectData.cloudPlatform === "Google Drive") {
                setLoginWindow(true)
                const responseOAuth = await window.electron.ipcRenderer.invoke('login-with-google', { type: 'Google Drive' })
                setAccessTokens(JSON.stringify(responseOAuth))
                setSummary((prevSummary) => ({
                    ...prevSummary,
                    ...projectData,
                }))
                setLoginWindow(false)
                setStep((prevStep) => prevStep + 1)

            } else if (projectData.cloudPlatform === "Dropbox") {

                const responseOAuth = await window.electron.ipcRenderer.invoke('login-with-dropbox')
                setAccessTokens(JSON.stringify(responseOAuth))
                setSummary((prevSummary) => ({
                    ...prevSummary,
                    ...projectData,
                }))
                console.log(responseOAuth)
                setStep((prevStep) => prevStep + 1)

            } else if (projectData.cloudPlatform === "Microsoft Azure") {

                alert("Not Active")
                // const responseOAuth = await window.electron.ipcRenderer.invoke('login-with-microsoft')
                // setAccessTokens(JSON.stringify(responseOAuth))
                // setSummary((prevSummary) => ({
                //     ...prevSummary,
                //     ...projectData,
                // }))
                // setStep((prevStep) => prevStep + 1)

            } else if (projectData.cloudPlatform === "Microsoft Onedrive") {

                alert("Not Active")
                // const responseOAuth = await window.electron.ipcRenderer.invoke('login-with-microsoft')
                // setAccessTokens(JSON.stringify(responseOAuth))
                // setSummary((prevSummary) => ({
                //     ...prevSummary,
                //     ...projectData,
                // }))
                // setStep((prevStep) => prevStep + 1)

            } else {
                alert("Invalid Input")
            }
        } catch (err) {
            console.log(err)
            alert("An Unexpected Error Occured")
        }
    }
    return (
        <Base title={'Add Project'}>
            <div className="p-6">
            {/* { loginWindow ? 'Wait For OAuth' : */}
                <div className="flex justify-center items-center h-96 space-y-4">
                    {step === 1 && (
                        <div className="flex items-center">
                            <div className="flex-1">
                                <label htmlFor="projectName" className="font-semibold">Project name</label>
                                <input
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    value={projectData.projectName}
                                    onChange={handleInputChange}
                                    className="border border-red px-4 py-2 rounded-md w-full mt-1 h-12 outline-none dark:bg-darkbg2"
                                />
                            </div>
                            {projectData.projectName && (
                                <button
                                    onClick={handleNext}
                                    className="mt-6 ml-6 w-[110px] h-[40px] bg-red text-white rounded-full"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex items-center">
                            <button
                                onClick={handleBack}
                                className="mt-6 mr-6 w-8 h-8">
                                <ArrowLeftCircleIcon />
                            </button>
                            <div className="flex-1 w-[400px]">
                                <label htmlFor="cloudPlatform" className="text-[#333333] font-semibold">Cloud Platform</label>
                                <CustomSelect
                                    options={['Google Drive', 'Google Cloud Platform', 'Amazon Web Services (AWS)', 'Microsoft Onedrive', 'Microsoft Azure']}
                                    placeholder="Select a Cloud Platform"
                                    value={projectData.cloudPlatform}
                                    onChange={(value) => setProjectData({ ...projectData, cloudPlatform: value })}
                                />
                            </div>
                            <div className="flex space-x-2">
                                {projectData.cloudPlatform && (
                                    <button
                                        onClick={handleAuthentication}
                                        className="mt-6 ml-6 w-[110px] h-[40px] bg-red text-white rounded-full"
                                    >
                                        Authenticate
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="flex items-center">
                            <div className="flex-1">
                                <div className="flex items-center justify-center mb-4">
                                    <button
                                        onClick={handleBack}
                                        className="mr-6 w-8 h-8"
                                    >
                                        <ArrowLeftCircleIcon />
                                    </button>
                                </div>
                                <div className="flex flex-col">
                                    {projectData.cloudPlatform !== 'Google Cloud Platform' ? '' :
                                        (
                                            <>
                                                <label htmlFor="gcpBucketId">Storage Bucket ID</label>
                                                <input onChange={handleInputChange} type="text" placeholder='Google Storage Bucket Id' name="gcpBucketId" id="gcpBucketId" />
                                            </>
                                        )
                                    }
                                    <label htmlFor="description" className="mt-4 font-semibold">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Add a Short Project Overview..."
                                        value={projectData.description}
                                        onChange={handleInputChange}
                                        className="border bg-[#F3F3F3] px-4 py-2 dark:bg-darkbg2 rounded-md w-[879px] mt-1 h-[236px] outline-none resize-none"
                                    />
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-[110px] h-[40px] bg-red text-white rounded-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            {/* } */}
                {/* Summary Section */}
                <div className="mt-12 p-4 border-t border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Project Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-[#6D6D6D]">
                        <div>
                            <p className='mb-1'><strong>Name:</strong> {summary.projectName}</p>
                            <p className='mb-1'><strong>Cloud Platform:</strong> {summary.cloudPlatform}</p>
                        </div>
                        <div>
                            <p><strong>Description:</strong>{summary.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default AddNewProject
