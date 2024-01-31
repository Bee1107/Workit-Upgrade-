
export const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const months_large = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

export const daysLetter = ['L','M','M','J','V','S','D']

export const dateFixed = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
}

export const nextMonth = () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return date
}

export const dateToHumanFormat = date => {
    const options = {
         year: 'numeric', month: 'numeric', day: 'numeric',
    }
    
    return date.toLocaleDateString('es-CL', options).split('-').join('/')
}

export const nextDay = (hours = -1) => {
    const now = dateFixed(new Date())
    
    now.setDate(now.getDate() + 1)
    
    if(hours !== -1){
        now.setHours(now.getHours() + hours)
    }
    
    return now
}


export const dateToHumanFormat2 = date => `${date.getDate()} ${months[date.getMonth()]}`

export const timeToHumanFormat = date => {

    const hour = date.getHours()
    const minutes = date.getMinutes()
    return `${(hour<10 ? '0' : '')}${hour}:${(minutes<10 ? '0' : '')}${minutes}`
}

export const toChatTime = time => {
    const date = new Date(parseInt(time))
    const localeSpecificTime = date.toLocaleTimeString().replace(/:\d+ /, ' ')
    return localeSpecificTime.toLocaleLowerCase()
}

export const diffDays = () => {
    const date1 = new Date()
    const date2 = new Date()
    date2.setMonth(date2.getMonth() + 1)
    return Math.ceil(( date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
}  

export const getFloorDate = () => {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    return now
}



export const dateInverse = (date) => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
}

export const sameDay = (d1,d2) => d1.getFullYear() === d2.getFullYear() &&
                                    d1.getMonth() === d2.getMonth() &&
                                    d1.getDate() === d2.getDate()

export const getFixedNow = () => {
    const now = getFloorDate()
    now.setDate(1)

    return now.getTime() - now.getTimezoneOffset() * 60 * 1000
}

export const formatDate = date => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

export const formatLongDate = date => {
    const comp = date.split('-')
    return `${comp[0]} de ${months_large[parseInt(comp[1] - 1)]} de ${comp[2]}`
}