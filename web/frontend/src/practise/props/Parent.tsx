import React from 'react'
import { ChildAsFC } from './Child'
const Parent = () => {
    return <ChildAsFC color = 'red' onClick = {() => console.log('Clicked')}>
        ff
    </ChildAsFC>
}

export default Parent