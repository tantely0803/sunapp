import styled from 'styled-components';
import { colors, sizes } from '../../styles/constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';

const groupInput = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
`;

const passwordGroup = styled.View`
    position: relative;
`;

const passwordInput = styled.TextInput`
    width: 100%;
    border-color: #ccc;
    border-bottom-width: 1px;
    padding: 5px 0;
    font-size: ${sizes.text};
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
    padding-bottom: 10px;
    font-size: ${sizes.subInfos};
`;

const eye = styled.Image`
    height: 15px;
    width: 20px;
    position: absolute;
    right: 0px;
    bottom: 0px;
`;

const buttonShowPassword = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    top: ${Platform.OS === 'ios' ? 3 : 10}px;
    width: 10%;
    height: 20px;
`;

export {
    groupInput,
    eye,
    buttonShowPassword,
    input,
    label,
    passwordGroup,
    passwordInput,
};
