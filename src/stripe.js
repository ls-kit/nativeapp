import React, {useEffect} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {
  StripeTerminalProvider,
  useStripeTerminal,
} from '@stripe/stripe-terminal-react-native';

const Stripe = ({navigation}) => {
  const {initialize} = useStripeTerminal();

  useEffect(() => {
    initialize({
      logLevel: 'verbose',
    });
  }, [initialize]);

  useEffect(() => {
    async function init() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Stripe Terminal needs access to your location',
            buttonPositive: 'Accept',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Location');
        } else {
          console.error(
            'Location services are required in order to connect to a reader.',
          );
        }
      } catch {}
    }
    init();
  }, []);

  const {discoverReaders, discoveredReaders} = useStripeTerminal({
    didUpdateDiscoveredReaders: readers => {
      // After the SDK discovers a reader, your app can connect to it.
    },
  });

  const handleDiscoverReaders = async () => {
    // The list of discovered readers is reported in the didUpdateDiscoveredReaders method
    // within the useStripeTerminal hook.
    const {error} = await discoverReaders({
      discoveryMethod: 'bluetoothScan',
    });

    if (error) {
      Alert.alert(
        `  Discover readers error: ,
        ${error.code}, ${error.message}`,
      );
    }
  };
  const handleConnectBluetoothReader = async id => {
    const {reader, error} = await connectBluetoothReader({
      reader: selectedReader,
      locationId: '{{LOCATION_ID}}',
    });

    if (error) {
      console.log('connectBluetoothReader error', error);
      return;
    }

    console.log('Reader connected successfully', reader);
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        style={{backgroundColor: 'black', padding: 20}}
        onPress={handleDiscoverReaders}>
        <Text style={{color: 'white'}}>Search for reader</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{backgroundColor: 'black', padding: 20, marginTop: 20}}
        onPress={handleConnectBluetoothReader}>
        <Text style={{color: 'white'}}>Connect to a reader</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 20,
          position: 'absolute',
          bottom: 10,
        }}
        onPress={() => {
          navigation.navigate('payment');
        }}>
        <Text style={{color: 'white'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stripe;
