import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const buttonFull = styled.TouchableOpacity`
	background: ${(props) => (props.onlyBorder || props.onlyColor ? '#ffffff' : colors.primary)};
	width: 100%;
	padding: 15px;
	border-width: ${(props) => (props.onlyBorder ? '2px' : '0px')};
	border-color: ${colors.primary};
	border-radius: 8px;
	margin-top: 20px;
`;

const text = styled.Text`
	color: ${(props) => (props.onlyBorder || props.onlyColor ? colors.primary : '#fff')};
	font-family: ${(props) => (props.onlyBorder ? 'rubik-medium' : 'rubik-bold')};
	text-align: center;
`;

export { buttonFull, text };
