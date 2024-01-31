export const numberFormat = amount =>  `${parseInt(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
export const moneyFormat = amount => {
    const onlyNumber = `${amount}`.replace(/[^0-9]+/g, '')
    if(onlyNumber === ''){
        return ''
    }

    return `$${numberFormat(Math.ceil(onlyNumber))}`
}

export const stringToInt = amount => parseInt(amount.replace(/[^0-9]+/g, ''))

export const getRating = ({worker_count, worker_rating, client_count, client_rating}) => {
    
    let result = 0
    let count = 0

    if(worker_count && worker_rating){
        result += worker_rating / worker_count
        count++
    }

    if(client_count && client_rating){
        result += client_rating / client_count
        count++
    }

    return Math.ceil(result / Math.max(count, 1))
}