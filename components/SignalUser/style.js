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

const textCenter = styled.Text`
	font-family: "rubik-regular";
	line-height: 22;
	text-align: center;
	font-size: 17px;
	padding-top: 20px;
	padding-bottom: 20px;
`;

const textLink = styled.Text`
	font-family: "rubik-regular";
	font-size: 17px;
	text-align: center;
`;

const bold = styled.Text`font-family: "rubik-medium";`;

const arrowRight = styled.Image`
	height: 22px;
	width: 22px;
`;

const containerButtonBottom = styled.View`
	position: absolute;
	bottom: 30px;
	left: 30px;
	right: 30px;
`;

const listChoice = styled.View`
	display: flex;
	flex-direction: column;
`;

const choice = styled.Text`
	font-family: "rubik-regular";
	font-size: 17px;
	text-align: center;
	margin-top: 10px;
	margin-bottom: 10px;
`;

const buttonChoice = styled.TouchableOpacity`
	border-width: ${(props) => (props.active ? '2px' : '2px')};
	border-color: ${(props) => (props.active ? '#8a49f8' : '#FFF')};
	margin-bottom: 5px;
	border-radius: 4px;
`;

export {
	container,
	buttonChoice,
	listChoice,
	choice,
	textCenter,
	groupLink,
	containerButtonBottom,
	arrowRight,
	reduceContainer,
	textLink,
	bold
};
