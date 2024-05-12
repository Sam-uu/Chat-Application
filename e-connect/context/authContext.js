// e-connect/context/authContext.js
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            //console.log('got user: ', user );
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }
    , []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            let data = docSnap.data();
            setUser({ ...user, firstName: data.firstName, lastName: data.lastName, profileUrl: data.profileUrl, phoneNumber: data.phoneNumber, userId: data.userId})
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
            console.log('sign in error: ', msg);
            if (msg.includes('auth/invalid-credential')) msg = 'Invalid credentials. Please check your email and password.';
            if (msg.includes('auth/invalid-email')) msg = 'Invalid email. Please check your email address.';
            if (msg.includes('auth/too-many-requests')) msg = 'Access disabled due to many failed requests. Please reset your password or try again later.';
            if (msg.includes('auth/network-request-failed')) msg = 'Network request Failed. Please try again.';
            
            return { success: false, msg };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message, error: error };
        }
    }

    const register = async (email, password, firstName, lastName, profileUrl, phoneNumber) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response*: ', response?.user);

            // setUser(response?.user);
            // setIsAuthenticated
            
            await setDoc(doc(db, 'users', response?.user?.uid), {
                firstName,
                lastName,
                email,
                password,
                profileUrl,
                phoneNumber,
                userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
            if (msg.includes('auth/invalid-email')) msg = 'Invalid email';
            if (msg.includes('auth/email-already-in-use')) msg = 'Email already in use. Please use another email address.';
            if (msg.includes('auth/weak-password')) msg = 'Password should be atleast 6 characters. Please use a stronger password.';
            if (msg.includes('auth/network-request-failed')) msg = 'Network request Failed. Please try again.';
            
            console.log('sign up error: ', msg);
            return { success: false, msg };
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return value;
}