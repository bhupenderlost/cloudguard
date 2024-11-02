import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

function UploadCard({ isAddNew }) {
  return (
    <div
      className={`w-[198.554px] h-[159px]  dark:bg-darkbg2 border ${isAddNew ? 'border-[3px] border-[#A0A0A0]' : 'border-gray-300 shadow-md hover:shadow-lg transition-all'} 
                  flex items-center justify-center rounded-3xl cursor-pointer`}
    >
      {isAddNew ? (  
          <PlusIcon className="h-16 w-16 text-[#A0A0A0]"/>
      ) : (
        <div className="bg-gray-200 dark:bg-darkbg2 w-full h-full rounded-3xl"></div>
      )}
    </div>
    
  );
}

export default UploadCard;
