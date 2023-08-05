import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { AuthContext } from "../../../services/auth/auth.context";
import { List, Avatar } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const UserSettings = ({navigation}) => {
  const { isAuth, onLogout, user } = useContext(AuthContext);

  console.log(navigation)

  const navigate = () => {
    navigation.navigate("UserFavourites")
  }

  return (
    <ScrollView>

    <View>
      <List.Section>
      <AvatarContainer>
        {user.image ? (
            <Avatar.Image
            size={180}
                source={{ uri: user.image }}
                backgroundColor="#2182BD"
                />
                ): (
                    <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
                    )}
        <Spacer position="top" size="large">
          <Text variant="label">{user.firstName} {user.lastName}</Text>
        </Spacer>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
        <SettingsItem
          title="Edit Profile"
          left={() => <List.Icon icon="account" />}
        onPress={() => console.log("heeej")}
          />
        <SettingsItem
          title="Change Password"
          left={() => <List.Icon icon="lock" />}
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
