// ./src/components/CustomButton.tsx
import React from 'react';
import {TouchableOpacity, Text, ViewStyle} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle; // style 속성 추가
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = 'blue',
  textColor = 'white',
  style, // 추가된 style prop
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor,
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8,
        },
        style,
      ]} // style prop 적용
    >
      <Text style={{color: textColor, textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
