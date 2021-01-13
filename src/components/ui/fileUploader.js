import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import CircularProgress from '@material-ui/core/CircularProgress'
import { firebase } from '../../firebase'

export default class Fileuploader extends Component {

    state = {
        name:'',
        isUploading: false,
        fileURL: ''
    }

    handleUploadStart =()=>{
        console.log('iplaod starting')
        this.setState({isUploading: true})
    }

    handleUploadError =()=>{
        console.log('error uploading')
        this.setState({
            isUploading: false
        })
    }

    handleUploadSuccess =(filename) =>{
        console.log(filename)
        this.setState({
            name:filename,
            isUploading:false
        })

        firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then(url=>{
            console.log(url)
            this.setState({fileURL: url})
        })
    }

    static getDerivedStateFromProps(props, state){
        if(props.defaultImg){
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }

        return null
    }

    render() {
        return (
            <div>
                 { !this.state.fileURL ?
                  <div>
                      <div className='label_inputs'>{this.props.tag}</div> 
                      <FileUploader
                        accept = "image/*"
                        name="image"
                        randomizeFilename
                        storageRef={firebase.storage().ref(this.props.dir)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={ this.handleUploadError}
                        onUploadSuccess= { this.handleUploadSuccess}
                      />
                  </div>
                  : null
                 }

                 {this.state.isUploading ?
                    <div className='progress' style={{textAlign:'center', margin:'30px 0'}} >
                        <CircularProgress
                            style={{color:'#98c6e9', }}
                            thickness={7}
                        />
                    </div>
                    : null
                 }
            </div>
        )
    }
}
