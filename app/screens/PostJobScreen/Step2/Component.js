import React, { useRef, useState } from 'react'
import { View, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ActionButton from '../../../components/ActionButton'
import EmptyView from '../../../components/EmptyView'  
import { SafeAreaView } from 'react-native-safe-area-context'
import Wizard from '../Addons/wizard'
import ActionSheetUpload from '../../../components/ActionSheetUpload'
import Label from '../../../components/text/Label'
import { images } from '../../../assets'
import colors from '../../../utils/colors'

const sizeImage = Dimensions.get('window').width 

const SignupScreen = ({ push, imagesPath, deleteImage }) => {

    const actionSheet = useRef(null)
    const navigation = useNavigation()
    const [sizePhotoContent, setSizePhotoContent] = useState(100)
    const [currentIndex, setCurrentIndex] = useState(0)

    const onPressTakePhoto = () => {
        if(actionSheet !== null){
            actionSheet.current.show()
          }
    }

    const goNextStep = () => navigation.navigate('PostJobStep3')
    
    const onLayoutPhotoContent = ({nativeEvent}) => {
        setSizePhotoContent(nativeEvent.layout.height - 100)
    }

    return (   
        <View style={styles.container}>
            <ActionSheetUpload 
                maxWidth={1000}
                maxHeight={1000}
                innerRef={actionSheet} 
                onUpload={ response => {
                    push(response)
                }} />
            <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']} >
            <Wizard step={1} />

            {imagesPath.length === 0 && (
                 <EmptyView 
                 message= "Sube tus fotos"
                 image={images.steps.photo}
                 loop={false}
                 />
            )}
           {imagesPath.length > 0 && (
               <View style={{flex: 1,}} onLayout={onLayoutPhotoContent}>
                <View style={{ height: sizePhotoContent}}>
                    <Image source={{uri: imagesPath[currentIndex].uri}} style={{ width: sizeImage, height: sizePhotoContent}} />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => {
                        setCurrentIndex(Math.max(0, currentIndex - 1))
                        deleteImage({ currentIndex })
                    }}>
                        <Image source={images.trashPhoto} style={{ width: 20, height: 20 }} resizeMode="contain"/>
                        <Label color="white" style={{marginLeft: 10}}>Eliminar imagen</Label> 
                    </TouchableOpacity>
                </View>
               <FlatList
                    data={imagesPath}
                    horizontal={true}
                    renderItem={({item, index})=>(
                    
                        <TouchableOpacity onPress={()=>{
                            setCurrentIndex(index)
                        }} style={[styles.thumContainer, { width: 100, height: 100}]}>
                            <View  style={[styles.thumb, { width: 90, height: 90}]}>
                                <Image source={{uri: item.uri}} style={{ width: 90, height: 90}} />
                            </View>
                        </TouchableOpacity>
                      
                    )}
                    keyExtractor={({uri}) => uri}
                    style={{flex:1, height: 100}}
                />
               </View>
           )}

            <View style={{padding: 20, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#CCC'}}>
                <ActionButton text="Subir imagen" style={{marginTop: 10,}} onPress={onPressTakePhoto} />
                <ActionButton text={imagesPath.length > 0 ? 'Continuar' : 'Continuar sin fotos'} style={{marginTop: 20}} onPress={goNextStep} />
            </View>
            </SafeAreaView>
            
           
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        width: '100%',
        height: 200,
        position:'absolute',
        top: -40,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
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
    deleteButton:{
        position:'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 5,
        padding: 5,
        flexDirection: 'row'
    }
})

export default SignupScreen