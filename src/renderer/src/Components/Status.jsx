import React from 'react';
import { 
   CheckCircleIcon, 
   XCircleIcon
} from '@heroicons/react/24/outline'
const Status = ({ text, icon }) => {
  return (
    <div className="fixed h-[80px] w-[300px] bottom-8 right-8 p-4 bg-white border border-gray-300 shadow-lg rounded-md flex items-center space-x-2 z-50">
        {icon == 1 ? <CheckCircleIcon height={24} width={24} className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full" /> : ''}
        {icon == 2 ? <XCircleIcon height={24} width={24} className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full" /> : ''}

        <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Status
;
