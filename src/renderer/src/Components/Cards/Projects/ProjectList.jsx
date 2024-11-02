import React from 'react';
import ProjectRow from './ProjectRow';

const projects = [
  { description: 'Project 5', info: '#12548796', type: 'Shopping', cardInfo: '1234 ****', date: '28 Jan, 12.30 AM', amount: '-$2,500' },
  { description: 'Freepik Sales', info: '#12548796', type: 'Transfer', cardInfo: '1234 ****', date: '25 Jan, 10.40 PM', amount: '+$750' },

];

function ProjectList() {
  return (
    <table className="min-w-full text-left">
      <thead>
        <tr className="border-b text-[#718EBF]">
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">INFO</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">INFO</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Report</th>
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
