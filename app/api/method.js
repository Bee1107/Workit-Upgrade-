export const post = (url,data, headers = {}) => fetch(url,
                                    {
                                        method: 'POST', 
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Accept: 'application/json',
                                            ...headers
                                        },
                                        body: JSON.stringify(data) 
                                    })
                                    .then(response => response.json())
                                    

export const get = url => fetch(url)
                            .then(response => response.json())