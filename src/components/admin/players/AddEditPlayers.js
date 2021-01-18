import React, { Component } from 'react'

import AdminLayout from '../../../HOC/AdminLayout'
import FormField from '../../ui/formFields'
import { validate } from '../../ui/misc'
import Fileuploader from '../../ui/fileUploader'

import { fireBasePlayers, fireDB, firebase } from '../../../firebase'

export default class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name:{
                element:'input',
                value:'',
                config:{
                    label:'Player name',
                    name:'name_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                validationMessage:'',
                showlabel:true
            },
            lastname:{
                element:'input',
                value:'',
                config:{
                    label:'Player last name',
                    name:'lastname_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                validationMessage:'',
                showlabel:true
            },
            number:{
                element:'input',
                value:'',
                config:{
                    label:'Player number',
                    name:'number_input',
                    type:'text',
                },
                validation:{
                    required:true,
                },
                valid:false,
                validationMessage:'',
                showlabel:true
            },
            position:{
                element:'select',
                value:'',
                config:{
                    label:'Selest a position',
                    name:'select_position',
                    type:'select',
                    options:[
                        {key:'Keeper', value:'Keeper'},
                        {key:'Defence', value:'Defence'},
                        {key:'Midfield', value:'Midfield'},
                        {key:'Striker', value:'Striker'},
                    ]
                },
                validation:{
                    required:true,
                },
                valid:false,
                validationMessage:'',
                showlabel:true
            },
            image: {
                element: 'image',
                value:'',
                validation: {
                    required:true
                },
                valid:false
            }
        }
    }

    updateForm(element, content=''){
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        if(content === ''){
        newElement.value = element.event.target.value;
        }else{
            newElement.value = content
        }

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    updateFields =(player, playerId, formType, defaultImg)=>{
        const newFormdata = {...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormdata
        })
    }

    submitForm(event){
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }


        if(formIsValid){
            if(this.state.formType === 'Edit player' ){
                fireDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated correctly')
                    this.props.history.push('/admin_players')
                }).catch(e=>{
                    this.setState({formError:true})
                })

            }else{
                fireBasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch(e=>{
                    this.setState({
                        formError:true
                    })
                })
            }

        } else {
            this.setState({
                formError: true
            })
        }
    }

    successForm=(message)=>{
        this.setState({
            formSuccess:message
        })
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        },200)
    }

    componentDidMount(){
        const playerId = this.props.match.params.id

        if(!playerId){
            this.setState({formType:'Add player'})
        }else{
            fireDB.ref(`players/${playerId}`).once('value')
            .then(snapshot =>{
                const playerData = snapshot.val()

                firebase.storage().ref('players')
                .child(playerData.image).getDownloadURL()
                .then(url =>{
                    this.updateFields(playerData, playerId, 'Edit player', url)
                }).catch(e=>{
                    this.updateFields({
                        ...playerData,
                        images:'',
                    }, playerId, 'Edit player', '')
                })
            })
        }
    }

    resetImage=()=>{
        const newFornData = {...this.state.formdata}
        newFornData['image'].value = ''
        newFornData['image'].valid = false
        this.setState({
            defaultImg:'',
            formdata: newFornData
        })
    }

    storeFilename =(filename)=>{
        this.updateForm({id:'image'}, filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className='editplayers_dialog_wrapper'>
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event)=>this.submbitForm(event)} >

                            <Fileuploader
                                dir='players'
                                tag={'Player image'}
                                defaultImg = {this.state.defaultImg}
                                defaultImgName = {this.state.formdata.image.value}
                                resetImage={()=> this.resetImage()}
                                filename = {(filename)=> this.storeFilename(filename)}
                            />


                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'number'}
                                formdata={this.state.formdata.number}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'position'}
                                formdata={this.state.formdata.position}
                                change={(element)=> this.updateForm(element)}
                            />

                            <div className='success_label'> {this.state.formSuccess} </div>
                                {this.state.formError ? 
                                    <div className='error_label'>Something is wrong</div>
                                    : ''
                                }

                            <div className='admin_submit'>
                                <button onClick={(event)=> this.submitForm(event)} >
                                    {this.state.formType}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
