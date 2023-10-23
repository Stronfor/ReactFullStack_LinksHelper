import React from "react";

export const LinkCard = ({link}) =>{
      return (
         <>
            <h2>Link</h2>
            <p>Short: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clikcs: <strong>{link.clicks}</strong></p>
            <p>Data created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
         </>   
      )
}