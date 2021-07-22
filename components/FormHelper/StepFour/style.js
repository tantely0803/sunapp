import styled from 'styled-components';
import { colors, sizes } from '../../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const container = styled.View`
	display: flex;
	flex: 1;
`;

const reduceContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 30px;
`;

const imgreplace = styled.Image`
	width: 100%;
	height: 250px;
	margin-top: ${hp('5%')};
`;

const buttonBottom = styled.View`
	position: absolute;
	left: 30px;
	right: 30px;
	bottom: 30px;
`;

const bigtitle = styled.Text`
	font-size: ${RFPercentage(5)};
	font-family: "rubik-medium";
	text-align: center;
	padding: 20px;
	margin-bottom: 20px;
`;

const paragraph = styled.Text`
	font-family: "rubik-regular";
	line-height: 22;
	text-align: center;
	font-size: 15px;
	padding-bottom: 20px;
`;

export { container, reduceContainer, buttonBottom, imgreplace, paragraph, bigtitle };
