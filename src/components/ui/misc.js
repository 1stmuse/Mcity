import React from 'react'
import {Link} from 'react-router-dom'


export const Tag =(props)=>{

    const template = <div style={{background:props.bck, fontSize:props.size, color:props.color, padding:'5px 10px', display:'inline-block', fontFamily:'Righteous', ...props.add}}>
        {props.children}
    </div>

    if(props.link){
        return(
            <Link to={props.linkto} >
                {template}
            </Link>
        )
    }else{
        return template
    }
}

export const firebaseLooper =(snapshop) =>{
    let data = []
    snapshop.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data
}

export const reverseArray =(array)=>{
    let reversedArray =[]
    
    for(let i =array.length-1; i>=0; i--){
        reversedArray.push(array[i])
    }
    return reversedArray
}

export const validate =(element)=>{
    let error = [true, '']

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'must be a valid email' : ''}`
        error = !valid ? [valid, message] : error
    }

    if(element.validation.required){
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'this field is required' : ''}`
        error = !valid ? [valid, message] : error
    }
    return error
}