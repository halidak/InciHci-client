import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AccountScreen } from './src/features/account/screen/account.screen';
import { Navigator } from './src/infrastructure/navigation';

export default function App() {
  return (
    <>
    <Navigator />
      <StatusBar style="auto" />
    </>
  );
}


