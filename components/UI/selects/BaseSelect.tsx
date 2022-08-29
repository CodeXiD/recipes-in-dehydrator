import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
});

type Item = { label: string; value: string | number };
type Props = {
  value?: string | number | null;
  label?: string | null;
  items?: Item[];
  onValueChange?: any;
};

export default function BaseSelect({
  value,
  label,
  items,
  onValueChange,
}: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <Picker
        mode="dropdown"
        selectedValue={value}
        onValueChange={onValueChange}
      >
        {items &&
          items.map(item => (
            <Picker.Item
              label={item.label}
              value={item.value}
              key={item.value}
            />
          ))}
      </Picker>
    </View>
  );
}

BaseSelect.defaultProps = {
  value: null,
  label: null,
  items: [],
  onValueChange: null,
};
