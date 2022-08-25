import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import React, { useCallback } from 'react'

export const RightHeaderIcon = () => {
  const supportedURL = "https://loker.promedik.com/";

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        console.log(supported, '<<<< supported'); // value = true
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
  };

  return (
    <View>
      <OpenURLButton url={supportedURL}>Icon</OpenURLButton>
    </View>
  )
}

const styles = StyleSheet.create({})