import React from "react";

function FileList() {
  const files = [
    { id: 1, name: "File 1", description: "lorem", info1: "**** **** 5600", info2: "lorem" },
    { id: 2, name: "File 2", description: "lorem", info1: "**** **** 5600", info2: "lorem" },
    { id: 3, name: "File 3", description: "lorem", info1: "**** **** 5600", info2: "lorem" },
  ];

  return (
    <div className=" p-8 ">
      <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
      <div className="bg-[#1814F3] h-1 rounded-tl-[10px] rounded-tr-[10px] w-32"></div> 
      </div>
      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="grid grid-cols-5 items-center gap-4 p-4  ">
            <div className="col-span-1">
            <div className="font-semibold text-[#232323]">{file.name}</div>
              <div className="text-[#718EBF]">Secondary</div>
            </div>
            <div className="col-span-1 ">
              <div className="font-semibold text-[#232323]">Info</div>
              <div className="text-[#718EBF]">{file.description}</div>
            </div>
            <div className="col-span-1">
              <div className="font-semibold text-[#232323]">Info</div>
              <div className="text-[#718EBF]">{file.info1}</div>
            </div>
            <div className="col-span-1">
              <div className="font-semibold text-[#232323]">Info</div>
              <div className="text-[#718EBF]">{file.info2}</div>
            </div>
            <div className="col-span-1 text-[#1814F3] hover:underline cursor-pointer">View Details</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileList;
