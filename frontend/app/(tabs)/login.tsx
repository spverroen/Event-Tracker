import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function login(username: string, password: string) {
        if (!username || !password) {
            setErrorMessage('All fields are required.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMessage(data.error || 'Login failed');
                return;
            }

            setErrorMessage('');
            setUsername('');
            setPassword('');

            router.push('/home');
        } catch (err) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-gray-50 p-6">
            <View className="w-full max-w-3xl bg-white rounded-2xl shadow-xl flex-row overflow-hidden">
                {/* Left Side - Logo and Branding */}
                <View className="flex-1 bg-blue-600 justify-center items-center p-6">
                    <Text className="text-white text-4xl font-bold mb-4">Event Tracker</Text>
                    <Text className="text-white text-lg text-center">
                        Welcome to our app. Please login to continue.
                    </Text>
                </View>

                {/* Right Side - Signup Form */}
                <View className="flex-1 p-8 justify-center">
                    <Text className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</Text>

                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                        className="w-full bg-gray-100 p-4 rounded-lg mb-4 text-gray-800 text-base"
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                        className="w-full bg-gray-100 p-4 rounded-lg mb-4 text-gray-800 text-base"
                    />

                    {errorMessage ? (
                        <Text className="text-red-500 text-sm text-center mb-4">{errorMessage}</Text>
                    ) : null}

                    <TouchableOpacity
                        onPress={() => login(username, password)}
                        className="w-full bg-blue-600 py-4 rounded-lg mb-4"
                    >
                        <Text className="text-center text-white text-lg font-semibold">Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text className="text-sm text-gray-700 text-center">
                            Don't have an account?{' '}
                            <Text className="text-blue-600" onPress={() => router.push('/signup')}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

