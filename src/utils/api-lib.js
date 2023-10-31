const apiUrl = import.meta.env.VITE_API_URL

const makeApiRequest = async (url, method, user, body) => {
    try {
        const headers = {
            'Authorization': `Bearer ${user.accessToken}`,
            'Accept': '*/*'
        }
        if (body) { headers['Content-Type'] = 'application/json' }
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })
        if (!response.ok)
            throw new Error(`API request failed with status: ${response.status}`)

        const data = await response.json()
        return data
    } catch (error) {
        console.error('API request error:', error)
        throw error
    }
}

export const createDocument = async (collectionName, body, user) => {
    const url = `${apiUrl}/${collectionName}/`
    const method = 'POST'

    return makeApiRequest(url, method, user, body)
}

export const getDocuments = async (collectionName, user) => {
    const url = `${apiUrl}/${collectionName}/`
    const method = 'GET'

    return makeApiRequest(url, method, user)
}