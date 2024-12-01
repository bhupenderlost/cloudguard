import React from 'react';
import ProjectRow from './ProjectRow';



function ProjectList({ projects }) {
  return (
    <table className="min-w-full text-left">
      <thead>
        <tr className="border-b text-[#718EBF]">
          <th className="px-4 py-2">Project ID</th>
          <th className="px-4 py-2">Project Name</th>
          <th className="px-4 py-2">Project Description</th>
          <th className="px-4 py-2">Cloud Platform</th>
          <th className="px-4 py-2">Created</th>

        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <ProjectRow key={index} project={project} />
        ))}
      </tbody>
    </table>
  );
}

export default ProjectList;
