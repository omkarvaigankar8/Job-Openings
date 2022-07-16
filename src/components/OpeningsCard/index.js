import React from 'react'
import './card.scss'
import { NavLink } from 'react-router-dom'
const OpeningsCard = ({ data }) => {
    // const router = useRouter();
    return (
        <div className='card_container'>
            <div className='description'>
                <h4>{data.title}</h4>
                <span><img src='./building.png' /></span>
                <span>{data.department.title}</span>
                <span><img src='./pin.png' /></span>
                <span>{data.location.title}</span>
            </div>
        </div>
    )
}

export default OpeningsCard