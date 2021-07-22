import React  , { useState }  from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import { styles as formStyles } from '../Form/styles'
import { TextInputWithIcon } from '../Form/TextInputWithIcon'
import { Note } from '../Form/Note'
import { Error } from '../Form/Error'
import { Text } from '../Text'
import * as Yup from 'yup'


const  NewPasswordForm = ({ switchStage }) => {

 // state = {
 //   submitting: false,
  //  serverError: null,
 //   passwordReset: false,
 // }

  const [submitting, setsubmitting] = useState(false);
  const [serverError, setserverError] = useState(null);
  const [passwordReset, setpasswordReset] = useState(false);

  //componentDidMount () {
  //  this.setState({
  //    passwordReset: false,
  //  })
 // }



    return (
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required('Password is missing'),
        })}
        onSubmit={(values, formikActions) => {

          //this.setState({
          //  submitting: true,
          //  serverError: null
          //});

          setsubmitting(true);
          setserverError(null);

          // server validation in place of `setTimeout`
          setTimeout(() => {
            formikActions.setSubmitting(false);

            //this.setState({
            //  submitting: false,
            //  passwordReset: true,
            //});

            setsubmitting(false);
            setpasswordReset(null);


          }, 1000);
        }}>
        {props => (
          <>
            <Error error={serverError} />
            <Note note='Successfully verified. Input a new password:' />
            <TextInputWithIcon
              ionIcon='ios-lock'
              name='password'
              autoCompleteType='password'
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              value={props.values.password}
              placeholder="Password"
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
                    Resetting Password
                  </Text>
                </>
                :
                <Text style={formStyles.submitText} onPress={() => props.handleSubmit()}>
                  {passwordReset === true
                    ? 'Password Successfully Reset'
                    : 'Reset Password'
                  }
                </Text>
              }
            </View>
            <View style={{ marginTop: 10 }}>
              <Text onPress={() => switchStage("REQUEST_LINK")}>
                Start Again
              </Text>
            </View>
          </>
        )}
      </Formik>
    );
  
}

export default NewPasswordForm;