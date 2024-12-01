import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';

function ProjectCard({ isAddNew }) {
  return (
    <div
      className={`w-[356px] h-[223.333px]  dark:bg-darkbg2 border ${isAddNew ? 'border-[3px] border-[#A0A0A0]' : 'border-gray-300 shadow-md hover:shadow-lg transition-all'} 
                  flex items-center justify-center rounded-3xl cursor-pointer`}
    >
      {isAddNew ? (
        <Link to="/AddNewProject">
          <PlusIcon className="h-16 w-16 text-[#A0A0A0]"/>
        </Link>
      ) : (
          <div  className="bg-gray-200 dark:bg-darkbg2 w-full h-full rounded-3xl"></div>
      )}
    </div>
  );
}

export default ProjectCard;
