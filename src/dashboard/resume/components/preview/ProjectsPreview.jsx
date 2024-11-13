import React from 'react';

function ProjectsPreview({ resumeInfo }) {
  const Projects = resumeInfo?.Projects;
  return (
    <div className='my-4'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: resumeInfo?.themeColor }}>
        Projects
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.Projects?.map((project, index) => (
        <div key={index} className='my-3'>
          <h2 className='text-sm font-bold' style={{ color: resumeInfo?.themeColor }}>
            {project?.title}
          </h2>
          <h2 className='text-xs flex justify-between my-1'>
            {project?.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {project?.githubLink}
              </a>
            )}
            <span>{project.startDate} To {project.endDate || 'Present'}</span>
          </h2>

          <p className='text-xs my-2'>
            Technologies Used: {project?.technologies || 'N/A'}
          </p>
          <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: project.projectDescription }} />
        </div>
      ))}
    </div>
  );
}

export default ProjectsPreview;









// import React from 'react';

// function ProjectsPreview({ resumeInfo }) {
//   return (
//     <div className='my-6'>
//       <h2 className='text-center font-bold text-sm mb-2'
//         style={{ color: resumeInfo?.themeColor }}>
//         Projects
//       </h2>    
//       <hr style={{ borderColor: resumeInfo?.themeColor }} />
      
//       {resumeInfo?.projects?.map((project, index) => (
//         <div key={index} className='my-5'>
//           <h2 className='text-sm font-bold'
//             style={{ color: resumeInfo?.themeColor }}>
//             {project?.title}
//           </h2>
//           <h2 className='text-xs flex justify-between my-1'>
//             {project?.projectName}, {project?.description}
//             <span>{project.startDate} To {project.endDate || 'Present'}</span>
//           </h2>

//           <p className='text-xs my-2'>
//             Technologies Used: {project?.technologies}
//           </p>
//           <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: project.projectSummary }} />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ProjectsPreview;
