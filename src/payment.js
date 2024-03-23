import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const Payment = () => {
  const [amount, setAmount] = useState('');

  const createPayment = () => {
    //here we wiull call restfull Api to sed you the information to create payment intent if intent is o serverside
    //in resonse we will call   After you’ve created a PaymentIntent, the next step is to collect a payment method with the SDK.
    // In order to collect a payment method, your app needs to be connected to a reader. The connected reader waits for a card to be presented after your app calls collectPaymentMethod

    collectPayement();
  };

  //After creating a PaymentIntent, the next step is to collect a payment method

  const collectPayement = async () => {
    const {paymentIntent, error} = await retrievePaymentIntent(clientSecret);

    if (error) {
      // Placeholder for handling exception
      return;
    }

    // Placeholder for collecting payment method
  };

  const confirmPayement = async () => {
    const {paymentIntent, error} = await confirmPaymentIntent(paymentIntentId);

    if (error) {
      // Placeholder for handling exception
      return;
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
        }}
        placeholder="Enter the amount"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={{backgroundColor: 'black', padding: 20, marginTop: 10}}
        onPress={createPayment}>
        <Text style={{color: 'white'}}>Collect paymet methhod</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: 'black', padding: 20, marginTop: 10}}
        onPress={confirmPayement}>
        <Text style={{color: 'white'}}>Collect Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
