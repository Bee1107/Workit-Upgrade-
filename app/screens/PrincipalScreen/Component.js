import React, { useEffect, useState} from 'react'
import { StyleSheet , StatusBar, View} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import HeaderAddress from '../../components/HeaderAddress'
import Client from './Addons/Client'
import Worker from './Addons/Worker'
import SegmentedControl from '../../components/SegmentedControl'
import colors from '../../utils/colors'

const PrincipalScreen = ({ get, user, getEvals }) => {

    const navigation = useNavigation()
    const [menu, setMenu] = useState(0)
    const [isShadow, setIsShadow] = useState(false)

    useEffect(() => {
        get()
        getEvals()
    }, [])

    const onChange = index => {
        setIsShadow(false)
        setMenu(index)
    }
   
    const onScroll = nativeEvent => {
        setIsShadow(nativeEvent.contentOffset.y > 0)
    }

    return (   
        <View  style={styles.container}>
            <StatusBar translucent barStyle="dark-content" />
            <HeaderAddress />
            <View style={[styles.segmentContainer, (isShadow ? styles.shadow : {})]}>
                <SegmentedControl
                    labels={user.type==='WORK' ? ['Worker', 'Cliente'] : ['Cliente', 'Worker']}
                    onChange={onChange}
                />
            </View>
         
            {menu === (user.type==='WORK'? 0 : 1) &&  <Worker onScroll={onScroll} />}
            {menu === (user.type==='WORK'? 1 : 0) && <Client onScroll={onScroll} navigation={navigation} />}
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    segmentContainer:{
        backgroundColor: colors.white,
        zIndex: 999
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})

export default PrincipalScreen