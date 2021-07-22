import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const container = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
	padding: 30px;
`;

const contentForm = styled.View`
	min-height: ${hp('35%')};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
	z-index: 11111;
`;

const group = styled.View`margin-top: 30px;`;

const round = styled.Image`border-radius: 100px;`;

const goregister = styled.TouchableOpacity`
	margin-top: 30px;
	display: flex;
	align-items: center;
`;

const textbutton = styled.Text`
	font-size: ${sizes.subInfos};
	color: #a8a8a8;
	font-family: "rubik-light";
	padding-bottom: 10px;
`;

const textpurple = styled.Text`
	font-size: ${sizes.subInfos};
	color: ${colors.primary};
	font-family: "rubik-bold";
`;
export { container, contentForm, goregister, textbutton, textpurple, round, group };
