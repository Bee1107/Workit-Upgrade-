const deg2rad = deg => deg * (Math.PI/180)

export const getDistanceFromLatLonInKm = ( obj, obj2) => {

    if(obj === undefined || obj2 === undefined){
        return -1
    }

    const R = 6371
    const dLat = deg2rad(obj2.lat - obj.lat)
    const dLon = deg2rad(obj2.lon - obj.lon)
    const a = Math.sin(dLat / 2) * Math.sin(dLat/2) + Math.cos(deg2rad(obj.lat)) * Math.cos(deg2rad(obj2.lat)) *  Math.sin(dLon/2) * Math.sin(dLon/2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return (R * c).toFixed(2)

}
  
export const getSelectedAddress = (addresses, selectedAddress) => {
    if(addresses){

        const filter = addresses.filter( ({ uid }) => (selectedAddress && uid === selectedAddress.uid ))
       
        if(filter.length === 0){
            return addresses[0]
        } else {
            return filter[0]
        }
    }

    return undefined
}
