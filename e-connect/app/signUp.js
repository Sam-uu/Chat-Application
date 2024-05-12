import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useRef, useState } from 'react'
import styles from '../styles/signInStyles'
import { useRouter } from 'expo-router';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Octicons, Ionicons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';
import CustomAlert from '../components/CustomAlert';
import * as Cellular from 'expo-cellular';

export default function SignUp() {

  async function checkVoip() {
    console.log('Checking Voip...');
    const response1 = await Cellular.allowsVoipAsync();
    console.log('allowsVoipAsync: ', response1);

    const response2 = await Cellular.getCarrierNameAsync();
    console.log('getCarrierNameAsync: ', response2);

    const response3 = await Cellular.getIsoCountryCodeAsync();
    console.log('getIsoCountryCodeAsync: ', response3);

    const response4 = await Cellular.getMobileCountryCodeAsync();
    console.log('getMobileCountryCodeAsync: ', response4);

    const response5 = await Cellular.getMobileNetworkCodeAsync();
    console.log('getMobileNetworkCodeAsync: ', response5);

    const response6 = await Cellular.getCellularGenerationAsync();
    console.log('getCellularGenerationAsync: ', response6);
    
    const response7 = await Cellular.getPermissionsAsync();
    console.log('getPermissionsAsync: ', response7);

    const response8 = await Cellular.requestPermissionsAsync();
    console.log('requestPermissionsAsync: ', response8);
  }
  checkVoip();

  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const phoneNumberRef = useRef("");
  const photoUrlRef = useRef("");

  const [focusedInput, setFocusedInput] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  const handleLogin = async () => {
    setIsSubmitted(true);

    if (!firstNameRef.current || !lastNameRef.current || !emailRef.current || !passwordRef.current || !confirmPasswordRef.current || !phoneNumberRef.current || !photoUrlRef.current) {
      //Alert.alert('Please fill in all fields');
      setAlertMessage('Please fill in all fields');
      setIsAlertVisible(true);
      return;
    }
    setLoading(true);

    let response = await register(emailRef.current, passwordRef.current, firstNameRef.current, lastNameRef.current, photoUrlRef.current, phoneNumberRef.current, lastNameRef.current);
    setLoading(false);

    console.log('got result: ', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }

  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
  };

  return (

    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground source={require("../assets/images/login2.jpg")} style={styles.imageBackground}>
        <CustomKeyboardView>
          <View style={styles.content}>
            <Image source={require("../assets/images/splash.png")} style={styles.logo} />
            <Text style={styles.title}>Sign Up</Text>
            <View style={[styles.form, { height: hp(60) }]}>
              <View style={styles.inputs}>
                <View style={styles.rowContainer}>
                  <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, styles.inputHalf, styles.inputHalf1, (!firstNameRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'firstName' && styles.inputFocused]} >
                    {(firstNameRef.current || !isSubmitted) && <AntDesign name="user" size={20} color="white" style={[focusedInput === 'firstName' && styles.iconFocused, styles.icon]} />}
                    {(!firstNameRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                    <TextInput
                      style={[styles.textInput, { width: wp(18) }]}
                      placeholder="First Name"
                      placeholderTextColor="white"
                      autoCapitalize="sentences"
                      onChangeText={value => firstNameRef.current = value}
                      onFocus={() => setFocusedInput('firstName')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                  <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, styles.inputHalf, (!lastNameRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'lastName' && styles.inputFocused]} >
                    {(lastNameRef.current || !isSubmitted) && <AntDesign name="user" size={20} color="white" style={[focusedInput === 'lastName' && styles.iconFocused, styles.icon]} />}
                    {(!lastNameRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                    <TextInput
                      style={[styles.textInput, { width: wp(18) }]}
                      placeholder="Last Name"
                      placeholderTextColor="white"
                      autoCapitalize="sentences"
                      onChangeText={value => lastNameRef.current = value}
                      onFocus={() => setFocusedInput('lastName')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>
                <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, (!emailRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'email' && styles.inputFocused]} >
                  {(emailRef.current || !isSubmitted) && <Octicons name="mail" size={20} color="white" style={[focusedInput === 'email' && styles.iconFocused, styles.icon]} />}
                  {(!emailRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="white"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={value => emailRef.current = value}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, (!phoneNumberRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'phoneNumber' && styles.inputFocused]} >
                  {(phoneNumberRef.current || !isSubmitted) && <AntDesign name="phone" size={20} color="white" style={[focusedInput === 'phoneNumber' && styles.iconFocused, styles.icon]} />}
                  {(!phoneNumberRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Phone Number"
                    placeholderTextColor="white"
                    keyboardType="phone-pad"
                    onChangeText={value => phoneNumberRef.current = value}
                    onFocus={() => setFocusedInput('phoneNumber')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, (!passwordRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'password' && styles.inputFocused]} >
                  {(passwordRef.current || !isSubmitted) && <Octicons name="lock" size={20} color="white" style={[focusedInput === 'password' && styles.iconFocused, styles.icon]} />}
                  {(!passwordRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    onChangeText={value => passwordRef.current = value}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity onPress={toggleShowPassword} style={[styles.icon, { position: 'absolute', right: 10 }]}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, (!confirmPasswordRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'confirmPassword' && styles.inputFocused]} >
                  {(confirmPasswordRef.current || !isSubmitted) && <Octicons name="lock" size={20} color="white" style={[focusedInput === 'confirmPassword' && styles.iconFocused, styles.icon]} />}
                  {(!confirmPasswordRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="white"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    onChangeText={value => confirmPasswordRef.current = value}
                    onFocus={() => setFocusedInput('confirmPassword')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity onPress={toggleShowPassword} style={[styles.icon, { position: 'absolute', right: 10 }]}>
                    <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, (!confirmPasswordRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'photoUrl' && styles.inputFocused]} >
                  {(photoUrlRef.current || !isSubmitted) && <AntDesign name="picture" size={20} color="white" style={[focusedInput === 'photoUrl' && styles.iconFocused, styles.icon]} />}
                  {(!photoUrlRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Photo Url"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    onChangeText={value => photoUrlRef.current = value}
                    onFocus={() => setFocusedInput('photoUrl')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
                <View>
                  {
                    loading ? (
                      <View style={{ alignSelf: 'center' }} >
                        <Loading size={hp(8)} />
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
                <TouchableOpacity style={styles.buttonLink} onPress={() => router.push('signIn')}>
                  <Text style={styles.link}>Already have an account? Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CustomKeyboardView>
      </ImageBackground>
      <CustomAlert visible={isAlertVisible} message={alertMessage} onClose={handleCloseAlert} />
    </View>
  )
}