import React from "react";

export const LinkCard = ({link}) =>{
      return (
         <>
            <h2>{link.name}</h2>
            <p>Short: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Cliks: <strong>{link.clicks}</strong></p>
            <p>Data created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
         </>   
      )
}