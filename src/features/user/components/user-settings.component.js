import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
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
  const [loggedUser, setLoggedUser] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUser(user._id).then((response) => {
        setLoggedUser(response);
      });
    }, [])
  );


  return (
    <ScrollView>

    <View>
      <List.Section>
      <AvatarContainer>
        {user.image ? (
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
