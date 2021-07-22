import React from 'react';
import * as style from './style';

const Button = ({ text, onPress, onlyBorder, onlyColor }) => {
	return (
		<style.buttonFull activeOpacity={0.8} onlyColor={onlyColor} onlyBorder={onlyBorder} onPress={onPress}>
			<style.text onlyColor={onlyColor} onlyBorder={onlyBorder}>
				{text}
			</style.text>
		</style.buttonFull>
	);
};

export default Button;
