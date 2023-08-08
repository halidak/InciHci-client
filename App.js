import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AccountScreen } from './src/features/account/screen/account.screen';
import { Navigator } from './src/infrastructure/navigation';
import { CategoryContextProvider } from './src/services/category/category.context';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import { AuthContextProvider } from './src/services/auth/auth.context';
import { FavouritesContextProvider } from './src/services/favourites/favourites.context';
import { ProductContextProvider } from './src/services/product/product.context';

export default function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <ProductContextProvider>
        <FavouritesContextProvider>
          <CategoryContextProvider>
           <Navigator />
           <StatusBar style="auto" />
          </CategoryContextProvider>
        </FavouritesContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
    </>
  );
}


