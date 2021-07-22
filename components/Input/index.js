import React, { useState, forwardRef } from 'react';
import * as style from './style';

const Input = forwardRef(
    (
        { input, onChange, onSubmitEditing, returnKeyType, blurOnSubmit },
        ref
    ) => {
        const [seePassword, setSeePassword] = useState(true);

        if (input.password) {
            return (
                <style.groupInput>
                    <style.label>{input.label}</style.label>
                    <style.passwordGroup>
                        {input.value ? (
                            <style.passwordInput
                                placeholder={
                                    input.placeholder ? input.placeholder : ''
                                }
                                autoCompleteType={
                                    input.type === 'email' ? 'email' : null
                                }
                                secureTextEntry={
                                    input.password && seePassword ? true : false
                                }
                                keyboardType={
                                    input.type === 'email'
                                        ? 'email-address'
                                        : 'default'
                                }
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={input.value}
                                multiline={
                                    input.type === 'textarea' ? true : false
                                }
                                onChangeText={(text) =>
                                    onChange(text, input.name)
                                }
                                textContentType={
                                    input.type === 'email'
                                        ? 'emailAddress'
                                        : null
                                }
                                ref={ref}
                                onSubmitEditing={onSubmitEditing}
                                returnKeyType={returnKeyType}
                                blurOnSubmit={blurOnSubmit}
                            />
                        ) : (
                            <style.passwordInput
                                placeholder={
                                    input.placeholder ? input.placeholder : ''
                                }
                                autoCompleteType={
                                    input.type === 'email' ? 'email' : null
                                }
                                secureTextEntry={
                                    input.password && seePassword ? true : false
                                }
                                keyboardType={
                                    input.type === 'email'
                                        ? 'email-address'
                                        : 'default'
                                }
                                autoCapitalize="none"
                                autoCorrect={false}
                                multiline={
                                    input.type === 'textarea' ? true : false
                                }
                                onChangeText={(text) =>
                                    onChange(text, input.name)
                                }
                                textContentType={
                                    input.type === 'email'
                                        ? 'emailAddress'
                                        : null
                                }
                                ref={ref}
                                onSubmitEditing={onSubmitEditing}
                                returnKeyType={returnKeyType}
                                blurOnSubmit={blurOnSubmit}
                            />
                        )}
                        <style.buttonShowPassword
                            onPress={() => setSeePassword(!seePassword)}
                        >
                            <style.eye
                                source={require('../../assets/images/password-eye.png')}
                            />
                        </style.buttonShowPassword>
                    </style.passwordGroup>
                </style.groupInput>
            );
        }

        return (
            <style.groupInput>
                <style.label>{input.label}</style.label>
                {input.value ? (
                    <style.input
                        placeholder={input.placeholder ? input.placeholder : ''}
                        autoCompleteType={
                            input.type === 'email' ? 'email' : null
                        }
                        secureTextEntry={
                            input.password && seePassword ? true : false
                        }
                        keyboardType={
                            input.type === 'email' ? 'email-address' : 'default'
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={input.value}
                        multiline={input.type === 'textarea' ? true : false}
                        onChangeText={(text) => onChange(text, input.name)}
                        textContentType={
                            input.type === 'email' ? 'emailAddress' : null
                        }
                        ref={ref}
                        onSubmitEditing={onSubmitEditing}
                        returnKeyType={returnKeyType}
                        blurOnSubmit={blurOnSubmit}
                    />
                ) : (
                    <style.input
                        placeholder={input.placeholder ? input.placeholder : ''}
                        autoCompleteType={
                            input.type === 'email' ? 'email' : null
                        }
                        secureTextEntry={
                            input.password && seePassword ? true : false
                        }
                        keyboardType={
                            input.type === 'email' ? 'email-address' : 'default'
                        }
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline={input.type === 'textarea' ? true : false}
                        onChangeText={(text) => onChange(text, input.name)}
                        textContentType={
                            input.type === 'email' ? 'emailAddress' : null
                        }
                        ref={ref}
                        onSubmitEditing={onSubmitEditing}
                        returnKeyType={returnKeyType}
                        blurOnSubmit={blurOnSubmit}
                    />
                )}
            </style.groupInput>
        );
    }
);

export default Input;
