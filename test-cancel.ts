// test-cancel.ts
import { PaytrailClient } from './src/paytrail-client'
import * as crypto from 'crypto'

const client = new PaytrailClient({
    merchantId: 695861,
    secretKey: 'MONISAIPPUAKAUPPIAS',
    platformName: 'test'
})

const runFullTest = async () => {
    try {
        console.log('1. Creating a new payment with manual activation...')
        const payment = await client.createPayment({
            stamp: crypto.randomUUID(),
            reference: '9187445',
            amount: 1590,
            currency: 'EUR',
            language: 'FI',
            items: [{
                unitPrice: 1590,
                units: 1,
                vatPercentage: 24,
                productCode: '#test-123',
                description: 'Test Product',
                stamp: crypto.randomUUID(),
                reference: 'item-ref-123',
                merchant: '695874'
            }],
            customer: { email: 'test@example.com' },
            redirectUrls: {
                success: 'https://example.com/success',
                cancel: 'https://example.com/cancel'
            },
            callbackUrls: {
                success: 'https://example.com/success',
                cancel: 'https://example.com/cancel'
            },
            manualInvoiceActivation: true
        })

        if (!payment.data || payment.status !== 200) {
            console.error('❌ Failed to create payment:', JSON.stringify(payment, null, 2))
            return
        }

        const transactionId = payment.data.transactionId
        console.log(`✅ Payment Created! Transaction ID: ${transactionId}`)

        console.log(`2. Attempting to cancel transaction: ${transactionId}...`)
        const cancelResponse = await client.cancelPayment({ transactionId })

        console.log('✅ Cancel Success! Response Status:', cancelResponse.status)
        console.log('Full Response Data:', JSON.stringify(cancelResponse.data, null, 2))

    } catch (error: any) {
        console.error('❌ Error during test:', error.message)
    }
}

runFullTest()
