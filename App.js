import React from 'react';
import { StyleSheet, View } from 'react-native';
import FinanciamentoCalculadora from './FinanciamentoCalculadora';

export default function App() {
  return (
    <View style={styles.container}>
      <FinanciamentoCalculadora />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
