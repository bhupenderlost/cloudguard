import React from 'react';

function ProjectRow({ project }) {
  const amountStyle = project.amount.trim().startsWith('-') ? 'text-[#FE5C73]' : 'text-[#16DBAA]';

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{project.description}</td>
      <td className="px-4 py-2">{project.info}</td>
      <td className="px-4 py-2">{project.type}</td>
      <td className="px-4 py-2">{project.cardInfo}</td>
      <td className="px-4 py-2">{project.date}</td>
      <td className={`px-4 py-2 ${amountStyle}`}>{project.amount}</td>
      <td className="px-4 py-2">
        <button className="border border-[#123288] text-[#123288] px-3 py-1 rounded-full">Download</button>
      </td>
    </tr>
  );
}

export default ProjectRow;
