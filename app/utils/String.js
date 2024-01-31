import { normalizeArray } from './array'

export const cutString = (str, limit = 60) => {
    if(!str) return ''
    return `${str.substring(0, Math.min(limit, str.length))}${(str.length <= limit) ? '' : '...'}`
}

export const replacePhone = text => {
    return text.replace(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,'***********')
}

export const replaceEmail = text => {
    return text.replace(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'*****@******.***')
}

export const getNameFormat = (user) => {
    if(!user) return ''
    const formatName = `${user.name} ${user.father_last_name}`
    return formatName.toUpperCase()
}

export const getNameFormatLowerCase = (user) => {
    if(!user) return ''
    const formatName = `${user.name} ${user.father_last_name}`
    return formatName
}

export const shadeColor = (color, percent) => `#${[color.substring(1,3), color.substring(3,5), color.substring(5,7)]
                            .map(n => Math.floor(Math.min(parseInt(n,16) * (100 + percent) / 100, 255)).toString(16))
                            .map(n => ((n.length==1)?`0${n}`:n))
                            .join('')}`


export const normalizeStr = str => {
    if(str){
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').toUpperCase()
    }else{
        return ''
        
    }
   
}

export const getWords = text => {
    const prepositions = [
        'A','E','I','O','U','Y', 'LAS', 'LOS','EL', 'LA','LO','ELLA','NOSOTROS','ELLO','AQUELLO','YO','L@S','LES', 
        'ANTE', 'BAJO', 'CABE', 'CON', 'CONTRA', 'DE', 'DESDE','NOSOTR@S','NOSOTRXS', 
        'DURANTE', 'EN', 'ENTRE', 'HACIA', 'HASTA', 'MEDIANTE', 
        'PARA', 'POR', 'SEGUN', 'SIN', 'SO', 'SOBRE', 'TRAS', 'VERSUS', 'VIA','ESTO']
    return [...new Set(text.split(' ')
            .map(e => normalizeStr(e))
            .filter(e => !prepositions.includes(e)))]
            .filter(e => e !== '')
            
}