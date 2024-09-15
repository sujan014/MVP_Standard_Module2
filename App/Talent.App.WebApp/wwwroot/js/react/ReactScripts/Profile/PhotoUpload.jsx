/* Photo upload section */
import React, { Component, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import default_picture from '../../../../images/no-image.png';
import { savePhoto } from './ApiUtil.jsx';

export default function PhotoUpload({ imageId, updateProfileData, savePhotoUrl }) {
    const [profileUrl, setProfileUrl] = useState(imageId);
    const [newProfile, setNewProfile] = useState('');
    const [newImage, setNewImage] = useState('');
    const [selectImage, setSelectImage] = useState(false);
    
    useEffect(() => {
        setProfileUrl(imageId);
    }, [imageId]);

    const handleFileSelect = (event) => {
        var photoId = event.target.files[0];        
        setNewProfile(photoId);
        setNewImage(URL.createObjectURL(photoId));
        setSelectImage(true);
    }
    const handleSavePhoto = (event) => {
        event.preventDefault();
        if (!selectImage) {
            TalentUtil.notification.show(`New profile picture not selected.`, "error", null, null);
            return;
        }
        //savePhoto(newProfile);
        savePhoto(
            savePhotoUrl,
            newProfile
        );
    }
    const handleReloadPhoto = (event) => {
        event.preventDefault();
        setSelectImage(false);
        getPhoto();
    }
        
    return (
        <div className="ui grid">
            <div className='ui ten wide column'>
                <input
                    type='file'
                    onChange={handleFileSelect}
                />
            </div>
            <div className='ui six wide column'>

                {selectImage ?
                    <img
                        src={newImage}
                        style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '50%'
                        }}
                    /> :
                    <img
                        src={profileUrl}
                        style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '50%'
                        }}
                    />
                }                
            </div>
            <div className='ui sixteen wide column'>
                <Button
                    className='teal float right'
                    onClick={handleSavePhoto}
                >
                    <Icon name='upload' />
                    Upload
                </Button>                
            </div>
        </div>
    )
}


//export default function PhotoUpload({ imageId, imageURL, updateProfileData, savePhotoUrl }) {
//    const [imageFile, setImageFile] = useState(imageId);    
//    const [image, setImage] = useState('');
//    const [selectImage, setSelectImage] = useState(false);    

//    useEffect(() => {                
//        setImageFile(imageId);        
//    }, [imageId]);

//    const handleFileSelect = (event) => {
//        var photoId = event.target.files[0];
//        setImageFile(photoId);
//        setImage(URL.createObjectURL(photoId));        
//        setSelectImage(true);        
//    }
//    const handleSavePhoto = (event) => {
//        event.preventDefault();
//        savePhoto(imageFile);
//    }
//    const handleReloadPhoto = (event) => {
//        event.preventDefault();
//        setSelectImage(false);
//        getPhoto();
//    }
//    const getPhoto = () => {

//        var cookies = Cookies.get('talentAuthToken');
//        var photoUrl = `http://localhost:60290/profile/profile/getProfileImage?Id=${imageFile}`
//        axios
//            .get(                
//                photoUrl,
//                {
//                    headers: {
//                        'authorization': 'bearer ' + cookies,
//                        'content-type': 'application/json'
//                    }
//                },
//                {
//                    responseType: 'arraybuffer'
//                }
//            )            
//            .then((response) => {                
//                if (response.status === 200) {                                        
//                    const binaryData = response.data;
//                    const bufferArray = new Uint8Array(binaryData).buffer;

//                    var blob = new Blob([bufferArray], {
//                        type: "image/jpeg",
//                    });
//                    var newImage = URL.createObjectURL(blob);
//                    setImage(newImage);
//                }
//            })
//            .catch((error) => {
//                console.log(error);
//            })
//    }
//    const savePhoto = (file) => {                
//        var cookies = Cookies.get('talentAuthToken');
//        var formData = new FormData();
//        formData.append("file", file, file.name);
        
//        axios
//            .post(
//                savePhotoUrl,
//                formData,
//                {
//                    headers: {
//                        'authorization': 'bearer ' + cookies,
//                        'content-type': 'multipart/form-data'
//                        //'content-type': 'application/json'
//                    }
//                }
//            )
//            .then((response) => {                
//                if (response.status === 200) {
//                    if (response.data.success) {
//                        TalentUtil.notification.show("Profile photo updated sucessfully", "success", null, null);
//                    }
//                    else {
//                        TalentUtil.notification.show("Profile photo update unsuccessfull", "error", null, null);
//                    }
//                } else {
//                    TalentUtil.notification.show("Profile photo update unsuccessfull", "error", null, null);
//                }
//            })
//            .catch((error) => {                
//                TalentUtil.notification.show("Profile photo update unsuccessfull. Axios post error", "error", null, null);
//            })
//    }
//    return (        
//        <div className="ui grid">
//            <div className='ui ten wide column'>
//                <input
//                    type='file'
//                    onChange={handleFileSelect}                
//                />
//            </div>
//            <div className='ui six wide column'>                

//                {selectImage ? 
//                    <img
//                        src={image}
//                        style={{
//                            maxWidth: "200px",
//                            maxHeight: "200px",
//                            width: 'auto',
//                            height: 'auto',
//                            borderRadius: '50%'
//                        } }
//                    /> :
//                    <img                    
//                        src={imageURL}                        
//                        style={{
//                            maxWidth: "200px",
//                            maxHeight: "200px",
//                            width: 'auto',
//                            height: 'auto',
//                            borderRadius: '50%'
//                        }}
//                    />                    
//                }
//            </div>
//            <div className='ui sixteen wide column'>
//                <Button
//                    className='teal float right'
//                    onClick={handleSavePhoto }
//                >
//                    <Icon name='upload' />
//                    Upload
//                </Button>
//                {/*<Button className='teal float right' onClick={handleReloadPhoto} >*/}
//                {/*    <Icon name='repeat' /> Reload*/}
//                {/*</Button>*/}
//            </div>
//        </div>                    
//    )
//}