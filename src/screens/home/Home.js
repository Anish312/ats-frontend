import React, { useEffect, useRef } from 'react'
import './Home.css'
import UploadResume from '../uploadResume/UploadResume'
import ResumeCheckerInfo from '../../components/resumeCheckerInfo/ResumeCheckerInfo'
import Checklist from '../../components/checklist/Checklist'
import UploadResumeAnother from '../../components/uploadResumeAnother/UploadResumeAnother'
import InterviewBoost from '../../components/interviewBoost/InterviewBoost'
import axios from 'axios'
import { BASE_URL ,BASE_URL_FLASK} from '../../constants/constants'

function Home() {
  const uploadResumeRef = useRef(null); // 👈 create ref

  useEffect(() => {
    const warmUpBackends = async () => {
      try {
        await axios.get(`${BASE_URL}/resume/ping`, { timeout: 5000 });
        console.log("NestJS backend warmed up ✅");
      } catch (err) {
        console.log("NestJS backend still waking ❄️", err.message);
      }

      try {
        await axios.get(`${BASE_URL_FLASK}/health`, { timeout: 5000 });
        console.log("Flask backend warmed up ✅");
      } catch (err) {
        console.log("Flask backend still waking ❄️", err.message);
      }
    };

    warmUpBackends();
  }, []);

  return (
    <div className='home'>
        <div ref={uploadResumeRef}>
          <UploadResume/>
        </div>
        <ResumeCheckerInfo/>
        <Checklist/>
        <InterviewBoost/>
        <UploadResumeAnother scrollToUpload={() => {
          uploadResumeRef.current?.scrollIntoView({ behavior: 'smooth' });
        }} />
    </div>
  )
}

export default Home
