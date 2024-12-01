import React from 'react';
import { 
   ArrowPathIcon,
   CloudArrowDownIcon,
   CloudArrowUpIcon
} from '@heroicons/react/24/outline'
const Loading = ({ text, icon }) => {
  return (
    <div className="fixed h-[80px] w-[300px] bottom-8 right-8 p-4 bg-white border border-gray-300 shadow-lg rounded-md flex items-center space-x-2 z-50">
        {icon === 1 ? <ArrowPathIcon height={24} width={24} className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" /> :'' }
        {icon === 2 ? <CloudArrowDownIcon height={24} width={24} className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full " /> :'' }
        {icon === 3 ? <CloudArrowUpIcon height={24} width={24} className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full " /> :'' }

        <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Loading;
