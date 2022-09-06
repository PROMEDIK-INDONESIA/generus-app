import React from "react";
import {View, Text} from "react-native";
const PropTypes = require("prop-types");
 
export const BooksBlock = (props) => {
    const {
        appBossWrapStyle,
        block,
        calcFontSize,
        colors,
        fontFamilyStyle,
        global,
        handleLinkClicks,
        htmlHandleClicks,
        id,
        isNavActive,
        lastItem,
        navigation,
        toUserBasedOnSettings,
        viewWidth,
        wrapHtml,
        wrapStyle
    } = props;
    return (
        <View>
            <Text>
                Books List
            </Text>
        </View>
    );
};

// const styles = StyleSheet.create({})
// import { useEffect } from 'react';
// import { Button, View } from 'react-native';
// import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';

// export const HospitalBlock = () => {
//   const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.Interstitial, {
//     requestNonPersonalizedAdsOnly: true,
//   });

//   useEffect(() => {
//     // Start loading the interstitial straight away
//     load();
//   }, [load]);

//   useEffect(() => {
//     if (isClosed) {
//       // Action after the ad is closed
//       // navigation.navigate('NextScreen');
//     }
//   }, [isClosed]);

//   return (
//     <View>
//       <Button
//         title="Navigate to next screen"
//         onPress={() => {
//           if (isLoaded) {
//             show();
//           } else {
//             // No advert ready to show yet
//             // navigation.navigate('NextScreen');
//           }
//         }}
//       />
//     </View>
//   );
// }