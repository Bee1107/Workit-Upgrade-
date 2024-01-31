

export const secureArray = data => data ? data : []

export const normalizeArray = data =>  {

    return [...new Set(data.map(e => e.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').toUpperCase()))]
            .filter(e => e !== '')
            
}

export const groupInTwoItems = data => Object.values(data
                                        .map((e,i)=> ({value: e, key: Math.floor(i / 2)}))
                                        .reduce((a,{key, value})=>((a[key]) ? {...a,[key]:[...a[key],...[value]]} : {...a,[key]:[value]} ),{}))




export const groupByKey = (data, key, formatTitle = title => title, headerKey = 'title') => {
    const map = data.reduce((a,c)=>({...a, [c[key]]: (a[c[key]] ? [...a[c[key]],...[c]] : [c]) }), {})
   
    return  Object.keys(map).map(e => ({
        [headerKey]: formatTitle(e),
        data: map[e]
    }))
}