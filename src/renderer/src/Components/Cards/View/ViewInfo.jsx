import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProjectInfo() {
  const [projectData] = useState({
    name: "Project 1",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    totalFiles: 54,
    lastModified: "Date",
    encryptionType: "Type",
    encryptionKey: "Download",
  });

  return (
    <div className="flex justify-between items-start ">
      <div className="flex flex-col">
        <div className="space-y-4 h-[350px] w-[652px] bg-grey shadow-md rounded-3xl p-6">
          <h2 className="text-2xl font-semibold ">{projectData.name}</h2>
          <p className="text-[#A5A5A5]">{projectData.description}</p>
        </div>
        <Link to="/Upload">
        <button className="w-[110px] h-[40px] mt-6 bg-red text-white rounded-full self-end">
          Add Files
        </button>
        </Link>
      </div>

      <div className="space-y-4 w-[300px]">
        <h3 className="text-lg font-semibold text-[#333B69]">Project Info</h3>
        <div className="space-y-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#A0D7E7] rounded-xl"></div>
              <span className="text-textgrey">Total files</span>
            </div>
            <span className="text-grey2 font-semibold">{projectData.totalFiles}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#FDCFA4] rounded-xl"></div>
              <span className="text-textgrey">Last Modified</span>
            </div>
            <span className="text-grey2 font-semibold">{projectData.lastModified}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#F8B3CA] rounded-xl"></div>
              <span className="text-textgrey">Encryption</span>
            </div>
            <span className="text-grey2 font-semibold">{projectData.encryptionType}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#D9E6A2] rounded-xl"></div>
              <span className="text-textgrey">Key</span>
            </div>
            <span className="text-grey2 font-semibold cursor-pointer">
              {projectData.encryptionKey}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
