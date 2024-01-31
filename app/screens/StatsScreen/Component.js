import React, { useState, useEffect} from 'react'
import { View, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import Card from '../../components/card'
import Heading from '../../components/text/Heading'
import SemiHeading from '../../components/text/SemiHeading'
import MinimalBar from '../../components/Stats/MinimalBar'
import PieBar from '../../components/Stats/PieBar'
import SegmentedControl from '../../components/SegmentedControl'
import HelpButton from '../../components/HelpButton'
import colors from '../../utils/colors'

import {
    LineChart,

  } from 'react-native-chart-kit'

import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { images } from '../../assets'
import { moneyFormat } from '../../utils/number'
import { mapStats, mapStatsLabels, mapStatsLabels2, filterWeek, filterMonth, toValueArray, MinAndMax } from '../../utils/stats'
import Label from '../../components/text/Label'
import { shadeColor } from '../../utils/String'
import LinearGradient from 'react-native-linear-gradient'

const mapState = mapStatsLabels2()

const config = ({ backgroundGradientFrom, backgroundGradientTo, fillShadowGradientOpacity = 1.0 }) => ({
    barPercentage: 0.2,
    backgroundGradientFrom,
    backgroundGradientTo,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${isNaN(opacity) ? 1 : opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${isNaN(opacity) ? 1 : opacity})`,
    propsForDots: {
        r: '2',
        strokeWidth: '1',
        stroke: '#0072ff'
    },
    fillShadowGradientOpacity,
    style:{
        paddingBottom: 100
    }
})

const chartConfig = config({
    backgroundGradientFrom: '#00C6FF',
    backgroundGradientTo: '#0072FF',
    fillShadowGradientOpacity: 0.5
})

const chartConfig2 = config({
    backgroundGradientFrom: '#ee0979',
    backgroundGradientTo: '#ff6a00',
}) 

const chartConfig3 = config({
    backgroundGradientFrom: '#4e54c8',
    backgroundGradientTo: '#8f94fb',
}) 

const fill = 'rgb(134, 65, 244)'

const Header = ({ title, helpConfig }) => {
    return (
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Heading>{title}</Heading>
            <HelpButton config={helpConfig} />
        </View>
    )
}

const PieChartContainer = ({ data, title, helpConfig }) => (
    <View style={{paddingHorizontal: 20, marginBottom: 40}}>
        <Header
            title={title}
            helpConfig={helpConfig}
        />
        <PieBar data={data} style={{marginTop: 20}} />
    </View>
)


const StatsScreen = ({ 
    revenue, 
    todayRevenue, 
    effectiveness_data, 
    effectiveness_global,
    average_revenue,
    works,
    categories,
    getStats
}) => {


    const [segmentIndex, setSegmentIndex] = useState(0)
    const [segmentIndex2, setSegmentIndex2] = useState(0)
    const [segmentIndex3, setSegmentIndex3] = useState(0)

   

    useEffect(() => {
        console.log('mapState', mapState)
        getStats()
    }, [])


    const getCityWork = () => {

        const colors = [
            ['#00d2ff','#3a7bd5'],
            ['#f2709c','#ff9472']
        ]

        const categoriesStats = works.flatMap(({ tag3 }) => tag3).filter(e => e && e !== '' ).reduce((a,c) => ({...a, [c]: (a[c] ? a[c] + 1 : 1) }), {})
        
       

        return Object.keys(categoriesStats).map((e, index) => {
            return {
                name: e,
                type: categoriesStats[e],
                color: colors[index%2],
            }
        })
    }

    const getTypeWork = () => {
       const bidding = works.flatMap(({ tag1 }) => tag1).filter(e => e === 'bidding')
       const direct = works.flatMap(({ tag1 }) => tag1).filter(e => e !== 'bidding')
        
        return [
            {
              name: 'Subasta',
              type: bidding.length,
              color:['#F9D423','#FF4E50'],
              icon: images.type.subast
            },
            {
              name: 'Directo',
              type: direct.length,
              color: ['#3a7bd5','#00d2ff'],
              icon: images.type.plane
            },
        ].filter(({type}) => type > 0)
    }

    const getCategoryWork = () => {
        
        const categoriesStats = works.filter(({tag2}) => tag2 !== undefined ).flatMap(({ tag2 }) => tag2).reduce((a,c) => ({...a, [c]: (a[c] ? a[c] + 1 : 1) }), {})

        return Object.keys(categoriesStats).map((e, index) => {
            const category = categories.filter(({category_name}) => category_name === e)[0]
            const color = [shadeColor(category.color1, 40), category.color1]
            return {
                name: e,
                type: categoriesStats[e],
                color: (index%2===0) ? color : color.reverse(),
                uri: category.image
            }
        })

    }

    const statTypeWorks = getTypeWork()
    const statCityWorks = getCityWork()
    const statCategoryWorks = getCategoryWork()
    const data1= toValueArray(filterMonth(effectiveness_data)).map(e => e * 100)
    const maxData1 = MinAndMax(data1)

    return (
        <ScrollView style={styles.container}>


            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                paddingVertical: 10, 
                borderBottomColor: colors.grayLigth, 
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 20,
                alignItems: 'center'
                }}>
                
                <View style={{flex: 1}}>
                    <Heading fontSize={20}>Ganancias de hoy</Heading>
                    {todayRevenue > average_revenue && <Label fontSize={12}>Tus ganancias de hoy superan tu promedio</Label>}
                </View>
                <Heading color={colors.mainColor} fontSize={30}>{moneyFormat(Math.ceil(todayRevenue))}</Heading>
            </View>

            <Header
                title="Ganacias"
                helpConfig={{
                    title:'Tus Ganancias',
                    description:'Aca podrás revisar tus ganacias semanales y mensuales, estas se consideran una vez que el pago esta liberado por parte del cliente. El monto que veras reflejado ya considera el pago de comisión.'
                }}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Label>Ganancia promedio por servicio:</Label>
                <SemiHeading style={{marginLeft: 10}}>{`${moneyFormat(Math.ceil(average_revenue))}`}</SemiHeading>
            </View>
            

            <SegmentedControl
                    labels={['Semana','Mes']}
                    selectedIndex={segmentIndex}
                    onChange={index => {
                       setSegmentIndex(index)
                    }}
                />
                

               
                {segmentIndex === 0 && (
                     <View style={{paddingHorizontal: 20}}>
                    <Card padding={20} style={{marginTop: 20}}>
                        <MinimalBar 
                                color="#3a7bd5"
                                data={filterWeek(revenue)}
                                suffix={value => value / 1000 > 0 ? 'K':''}
                                prefix="$"
                                factor={0.001}
                                    />
                    </Card>
                    </View>
                )}

{segmentIndex === 1 && (
                   <>
                    {revenue.length <= 0 && (
                    <Card>
 <View style={{flex:1, justifyContent: 'center', alignItems:'center', marginTop: 20 }}>
                        <Image source={images.volumenIcon.stat} style={{width: 120, height: 120}} resizeMode="contain" />
                        <SemiHeading style={{ marginTop: 10 }}>Aún no tienes estadisticas</SemiHeading>
                    </View>
                    </Card>
                   
                )}
 {revenue.length > 0  && (
                 <View style={{paddingHorizontal: 20}}>
                    <Card padding={0} style={{ height: 220, marginTop: 20}}>
                        <View style={{borderRadius: 10, overflow: 'hidden', height: 220}}>
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
                                    borderRadius: 10
                                }}
                                paddingRight={30}
                            />
                        </View>
                    </Card>
                    </View>
            )}
                   </>
                )}
     
           
           

          <View style={{marginTop: 20, paddingTop: 20,  borderTopColor: colors.grayLigth, borderTopWidth: StyleSheet.hairlineWidth}}>
            <Header
                title={segmentIndex2===0 ? 'Efectividad de esta semana' : 'Efectividad de esta mes'}
                helpConfig={{
                    title:'¿Qué es la efectividad?',
                    description:'Se refiere a que tan efectivas han sido tus ofertas, es la proporción entre ofertas realizadas y las ofertas aceptadas, es decir, si tienes un 100% de efectividad quiere decir que todas tus ofertas han sido aceptadas'
                }}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Label>Efectividad histórica:</Label>
                <SemiHeading style={{marginLeft: 10}}>{`${(Math.ceil(effectiveness_global * 100))}%`}</SemiHeading>
            </View>
           
           <SegmentedControl
                    labels={['Semana', 'Mes']}
                    selectedIndex={segmentIndex2}
                    onChange={index => {
                        setSegmentIndex2(index)
                    }}
                />

           <View style={{paddingHorizontal: 10}}>
                {segmentIndex2 === 0 && (
                    <Card padding={20} style={{marginTop: 20}}>
                        <MinimalBar 
                                color="#FF6A00"
                                data={filterWeek(effectiveness_data)}
                                suffix={()=>'%'}
                                factor={100}
                                    />
                    </Card>
                )}
                {segmentIndex2 === 1 && (
                    <Card padding={0} style={{marginTop: 20}}>
                         <LinearGradient colors={['#ee0979', '#ff6a00']} style={{borderRadius: 10, flexDirection:'row', overflow: 'hidden', height: 220}}  >
                    
                            
                                <YAxis
                                   data={[maxData1.min,maxData1.max]}
                                    svg={{
                                        fill: 'white',
                                        fontSize: 10,
                                    }}
                                    numberOfTicks={10}
                                    formatLabel={(value) => `${value}%`}
                                    height={220}
                                    style={{marginLeft: 10}}
                                    contentInset={{ top: 10, bottom: 30 }}
                                />
                                <View style={{flex: 1 }}>
                                    <BarChart 
                                        style={{ height: 220, flex: 1, marginLeft: 10 }} 
                                        data={data1}
                                        svg={{ fill:'rgba(255,255,255,0.5)' }} 
                                        contentInset={{ top: 10, right: 10, left: 10 }}
                                        >
                                        <Grid />
                                    </BarChart>
                                    <XAxis
                                        style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, marginRight: 5 }}
                                        data={mapState}
                                        formatLabel={(value, index) => mapState[value]}
                                        contentInset={{ left: 10, right: 10 }}
                                        svg={{ fontSize: 10, fill: 'white' }}
                                    />
                                </View>
                </LinearGradient>

                       
                    </Card>
                )}
           </View>
          </View>

            <View style={{marginTop: 20, paddingTop: 20, borderTopColor: colors.grayLigth, borderTopWidth: StyleSheet.hairlineWidth}}>
                <Header
                    title="Servicios asignados"
                    helpConfig={{
                        title:'Servicios asignados',
                        description:'Son los servicios que fueron aceptados por el cliente'
                    }}
                />

                <SegmentedControl
                    labels={['Semana', 'Mes']}
                    selectedIndex={segmentIndex3}
                    onChange={index => {
                        setSegmentIndex3(index)
                    }}
                />

                <View style={{paddingHorizontal: 20, marginBottom: 40}}>

                    {segmentIndex3 === 0 && (
                        <Card padding={20} style={{marginTop: 20}}>
                            <MinimalBar 
                                color="#4E54C8"
                                data={filterWeek(works)}
                                />
                        </Card>
                    )}

                    {segmentIndex3 === 1 && (
                        <Card padding={0} style={{marginTop: 20}}>
                             <LinearGradient colors={['#4e54c8', '#8f94fb']} style={{borderRadius: 10, flexDirection:'row', overflow: 'hidden', height: 220}}  >
                    
                            
                    <YAxis
                       data={toValueArray(filterMonth(works))}
                        svg={{
                            fill: 'white',
                            fontSize: 10,
                        }}
                        numberOfTicks={10}
                        formatLabel={(value) => (value % 1 !== 0) ? '': `${value}`}
                        height={220}
                        style={{marginLeft: 10}}
                        contentInset={{ top: 10, bottom: 30 }}
                    />
                    <View style={{flex: 1 }}>
                        <BarChart 
                            style={{ height: 220, flex: 1, marginLeft: 10 }} 
                            //data={[10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,10,10,20,30,40,50,60,70,70,10,10,20,30,20]}
                            data={toValueArray(filterMonth(works))} 
                            svg={{ fill:'rgba(255,255,255,0.5)' }} 
                            contentInset={{ top: 10, right: 10, left: 10 }}
                   
                            >
                            <Grid
                            
                            />
                        </BarChart>
                        <XAxis
                            style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, marginRight: 5 }}
                            data={mapState}
                            formatLabel={(value, index) => mapState[value]}
                            contentInset={{ left: 10, right: 10 }}
                            svg={{ fontSize: 10, fill: 'white' }}
                        />
                    </View>
    </LinearGradient>

                            
                        </Card>
                    )}

                </View>
                

             
                {statTypeWorks.length > 0 && (
                    <PieChartContainer
                    title="Tipos de servicio"
                    helpConfig={{
                        title:'Tipos de servicio',
                        description:'Mostramos la proporción entre servicios Directos y servicios de subasta.'
                    }}
                    data={statTypeWorks}
                />
                )}
                {statCategoryWorks.length > 0 && (
                     <PieChartContainer
                     title="Categorias del servicio"
                     helpConfig={{
                         title:'Categorias del servicio',
                         description:'Mostramos la proporción entre las categorias de tus servicios'
                     }}
                     data={statCategoryWorks}
                 />
                )}
               

                {statCityWorks.length > 0 && (
                    <PieChartContainer
                    title="Comunas más solicitadas"
                    helpConfig={{
                        title:'Comunas más solicitadas',
                        description:'Mostramos la proporción entre las comunas de tus servicios'
                    }}
                    data={statCityWorks}
                    />
                )}
               

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white
    }
})

export default StatsScreen