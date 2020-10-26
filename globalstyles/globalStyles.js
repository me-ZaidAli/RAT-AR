import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#131C21',
    height: '100%',
    width: '100%',
  },
  formContainer: {
    flexDirection: 'column',
    //   padding:10,
    // height: 300,
    width: 300,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  homeScreenContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    // backgroundColor: '#131C21',
    
  },
  addProblemButton: {
    elevation: 4,
    backgroundColor: '#009688',
    borderRadius: 90,
    paddingVertical: 21,
    paddingHorizontal: 22,
    // width:300
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 32,
    // color: '#ffffff',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  input: {
    marginBottom: 5,
    borderRadius: 5,
    // backgroundColor: '#ffffff',
    width: '100%',
  },
  signupButton: {
    elevation: 4,
    // backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  loginButton: {
    marginTop: 3,
    elevation: 4,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'flex-start',
  },
  signupButtonText: {
    fontSize: 18,
    // color: '#ffffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  loginButtonText: {
    fontSize: 18,
    // color: '#009688',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  menuDrawer: {
    opacity: 1,
    marginHorizontal: 10,
    color: '#ffffff',
  },
  errorText: {
    color: '#FF0000',
    marginTop: 0,
  },
});

export default globalStyles;
