import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const container = styled.ScrollView``;

const reduceContainer = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 15px 0;
`;

const contentHorizontal = styled.ScrollView``;

const img = styled.Image`
	height: 300px;
	width: 170px;
`;

const imgpub = styled.Image`
	height: 395px;
	width: 395px;
`;

const buttonImage = styled.TouchableOpacity`
	margin-right: 10px;
	margin-left: ${(props) => (props.first ? '10px' : '0px')};
`;

const header = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 30px 10px 20px;
`;

const surnametxt = styled.Text`
	font-family: "rubik-bold";
	font-size: 25px;
`;

const imgavatar = styled.Image`
	height: 43px;
	width: 43px;
	border-radius: 50px;

`;

const title = styled.Text`
	font-family: 'rubik-medium';
	font-size: 20px;
	margin: 15px 0 15px 10px;
`;

const title2 = styled.Text`
	font-size: 1px;
	margin: 10px 0 10px 10px;
`;

const imgoptions = styled.Image`
	width: 158px;
	height: 54px;
`;

export {
	container,
	imgoptions,
	title,
	imgavatar,
	surnametxt,
	header,
	buttonImage,
	img,
	imgpub,
	reduceContainer,
	contentHorizontal,
	title2
};
