import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const container = styled.View``;

const reduceContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 30px 0;
	height: ${hp('90%')};
`;

const imgreplace = styled.Image`
	width: 100%;
	height: 200px;
	margin-top: ${hp('5%')};
`;

const bigtitle = styled.Text`
	font-size: ${RFPercentage(3)};
	font-family: "rubik-bold";
	text-align: center;
	padding: 0 20px 20px 20px;
	margin-bottom: 0px;
`;

const littleTextGray = styled.Text`
	font-size: 12px;
	color: #ccc;
`;

const paragraph = styled.Text`
	font-family: "rubik-light";
	line-height: 22;
	text-align: justify;
	font-size: 15px;
	padding-bottom: 20px;
`;

const label = styled.Text`
	color: #a8a8a8;
	width: 100%;
	text-align: left;
	padding-bottom: 10px;
	margin-top: 20px;
	font-size: ${sizes.subInfos};
`;

const contentInputHour = styled.View`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	margin-bottom: ${(props) => (props.margeBottom ? '20px' : '0px')};
`;

const row = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background: #fff;
`;

const avatar = styled.Image`
	width: 50px;
	height: 50px;
	border-radius: 100px;
`;

const contentDescription = styled.View`
	flex: 1;
	margin-left: 15px;
`;

const spaceBetween = styled.View`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
`;

const name = styled.Text`
	font-family: "rubik-bold";
	font-size: 15px;
`;

const time = styled.Text`
	font-size: 12px;
	font-family: "rubik-regular";
`;

const lastMessage = styled.Text`
	font-size: 16px;
	font-family: "rubik-regular";
`;

const deleteBtn = styled.View`
	background: #e94783;
	display: flex;
	justify-content: center;
	flex-direction: row;
	flex: 1;
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100px;
	right: 0;
	justify-content: center;
	align-items: center;
	padding: 15px;
`;

const imgDelete = styled.Image`
	height: 35px;
	width: 35px;
`;

export {
	container,
	contentInputHour,
	label,
	deleteBtn,
	littleTextGray,
	imgDelete,
	reduceContainer,
	imgreplace,
	paragraph,
	bigtitle,
	row,
	avatar,
	contentDescription,
	name,
	time,
	spaceBetween,
	lastMessage
};
