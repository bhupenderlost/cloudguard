import { useEffect, useState } from 'react';
import Base from "../../Components/Base/Base";
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

// Custom dropdown component
const CustomSelect = ({ options, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(value || placeholder);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
    };

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
    );
};

const AddNewProject = () => {
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState({
        projectName: '',
        cloudPlatform: '',
        keyType: '',
        description: '',
    });
    const [summary, setSummary] = useState({
        projectName: '',
        cloudPlatform: '',
        keyType: '',
        description:'',
    });

    useEffect(() => {
        window.document.title = "Add Project | Cloudguard";
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = () => {
        setSummary((prevSummary) => ({
            ...prevSummary,
            ...projectData,
        }));
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
    };

    return (
        <Base title={'Add Project'}>
            <div className="p-6">
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
                                    options={['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform', 'IBM Cloud']}
                                    placeholder="Select a Cloud Platform"
                                    value={projectData.cloudPlatform}
                                    onChange={(value) => setProjectData({ ...projectData, cloudPlatform: value })}
                                />
                            </div>
                            <div className="flex space-x-2">
                                {projectData.cloudPlatform && (
                                    <button
                                        onClick={handleNext}
                                        className="mt-6 ml-6 w-[110px] h-[40px] bg-red text-white rounded-full"
                                    >
                                        Next
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
                                <label>Select Type of Key Generation</label>
                                </div>
                                <div className="flex justify-center space-x-20 mt-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="keyType"
                                            value="Key A"
                                            checked={projectData.keyType === "Key A"}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        Key A
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="keyType"
                                            value="Key B"
                                            checked={projectData.keyType === "Key B"}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        Key B
                                    </label>
                                </div>
                                <div className="flex flex-col">
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
                            <Link to="/SubmissionSuccess" onClick={() => {
                             
                                setSummary((prevSummary) => ({
                                    ...prevSummary,
                                    description: projectData.description,
                                    projectName: projectData.projectName,
                                    cloudPlatform: projectData.cloudPlatform,
                                    keyType: projectData.keyType,
                                }));
                            }}>
                                <button
                                    className="w-[110px] h-[40px] bg-red text-white rounded-full"
                                >
                                    Submit
                                </button>
                            </Link>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Summary Section */}
                <div className="mt-12 p-4 border-t border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Project Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-[#6D6D6D]">
                        <div>
                            <p className='mb-1'><strong>Name:</strong> {summary.projectName}</p>
                            <p className='mb-1'><strong>Cloud Platform:</strong> {summary.cloudPlatform}</p>
                            <p><strong>Key Type:</strong> {summary.keyType}</p>
                        </div>
                        <div>
                            <p><strong>Description:</strong>{summary.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    );
};

export default AddNewProject;
