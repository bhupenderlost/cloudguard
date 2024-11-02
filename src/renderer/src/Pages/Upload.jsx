import React, { useState, useEffect } from 'react';
import Base from "../Components/Base/Base";
import UploadCard from '../Components/Cards/Upload/UploadCard';
import EncryptButton from '../Components/Cards/Upload/Encrypt';
import ProjectList from '../Components/Cards/Projects/ProjectList'

const Upload = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.document.title = "Upload | Cloudguard";
    }, []);

    const handleEncryptClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Base title={'Upload'}>
            <div className="p-2 flex flex-col gap-8">
                <div className="mb-8">
                    <div className="flex gap-6">
                        <UploadCard isAddNew />
                        <UploadCard />
                        <UploadCard />
                        <UploadCard />
                        <UploadCard />
                    </div>
                </div>

                <div className="mt-4">
                    <EncryptButton 
                        onClick={handleEncryptClick} 
                        name="Name" 
                        encryptionType="Encryption Type" 
                    />
                </div>

                {showModal && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full space-y-4 relative">
                                <button 
                                    onClick={handleCloseModal} 
                                    className="absolute top-2 right-3 text-red-500 font-bold text-lg"
                                >
                                    &times;
                                </button>
                                
                                <h2 className="text-xl font-semibold text-center">Encryption completed!</h2>

                                <div className="space-y-2">
                                    {['File 1', 'File 2', 'File 3'].map((file, index) => (
                                        <label key={index} className="flex items-center bg-[#E6EFF5] p-3 rounded-2xl cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                name="fileSelect" 
                                                value={file}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    if (checked) {
                                                        setSelectedFiles((prev) => [...prev, file]);
                                                    } else {
                                                        setSelectedFiles((prev) => prev.filter(f => f !== file));
                                                    }
                                                }} 
                                                className="mr-2" 
                                            />
                                            {file}
                                        </label>
                                    ))}
                                </div>

                                <div className="flex space-x-4 justify-center mt-4">
                                    <button className="bg-red text-white px-4 py-2 rounded-full">
                                        Upload selected
                                    </button>
                                    <button className="bg-red text-white px-4 py-2 rounded-full">
                                        Upload all
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                 <div className="w-full">
                    <h3 className="text-lg [font-family:'Lato-Bold',Helvetica] font-bold mb-2 text-darkblue">All Projects</h3>
                    <div className="bg-[#1814F3] h-1 rounded-tl-[10px] rounded-tr-[10px] mb-4 w-28"></div>
                    <ProjectList />
                </div>
            </div>
        </Base>
    );
};

export default Upload;
