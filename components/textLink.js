import React from 'react'
import { Text } from 'react-native'
import { withNavigation } from 'react-navigation';

class TextLink extends React.Component {
  render() {
    return (
      <Text
        onPress={() => {
          this.props.navigation.navigate(this.props.navigateTo, { id: this.props.id, back: 'message' })
        }}
      ><Text
        style={{ textDecorationLine: 'underline' }}
      >
          {this.props.text}
        </Text>
      </Text>
    );
  }
}

export default withNavigation(TextLink)
