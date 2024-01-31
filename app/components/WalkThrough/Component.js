import React, { useState, useRef, useEffect} from 'react'
import { View, Modal, StyleSheet, Image} from 'react-native'
import Label from '../../components/text/Label'
import SemiHeading from '../text/SemiHeading'
import colors from '../../utils/colors'
import PagerView from 'react-native-pager-view'
import PaginationDot from 'react-native-animated-pagination-dot'
import ActionButton from '../../components/ActionButton'


const WalkThough = ({pages, tooltipKey='', save, storage, read}) => {

    const [page, setPage] = useState(0)
    const refPagerView = useRef()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        read()
        setTimeout(() => {
          setVisible(!storage[tooltipKey])
        }, 500)
    }, [])

   

    const onNext = () => {
        if(page < 3){
            refPagerView.current?.setPage(page + 1)
        } else {
            save({
                [tooltipKey]: true
            })
            setVisible(false)
        }
        
    }

    return (
        <>
        {storage[tooltipKey] && null}
        {!storage[tooltipKey] && (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          
        }}
        statusBarTranslucent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <PagerView
          ref={refPagerView} 
                        initialPage={0}
                        style={styles.pagerView} 
                        onPageScroll={ ({ nativeEvent}) => {
                            setPage(nativeEvent.position)
                        }}>

                        {pages.map((e, index) => (
                                <View key={`key_${index}`} style={{alignItems: 'center'}}>
                                    <Image source={e.image} style={{width: 200, height: 113}} resizeMode="contain" />
                                <SemiHeading style={{marginTop: 5}}>{e.title}</SemiHeading>
                                <Label style={{marginTop: 5}}>{e.content}</Label>
                            </View>
                        ))}
            </PagerView>

           <View style={{flex: 1, height: 30, justifyContent: 'center', alignItems: 'center'}}>
            <PaginationDot 
                activeDotColor={colors.mainColor} 
                curPage={page} 
                maxPage={pages.length}
                sizeRatio={1.0}
                style={{alignSelf: 'center'}}
            />
            </View>
            <ActionButton 
                text={`${(page !== pages.length -1) ? 'Siguiente': 'Entendido'}`} 
                onPress={onNext}
                style={{marginTop: 20, marginHorizontal: 20}}
                />

          </View>
        </View>
      </Modal>
        )}
        </>
    )
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalView: {
      width: '100%',
      margin: 20,
      backgroundColor: colors.white,
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    pagerView: {
        height: 260
    }
  })

export default WalkThough