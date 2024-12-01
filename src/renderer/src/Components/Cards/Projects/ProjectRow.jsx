import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectRow({ project }) {
  const navigate = useNavigate()
  return (
    <tr onClick={() => navigate(`/View/${project.id}`)} className="border-b">
      <td className="px-4 py-2">{project.id}</td>
      <td className="px-4 py-2">{project.projectName}</td>
      <td className="px-4 py-2">{project.projectDescription}</td>
      <td className="px-4 py-2">{project.cloudPlatfrom}</td>
      {/* <td className="px-4 py-2">{project.createdAt.split(" ")[0]}</td> */}
     
    </tr>
  );
}

export default ProjectRow;
