import styled from 'styled-components';
import { colors, sizes } from '../../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Platform } from 'react-native';

const reduceContainer = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    margin: 30px;
`;

const imgreplace = styled.Image`
    width: 100%;
    height: 200px;
    margin-top: ${hp('5%')};
`;

const bigtitle = styled.Text`
    font-size: ${RFPercentage(5)};
    font-family: 'rubik-bold';
    text-align: center;
    padding: 20px;
    margin-bottom: 20px;
`;

const paragraph = styled.Text`
    font-family: 'rubik-light';
    line-height: 22;
    text-align: justify;
    font-size: 15px;
    padding-bottom: 20px;
`;

export { reduceContainer, imgreplace, paragraph, bigtitle };
