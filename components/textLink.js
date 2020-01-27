import React from 'react'
import { Text } from 'react-native'
import { withNavigation } from 'react-navigation';

class TextLink extends React.Component {
  render() {
    console.log(this.props)
    
    return (
      <Text
        title="Back"
        style={{ textDecorationLine: 'underline' }}
        onPress={() => {
          this.props.navigation.navigate(this.props.navigateTo, { id: this.props.id, back: 'message' })
        }}
      >{this.props.text}</Text>
    );
  }
}

export default withNavigation(TextLink)
