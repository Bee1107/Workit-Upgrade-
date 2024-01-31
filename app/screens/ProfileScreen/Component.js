import React from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SectionList,
  Alert
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {useNavigation} from '@react-navigation/native'
import {images} from '../../assets'
import AvatarPicker from '../../components/AvatarPicker'
import Heading from '../../components/text/Heading'
import SemiHeading from '../../components/text/SemiHeading'
import Label from '../../components/text/Label'
import Ranking from '../../components/Ranking'
import { getNameFormat } from '../../utils/String'
import colors from '../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DATA_PROFILE } from '../../utils/constants'
import { getRating } from '../../utils/number'

const Item = ({item, onPress, style}) => (
  <View  style={styles.itemContainer}>
    <TouchableOpacity onPress={onPress}>
    <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#CCC'}}>
      <View  style={[styles.item, style]}>
        <View style={{flexDirection: 'row',}}>
          {item.icon && <Image source={item.icon} style={{width: 20, height: 20, tintColor: item.color ? item.color : colors.mainColor}} resizeMode="contain" /> }
          <Label color={colors.text.subtitle} style={styles.itemLabel}>{item.title}</Label>
        </View>
        {!item.hideArrow && <Image source={images.arrow.gray} style={{width: 20, height: 20}} resizeMode="contain" />}
      </View>
    </View>
  </TouchableOpacity>
  </View>
)

const ProfileScreen = ({isLoading, user, logout}) => {
  const navigation = useNavigation()
  const menu = DATA_PROFILE
                      .map(item => ({
                        ...item, 
                        data: item.data.filter(({isWorker}) => (isWorker === undefined || isWorker && user.type === 'WORK' || !isWorker && user.type === 'HIRE'))
                      }))

  const renderItem = ({item, section:{sectionIndex}}) => (
    <Item
      item={item}
      onPress={() => {
        
        if (item.navigate) {
          navigation.navigate(item.navigate)
        } else if(sectionIndex == 2){
          Alert.alert(
            'Logout',
            '¿Estás seguro que quiere salir?',
            [
                {
                    style: 'cancel',
                    text: 'Cancelar',
                    onPress: () => {
                        
                    },
                },
              {
                text: 'Ok',
                onPress: () => {
                  logout()
                },
              },
              
            ],
            {cancelable: false, onDismiss: () => {}},
          )
          
        }
      }}
    />
  )

  return (
    <View style={styles.container}>
    
      <Spinner
        visible={isLoading}
        textContent={'Cargando...'}
        textStyle={styles.spinnerTextStyle}
      />

      <ImageBackground
        source={images.deco.header}
        style={styles.header}
        resizeMethod="scale" />

      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
          <SectionList
          sections={menu}
          keyExtractor={({sectionIndex}, index) => `${sectionIndex}_${index}`}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <SemiHeading color={colors.text.title}>{title}</SemiHeading>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={{alignItems: 'center', paddingTop: 60}}>
        
              <AvatarPicker url={user.profile_picture} />
              <View style={{flex: 1, width:'100%', backgroundColor: colors.white, alignItems: 'center', marginTop: 20, paddingBottom: 20}}>
                <Heading>{getNameFormat(user)}</Heading>
                <Ranking rank={getRating(user)} style={{marginTop: 10}} />
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    height: 200,
    position: 'absolute',
    top: -40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomCard: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  itemContainer:{
    paddingHorizontal: 19,
    backgroundColor: colors.white,
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 19
  },
  itemLabel: {
    color: '#CCC',
    marginLeft: 27
  },
  sectionHeader:{
    backgroundColor: colors.winterWhite,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
})

export default ProfileScreen
