import {Dimensions, StyleSheet} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const globalStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#131C21',
    height: '100%',
    width: '100%',
  },
  videoLoadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#131C21',
    height: '100%',
    width: '100%',
  },
  homeContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#131C21',
    height: '92%',
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
    width: '90%',
    // height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  videoContainer: {},
  hangUpButton: {
    elevation: 4,
    backgroundColor: '#FF0000',
    borderRadius: 90,
    paddingVertical: 21,
    paddingHorizontal: 22,
    borderColor: '#FF0000',
    // width:300
    width: 60,
    height: 60,
    // alignSelf: 'center',
  },
  joinButton: {
    elevation: 4,
    // backgroundColor:'#FF0000',
    borderRadius: 90,
    paddingVertical: 21,
    paddingHorizontal: 22,

    // width:300
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 32,
    // color: '#ffffff',
    marginBottom: 10,
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
    color: '#ffffff',
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
    marginBottom: 2,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default globalStyles;
