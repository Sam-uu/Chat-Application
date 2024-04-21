import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Colors = {
  primary: '#2C3E50',
  secondary: '#3498DB',
  background: '#FFFFFF',
  text: '#000',
  placeholder: '#A0A0A0',
  buttonBackground: '#27CE60',
  buttonText: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  form: {
    marginTop: 20,
    backgroundColor: 'rgba(230, 255, 230, 0)',
    borderRadius: 6,
    width: wp(80),
    height: hp(40),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputs: {
    justifyContent: 'center',
    width: wp('70%'),
    alignSelf: 'center',
  },
  textInput: {
    color: 'white',
    width: wp(55),
    
  },
  rowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  },
  inputHalf: {
    flex: 1,
  },
  inputHalf1: {
    marginRight: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  input: {
    height: hp('5%'),
    borderColor: '#000',
    borderRadius: 6,
    marginBottom: hp('1%'),
    paddingHorizontal: wp('3%'),
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  inputFocused: {
    borderColor: Colors.buttonBackground,
    borderWidth: 2,
  },
  iconFocused: {
    color: Colors.buttonBackground,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: hp('2%'),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  buttonText: {
    color: "black",
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  buttonLink: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: hp('1%'),
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    width: wp('50%'),
    marginBottom: hp('1%'),
  },
  link: {
    color: "white",
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
  },
  invalidInput: {
    borderWidth: 2,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default styles;