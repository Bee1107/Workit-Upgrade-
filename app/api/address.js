export const getAddressAutocomplete = address => {

    return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAFNJwycb9jul04lJHbJyXV7prNO3utPDU&input=${address}&sensor=true`)
    .then(response => response.json())
}

export const getLocation = address => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBN4jC9UZBFnvbu-PX3A5HXue9crXS56ZQ`)
    .then(response => response.json())
}

/*
export const getLocation = address => {
    return fetch(`https://geocode-address-to-location.p.rapidapi.com/v1/geocode/autocomplete?text=${address}&limit=10&lang=en`, {
        method: 'GET',
        headers: {
		'x-rapidapi-key': '539420bd5emshad537be50f22b40p1a4d6bjsn23f2df3e7f4f',
		'x-rapidapi-host': 'geocode-address-to-location.p.rapidapi.com'
	}
}).then(response => response.json())
}
*/