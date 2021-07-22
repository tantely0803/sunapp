import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from 'react-native';

const groupInput = styled.View`
	margin-top: 10px;
	margin-bottom: 10px;
	position: relative;
	z-index: 11111;
	width: 100%;
`;

const picker = styled.TouchableOpacity`
	width: 100%;
	border-color: #ccc;
	border-bottom-width: 1px;
	padding: 5px 0;
	font-size: ${sizes.text};
`;

const arrowbottom = styled.Image`
	width: 13px;
	height: 8px;
	position: absolute;
	right: 24px;
	top: 10px;
`;

const input = styled.TextInput`
	width: 100%;
	padding: 5px 0;
	font-size: ${sizes.text};
`;

const pickeritem = styled.Text`font-size: ${sizes.text};`;

const contentdropdown = styled.View`
	position: relative;
	z-index: 2;
`;

const listItems = styled.View`
	position: absolute;
	top: 0px;
	min-height: 120px;
	max-height: 240px;
	width: 100%;
	background: #fff;
	z-index: 1032;
	border-radius: 10px;
	shadowColor: #000;
	shadowOffset: 0px 1px;
	shadowOpacity: 0.1;
	shadowRadius: 3;
	elevation: 1;
`;

const item = styled.View`
	padding: 20px;
	width: 100%;
	height: 60px;
	border-color: #ededed;
	border-bottom-width: 1px;
	background: ${(props) => (props.multi ? '#8A49F8' : '#fff')};
	z-index: 1033;
`;

const text = styled.Text`
	color: ${(props) => (props.multi ? '#fff' : '#000')};
	font-family: ${(props) => (props.multi ? 'rubik-regular' : 'rubik-light')};
`;
const textpicker = styled.Text`
	font-family: "rubik-light";
	font-size: ${sizes.text};
`;

const scroll = {
	height: '100%',
	width: '100%',
	overflow: 'hidden',
	borderRadius: 5,
};

const label = styled.Text`
	color: #a8a8a8;
	width: 100%;
	text-align: left;
	padding-bottom: 10px;
	font-size: ${sizes.subInfos};
`;

const overlay = styled.TouchableOpacity`
	position: absolute;
	left: -30px;
	right: -30px;
	top: -30px;
	bottom: -200px;
	z-index: 1;
`;

const flex = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

const tag = styled.TouchableOpacity`
	background: #8a49f8;
	border-radius: 4px;
	padding: 4px 10px 4px 4px;
	font-size: 12px;
	margin-right: 5px;
	margin-bottom: 5px;
	flex-direction: row;
	align-items: center;
`;

const colorWhite = styled.Text`
	color: #fff;
	font-family: 'rubik-regular';
`;

export {
	groupInput,
	arrowbottom,
	overlay,
	flex,
	tag,
	colorWhite,
	text,
	scroll,
	textpicker,
	input,
	item,
	listItems,
	contentdropdown,
	picker,
	pickeritem,
	label
};
