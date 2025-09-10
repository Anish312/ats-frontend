import React from 'react'
import './Home.css'
import UploadResume from '../uploadResume/UploadResume'
import ResumeCheckerInfo from '../../components/resumeCheckerInfo/ResumeCheckerInfo'
import Checklist from '../../components/checklist/Checklist'
import UploadResumeAnother from '../../components/uploadResumeAnother/UploadResumeAnother'
import InterviewBoost from '../../components/interviewBoost/InterviewBoost'
import RepetitionChecker from '../../components/repetitionChecker/RepetitionChecker'
function Home() {
  return (
    <div className='home'>
        <UploadResume/>
        <ResumeCheckerInfo/>
        <Checklist/>
        <InterviewBoost/>
        <UploadResumeAnother/>
        
    </div>
  )
}

export default Home