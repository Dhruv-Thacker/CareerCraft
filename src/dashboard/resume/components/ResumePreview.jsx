import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'

function ResumePreview() {

    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor:resumeInfo?.themeColor
      }}>
        {/* personal details */}
            <PersonalDetailPreview resumeInfo={resumeInfo}/>

        {/* summary */} 
            <SummaryPreview resumeInfo={resumeInfo}/>

        {/* {projects} */}
              {/* <ExperiencePreview resumeInfo={resumeInfo}/> */}
              <ProjectsPreview resumeInfo={resumeInfo}/>
       {/*  {educational details} */}
              <EducationalPreview resumeInfo={resumeInfo}/>

       {/* skills */}
              <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview