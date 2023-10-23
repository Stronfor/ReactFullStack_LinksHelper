import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {

      if(!links.length){
            return <p className='center'>Links not found</p>
      }

      return(
            <table>
            <thead>
              <tr>
                  <th>N</th>
                  <th>Name</th>
                  <th>Short</th>
                  <th>Open</th>
              </tr>
            </thead>
    
            <tbody>
                  {links.map((item, i) => {
                     return (
                        <tr key={item._id}>
                              <td>{i + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.to}</td>
                              <td><Link to={`/detail/${item._id}`}>GoToLink</Link></td>
                        </tr>
                     )   
                  })}
            </tbody>
          </table>
      )

}