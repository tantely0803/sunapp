import React, { useState } from 'react'
import { View } from 'react-native'
import { styles as formStyles } from '../Form/styles'
import { Formik } from 'formik'
import { TextInputWithIcon } from '../Form/TextInputWithIcon'
import { Error } from '../Form/Error'
import { Note } from '../Form/Note'
import { Text } from '../Text'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { findUserbyEmail } from '../../actions/auth';
import Alert from '../Alert';
import Header from '../Header';



export const ResetForm = ({  switchStage , setEmail , setAlert , findUserbyEmail , navigation }) => {

 // state = {
  //  submitting: false,
  //  serverError: null,
 // }


 const [submitting, setsubmitting] = useState(false);
 const [serverError, setserverError] = useState(null);



    return (
      
      <Formik
        initialValues={{
          email: 'me@email.com',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email address is required'),
        })}
        onSubmit={(values, formikActions) => {

         // this.setState({
        //    submitting: true,
          //  serverError: null
         // });
        // setsubmitting(true);
         setserverError(null);

         console.log(values.email);

         console.log(navigation);
         console.log("NAVIGATION 2");

         findUserbyEmail(values.email , navigation );   

          // server validation in place of `setTimeout`
          setTimeout(() => {
           // formikActions.setSubmitting(false);
            setEmail(values.email);
            //switchStage("VERIFY");
          }, 1000);
        }}>
          
        {props => (
          <>
             
            <Alert />
            <Error error={serverError} />
            <Note note="Veuillez fournir l'adresse e-mail de votre compte pour demander un code de réinitialisation de mot de passe. Vous recevrez votre code à votre adresse e-mail s'il est valide" />
            <TextInputWithIcon
              name='email'
              ionIcon='ios-person'
              autoCompleteType='email'
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              value={props.values.email}
              placeholder="Email Address"
              style={{ ...formStyles.input }}
              autoCapitalize='none'
              placeholderTextColor='#666'
              clearButtonMode='while-editing'
              keyboardType='email-address'
              maxLength={100}
          
            />

            <View style={formStyles.submit}>
              {submitting === true
                ? <>
                  
                  <Text style={formStyles.submitText}>
                    Processing Request
                  </Text>
                </>
                :
                <Text style={formStyles.submitText} onPress={() => props.handleSubmit()}>
                  Envoyer
                </Text>


              }
            </View>
            
          </>
        )}
      </Formik>

    );
  
}


export default connect(null, { setAlert, findUserbyEmail })(ResetForm);