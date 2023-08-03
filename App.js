import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AccountScreen } from './src/features/account/screen/account.screen';
import { Navigator } from './src/infrastructure/navigation';
import { CategoryContextProvider } from './src/services/category/category.context';

export default function App() {
  return (
    <>
    <CategoryContextProvider>
    <Navigator />
      <StatusBar style="auto" />
    </CategoryContextProvider>
    </>
  );
}


