import axios from 'axios'

class APIRequest {
    baseUrl
    authToken

    constructor(baseUrl, authToken) {
        this.baseUrl = baseUrl
        this.authToken = authToken
    }

    async postRequest(endpoint, body) {
        try {
            const response = await axios.post(`${this.baseUrl}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json',
                },
                data: body, // JSON obj
            })

            if (response.status !== 200) {
                console.error(`Unexpected status code: ${response.status}`)
                throw new Error('API response status is not 200')
            }

            console.log('Response Code:', response.status)
            console.log('Response Body:', response.data)

            return response.data
        } catch (error) {
            console.error('Error during API request:', error.message)
            throw error
        }
    }
}

export default APIRequest
