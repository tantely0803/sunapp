import { Platform } from 'react-native';

export const onlyiOS = () => (Platform.OS === 'ios' ? true : false);
