import React, {createContext, useMemo} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const state = useMemo(
    () => ({
      logIn: (email, password) => {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            console.log('User Logged In!');
            setUser(userCredentials);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      signOut: () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
      },
      signUp: (email, password) => {
        // setUserToken('fkg'), setIsLoading(false);
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log(user);
            console.log('User account created & signed in!');
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};
export default AuthContextProvider
