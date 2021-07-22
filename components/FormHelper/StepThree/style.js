import styled from 'styled-components';
import { colors, sizes } from '../../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const container = styled.ScrollView``;

const reduceContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 30px;
	height: ${hp('70%')};
`;

const imgreplace = styled.Image`
	width: 100%;
	height: 200px;
	margin-top: ${hp('5%')};
`;

const bigtitle = styled.Text`
	font-size: ${RFPercentage(5)};
	font-family: "rubik-bold";
	text-align: center;
	padding: 20px;
	margin: 40px 0 20px;
`;

const title2 = styled.Text`
	font-size: 16px;
	margin: 10px 0 10px 10px;
`;

const spaceBet = styled.View`
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	margin-bottom: 30px;
`;

const paragraph = styled.Text`
	font-family: "rubik-light";
	line-height: 22;
	text-align: justify;
	font-size: 15px;
	padding-bottom: 20px;
`;

const buttonBottom = styled.View`
	position: absolute;
	left: 30px;
	right: 30px;
	bottom: 30px;
`;

export { container, buttonBottom, spaceBet, reduceContainer, imgreplace, paragraph, bigtitle , title2 };
