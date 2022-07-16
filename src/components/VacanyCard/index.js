import React from 'react'
import './card.scss'
import { NavLink } from 'react-router-dom'
const VacancyCard = ({ data,key }) => {
    // const router = useRouter();
    return (
        <div className='card_container' key={key}>
            <div className='description'>
                <span><img src='./building.png' /></span> <span>{data.title}</span> <span><img src='./pin.png' /></span> <span>{data.location.title}</span>
                <span className='job_type'>{data.type}</span>
            </div>
            <div className='button_container'>
                <button className='button'><a href={data.applyUrl} target="_blank">Apply</a></button>
                <NavLink to={`/${data.id}`} className='link'>
                    View
                </NavLink>
            </div>
        </div>
    )
}

export default VacancyCard