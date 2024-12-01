import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
import Status from "../../Status";


function ProjectInfo({ project }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const handleFileSelect = async () => {
    setLoading(true)
    // Open the file dialog from the Electron main process
    const filePath = await window.electron.ipcRenderer.invoke('open-file-dialog');
    if (!filePath) return setLoading(false);

    // Upload the file and get the status
    const response = await window.electron.ipcRenderer.invoke('upload-file', {filePath: filePath, projectId: project.id});

    if (response.success) {
      setLoading(false)
      setStatus({ success: true })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      setLoading(false)
      setStatus({ error: true })
    }
  };

  return (
    <div className="flex justify-between items-start ">
      {loading ? <Loading text={'Encrypting And Uploading File.'} icon={3} /> : ''}
      {status.error ? <Status text={'Error Encrypting And Uploading File.'} icon={2} /> : ''}
      {status.success ? <Status text={'Success Encrypting And Uploading File.'} icon={3} /> : ''}


      <div className="flex flex-col">
        <div className="space-y-4 h-[350px] w-[652px] bg-grey shadow-md rounded-3xl p-6 dark:bg-darkbg2">
          <h2 className="text-2xl font-semibold ">{project.projectName}</h2>
          <p className="text-[#A5A5A5]">{project.projectDescription}</p>
        </div>
        <button onClick={handleFileSelect} className="w-[110px] h-[40px] mt-6 bg-red text-white rounded-full self-end">
          Upload File
        </button>
      </div>

      <div className="space-y-4 w-[300px]">
        <h3 className="text-lg font-semibold text-[#333B69]">Project Info</h3>
        <div className="space-y-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#A0D7E7] rounded-xl"></div>
              <span className="text-textgrey">Total files</span>
            </div>
            <span className="text-grey2 font-semibold">0</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#FDCFA4] rounded-xl"></div>
              <span className="text-textgrey">Last Modified</span>
            </div>
            <span className="text-grey2 font-semibold"></span>
          </div>

          {/* <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#F8B3CA] rounded-xl"></div>
              <span className="text-textgrey">Encryption</span>
            </div>
            <span className="text-grey2 font-semibold">{projectData.encryptionType}</span>
          </div> */}

          {/* <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#D9E6A2] rounded-xl"></div>
              <span className="text-textgrey">Key</span>
            </div>
            <span className="text-grey2 font-semibold cursor-pointer">
              {projectData.encryptionKey}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
