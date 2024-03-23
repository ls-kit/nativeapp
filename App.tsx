import React, {useEffect} from 'react';
import {StripeTerminalProvider} from '@stripe/stripe-terminal-react-native';

import Payment from './src/payment';

const App = () => {
  const fetchTokenProvider = async () => {
    const response = await fetch(`yourAPiURL/connection_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {secret} = await response.json();
    return secret;
  };
  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}>
      <Payment />
    </StripeTerminalProvider>
  );
};

export default App;
