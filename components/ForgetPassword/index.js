import React, { useState , useEffect } from 'react'
import { View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from '../Text'
import { styles } from './styles'
import { styles as formStyles } from '../Form/styles'
import  ResetForm  from './ResetForm'
import  CodeForm  from './CodeForm'
import  NewPasswordForm  from './NewPasswordForm'
import Header from '../Header';


export const ForgetPassword = (props ) => {

  const [stage, setStage] = useState(null);
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);

  

  useEffect(() => {

    console.log(props.navigation );
    console.log("navigation component" );
    setStage(props.navigation.state.params.step);
    setCode(props.navigation.state.params.code);
    console.log(stage);

  }) 

  const switchStage = (stage) => {
    setStage(stage);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
       <Header prevRoute="Login" />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={formStyles.container}>
          <Text style={{ marginBottom: 30 }}>
         
            Mot de passe oublié ?
          </Text>
          {stage === "REQUEST_LINK" &&
            <ResetForm
              stages={stage}
              switchStage={switchStage}
              setEmail={setEmail}
              navigation={props.navigation}
            />
          }
          {stage === "VERIFY" &&
            <CodeForm
              stages={stage}
              switchStage={switchStage}
              code={code}
              email={email}
              props={props}
              navigation={props.navigation}
            />
          }
          {stage === "RESET" &&
            <NewPasswordForm
              stages={stage}
              switchStage={switchStage}
              email={email}
              navigation={props.navigation}
            />
          }
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}



export default ForgetPassword ; 
