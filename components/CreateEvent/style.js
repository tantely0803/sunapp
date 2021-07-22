import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const container = styled.ScrollView``;

const reduceContainer = styled.View`
    flex: 1;
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

export {
    container,
    contentInputHour,
    label,
    littleTextGray,
    reduceContainer,
    imgreplace,
    paragraph,
    bigtitle,
};
