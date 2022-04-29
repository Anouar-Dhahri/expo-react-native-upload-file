import React from 'react';
import { View } from 'react-native';
import DocPicker from './components/DocPicker';

export default function App() {
  return (
    <View style={{
      flex:1,
      justifyContent:"center",
      marginHorizontal:20
    }}>
      <DocPicker />
    </View>
  );
}
