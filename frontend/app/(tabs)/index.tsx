import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login(username: string, password: string) {
    console.log(username + " " + password)
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-6">
      <View className="w-full max-w-3xl bg-white rounded-2xl shadow-xl flex-row overflow-hidden">
        {/* Left Side - Logo and Branding */}
        <View className="flex-1 bg-blue-600 justify-center items-center p-6">
          {/* Replace this with your actual logo image */}
          <Text className="text-white text-4xl font-bold mb-4">Event Tracker</Text>
          <Text className="text-white text-lg text-center">
            Welcome to our app. Please login to continue.
          </Text>
        </View>

        {/* Right Side - Login Form */}
        <View className="flex-1 p-8 justify-center">
          <Text className="text-3xl font-bold text-gray-900 mb-8 text-center">Login</Text>

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Email"
            keyboardType="email-address"
            className="w-full bg-gray-100 p-4 rounded-lg mb-4 text-gray-800 text-base"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            className="w-full bg-gray-100 p-4 rounded-lg mb-6 text-gray-800 text-base"
          />

          <TouchableOpacity
            onPress={() => login(username, password)}
            className="w-full bg-blue-600 py-4 rounded-lg mb-4"
          >
            <Text className="text-center text-white text-lg font-semibold">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-sm text-gray-700 text-center">
              Don't have an account?{' '}
              <Text className="text-blue-600">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>


  );
}
