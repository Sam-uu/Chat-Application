import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useRef, useState } from 'react'
import styles from '../styles/signInStyles'
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Octicons, AntDesign, Ionicons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';

export default function SignIn() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [focusedInput, setFocusedInput] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    setIsSubmitted(true);
   
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Please fill in all fields');
      return;
    }
    setLoading(true);

    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign In', response.msg);
    }

  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground source={require("../assets/images/login2.jpg")} style={styles.imageBackground}>
        <View style={styles.content}>
          <Image source={require("../assets/images/splash.png")} style={styles.logo} />
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.form}>
            <View style={styles.inputs}>
              <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer,(!emailRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'email' && styles.inputFocused]} >
                {(emailRef.current || !isSubmitted) && <Octicons name="mail" size={20} color="white" style={[focusedInput === 'email' && styles.iconFocused, styles.icon]} />}
                {(!emailRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon}/>}
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
              <View className="flex-row gap-4 px-4 items-center" style={[styles.input, styles.rowContainer, (!passwordRef.current && isSubmitted) && styles.invalidInput, focusedInput === 'password' && styles.inputFocused]} >
                {(passwordRef.current || !isSubmitted) && <Octicons name="lock" size={22} color="white" style={[focusedInput === 'password' && styles.iconFocused, styles.icon]} />}
                {(!passwordRef.current && isSubmitted) && <AntDesign name="exclamationcircleo" size={20} color="red" style={styles.icon} />}
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="white"
                  autoCapitalize='none'
                  secureTextEntry = {!showPassword}
                  onChangeText={value => passwordRef.current = value}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity onPress={toggleShowPassword} style={[styles.icon, {position: 'absolute', right: 10}]}>
                  <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                {
                  loading? (
                    <View style={{alignSelf: 'center'}} >
                      <Loading size={hp(8)} />
                    </View>
                  ):(
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                      <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
              
              <TouchableOpacity style={styles.buttonLink} onPress={() => router.push('Recoverpwd')}>
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLink} onPress={() => router.push('signUp')}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </ImageBackground>
    </View>
  );
}