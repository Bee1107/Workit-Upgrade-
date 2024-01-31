import React, { useEffect } from 'react'
import { StyleSheet , View, Dimensions, Image } from 'react-native'
import Heading from '../../../../../../components/text/Heading'
import colors from '../../../../../../utils/colors'
import SemiHeading from '../../../../../../components/text/SemiHeading'
import Label from '../../../../../../components/text/Label'
import Card from '../../../../../../components/card'
import {
    LineChart,
    ProgressChart
  } from 'react-native-chart-kit'
import { moneyFormat } from '../../../../../../utils/number'
import { images } from '../../../../../../assets'
import { mapStats, mapStatsLabels } from '../../../../../../utils/stats'

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 114, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(151, 151, 151, ${opacity})`,
    style: {
        borderRadius: 10
    },
    propsForDots: {
        r: '2',
        strokeWidth: '1',
        stroke: 'white'
    }
}

const CardStat = ({ getStats, revenue, effectiveness}) => {

    useEffect(() => {
        getStats()
    }, [])


    return (   
        <>
            <View style={styles.headerContainer}>
                <Heading color={colors.text.heading}  fontSize={20}>Mis estadisticas</Heading>
            </View>
            <View style={{paddingHorizontal: 20, marginTop: 10}}>
                <Card padding={0}>
                    
                    <View style={{padding: 10}}>
                        <SemiHeading>Último mes</SemiHeading>
                    </View>

                  
                    {revenue.length > 0 && (
                         <LineChart
                            data={{
                            labels: mapStatsLabels(),
                            datasets: 
                                [{
                                    data: mapStats(revenue)
                                }]
                            }}
                            width={Dimensions.get('window').width - 60} 
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} 
                            chartConfig={chartConfig}
                            bezier
                            style={{
                             
                            }}
                        />
                    )}

                    {revenue.length <= 0 && (
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center', marginTop: 20 }}>
                            <Image source={images.volumenIcon.stat} style={{width: 120, height: 120}} resizeMode="contain" />
                            <SemiHeading style={{ marginTop: 10 }}>Aún no tienes estadisticas</SemiHeading>
                        </View>
                    )}
                    <View style={{flexDirection:'row', justifyContent:'space-between',borderTopColor: colors.grayLigth, borderTopWidth: StyleSheet.hairlineWidth, marginTop: 20, padding: 10}}>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <View style={{height: 60, alignItems: 'center', justifyContent:'center'}}>
                               
                                <Label fontSize={30}>{`${moneyFormat(Math.ceil(revenue.map(({value})=>value).reduce((a,b)=>a+b,0)))}`}</Label>
                            </View>
                            <Label fontSize={12}>Ganancias Totales</Label>
                        </View>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                            <View style={{justifyContent: 'center'}}>
                                <ProgressChart
                                    data={{
                                        data: [effectiveness]
                                    }}
                                    width={60}
                                    height={60}
                                    chartConfig={chartConfig}
                                    radius={20}
                                    strokeWidth={6}
                                    hideLegend={true}
                                    />
                                <View style={{ position:'absolute', alignSelf: 'center'}}>
                                <SemiHeading fontSize={12}>{`${(effectiveness * 100).toFixed()}%`}</SemiHeading>
                                </View>
                            </View>
                            <Label fontSize={12}>Efectividad</Label>
                         </View>
                    </View>
                </Card>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  
    headerContainer:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
})

export default CardStat