import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModel';


const prompt = `
Job Title: {jobTitle}. 
Job Description: {jobDescription}. 
Please provide a concise summary for my resume based on the job title and job description above. 
The summary should be formatted in JSON and include the following fields for each experience level: 
- "experienceLevel" with values "Fresher," "Mid-Level," and "Experienced",
- "summary" which should be a descriptive 6-7 line summary of qualifications and skills relevant to the job title and description. 

Additionally, please provide a suggested summary that includes specific relevant technologies, frameworks, and databases mentioned in the job description, ensuring it has an ATS score of 80+.

Example of the expected output:
[
  {
    "experienceLevel": "Suggested Summary",
    "summary": "Your ATS optimized summary for the job description provided."
  },
  {
    "experienceLevel": "Fresher",
    "summary": "Motivated computer science graduate with a strong foundation in software development. Proficient in Java, Python, and JavaScript. Eager to contribute to innovative projects and grow in a collaborative environment."
  },
  {
    "experienceLevel": "Mid-Level",
    "summary": "Experienced software developer with a strong background in building scalable applications. Proficient in modern frameworks and technologies such as React, Node.js, and cloud services."
  },
  {
    "experienceLevel": "Experienced",
    "summary": "Senior software engineer with extensive experience in software architecture and design. Proven track record of leading projects and mentoring junior developers, specializing in high-performance systems."
  }
]
Please ensure the response follows this structure exactly.
Please use the correct english.
please dont depend on the user for further editing like dont use these [number] and all. 
`;



function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
  const [isModified, setIsModified] = useState(false); // Track if the summary is modified
  const [userDescription, setUserDescription] = useState('');


  useEffect(() => {
    // Enable next button only if summary is saved
    enabledNext(!isModified && summery !== '');
  }, [isModified, summery]); // Dependency on isModified and summery

  useEffect(() => {
    if (summery && summery !== resumeInfo.summery) {
      setResumeInfo(prev => ({
        ...prev,
        summery: summery,
      }));
    }
  }, [summery, resumeInfo.summery, setResumeInfo]);

  useEffect(() => {
    setSummery(resumeInfo?.summery || ''); // Update summery if resumeInfo changes
  }, [resumeInfo]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle).replace('{jobDescription}', userDescription ? userDescription : '');;
                         
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    try {
      const responseText = await result.response.text();
      console.log('Raw response:', responseText);
      
      const parsedResult = JSON.parse(responseText);
      console.log('Parsed result:', parsedResult);

      setAiGenerateSummeryList(parsedResult);
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!summery) return; // Prevent saving if summary is empty

    setLoading(true);
    const data = { data: { summery } };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
      console.log(resp);
      setIsModified(false); // Reset modified state after saving
      enabledNext(true); // Enable Next button after saving
      setLoading(false);
      toast("Details Updated Successfully.");
    }, (error) => {
      setLoading(false);
    });
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant="outline" onClick={GenerateSummeryFromAI} 
            type="button" size="sm" className="border-primary text-primary flex gap-2">
              <Brain className='h-4 w-4' />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery} // Control the value of the textarea
            
            onChange={(e) => {
              setSummery(e.target.value);
              setIsModified(true); // Set modified state to true on change
            }}
          />
          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
  <div className='my-5'>
    <h2 className='font-bold text-lg'>Suggestions</h2>
    
    {/* Textarea for Job Description */}
    <div className='mt-3 text-xs'>
      <label htmlFor="jobDescription" className='block mb-1 font-semibold'>
        For a better AI-generated summary, please provide a Job description below:</label>
      <Textarea
        id="jobDescription"
        placeholder="Optional: Paste the job description here for better results..."
        className="input"
        value={userDescription} // Assuming you have a state for this
        onChange={(e) => setUserDescription(e.target.value)}
      />
    </div>

    {aiGeneratedSummeryList.map((item, index) => (
      <div key={index}
        onClick={() => {
          setSummery(item?.summary);
          setIsModified(true); // Set modified state to true when suggestion is clicked
        }}
        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
        <h2 className='font-bold my-1 text-primary'>Level: {item?.experienceLevel}</h2>
        <p>{item?.summary}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
}

export default Summery;









// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import React, { useContext, useEffect, useState } from 'react';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { AIChatSession } from './../../../../../service/AIModel';

// const prompt = `
// Job Title: {jobTitle}. 
// Please provide a concise summary for my resume based on the job title above. 
// The summary should be formatted in JSON and include the following fields for each experience level: 
// - "experienceLevel" with values "Fresher," "Mid-Level," and "Experienced",
// - "summary" which should be a descriptive 4-5 line summary of qualifications and skills relevant to the job title.

// Example of the expected output:
// [
//   {
//     "experienceLevel": "Fresher",
//     "summary": "Motivated computer science graduate with a strong foundation in software development. Proficient in Java, Python, and JavaScript. Eager to contribute to innovative projects and grow in a collaborative environment."
//   },
//   {
//     "experienceLevel": "Mid-Level",
//     "summary": "Experienced software developer with a strong background in building scalable applications. Proficient in modern frameworks and technologies such as React, Node.js, and cloud services."
//   },
//   {
//     "experienceLevel": "Experienced",
//     "summary": "Senior software engineer with extensive experience in software architecture and design. Proven track record of leading projects and mentoring junior developers, specializing in high-performance systems."
//   }
// ]
// Please ensure the response follows this structure exactly.
// `;

// function Summery({ enabledNext }) {
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const [summery, setSummery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const params = useParams();
//   const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
//   const [isModified, setIsModified] = useState(false); // Track if the summary is modified

//   useEffect(() => {
//     // Enable next button only if summary is saved
//     enabledNext(!isModified && summery !== '');
//   }, [isModified, summery]); // Dependency on isModified and summery

//   useEffect(() => {
//     if (summery && summery !== resumeInfo.summery) {
//       setResumeInfo(prev => ({
//         ...prev,
//         summery: summery,
//       }));
//     }
//   }, [summery, resumeInfo.summery, setResumeInfo]);
//   const GenerateSummeryFromAI = async () => {
//     setLoading(true);
//     const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
//     console.log(PROMPT);
//     const result = await AIChatSession.sendMessage(PROMPT);
//     try {
//       const responseText = await result.response.text();
//       console.log('Raw response:', responseText);
      
//       //const wrappedResponse = responseText.trim(); 
//       const parsedResult = JSON.parse(responseText);
//       console.log('Parsed result:', parsedResult);

//       setAiGenerateSummeryList(parsedResult);
//     } catch (error) {
//       console.error('Error parsing AI response:', error);
//     }
//     setLoading(false);
//   };

//   const onSave = (e) => {
//     e.preventDefault();
//     if (!summery) return; // Prevent saving if summary is empty

//     setLoading(true);
//     const data = { data: { summery } };
//     GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
//       console.log(resp);
//       setIsModified(false); // Reset modified state after saving
//       enabledNext(true); // Enable Next button after saving
//       setLoading(false);
//       toast("Details Updated Successfully.");
//     }, (error) => {
//       setLoading(false);
//     });
//   };

//   return (
//     <div>
//       <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//         <h2 className='font-bold text-lg'>Summary</h2>
//         <p>Add Summary for your job title</p>

//         <form className='mt-7' onSubmit={onSave}>
//           <div className='flex justify-between items-end'>
//             <label>Add Summary</label>
//             <Button variant="outline" onClick={GenerateSummeryFromAI} type="button" size="sm" className="border-primary text-primary flex gap-2">
//               <Brain className='h-4 w-4' />
//               Generate from AI
//             </Button>
//           </div>
//           <Textarea
//             className="mt-5"
//             required
//             value={summery} // Control the value of the textarea
            
//             onChange={(e) => {
//               setSummery(e.target.value);
//               setIsModified(true); // Set modified state to true on change
//             }}
//           />
//           <div className='mt-2 flex justify-end'>
//             <Button type="submit" disabled={loading}>
//               {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//             </Button>
//           </div>
//         </form>
//       </div>

//       {aiGeneratedSummeryList && (
//         <div className='my-5'>
//           <h2 className='font-bold text-lg'>Suggestions</h2>
//           {aiGeneratedSummeryList.map((item, index) => (
//             <div key={index}
//               onClick={() => {
//                 setSummery(item?.summary);
//                 setIsModified(true); // Set modified state to true when suggestion is clicked
//               }}
//               className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
//               <h2 className='font-bold my-1 text-primary'>Level: {item?.experienceLevel}</h2>
//               <p>{item?.summary}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Summery;