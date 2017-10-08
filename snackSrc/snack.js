import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Switch } from 'react-native';
import { Constants, Accelerometer} from 'expo';

export default class App extends Component {
  state = {
    accelerometerData: { x: 0, y: 0, z: 0 },
	inputData: { x: 0, y: 0, z: 0 },
    ignoreManualInput: {x: true, y: true, z: true}
  };

  componentWillUnmount() {
    this._unsubscribeFromAccelerometer();
  }

  componentDidMount() {
    this._subscribeToAccelerometer();
  }

  _subscribeToAccelerometer = () => {
    this._acceleroMeterSubscription = Accelerometer.addListener(accelerometerData =>
      this.setState({ accelerometerData })
    );
  };

  _unsubscribeFromAccelerometer = () => {
    this._acceleroMeterSubscription && this._acceleroMeterSubscription.remove();
    this._acceleroMeterSubscription = null;
  };

  _handleXText = e => {
	  const inputData = this.state.inputData;
	  inputData.x = e.target.value;
	  this.forceUpdate();
  };

  _handleXToggle = 
  () => {
	  const ignoreManualInput = this.state.ignoreManualInput;
	  ignoreManualInput.x = !ignoreManualInput.x;
	  this.forceUpdate();
  };
 
  
     _handleYText = e => {
	  const inputData = this.state.inputData;
	  inputData.y = e.target.value;
	  this.forceUpdate();
  };

  _handleYToggle = 
  () => {
	  const ignoreManualInput = this.state.ignoreManualInput;
	  ignoreManualInput.y = !ignoreManualInput.y;
	  this.forceUpdate();
  };
  
    _handleZText = e => {
	  const inputData = this.state.inputData;
	  inputData.z = e.target.value;
	  this.forceUpdate();
  };

  _handleZToggle = 
  () => {
	  const ignoreManualInput = this.state.ignoreManualInput;
	  ignoreManualInput.z = !ignoreManualInput.z;
	  this.forceUpdate();
  };
 

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Accelerometer:
          x = {this.state.accelerometerData.x.toFixed(2)}{', '}
          y = {this.state.accelerometerData.y.toFixed(2)}{', '}
          z = {this.state.accelerometerData.z.toFixed(2)}
        </Text>
        <Text style={styles.paragraph}>
          Add, Modify or Deselect Inputs
        </Text>
        <TextInput
          value={this.state.ignoreManualInput.x?Math.abs(this.state.accelerometerData.x).toFixed(2):this.state.inputData.x}
          onChangeText={this._handleXText}
          style={{ width: 200, height: 44, padding: 8 }}
        />
		<Switch
          onValueChange={this._handleXToggle}
          value={this.state.ignoreManualInput.x}
		/>
		<TextInput
          value={this.state.ignoreManualInput.y?Math.abs(this.state.accelerometerData.y).toFixed(2):this.state.inputData.y}
          onChangeText={this._handleYText}
          style={{ width: 200, height: 44, padding: 8 }}
        />
		<Switch
          onValueChange={this._handleYToggle}
          value={this.state.ignoreManualInput.y}
		/>
		<TextInput
          value={this.state.ignoreManualInput.z?Math.abs(this.state.accelerometerData.z).toFixed(2):this.state.inputData.z}
          onChangeText={this._handleZText}
          style={{ width: 200, height: 44, padding: 8 }}
        />
		<Switch
          onValueChange={this._handleZToggle}
          value={this.state.ignoreManualInput.z}
		/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});