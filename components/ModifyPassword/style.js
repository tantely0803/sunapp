import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const container = styled.View`flex: 1;`;

const reduceContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 30px;
	margin-top: 50px;
`;

const groupLink = styled.TouchableOpacity`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 0;
	flex-direction: row;
`;

const textLink = styled.Text`
	font-family: "rubik-regular";
	font-size: 17px;
	text-align: center;
`;

const arrowRight = styled.Image`
	height: 22px;
	width: 22px;
`;

const containerButtonBottom = styled.View`
	position: absolute;
	bottom: 20px;
	left: 30px;
	right: 30px;
`;

export { container, groupLink, containerButtonBottom, arrowRight, reduceContainer, textLink };
