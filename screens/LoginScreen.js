import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity, Text, Image } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    
    const navigation = useNavigation();
    const { login, loading } = useAuth();

    const handleLogin = async () => {
        try {
            await login(email, password);

        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#666"
                    error={!!errors.email}
                    errorText={errors.email}

                />
                <TextInput
                    style={styles.input} 
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#666"
                    error={!!errors.password}
                    errorText={errors.password}
                />
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>{loading ? "Loading..." : "Login"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 100,
    },
    formContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    input: {
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    }
});

export default LoginScreen;
