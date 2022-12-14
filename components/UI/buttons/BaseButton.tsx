import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2BC169',
    padding: 12,
    paddingVertical: 14,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});

type Props = {
  children: string;
  disabled?: boolean;
  buttonStyles?: any;
  onPress?: () => void;
};

export default function BaseButton({
  children,
  disabled,
  buttonStyles,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() => !disabled && onPress()}
    >
      <View style={[styles.button, buttonStyles, disabled && styles.disabled]}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

BaseButton.defaultProps = {
  disabled: false,
  buttonStyles: {},
  onPress: () => undefined,
};
