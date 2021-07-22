import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';

export default ({ children }) => (
    <KeyboardAvoidingView
        style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: Platform.select({ ios: 0, android: '8%' }),
        }}
        behavior={Platform.select({ ios: 'padding', android: null })}
        enabled
        keyboardVerticalOffset={Platform.select({
            ios: 10,
            android: 100,
        })}
    >
        <ScrollView>
            <View>{children}</View>
        </ScrollView>
    </KeyboardAvoidingView>
);
