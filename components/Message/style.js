import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const container = styled.View``;

const containerChat = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: ${hp('80%')};
    margin: 0 15px;
`;

const reduceContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 30px 30px 0;
`;

const imgreplace = styled.Image`
    width: 100%;
    height: 200px;
    margin-top: ${hp('5%')};
`;

const bigtitle = styled.Text`
    font-size: ${RFPercentage(3)};
    font-family: 'rubik-bold';
    text-align: center;
    padding: 0 20px 20px 20px;
    margin-bottom: 0px;
`;

const littleTextGray = styled.Text`
    font-size: 12px;
    color: #ccc;
`;

const paragraph = styled.Text`
    font-family: 'rubik-light';
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
    width: 30px;
    height: 30px;
    border-radius: 100px;
`;

const scroll = styled.ScrollView`
    height: ${hp('30%')};
    margin-top: 20px;
    flex: 1;
`;

const contentMessage = styled.View`
    display: flex;
    justify-content: ${(props) => (props.left ? 'flex-start' : 'flex-end')};
    padding: 5px 0;
    flex-direction: row;
`;

const boxMessage = styled.View`
    border-radius: 15px;
    background: ${(props) => (props.asso ? '#6EDB8E' : '#8A49F8')};
    padding: 10px;
    width: auto;
`;

const boxFriendMessage = styled.View`
    border-radius: 15px;
    background: #f0f0f0;
    padding: 10px;
    margin-left: 5px;
    width: auto;
`;

const textMessage = styled.Text`
    color: ${(props) => (props.sender ? '#fff' : '#000')};
    font-family: 'rubik-regular';
    font-size: 16px;
`;

const groupSendMessage = styled.View`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 15px 10px;
`;

const sendPicture = styled.TouchableOpacity`
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const imgPicture = styled.Image`
    width: 22px;
    height: 18px;
`;

const inputMessage = styled.TextInput`
    border-radius: 15px;
    border-width: 1px;
    border-color: #e7e7e7;
    width: 100%;
    padding: 10px 40px 10px 12px;
`;

const relativeGroup = styled.View`
    position: relative;
    width: 88%;
`;

const sendMsg = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const imgSend = styled.Image`
    width: 20px;
    height: 20px;
`;

const send = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding-right: 16px;
`;

const sendText = styled.Text`
    color: #74b9ff;
    font-size: 16px;
`;

export default {
    container,
    groupSendMessage,
    send,
    sendText,
    imgSend,
    sendMsg,
    sendPicture,
    imgPicture,
    inputMessage,
    relativeGroup,
    contentMessage,
    boxMessage,
    textMessage,
    contentInputHour,
    label,
    littleTextGray,
    reduceContainer,
    imgreplace,
    scroll,
    boxFriendMessage,
    paragraph,
    bigtitle,
    containerChat,
    row,
    avatar,
};
