import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [seccondPassword, setSeccondPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function signup(username: string, firstPassword: string, seccondPassword: string) {
        if (!username || !firstPassword || !seccondPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (firstPassword !== seccondPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: firstPassword }),
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMessage(data.error || 'Signup failed');
                return;
            }

            setErrorMessage('');
            setUsername('');
            setFirstPassword('');
            setSeccondPassword('');

            router.push('/login');
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
                        Welcome to our app. Please sign up to continue.
                    </Text>
                </View>

                {/* Right Side - Signup Form */}
                <View className="flex-1 p-8 justify-center">
                    <Text className="text-3xl font-bold text-gray-900 mb-8 text-center">Sign up</Text>

                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                        className="w-full bg-gray-100 p-4 rounded-lg mb-4 text-gray-800 text-base"
                    />
                    <TextInput
                        value={firstPassword}
                        onChangeText={setFirstPassword}
                        placeholder="Password"
                        secureTextEntry
                        className="w-full bg-gray-100 p-4 rounded-lg mb-4 text-gray-800 text-base"
                    />
                    <TextInput
                        value={seccondPassword}
                        onChangeText={setSeccondPassword}
                        placeholder="Re-enter password"
                        secureTextEntry
                        className="w-full bg-gray-100 p-4 rounded-lg mb-6 text-gray-800 text-base"
                    />

                    {errorMessage ? (
                        <Text className="text-red-500 text-sm text-center mb-4">{errorMessage}</Text>
                    ) : null}

                    <TouchableOpacity
                        onPress={() => signup(username, firstPassword, seccondPassword)}
                        className="w-full bg-blue-600 py-4 rounded-lg mb-4"
                    >
                        <Text className="text-center text-white text-lg font-semibold">Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text className="text-sm text-gray-700 text-center">
                            You already have an account?{' '}
                            <Text className="text-blue-600" onPress={() => router.push('/login')}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
