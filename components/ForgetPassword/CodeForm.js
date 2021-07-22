import React , { useState } from 'react'
import { View , TouchableOpacity } from 'react-native'
import { styles as formStyles } from '../Form/styles'
import { Formik } from 'formik'
import { TextInputWithIcon } from '../Form/TextInputWithIcon'
import { Note } from '../Form/Note'
import { Error } from '../Form/Error'
import { Text } from '../Text'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert'
import { checkcodeResetPassword } from '../../actions/auth';
import Alert from '../Alert';


const  CodeForm = ({ switchStage , code , navigation , email , setAlert , checkcodeResetPassword  }) => {

 

  //state = {
   /// submitting: false,
  //  serverError: null,
 // }
  const [ form, setForm ] = useState(null);
  const [submitting, setsubmitting] = useState(false);
  const [serverError, setserverError] = useState(null);

  

  
  return (
      <Formik
        initialValues={{
          code: '',
        }}
        validationSchema={Yup.object({
          code: Yup.string().required('Provide  valide verification code.'),
          password: Yup.string().required('Entrer un password'),
          confirmpassword: Yup.string().required('Entrer un confirme password'),
        })}
        onSubmit={(values, formikActions) => {
        //  this.setState({
        //    submitting: true,
        //    serverError: null
        //  });

        //setsubmitting(true);
        //setserverError(null);

          // server validation in place of `setTimeout`
          
            if (values.password === values.confirmpassword) {

              setTimeout(() => {
                // formikActions.setSubmitting(false);
                checkcodeResetPassword(email , values.code , values.password ,  navigation );  
                // switchStage("RESET");
               }, 1000);
              
            } 
              else {
              setAlert('Les deux mot de passe ne correspondent pas', 'danger');
            }
        


        }}>
        {props => (
          <>
            <Error error={serverError} />
            <Note note='Saisissez le code envoyé à votre adresse e-mail.' />
            <Alert />
            <TextInputWithIcon
              name='code'
              // ionIcon='ios-arrow-dropright-circle'
              onChangeText={props.handleChange('code')}
              onBlur={props.handleBlur('code')}
              value={props.values.code}
              placeholder="Code de validation"
              style={{ ...formStyles.input }}
              autoCapitalize='none'
              placeholderTextColor='#666'
              clearButtonMode='while-editing'
              maxLength={10}
             
            />
     
            <TextInputWithIcon
              // ionIcon='ios-lock'
              name='password'
              autoCompleteType='password'
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
              placeholder="Mot de passe "
              style={{ ...formStyles.input }}
              secureTextEntry={true}
              placeholderTextColor='#666'
              clearButtonMode='while-editing'
              maxLength={100}
             
             
            />

            <TextInputWithIcon
              // ionIcon='ios-lock'
              name='confirmpassword'
              autoCompleteType='password'
              onChangeText={props.handleChange('confirmpassword')}
              onBlur={props.handleBlur('confirmpassword')}
              value={props.values.confirmpassword}
              placeholder="Mot de passe confirmé"
              style={{ ...formStyles.input }}
              secureTextEntry={true}
              placeholderTextColor='#666'
              clearButtonMode='while-editing'
              maxLength={100}
            />
            
         
       

            <View style={formStyles.submit}>
              {submitting === true
                ? <>
                 
                  <Text style={formStyles.submitText}>
                    Verifying Code
                  </Text>
                </>
                :
                <Text style={formStyles.submitText} onPress={() => props.handleSubmit()}>
                    Mettre à jour
                </Text>
              }
            </View>
          </>
        )}
      </Formik>
    );
  
}


export default connect(null, { setAlert, checkcodeResetPassword })(CodeForm);