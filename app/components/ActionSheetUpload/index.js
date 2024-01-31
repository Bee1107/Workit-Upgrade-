import React from 'react'
import ActionSheet from 'react-native-actionsheet'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'


const ActionSheetUpload = ({innerRef, maxWidth = 200, maxHeight = 200, onUpload}) => {

    const options = {
        title: '',
        customButtons: [],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        maxWidth,
        maxHeight
    }
    

    const launchImagePicker = index => {
        if(index === 0){
            selectCamera()
        } else if(index === 1) {
            selectLibrary()
        }
    }

    const selectLibrary = () => {
       
        launchImageLibrary(options, response => {
            if (!response.didCancel && !response.error && !response.customButton) {
                onUpload(response)
            }
        })
    }

    const selectCamera = () => {
        launchCamera(options, response => {
            if (!response.didCancel && !response.error && !response.customButton) {
                onUpload(response)
            }
        })
    }

    return (
        <ActionSheet
            ref={innerRef} 
            title={'Elige una opción'}
            options={['Camara', 'Rollo de fotos', 'Cancelar']}
            cancelButtonIndex={2}
            onPress={launchImagePicker}
        />
    )
}

export default ActionSheetUpload