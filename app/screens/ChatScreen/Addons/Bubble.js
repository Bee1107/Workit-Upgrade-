import React from 'react'
import BubbleLeft from './BubbleLeft'
import BubbleRight from './BubbleRight'

const Bubble = props => {

    const { item, userId } = props 
    
    return (
        <>
          {item.senderId === userId && <BubbleRight item={item} />}  
          {item.senderId !== userId && <BubbleLeft item={item} />}  
        </>
    )
}


export default Bubble