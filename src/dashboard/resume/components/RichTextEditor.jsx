import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModel';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const PROMPT = `
Project Title: {projectTitle}.
Technologies Used: {technologies}.
User Description: {userDescription}.
Based on the provided information, generate 5-7 bullet points for a resume experience section. 
The result should be wrapped in <ul> tags with each point as an <li> element, 
and should not include JSON or any additional information like experience level. 
Only output the HTML tags and content.
Dont Give anyting extra like {"experience": "html tags"} give directly the html tags.
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [userDescription, setUserDescription] = useState('');

    const GenerateSummeryFromAI = async () => {
        setLoading(true);

        // Validate that project title and technologies are provided
        const projectTitle = resumeInfo?.Projects[index]?.title;
        const technologiesUsed = resumeInfo?.Projects[index]?.technologies;

        if (!projectTitle) {
            toast('Please Add Project Title');
            setLoading(false);
            return;
        }

        if (!technologiesUsed) {
            toast('Please Add Technologies Used');
            setLoading(false);
            return;
        }

        const prompt = PROMPT
            .replace('{projectTitle}', projectTitle)
            .replace('{technologies}', technologiesUsed)
            .replace('{userDescription}', userDescription || ''); // Optional user description

        try {
            const result = await AIChatSession.sendMessage(prompt);
            console.log(result.response.text());
            const resp = result.response.text();
            setValue(resp);
        } catch (error) {
            toast('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Project Description</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ? (
                        <LoaderCircle className='animate-spin' />
                    ) : (
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    )}
                </Button>
            </div>
            <div className='mt-5 '>
            <h2 className="text-xs font-semibold ">
                For a Better AI Description, Provide a Project Description in Your Own Words below:</h2>
                <div className='mt-3'>
                <Textarea 
                    placeholder="Optional project description..."
                    className="input" // Add your input styles here
                    value={userDescription}
                    onChange={(e) => setUserDescription(e.target.value)}
                />
                </div>
                
            </div>
            <div className='mt-6'>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
            </div>
           
        </div>
    );
}

export default RichTextEditor;









// import { Button } from '@/components/ui/button';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { Brain, LoaderCircle } from 'lucide-react';
// import React, { useContext, useState } from 'react'
// import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
// import { AIChatSession } from './../../../../service/AIModel';
// import { toast } from 'sonner';

// const PROMPT = `
// Position Title: {positionTitle}.
// Based on the position title provided, generate 5-7 bullet points for a resume experience section. 
// The result should be wrapped in <ul> tags with each point as an <li> element, 
// and should not include JSON or any additional information like experience level. 
// Only output the HTML tags and content.
// `;

// function RichTextEditor({ onRichTextEditorChange, index }) {
//     const [value, setValue] = useState();
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const [loading, setLoading] = useState(false);

//     const GenerateSummeryFromAI = async () => {
//         setLoading(true);
//         if(!resumeInfo.experience[index].title) {
//             toast('Please Add Position Title');
//             return;
//         }
//         const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
//         const result = await AIChatSession.sendMessage(prompt);
//         console.log((result.response.text()));
//         const resp=result.response.text()
//         setValue(resp);
//         setLoading(false);
//     }


//     return (
//         <div>
//             <div className='flex justify-between my-2'>
//                 <label className='text-xs'>Summery</label>
//                 <Button variant="outline" size="sm"
//                     onClick={GenerateSummeryFromAI}
//                     disabled={loading}
//                     className="flex gap-2 border-primary text-primary">
//                     {loading ?
//                         <LoaderCircle className='animate-spin' /> :
//                         <>
//                             <Brain className='h-4 w-4' /> Generate from AI
//                         </>
//                     }
//                 </Button>
//             </div>
//             <EditorProvider>
//                 <Editor value={value} onChange={(e) => {
//                     setValue(e.target.value);
//                     onRichTextEditorChange(e)
//                 }}>
//                     <Toolbar>
//                         <BtnBold />
//                         <BtnItalic />
//                         <BtnUnderline />
//                         <BtnStrikeThrough />
//                         <Separator />
//                         <BtnNumberedList />
//                         <BtnBulletList />
//                         <Separator />
//                         <BtnLink />
//                     </Toolbar>
//                 </Editor>
//             </EditorProvider>
//         </div>
//     )
// }

// export default RichTextEditor