import { HospitalBlock } from "./src/HospitalBlock";

export const applyCustomCode = (externalCodeSetup) => {
	// call custom code api here

	externalCodeSetup.blocksApi.addCustomBlockRender(
		'bbapp/hospital',
		props => <HospitalBlock {...props} />
	);
};