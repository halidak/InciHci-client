import React, { useContext, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator  } from "react-native";
import { AuthContext } from "../../../services/auth/auth.context";
import { List, Avatar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";
import { useFocusEffect } from '@react-navigation/native';


const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const UserSettings = ({navigation}) => {
  const { isAuth, onLogout, user, getUser } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      if (user && user._id) {
        getUser(user._id)
          .then((response) => {
            setLoggedUser(response);
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
      }
    }, [user])
  );

  if (!loggedUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2182BD" />
      </View>
    );
  }

  return (
    <ScrollView>

    <View>
      <List.Section>
      <AvatarContainer>
        {loggedUser.image ? (
            <Avatar.Image
            size={150}
                source={{ uri: loggedUser.image }}
                backgroundColor="#2182BD"
                />
                ): (
                  <Avatar.Text size={150} label={loggedUser.firstName[0]} />
                    )}
        <Spacer position="top" size="large">
          <Text variant="label">{loggedUser.firstName} {loggedUser.lastName}</Text>
        </Spacer>
        <Spacer position="top" size="large">
          <Text variant="label">{loggedUser.email}</Text>
        </Spacer>
      </AvatarContainer>
        <SettingsItem
          title="Edit Profile"
          left={() => <List.Icon icon="account" />}
        onPress={() => navigation.navigate("UpdateUser")}
          />
        <SettingsItem
          title="Change Password"
          left={() => <List.Icon icon="lock" />}
          onPress={() => navigation.navigate("ChangePassword")}
          />
        <SettingsItem
            title="Favourites"
            left={() => <List.Icon icon="heart" />}
          onPress={() => navigation.navigate("UserFavourites", {
            navigatio: navigation
          })}
          />
         <SettingsItem
          title="Your product"
          left={() => <List.Icon icon="account" />}
          onPress={() => navigation.navigate("UserPosted")}
          />
        <SettingsItem
          title="Logout"
          left={() => <List.Icon icon="logout" />}
          onPress={() => onLogout()}
          />
      </List.Section>
    </View>
          </ScrollView>
  );
};
