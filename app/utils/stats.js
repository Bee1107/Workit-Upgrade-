import { diffDays, daysLetter, getFloorDate, formatDate } from './date'

const dataToMap = data => data.reduce((a,c)=>({...a, [c.date.split('-')[0]]: c}), {})

const EmptyMap = (length, func) =>  Array.from({ length }).map(func)

export const MinAndMax = (data) => {
    let max = Number.MIN_VALUE
    let min = Number.MAX_VALUE

    data.forEach(number => {
        max = Math.max(max, number)
        min = Math.min(min, number)
    })

    return {max, min}
}

export const mapStatsLabels = () => {
    return  EmptyMap(diffDays(), (e, index)=>index + 1).map(date => date % 4 === 0 ? date : '')
}

export const mapStatsLabels2 = () => {
    const empty = EmptyMap(diffDays(), (e, index)=>index )
    return  empty.map((date,index) => ((date % 5) === 0 || index === empty.length - 1)  ? date + 1: '').filter(e => e !== '')
}

export const mapStats = data => {
    const map = dataToMap(data)
    return EmptyMap(diffDays(), (e, index)=>{
        const currentValue = map[`${index + 1}`]
        return currentValue ? currentValue.value / 1000 : 0
    })
}

export const sumStats = data => data.reduce((a, { value })=> a + value,0)

export const getTodayData = data => {
    const now = getFloorDate()
    const dateStat =  formatDate(now)
    return data.filter(({date})=>date===dateStat)
}

export const filterWeek = data => {
    const map = dataToMap(data)
    const now = getFloorDate()
    const first = now.getDate() - now.getDay() + 1
    const firstday = new Date(now.setDate(first))

    return EmptyMap(7, (e, index)=>{
        const currentValue = map[`${index + firstday.getDate()}`]
        return {
            label: daysLetter[index],
            value: currentValue ? currentValue.value : 0
        }
    })
}

export const filterMonth = data => {
    const map = dataToMap(data)
    
    return EmptyMap(diffDays(), (e, index)=>{
        const currentValue = map[`${index }`]
        return {
            label: daysLetter[index],
            value: currentValue ? currentValue.value : 0
        }
    })
}

export const toValueArray = data => data.map(({value})=>value)