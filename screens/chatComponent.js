import Chat from './chat'
import React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'

export default function ChatComponent(props) {
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <Chat />
        </KeyboardAvoidingView>
    )
}