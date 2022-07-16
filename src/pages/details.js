import React, { useState, useEffect } from 'react'
import { fetchData } from '../components/api'
import { useParams} from 'react-router'
import OpeningsCard from '../components/OpeningsCard';

const Details = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [openings, setOpenings] = useState('');
  //console.log("query", id)
  useEffect(() => {
    let locations;
    fetchData((data) => {
      setJobData(data.data)
      locations = data.data.location.title
    }, `jobs/${id}`)
    fetchData((data) => {
      setOpenings(data.data)
      filterOpeningsHandler(data.data, locations)
    }, `jobs`)
  }, [id])
  const filterOpeningsHandler = (data, locations) => {
    //console.log("o", data)
    //console.log("l", locations)
    let filterData = data && data.filter(function (event) {
      return locations && event.location.title === locations;
    });
    //console.log("AFTER", filterData)
    setOpenings(filterData)
  }
  return (
    <div>{jobData && (
      <>
        <div className='header_section'>
          <h4>{jobData.department.title} Department At Teknorix Systems {jobData.location.state}</h4>
          <h2>{jobData.title}</h2>
          <p><span><img src='./building.png' /></span> <span>{jobData.function.title}</span> <span><img src='./pin.png' /></span> <span>{jobData.location.title}</span><span className='job_type'>{jobData.type}</span></p>
          <button className='button'><a rel="noreferrer" href={jobData.applyUrl} target="_blank">Apply</a></button>
        </div>
        <div className='body_section'>
          <div className='main_section' dangerouslySetInnerHTML={{ __html: jobData.description }}>
          </div>
          <div className='sidebar_section'>
            <div className='other_jobs_container'>
              <h3 className='section_heading'>Other Openings</h3>
              {openings && openings.map((item, index) => {
                return (
                  <>
                    <OpeningsCard data={item} key={index} />
                  </>
                )
              })}
            </div>
            <div className='social_container'>
              <h3 className='section_heading'>Share on Social</h3>
              <div className='icons'>
                <div><a href='https://www.facebook.com/'><img src='./facebook.png' /></a></div><div><a href='https://twitter.com/login'><img src='./twitter.png' /></a></div><div><a href='https://www.linkedin.com/signup'><img src='./linkedin.png' /></a></div></div>
            </div>

          </div>
        </div>
      </>)}
    </div>
  )
}

export default Details