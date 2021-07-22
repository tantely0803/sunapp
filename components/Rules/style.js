import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const container = styled.ScrollView``;

const reduceContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 30px;
`;

const title = styled.Text`
	font-family: "rubik-medium";
	font-size: 22px;
	text-align: center;
	padding: 30px 0;
	padding-top: 45px;
`;

const breakline = styled.View`
	margin-top: 10px;
	height: 15px;
	width: 1000px;
`;

const paragraph = styled.Text`
	font-family: "rubik-regular";
	line-height: 22;
	text-align: left;
	font-size: 15px;
	padding-bottom: 20px;
`;

export { container, breakline, paragraph, reduceContainer, title };
