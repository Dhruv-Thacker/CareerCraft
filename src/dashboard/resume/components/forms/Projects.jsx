import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

function Projects() {
    const [projectList, setProjectList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo && setProjectList(resumeInfo?.Projects)
    }, [])

    const handleChange = (index, event) => {
        const newEntries = projectList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        console.log(newEntries)
        setProjectList(newEntries);
    };

    const AddNewProject = () => {
        setProjectList([...projectList, {
            title: '',
            githubLink: '',
            technologies: '',
            startDate: '',
            endDate: '',
            projectDescription: '',
        }]);
    };

    const RemoveProject = () => {
        setProjectList(projectList => projectList.slice(0, -1));
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = projectList.slice();
        newEntries[index][name] = e.target.value;
        setProjectList(newEntries);
    };

    useEffect(() => {
        console.log(projectList);
        setResumeInfo({
            ...resumeInfo,
            Projects: projectList
        });
    }, [projectList]);

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                Projects: projectList.map(({ id, ...rest }) => rest)
            }
        };

        console.log(projectList);

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast('Details Updated Successfully.');
        }, (error) => {
            setLoading(false);
        });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Projects</h2>
            <p>Add Your projects</p>
            <div>
                {projectList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label className='text-xs col'>Project Title</label>
                                <Input name="title" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.title} />
                            </div>
                            <div>
                                <label className='text-xs'>GitHub Link</label>
                                <Input name="githubLink" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.githubLink} />
                            </div>
                            <div>
                                <label className='text-xs'>Technologies Used</label>
                                <Input name="technologies" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.technologies} />
                            </div>
                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input type="date" name="startDate" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.startDate} />
                            </div>
                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input type="date" name="endDate" onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.endDate} />
                            </div>
                            <div className='col-span-2'>
                                <RichTextEditor
                                    index={index}
                                    defaultValue={item?.projectDescription}
                                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'projectDescription', index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewProject} className="text-primary"> + Add More Project</Button>
                    <Button variant="outline" onClick={RemoveProject} className="text-primary"> - Remove</Button>
                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Projects;














// import React, { useContext, useEffect, useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import RichTextEditor from '../RichTextEditor';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { toast } from 'sonner';
// import { LoaderCircle } from 'lucide-react';

// const formField = {
//     title: '',
//     projectName: '',
//     description: '',
//     technologies: '',
//     startDate: '',
//     endDate: '',
//     projectSummary: '',
// };

// function Projects() {
//     const [projectList, setProjectList] = useState([formField]);
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const params = useParams();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Check if resumeInfo.Projects exists and is an array, otherwise use an empty array
//         if (Array.isArray(resumeInfo?.Projects) && resumeInfo.Projects.length > 0) {
//             setProjectList(resumeInfo.Projects);
//         }
//     }, [resumeInfo]);

//     const handleChange = (index, event) => {
//         const newEntries = projectList.slice();
//         const { name, value } = event.target;
//         newEntries[index][name] = value;
//         setProjectList(newEntries);
//     };

//     const AddNewProject = () => {
//         setProjectList([...projectList, {
//             title: '',
//             projectName: '',
//             description: '',
//             technologies: '',
//             startDate: '',
//             endDate: '',
//             projectSummary: '',
//         }]);
//     };

//     const RemoveProject = () => {
//         setProjectList(projectList => projectList.slice(0, -1));
//     };

//     const handleRichTextEditor = (e, name, index) => {
//         const newEntries = projectList.slice();
//         newEntries[index][name] = e.target.value;
//         setProjectList(newEntries);
//     };

//     useEffect(() => {
//         console.log(projectList);
//         setResumeInfo({
//             ...resumeInfo,
//             projects: projectList
//         });
//     }, [projectList]);

//     const onSave = () => {
//         setLoading(true);
//         const data = {
//             data: {
//                 Projects: projectList.map(({ id, ...rest }) => rest)
//             }
//         };

//         console.log(projectList);

//         GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
//             console.log(res);
//             setLoading(false);
//             toast('Details Updated Successfully.');
//         }, (error) => {
//             setLoading(false);
//         });
//     };

//     return (
//         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//             <h2 className='font-bold text-lg'>Projects</h2>
//             <p>Add Your projects</p>
//             <div>
//                 {projectList.map((item, index) => (
//                     <div key={index}>
//                         <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
//                             <div>
//                                 <label className='text-xs'>Project Title </label>
//                                 <Input name="title" onChange={(event) => handleChange(index, event)} />
//                             </div>
//                             <div>
//                                 <label className='text-xs'>Project Name</label>
//                                 <Input name="projectName" onChange={(event) => handleChange(index, event)} />
//                             </div>
//                             <div>
//                                 <label className='text-xs'>Description</label>
//                                 <Input name="description" onChange={(event) => handleChange(index, event)} />
//                             </div>
//                             <div>
//                                 <label className='text-xs'>Technologies Used</label>
//                                 <Input name="technologies" onChange={(event) => handleChange(index, event)} />
//                             </div>
//                             <div>
//                                 <label className='text-xs'>Start Date</label>
//                                 <Input type="date" name="startDate" onChange={(event) => handleChange(index, event)} />
//                             </div>
//                             <div>
//                                 <label className='text-xs'>End Date</label>
//                                 <Input type="date" name="endDate" onChange={(event) => handleChange(index, event)} />
//                             </div>
//                             <div className='col-span-2'>
//                                 <RichTextEditor
//                                     index={index}
//                                     onRichTextEditorChange={(event) => handleRichTextEditor(event, 'projectSummary', index)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className='flex justify-between'>
//                 <div className='flex gap-2'>
//                     <Button variant="outline" onClick={AddNewProject} className="text-primary"> + Add More Project</Button>
//                     <Button variant="outline" onClick={RemoveProject} className="text-primary"> - Remove</Button>
//                 </div>
//                 <Button disabled={loading} onClick={() => onSave()}>
//                     {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Projects;
