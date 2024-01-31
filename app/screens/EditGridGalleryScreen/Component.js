import React, { useState, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import SortableGrid from 'react-native-sortable-grid'
import EmptyView from '../../components/EmptyView'  
import ActionSheet from 'react-native-actionsheet'
import ActionButton from '../../components/ActionButton'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import colors from '../../utils/colors'

const sizeImage = Dimensions.get('window').width / 2

const EditGridGalleryScreen = ({ user, push, sort }) => {

    const [draggable, setDraggable] = useState(false)
    const actionSheet = useRef(null)

    const onDragStart = () => {
        setDraggable(true)
    }

    const onDragRelease = ({itemOrder}) => {
        setDraggable(false)
        sort(itemOrder.map(({key}) => user.work_images[parseInt(key)]))
    }

    const onPressTakePhoto = () => {
        if(actionSheet !== null){
            actionSheet.current.show()
        }
    }


    const launchImagePicker = index => {
        if(index === 0){
            selectCamera()
        } else if(index === 1) {
            selectLibrary()
        }
    }

    const selectLibrary = () => {
        const options = {
            title: '',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'job_images',
            },
            maxWidth: 1000,
            maxHeight: 1000
        }

        launchImageLibrary(options, response => {
            if (!response.didCancel && !response.error && !response.customButton) {
                push({
                    image: response
                })
            }
        })
    }
    
    const selectCamera = () => {

        const options = {
            title: '',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'job_images',
            },
            maxWidth: 1000,
            maxHeight: 1000
        }
        
        launchCamera(options, response => {
            
            if (!response.didCancel && !response.error && !response.customButton) {
                push({
                    image: response
                })
            }
        })
    }

    return (
        <View style={styles.container}>
               <ActionSheet
                ref={ actionSheet} 
                title={'Elige una opción'}
                options={['Camara', 'Rollo de fotos', 'Cancelar']}
                cancelButtonIndex={2}
                onPress={launchImagePicker}
            />

        {user.work_images.length === 0 && (
            <View style={{flex: 1, padding: 20}}>
            <EmptyView 
                    message= "No tienes Fotos"
                    onPress={onPressTakePhoto}
                    buttonTitle="Subir imagen"
                    loop={false}
                    />
           </View>)}
           {user.work_images.length > 0 &&  (
               <>
               <ScrollView style={styles.container} scrollEnabled={!draggable} >
                <SortableGrid itemsPerRow={2} onDragStart={onDragStart} onDragRelease={onDragRelease}>
                {
                    user.work_images.map( (image, index) =>

                    <View key={index} style={[styles.thumContainer, { width: sizeImage, height: sizeImage}]}>
                        <View  style={[styles.thumb, { width: sizeImage - 10, height: sizeImage - 10}]}>
                            <Image source={{uri: image}} style={{ width: sizeImage - 10, height: sizeImage - 10}} />
                        </View>
                    </View>

                    )
                }
                </SortableGrid>
                </ScrollView>
                <View style={styles.bottom}>
                    <ActionButton
                        onPress={onPressTakePhoto}
                        text="Tomar foto"
                    />
                </View>
                </>
           )}
          
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    thumb:{
        borderRadius: 5,
        overflow:'hidden'
    },
    thumContainer:{
        justifyContent:'center',
        alignItems: 'center',
        padding: 5
    },
    bottom:{
        padding: 20, 
        paddingBottom: 30,
        borderTopColor: colors.grayLigth,
        borderTopWidth: StyleSheet.hairlineWidth,
    }
})

export default EditGridGalleryScreen