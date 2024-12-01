import React, { useState } from "react";
import Loading from "../../Loading";

function FileList({ files }) {
  const [loading, setLoading] = useState(false)
  const download = async (id) => {
    setLoading(true)
    try {
      await window.electron.ipcRenderer.invoke('download-file', { id: id })
      setLoading(false)
    }catch(err) {
      setLoading(false)
      alert(err)
    }
  }
  return (
    <div className=" p-8 ">
      {loading ? <Loading text={'Downloading And Decrypting'} icon={2} /> : ''}
      <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
      <div className="bg-[#1814F3] h-1 rounded-tl-[10px] rounded-tr-[10px] w-32"></div> 
      </div>
      <div className="space-y-4">
        {files.map((file) => (
          <div key={file.id} className="grid grid-cols-5 items-center gap-4 p-4  ">
            <div className="col-span-1">
            <div className="font-semibold text-[#232323]">File ID</div>
              <div className="text-[#718EBF]">{file.id}</div>
            </div>
            <div className="col-span-1 ">
              <div className="font-semibold text-[#232323]">File Name</div>
              <div className="text-[#718EBF]">{file.fileName}</div>
            </div>
            <div className="col-span-1 ">
              <div className="font-semibold text-[#232323]">Created At</div>
              <div className="text-[#718EBF]">{file.createdAt.split(" ")[0]}</div>
            </div>
            <button disabled={loading} onClick={() => download(file.id)} className="col-span-1 text-[#1814F3] hover:underline cursor-pointer">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileList;
