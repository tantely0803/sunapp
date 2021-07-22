import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const container = styled.ScrollView``;

const reduceContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px;
`;

const logo = styled.Image`
    width: 100%;
    height: ${hp('40%')};
    margin-top: 20px;
`;

const hi = styled.Text`
    text-align: center;
    margin-bottom: 30px;
`;

const buttonmin = styled.TouchableOpacity`
    flex: 0.3;
    min-width: 19%;
    height: 65px;
    align-items: center;
    justify-content: center;
    font-family: 'rubrik-bold';
    background: red;
`;

const goregister = styled.TouchableOpacity`
    margin-top: 30px;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
`;

const textbutton = styled.Text`
    font-size: ${sizes.subInfos};
    color: #a8a8a8;
    font-family: 'rubik-light';
    padding-bottom: 10px;
`;

const textpurple = styled.Text`
    font-size: ${sizes.subInfos};
    color: ${colors.primary};
    font-family: 'rubik-bold';
`;

export {
    container,
    reduceContainer,
    logo,
    hi,
    buttonmin,
    goregister,
    textbutton,
    textpurple,
};
