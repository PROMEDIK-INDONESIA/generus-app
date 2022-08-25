import React from "react";
import { Text, TouchableOpacity, Linking, View, Button } from "react-native";
import { BooksBlock } from "./src/components/BooksBlock";
import { HospitalBlock } from "./src/components/HospitalBlock";
import { LabResultBlock } from "./src/components/LabResultBlock";
import { LabResultFull } from "./src/components/LabResultFullScreen";
import { RightHeaderIcon } from "./src/components/RightHeaderIcon";
import { HospitalScreen } from "./src/components/Screens/Hospital";
import { LaboratoriumScreen } from "./src/components/Screens/Laboratorium";


export const applyCustomCode = externalCodeSetup => {
	// call custom code api here

	// externalCodeSetup.navigationApi.setFilterBottomTabsSettings((tabsOptions, colors) => {
	// 	console.log(tabsOptions, "<<< tabsOptions");
	// 	return {
	// 		...tabsOptions,
	// 		tabBarOptions: {
	// 			...tabsOptions.tabBarOptions,
	// 			activeTintColor: colors.headerBg
	// 		}
	// 	}
	// })

	// externalCodeSetup.navigationApi.setBottomTabBar(props => {
	// 	console.log(props, '<<<< props setbottomtabbar');
	// })

	externalCodeSetup.screenHooksApi.setBackButtonRenderer(props => {
		return <Button title="Back" onPress={() => props.navigation.goBack()} />
	});

	externalCodeSetup.navigationApi.setFilterBottomTabsRoutes(routes => {
		delete routes["MoreScreen"]
		return routes;
	});

	//Add a button which navigates to a custom More Screen
	externalCodeSetup.indexScreenApiHooks.enableAlwaysShowHeaderRight();
	externalCodeSetup.indexScreenApiHooks.setRenderHeaderRight(<RightHeaderIcon />);

	externalCodeSetup.profileScreenHooksApi.setHeaderRightComponent(() => <RightHeaderIcon />)

	externalCodeSetup.profileScreenHooksApi.setAfterProfileHeader(<RightHeaderIcon />)

	externalCodeSetup.profileScreenHooksApi.setActionButton(<RightHeaderIcon />)



	//Since a bottom tab route might not have the More Screen's menu items, navigate to "DocumentsScreen" instead of the inaccessible "DocumentsScreenMoreMenu1"
	externalCodeSetup.moreScreenApi.enableUseOriginalRouteNames();

	externalCodeSetup.navigationApi.addNavigationRoute(
		"labResult",
		"LabResultScreen",
		props => <LabResultFull {...props} />,
		"All"
	);

	externalCodeSetup.navigationApi.addNavigationRoute(
		"Laboratorium",
		"LaboratoriumScreen",
		props => <LaboratoriumScreen {...props} />,
		"All"
	);

	externalCodeSetup.navigationApi.addNavigationRoute(
		"Hospital",
		"HospitalScreen",
		props => <HospitalScreen {...props} />,
		"All"
	);

	externalCodeSetup.blocksApi.addCustomBlockRender(
		'bbapp/books',
		props => <BooksBlock {...props} />
	);

	externalCodeSetup.blocksApi.addCustomBlockRender(
		'bbapp/hospital',
		props => <HospitalBlock {...props} />
	);

	externalCodeSetup.blocksApi.addCustomBlockRender(
		'bbapp/labresult',
		props => <LabResultBlock {...props} />
	);
};
