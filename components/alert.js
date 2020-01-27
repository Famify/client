import React from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import {
    StyleSheet
} from 'react-native'

export default function alert(){
    return(
        <AwesomeAlert
            show={true}
            showProgress={false}
            title="AwesomeAlert"
            message="I have a message for you!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
            // onCancelPressed={() => {hideAlert}}
            // onConfirmPressed={() => {hideAlert}}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: '#fff',
        fontSize: 15
    }
})