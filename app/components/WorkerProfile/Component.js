import React, { useState, useRef , useEffect} from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import PagerView from 'react-native-pager-view'
import ServiceList from '../../components/ServiceList'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { CachedImage } from 'react-native-img-cache'
import {useNavigation} from '@react-navigation/native'
import {images} from '../../assets'
import AvatarPicker from '../../components/AvatarPicker'
import Heading from '../../components/text/Heading'
import Label from '../../components/text/Label'
import SemiHeading from '../../components/text/SemiHeading'
import Ranking from '../../components/Ranking'
import colors from '../../utils/colors'
import EditButton from '../../components/EditButton'
import ActionButton from '../../components/ActionButton'
import ActionSheet from 'react-native-actionsheet'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import InputText from '../../components/InputText'
import InfoModal from './Addons/InfoModal'
import PickerCategories from '../../components/PickerCategories'
import CarouselPhoto from '../../components/CarouselPhoto'
import BidCard from '../../components/BidCard'
import Card from '../../components/card'
import PaymentModal from '../../components/PaymentModal'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { getRating } from '../../utils/number'
import PaginationDot from 'react-native-animated-pagination-dot'
import CollapseLabel from '../../components/CollapseLabel'
import ColorCard from '../../components/ColorCard'

const windowWidth = Dimensions.get('window').width

const text4 = 'Ofrece tus servicios directamente a tus clientes'


const LoaderText = () => (
  <View style={{width: windowWidth, height: 90, paddingHorizontal: 20}}>
  <SkeletonPlaceholder>
    <View style={{marginTop: 10}}>
      <View  style={{width: windowWidth - 90, height: 16, borderRadius: 8}} />
      <View  style={{width: windowWidth - 90, height: 16, borderRadius: 8, marginTop: 5}} />
      <View  style={{width: windowWidth - 90, height: 16, borderRadius: 8, marginTop: 5}} />
      <View  style={{width: windowWidth - 120, height: 16, borderRadius: 8, marginTop: 5}} />
    </View>
  </SkeletonPlaceholder>
</View> 
)

const SectionContainer = ({ title, children, editable, isLoading = false, isOptional, onPress, loaderComponent, editButtonText }) => (
  <View style={{flex: 1, alignItems:'flex-start', paddingHorizontal: 20, marginTop: 20}}>
      <View style={{width:'100%', flexDirection: 'row',justifyContent: 'space-between', alignItems:'center'}}>
        <View>
          <SemiHeading color={colors.text.title}>{title}</SemiHeading>
          {isOptional && (<Label color={colors.mainColor}>(Opcional)</Label>)}
        </View>
        {onPress && editable && <EditButton text={editButtonText} onPress={onPress} />}
      </View>

      {!isLoading && (
        <>
        {children}
        </>
      )}
      
      {isLoading && (
          <>
            {loaderComponent()}
          </>
      )}
  </View>
)

const WorkerProfile = ({ userEvaluations, user, fetchServices, deleteBid, services, currentUser, fetchUserProfile, update, upload, bid, bid_id, isProfileUserLoading }) => {

  const actionSheet = useRef(null)
  const navigation = useNavigation()
  const [page, setPage] = useState(0)
  const [visible, setVisible] = useState(false)
  const [showModalEditText, setShowModalEditText] = useState(false)
  const [message, setMessage] = useState(user.profile_description)
  const [messageIndex, setMessageIndex] = useState(0)
  const [photoField, setPhotoField] = useState('')
  const [height, setHeight] = useState(400)
  const editable = currentUser.userId === user.userId

  useEffect(() => {
    fetchUserProfile({userId: user.userId})
    fetchServices({userId: user.userId})
  }, [])


  const goService = () => {
    navigation.navigate('PostService')
  }

  const onPressTakePhoto = type => () => {
    setPhotoField(type)
    if(actionSheet !== null){
        setTimeout(()=>{
          actionSheet.current.show()
        }, 200)
        
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
            path: 'profile_images',
        },
        maxWidth: photoField === 'cover_picture' ? 800 : 400,
        maxHeight:  photoField === 'cover_picture' ? 800 : 400,
    }

    launchImageLibrary(options, response => {
        if (!response.didCancel && !response.error && !response.customButton) {
          upload({image: response, photoField})
        }
    })
}

const selectCamera = () => {

    const options = {
        title: '',
        customButtons: [],
        storageOptions: {
            skipBackup: true,
            path: 'profile_images',
        },
        maxWidth: photoField === 'cover_picture' ? 800 : 400,
        maxHeight:  photoField === 'cover_picture' ? 800 : 400,
    }
    
    launchCamera(options, response => {
        
        if (!response.didCancel && !response.error && !response.customButton) {
          upload({image: response, photoField})
        }
    })
}


const updateCategories = (value, index) => {
  const categories = user.myCategories ? [...user.myCategories] : []
  
  const currentName = value.category.category_name
  const currentImage= value.category.image

  if(categories[index]){
    categories[index] = {
      ...value,
      name: currentName,
      image: currentImage,
    }
  } else {
  
    categories.push({
      ...value,
      name: currentName,
      image: currentImage,
    })
  }
  update({myCategories: categories})
}

const onAcept = () => {
  setVisible(false)
  setTimeout(() => {
      navigation.navigate('Payment',  bid )
  }, 500)
}

const onCancelBid = (item) => {
  Alert.alert(
      'Cancelar',
      '¿Estás seguro de cancelar esta oferta?',
      [
        {
          text: 'No',
          onPress: () =>{},
        }, 
        {
          text: 'Si',
          onPress: () => {
              deleteBid({
                  bid_id: item.bid_id,
                  job_id: item.job_id
              })
          },
        },
      ],
      {cancelable: false, onDismiss: () => {}},
    )
}


const onCancel = () => {
  setVisible(false)
}

const openModal = () => {
  setVisible(true)
}



const onScroll = ({nativeEvent}) => {
  setHeight(Math.max(400 - nativeEvent.contentOffset.y, 400))
}
  
const onShowDescriptionEdit = () => {
  setMessageIndex(0)
  setMessage(user.profile_description)
  setShowModalEditText(true)
}

  const modalEditText = () => (
    <Modal
    animationType="fade"
    transparent={true}
    visible={showModalEditText}
    onRequestClose={() => {
     
    }}
  >
     <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flex: 1}}
      extraHeight={140}
      scrollEnabled={false}
      >
 <View style={styles.centeredView}>
      <View style={styles.modalView}>
       
        <View style={{ width:'100%',}} >
        <InputText
            label="Descripción"
            icon={images.document}
                placeholder="Escribe tu mensaje" 
                height={200}
                multiline={true}
                onChange={setMessage}
                text={message}
                style={{width:'100%'}}
                alignText="top"
            />
        </View>
        <ActionButton 
          text="Guardar" 
          onPress={() => {
            update({[messageIndex === 0 ? 'profile_description' : 'profile_description2']: message})
            setShowModalEditText(false)
          }}
          style={{marginTop: 30, width:'100%'}}  
        />
      </View>
    </View>
      </KeyboardAwareScrollView>
   
  </Modal>
  )

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={styles.container}
      extraHeight={140}
      scrollEnabled={false}
      >
    
      <PaymentModal
                visible={visible}
                onAcept={onAcept}
                onCancel={onCancel}
             />

      {editable &&  <InfoModal tooltipKey="info_modal_worker_profile" user={user} />}
      {modalEditText()}
      <ActionSheet
            ref={ actionSheet} 
            title={'Elige una opción'}
            options={['Camara', 'Rollo de fotos', 'Cancelar']}
            cancelButtonIndex={2}
            onPress={launchImagePicker}
        />


      <ImageBackground
        source={images.coverImage}
        style={{...styles.header, ...{ height }}}
        resizeMethod="scale">
            <CachedImage source={{uri: user.cover_picture}} mutable style={{width:'100%', height}} />
        </ImageBackground>

        <ScrollView scrollEventThrottle={20} onScroll={onScroll}>
            
              <View style={{height: 300, zIndex:9999, justifyContent: (!user.cover_picture ? 'center':'flex-end'), alignItems:'center', width: '100%'}}>

                  {editable && !user.cover_picture && (
                      <TouchableOpacity style={styles.coverButton} onPress={onPressTakePhoto('cover_picture')}>
                        <View style={{flexDirection: 'row'}}>
                          <Image source={images.chat.camera} style={{width: 24, height: 24, tintColor:'white'}} resizeMode="contain"  />
                          <Label color="white" style={{marginLeft: 10}}>Tomar Foto de Portada</Label>
                        </View>
                    </TouchableOpacity>
                  )}
                  {editable && user.cover_picture && (
                    <TouchableOpacity style={styles.floatingButton} onPress={onPressTakePhoto('cover_picture')}>
                      <Image source={images.chat.camera} style={{width: 24, height: 24, tintColor: colors.mainColor}} resizeMode="contain"  />
                    </TouchableOpacity>
                  )}
                  
              </View>
         
            <View style={styles.content}>
                <View style={{alignItems: 'center', marginTop: -50}}>
                    <AvatarPicker
                      url={user.profile_picture}
                      onPress={onPressTakePhoto('profile_picture')}
                      showEdit={editable}
                      showTicket={user.have_document !== ''}
                      />
                </View>

                

                <View style={styles.nameContainer}>
                  
                    {user.father_last_name && <Heading color={colors.text.title} fontSize={24} style={{marginTop: 10}}>{`${user.name} ${user.father_last_name}`}</Heading>}
                    {!user.father_last_name && <Heading color={colors.text.title} fontSize={24} style={{marginTop: 10}}>{`${user.name}`}</Heading>}
                    <View style={{alignItems:'flex-start', marginTop: 10}}>
                        <Label color={colors.black}>CALIFICACIÓN</Label>
                        <Ranking rank={getRating(user)} style={{marginTop: 10}} />
                    </View>
                    {user.have_document !== '' && (
                      <View style={{flexDirection:'row', marginTop: 10}}>
                      <Image source={images.verify} style={{width: 20, height: 20}} resizeMode="contain" />
                      <Label fontSize={13} style={{marginLeft: 5}}>Verificación de seguridad</Label>
                    </View>
                    )}
                </View>

                {!editable && bid === null  && (
                  <View style={{padding: 20}}>
                      <ActionButton 
                        text="Pideme un servicio" 
                        onPress={() => {
                          navigation.navigate('PostJob', { screen:'PostJobStep1', params: {user} })
                        }}
                        
                      />
                  </View>
                )}

                {(bid !== null || bid_id !== null) && (

                 <>
                    {bid !== null && (
                        <View style={{paddingLeft: 20, marginTop: 20}}>
                        <SemiHeading>{`Oferta en ${bid.job_name}`}</SemiHeading>
                      </View>
                    )}
                  
                    
                    <BidCard
                      item={bid}
                      bid_id={bid_id}
                      onPress={openModal}
                      onCancel={onCancelBid}
                      showUser={false}
                      isTouchable={false}
                    /> 
                 </>
                )}

                <SectionContainer 
                  editable={editable} 
                  title="DESCRIPCIÓN" 
                  onPress={onShowDescriptionEdit}
                  isLoading={editable ? false : isProfileUserLoading}
                  loaderComponent={() =>  <LoaderText /> }>
                  <>
                  {(!user.profile_description || user.profile_description === '') && (
                    <Label style={{marginTop: 10, alignSelf:'flex-start'}}>El usuario no tiene descripción</Label>
                  )}
                  {user.profile_description && (
                    <CollapseLabel text={user.profile_description} style={{textAlign:'left', marginTop: 10}} />
                  )}
                  </>
                </SectionContainer>

                {(!isProfileUserLoading) && (<SectionContainer 
                  editable={editable} 
                  isOptional={true} 
                  title="Estudios o Certificaciones"
                  onPress={() => {
                    setMessageIndex(1)
                    setMessage(user.profile_description2)
                    setShowModalEditText(true)
                  }}
                  isLoading={editable ? false : isProfileUserLoading}
                  loaderComponent={() => (
                    <LoaderText />
                )}
                  >
                  {user.profile_description2 && (
                     <CollapseLabel text={user.profile_description2 ? user.profile_description2: ''} style={{textAlign:'left', marginTop: 10}} />
                  )}
                </SectionContainer>
                )}
               
               {userEvaluations.length > 0 && (
                    <SectionContainer editable={false} title="OPINIONES" onPress={() => {
                                      
                    }}>
                      <>
                      <PagerView 
                      initialPage={0}
                      style={{width:'100%', height: 120 }} 
                      onPageScroll={ ({ nativeEvent}) => {
                          setPage(nativeEvent.position)
                          }}>
                          {userEvaluations.map((e, index) => (
                            <View key={`key_${index}`} style={{padding: 10, justifyContent:'center'}}>
                              <Card style={{height: 100,  paddingLeft: 40,backgroundColor: '#a044ff'}}>
                                <Image source={images.quote} style={{position:'absolute', width: 60, height: 40, opacity:0.2, left: 10, top: 10}} resizeMode="contain" />
                                <Label color="white" fontSize={12}>{e.comment}</Label>
                              </Card>
                            </View>
                          ))}
                          
                      
                    </PagerView>
                    {userEvaluations.length > 1 && (
             <View style={{alignItems: 'center', paddingHorizontal: 20, marginTop: 10}}>
             <PaginationDot 
                 activeDotColor={colors.mainColor} 
                 curPage={page} 
                 maxPage={userEvaluations.length}
                 sizeRatio={1.0}
             />
         </View>
        )} 
                    </>
                    </SectionContainer>
               )}
              

                <SectionContainer title="CATEGORIAS">
                  <PickerCategories 
                    overrideUser={user}
                    editable={editable}
                    onPress={({ index }) => {
                      if(editable){
                        navigation.navigate('CategoryPicker', { callback: value => {
                          updateCategories(value, index)
                        }})
                      }
                     
                    }}
                    isLoading={editable ? false : isProfileUserLoading}
                  />
                </SectionContainer>


                <SectionContainer editable={editable} editButtonText="Agregar" title="MIS SERVICIOS" onPress={goService} >
                    
                    {editable && services.length === 0 && (
                      <ColorCard 
                        text={text4} 
                        color={colors.card.turquise} 
                        image={images.deco.serviceGraph} 
                        labelColor="white" 
                        buttonText="Agregar Servicio"
                        style={{marginTop: 20}}
                        onPress={goService}
                        />
                    )}

                    {services.length > 0 && (
                        <ServiceList
                          services={services}
                        />
                    )}

                    {!editable && services.length === 0 && (
                      <Label style={{marginTop: 10, alignSelf:'flex-start'}}>Este usuario no tiene servicios publicados</Label>
                    )}
                     
                </SectionContainer>


                <SectionContainer editable={editable} title="PORTAFOLIO" onPress={()=>{
                    navigation.navigate('GalleryGrid')
                  }}>
                  
                  {(!user.work_images || user.work_images.length <= 0) && (
                    <Label style={{marginTop: 10, alignSelf:'flex-start'}}>El usuario no tiene imagenes</Label>
                  )}

                    <CarouselPhoto 
                      images={user.work_images}
                      isLoading={isProfileUserLoading}
                    />
                 
                </SectionContainer>


            </View>
        </ScrollView>

    </KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(1,1,1,0.5)',
    paddingHorizontal: 30
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  header: {
    flex: 1,
    height: 400,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },

  spinnerTextStyle: {
    color: '#FFF',
  },
  content:{
      backgroundColor: colors.white,
      flex: 1,
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      paddingBottom: 40
  },
  nameContainer:{
      padding: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.grayLigth,
  },
  coverButton:{
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
 floatingButton:{
  backgroundColor: colors.white,
  borderRadius: 30,
  padding: 10,
  alignItems: 'center',
  alignSelf: 'flex-end',
  marginBottom: 10,
  marginRight: 20
 }
})

export default WorkerProfile
