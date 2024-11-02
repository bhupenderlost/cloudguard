/* eslint-disable prettier/prettier */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Base from "../../Components/Base/Base";
import ProjectCreated from "../../Assets/Media/project-created.png"

const SubmissionSuccess = () => {
    useEffect(() => {
        window.document.title = "Add Project | Cloudguard";
    }, []);

    return (
        <Base title={'Add Project'}>
            <div className="flex flex-col items-center p-8 space-y-6">
                <h1 className="text-2xl font-semibold text-green-600">Project Created!</h1>
                
                 <img 
                    src={ProjectCreated} 
                    alt="Success" 
                    className= "h-72 object-cover" 
                /> 
                <div className="flex space-x-4">
                    <Link to="/View">
                        <button className="px-6 py-2 w-[110px] h-[40px] bg-[#FE5C73] text-white rounded-full">
                            View
                        </button>
                    </Link>
                    <Link to="/Upload">
                        <button className="px-6 py-2  h-[40px] bg-[#FE5C73] text-white rounded-full">
                            Upload Files
                        </button>
                    </Link>
                </div>
            </div>
        </Base>
    );
};

export default SubmissionSuccess;
