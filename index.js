import { Image, Text, View } from 'react-native';
import { BooksBlock } from './src';
// import { HospitalBlock } from './src';

export const applyCustomCode = (externalCodeSetup) => {
	// call custom code api here
	// externalCodeSetup.navigationApi.setInitialAfterAuthRoute(props => {
	// 	if (props.auth.isLoggedIn) {
	// 		console.log(props, '<<<< props');
	// 		return "customScreen";
	// 	}
	// })

	// const MyCustomScreen = props => (

	// );

	// externalCodeSetup.navigationApi.addNavigationRoute(
	// 	"customScreen",
	// 	"MyCustomScreen",
	// 	() => <View
	// 		style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
	// 	>
	// 		<Text>My Custom screen</Text>
	// 	</View>,
	// 	"All" // "Auth" | "noAuth" | "Main" | "All"
	// );

	externalCodeSetup.blocksApi.addCustomBlockRender(
		'bbapp/books',
		props => <BooksBlock {...props} />
	);

	// externalCodeSetup.navigationApi.addNavigationRoute(
	// 	"Hospital",
	// 	"HospitalScreen",
	// 	props => <HospitalScreen {...props} />,
	// 	"All"
	// );

	// externalCodeSetup.navigationApi.setBottomTabBarIcon(props => {
	// console.log(props, '<<<<<< props setbottomtab');

	// const routeLabel = iconProps.route.routes[0].params.item?.label;

	// if (routeLabel === "Cari") {
	// 	return <View
	// 		style={{
	// 			height: 30,
	// 			width: 30,
	// 			borderRadius: 58,
	// 			backgroundColor: '#5a95ff',
	// 			justifyContent: 'center',
	// 			alignItems: 'center',
	// 		}}>
	// 		<Image
	// 			source={{
	// 				uri: 'https://reactnative.dev/img/tiny_logo.png',
	// 			}}
	// 			style={{
	// 				width: 40,
	// 				height: 40,
	// 				tintColor: 'black',
	// 				alignContent: 'center',
	// 			}}
	// 		/>
	// 	</View>
	// }

	// return icon;
	// })

	// externalCodeSetup.navigationApi.setFilterBottomTabsSettings((tabsOptions, colors) => {
	// 	console.log(tabsOptions, '<<<< tabsOptions');
	// 	return {
	// 		...tabsOptions,
	// 		tabBarOptions: {
	// 			...tabsOptions.tabBarOptions,
	// 			activeTintColor: colors.headerBg
	// 		}
	// 	}
	// })
};