import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

const Alert = ({ alerts }) => {
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert, i) => (
			<Text key={i} style={{ color: alert.alertType === 'danger' ? 'red' : 'green' }} className={`alert alert`}>
				{alert.msg}
			</Text>
		))
	);
};

const mapStateToProps = (state) => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
