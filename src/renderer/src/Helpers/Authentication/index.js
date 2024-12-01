const URL = "http://localhost:8000"
export const signUp = async (body) => {
    let res = await fetch(`${URL}/auth/signup`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(body)
    })
    let json = await res.json()

    return json


}
export const signIn = async (body) => {
    let res = await fetch(`${URL}/auth/signIn`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(body)
    })
    let json = await res.json()

    return json


}