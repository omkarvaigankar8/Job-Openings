import React from 'react'
import VacancyCard from '../VacanyCard'

const index = ({ data }) => {
    // console.log("DATAssss", data)
    return (
        <div className='function_container'>
            <h2 className='section_heading'>{data[0].function.title}</h2>
            {data && data.map((item,index) => {
                return (
                    <VacancyCard data={item} key={index} />
                )
            })}
        </div>
    )
}

export default index