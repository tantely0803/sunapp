import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

const contentHeader = styled.View`
	padding: 15px 0;
	margin-top: ${Platform.OS === 'ios' ? '20px' : '0px'};
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`;

const titleScreen = styled.Text`
	font-size: 16px;
	text-align: center;
	text-transform: uppercase;
	font-family: "rubik-medium";
	letter-spacing: 0.8px;
`;

export { contentHeader, titleScreen };
