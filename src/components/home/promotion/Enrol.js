import React, { Component } from 'react';
import Fade from 'react-reveal/Fade'
import FormField from '../../ui/formFields'
import {validate} from '../../ui/misc'

class Enrol extends Component {
    state={
        formError:false,
        formSuccess:'',
        formData:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                validationMessage:''
            }
        }
    }

    submitForm =(event)=>{
        event.preventDefault()

        let dataToSubmit ={}
        let formIsValid = true

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value
            formIsValid = this.state.formData[key].valid && formIsValid
        }
        if(formIsValid){

        }else{
            this.setState({
                formError: true
            })
        }
    }

    updateForm=(element)=>{
        const newFormData = {...this.state.formData}
        const newElement = {...newFormData[element.id]}

        newElement.value = element.event.target.value

        let validData = validate(newElement)
        newElement.valid= validData[0]
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement

        this.setState({
            formError: false,
            formData : newFormData
        })
    }
    render() {
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={(e)=> this.submitForm(e)}>
                        <div className='enroll_title'>
                            Enter your email
                        </div>
                        <div className='enroll_input'>
                            <FormField 
                                id='email'
                                formdata = {this.state.formData.email}
                                change={(element)=>this.updateForm(element)}
                            />
                            {this.state.formError ?
                                <div className='error_label'>
                                    something is wrong
                                </div> : null
                            }
                            <button onClick={(event)=>this.submitForm(event)}>
                                Enroll
                            </button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enrol;