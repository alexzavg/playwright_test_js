import { expect } from '@playwright/test'
import axios from 'axios'

export class APIRequest {
    async getBitcoinPrice() {
        const url = process.env.BASE_URL_API!
        const response = await axios.get(url)
    
        // Assertions
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('time')
        expect(response.data.time).toHaveProperty('updated')
        expect(typeof response.data.time.updated).toBe('string')
        expect(response.data.time).toHaveProperty('updatedISO')
        expect(response.data.time.updatedISO).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+00:00$/)
        expect(response.data.time).toHaveProperty('updateduk')
        expect(typeof response.data.time.updateduk).toBe('string')
    
        expect(response.data).toHaveProperty('disclaimer')
        expect(typeof response.data.disclaimer).toBe('string')
    
        expect(response.data).toHaveProperty('chartName')
        expect(response.data.chartName).toBe('Bitcoin')
    
        expect(response.data).toHaveProperty('bpi')
        const currencies = ['USD', 'GBP', 'EUR']
        currencies.forEach(currency => {
            expect(response.data.bpi).toHaveProperty(currency)
            expect(response.data.bpi[currency]).toHaveProperty('code')
            expect(response.data.bpi[currency].code).toBe(currency)
            expect(response.data.bpi[currency]).toHaveProperty('symbol')
            expect(typeof response.data.bpi[currency].symbol).toBe('string')
            expect(response.data.bpi[currency]).toHaveProperty('rate')
            expect(typeof response.data.bpi[currency].rate).toBe('string')
            expect(response.data.bpi[currency]).toHaveProperty('description')
            expect(typeof response.data.bpi[currency].description).toBe('string')
            expect(response.data.bpi[currency]).toHaveProperty('rate_float')
            expect(typeof response.data.bpi[currency].rate_float).toBe('number')
            expect(response.data.bpi[currency].rate_float).toBeGreaterThan(0)
            console.log(`Bitcoin price is: ${response.data.bpi[currency].rate} ${currency}`)
        })
    }
}

export default APIRequest
