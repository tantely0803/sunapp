import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const reduceContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 30px;
`;

const imgreplace = styled.Image`
    width: 100%;
    height: 200px;
    margin-top: ${hp('5%')};
`;

const avatarimg = styled.Image`
    border-radius: 50px;
    border-width: 5px;
    border-color: #8a49f8;
    width: 100px;
    border-radius: 100px;
    height: 100px;
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

const groupInput = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
`;

const input = styled.TextInput`
    width: 100%;
    border-color: #ccc;
    border-bottom-width: 1px;
    padding: 5px 0;
    font-size: ${sizes.text};
`;

const label = styled.Text`
    color: #a8a8a8;
    width: 100%;
    text-align: left;
    padding-bottom: 20px;
    font-size: ${sizes.subInfos};
`;

const paragraph = styled.Text`
    font-family: 'rubik-light';
    line-height: 22;
    text-align: justify;
    font-size: 15px;
    padding-bottom: 20px;
`;

const centerItems = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 30px 0;
`;

const breakline = styled.View`
    margin-top: 10px;
    height: 15px;
    width: 1000px;
`;

export {
    centerItems,
    label,
    littleTextGray,
    reduceContainer,
    imgreplace,
    paragraph,
    bigtitle,
    input,
    avatarimg,
    groupInput,
    breakline,
};
