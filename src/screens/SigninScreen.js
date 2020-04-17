import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign in to your account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        routeName="Signup"
        LinkText="Don't have and account? Sign up instead"
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SigninScreen;
