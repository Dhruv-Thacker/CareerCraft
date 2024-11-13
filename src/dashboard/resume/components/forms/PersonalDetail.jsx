import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {

  const params=useParams();
  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
  const [formData,setFormData]=useState();
  const [loading,setLoading]=useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Enable the "Next" button only if no modifications are made
    enabledNext(!isModified);
  }, [isModified, enabledNext]);

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value
  })
    setResumeInfo({
      ...resumeInfo,
      [name]:value
  });
  setIsModified(true); // Set modified state to true
  enabledNext(false); // Disable "Next" until saved
  };
  
  const onSave=(e)=>{
    e.preventDefault();
    setLoading(true);
    const data={
      data:formData
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
      console.log(resp);
      setIsModified(false);
      enabledNext(true);
      setLoading(false);
      toast("Details Updated Successfully.")

    },(error)=>{setLoading(false);})
    

  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" required onChange={handleInputChange} 
                    defaultValue={resumeInfo?.lastName} />
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name="jobTitle" required 
                    defaultValue={resumeInfo?.jobTitle}
                    onChange={handleInputChange} ></Input> 
                 </div>
                 <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" required 
                    defaultValue={resumeInfo?.address}
                    onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input name="phone" required 
                    defaultValue={resumeInfo?.phone}
                    onChange={handleInputChange}  />
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name="email" required 
                    defaultValue={resumeInfo?.email}
                    onChange={handleInputChange}  />
                </div>
            </div>
          <div className='mt-3 flex justify-end'>
            <Button type="submit"
            disabled={loading}>
              {loading?<LoaderCircle className='animate-spin' />:'Save'}
            </Button>
          </div>
        </form>
    </div>
  )
}

export default PersonalDetail





// import { ResumeInfoContext } from '@/context/ResumeInfoContext' 
// import React, { useContext, useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

// function PersonalDetail({ enabledNext }) {

//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Log the `enabledNext` function to verify it's being passed correctly
//     console.log({ enabledNext });
//   }, [enabledNext]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setResumeInfo({
//       ...resumeInfo,
//       [name]: value
//     });

//     // Make sure enabledNext is called properly and is not undefined
//     if (enabledNext && typeof enabledNext === 'function') {
//       enabledNext(false); // Disable Next button after any input change
//     }
//   }

//   const onSave = (e) => {
//     e.preventDefault();
//     if (enabledNext && typeof enabledNext === 'function') {
//       enabledNext(true); // Enable Next button after saving
//     }
//   }

//   return (
//     <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//       <h2 className='font-bold text-lg'>Personal Detail</h2>
//       <p>Get Started with the basic information</p>

//       <form onSubmit={onSave}>
//         <div className='grid grid-cols-2 mt-5 gap-3'>
//           <div>
//             <label className='text-sm'>First Name</label>
//             <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
//           </div>
//           <div>
//             <label className='text-sm'>Last Name</label>
//             <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName} />
//           </div>
//           <div className='col-span-2'>
//             <label className='text-sm'>Job Title</label>
//             <Input name="jobTitle" required onChange={handleInputChange} defaultValue={resumeInfo?.jobTitle} />
//           </div>
//           <div className='col-span-2'>
//             <label className='text-sm'>Address</label>
//             <Input name="address" required onChange={handleInputChange} defaultValue={resumeInfo?.address} />
//           </div>
//           <div>
//             <label className='text-sm'>Phone</label>
//             <Input name="phone" required onChange={handleInputChange} defaultValue={resumeInfo?.phone} />
//           </div>
//           <div>
//             <label className='text-sm'>Email</label>
//             <Input name="email" required onChange={handleInputChange} defaultValue={resumeInfo?.email} />
//           </div>
//         </div>
//         <div className='mt-3 flex justify-end'>
//           <Button type="submit">Save</Button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default PersonalDetail;
