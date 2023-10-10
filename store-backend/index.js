const express = require('express');
const stripe = require('stripe')('sk_test_51LoBCWGC9MhpkKozXeOQoG0UPShJdolQg9mXSa9w799aFFX0uCvv9Xf2rFjaC0xhhBCtxrGV5Qia2dozYnHZzbaL00DFxT0TIE');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Wrld!');
});

app.post('/account', async (req, res) => {
    const account = await stripe.accounts.create({
        type: 'express',
      });
    const accountId = account.id;
    const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'account_onboarding',
      });
    res.json(accountLink)
})

app.post('/payment-sheet/:itemId', async (req, res) => {
    const {itemId} = req.params;
    let price = 0;
    let destinationAccountId = "";

    if(itemId == 1){
        price = 1000;
        destinationAccountId = "acct_1NzaId9SCquKWTyl"
    }

    console.log(price, destinationAccountId)
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2023-08-16'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'eur',
      customer: customer.id,
      // In the latest version of the API, specifying the automatic_payment_methods parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: 123,
      transfer_data: {
        destination: destinationAccountId,
      },
    });
  
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51LoBCWGC9MhpkKozMAo0UEkGa8FS5TEx8ExG6T702Z8HCA7BvkLRe9jvKHZn26XTJobo4eSgAhVcRQIdAJSJVYAk0077oMzWuL'
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});