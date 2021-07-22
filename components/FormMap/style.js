import styled from 'styled-components';
import { Marker } from 'react-native-maps';

import { colors, sizes } from '../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const container = styled.View`
    flex: 1;
`;

const reduceContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 30px 30px;
`;

const imgreplace = styled.Image`
    width: 100%;
    height: 300px;
    margin-top: ${hp('5%')};
`;

const scrollContainer = styled.ScrollView``;

const bigtitle = styled.Text`
    font-size: ${RFPercentage(5)};
    font-family: 'rubik-bold';
    text-align: center;
    padding: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const paragraph = styled.Text`
    font-family: 'rubik-regular';
    line-height: 22;
    text-align: center;
    font-size: 15px;
    padding-bottom: 20px;
`;


const popupUser = styled.View`
    position: absolute;
    left: 0;
    top: 400px;
    right: 0;
    bottom: 0;
    height: ${hp('100%')};
    background: #fff;
    border-top-right-radius: 45px;
    border-top-left-radius: 45px;
    padding: 30px;
`;

const topBorder = styled.View`
    width: 100px;
    position: absolute;
    top: 10px;
    height: 5px;
    border-radius: 30px;
    left: 50%;
    margin-left: -20px;
    background: #d8d8d8;
`;

const column = styled.View`
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: ${(props) => (props.assoc ? '70px' : '35px')};
`;

const scrollColumn = styled.ScrollView`
    width: 100%;
    padding: 20px 20px 0;
`;

const containerslide = styled.View`
    background: #fff;
    padding-left: 30px;
    padding-right: 30px;
`;

const scroll = styled.ScrollView`
    background: #fff;
    height: 100%;
    margin: 20px 0 0;
`;

const containerBottom = styled.View`
    padding: 0 0px 10px;
    margin-top: 10px;
`;

const avatar = styled.Image`
    border-radius: 100px;
    height: 58px;
    width: 58px;
    border-width: 1px;
    border-color: #8a49f8;
`;

const oldUser = styled.Text`
    color: #606060;
    font-size: ${sizes.subInfos};
    padding: 10px 0 0px;
    font-family: 'rubik-regular';
`;

const name = styled.Text`
    color: #030f09;
    padding-top: 0px;
    padding-bottom: 0;
    text-align: center;
    font-size: ${(props) => (props.littleSize ? '20px' : sizes.subTitle)};
    font-family: 'rubik-regular';
`;

const textDisease = styled.Text`
    color: #606060;
    font-size: ${sizes.text};
    font-family: 'rubik-regular';
    margin-bottom: 15px;
`;

const title = styled.Text`
    font-family: 'rubik-regular';
    text-transform: uppercase;
    letter-spacing: 2.4;
    font-size: ${sizes.subInfos};
    color: #606060;
    margin-top: ${(props) => (props.bigMTop ? '30px' : '20px')};
    margin-bottom: 10px;
`;

const textStory = styled.Text`
    font-family: 'rubik-regular';
    font-size: 14px;
    line-height: 20px;
`;

const containerBadges = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const contentBadges = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 33.333%;
    width: 33.333%;
    max-width: 33.333%;
    height: 100px;
`;

const imagebadge = styled.Image`
    width: 60px;
    height: 60px;
`;

const imageasso = styled.Image`
    width: 40px;
    height: 40px;
`;

const adress = styled.Text`
    font-family: 'rubik-regular';
    color: #606060;
    font-size: 16px;
`;

const namebadge = styled.Text`
    margin-top: 5px;
    font-family: 'rubik-regular';
`;

const contentEvents = styled.ScrollView`
    position: absolute;
    bottom: 10px;
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: row;
    height: ${hp(25)};
`;

const contentEvent = styled.View`
    padding: 20px;
    background: #fff;
    width: ${wp('90%')};
    border-radius: 4px;
    margin-right: 10px;
    margin-left: ${(props) => (props.firstEvent ? '10px' : '0px')};
`;

const contentImageDesc = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

const contentAdress = styled.View`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-top: 10px;
`;

const contentInformationEvent = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const contentBoxEvent = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const bgColor = styled.View`
    padding: 10px 12px;
    border-radius: 25px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: ${(props) => (props.noPad ? '0px' : '20px')};
    background: ${(props) => (props.color ? props.color : '#ffffff')};
`;

const textInfo = styled.Text`
    font-family: 'rubik-regular';
    font-size: 15px;
`;

const flexStart = styled.View`
    width: 50%;
`;

const scrollText = styled.ScrollView`
    max-height: ${hp('42%')};
`;

const littleText = styled.Text`
    font-family: 'rubik-regular';
    font-size: 13px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: ${(props) => (props.assoc ? '50px' : '0px')};
`;

const buttonClose = styled.TouchableOpacity`
    position: absolute;
    top: ${(props) => (props.assoc ? '0px' : '20px')};
    right: ${(props) => (props.assoc ? '0px' : '20px')};
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
    z-index: 111;
`;

const close = styled.Image`
    height: 15px;
    width: 15px;
`;

// SEARCH

const searchContainer = styled.View`
    position: absolute;
    top: 40px;
    left: 10px;
    right: 10px;
`;

const inputSearch = styled.TextInput`
    background: #fff;
    border-radius: 5px;
    padding: 5px;
    padding-left: 40px;
    height: 46px;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2);
`;

const iconSearch = styled.Image`
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 14px;
`;

export {
    container,
    flexStart,
    littleText,
    buttonClose,
    searchContainer,
    inputSearch,
    iconSearch,
    close,
    textStory,
    namebadge,
    scrollText,
    contentImageDesc,
    contentAdress,
    containerBadges,
    contentBadges,
    oldUser,
    contentEvents,
    contentEvent,
    column,
    imagebadge,
    title,
    name,
    textDisease,
    scrollColumn,
    avatar,
    popupUser,
    topBorder,
    contentInformationEvent,
    contentBoxEvent,
    bgColor,
    scroll,
    textInfo,
    reduceContainer,
    containerslide,
    imageasso,
    scrollContainer,
    imgreplace,
    paragraph,
    containerBottom,
    bigtitle,
    adress,
};
