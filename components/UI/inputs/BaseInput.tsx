import {StyleSheet, TextInput, View, Text, NativeSyntheticEvent, TextInputSubmitEditingEventData} from "react-native";
import { KeyboardTypeOptions } from "react-native";
import MaskedInput, {Mask} from "react-native-mask-input";

export default function BaseInput({
  label = '',
  value = '',
  placeholder = '',
  keyboardType = 'default',
  multiline = false,
  editable = true,
  secureTextEntry = false,
  mask = undefined,
  inputStyle = {},
  onChangeValue = () => {},
  onSubmitEditing = () => {}
}: {
    label?: string,
    value?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    multiline?: boolean,
    editable?: boolean,
    secureTextEntry?: boolean,
    mask?: Mask | undefined,
    inputStyle?: {} | undefined,
    onChangeValue?: ((text: string) => void) | undefined,
    onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined,
}) {
    const InputComponent = mask ? MaskedInput : TextInput;

    return (
        <View>
            <Text style={styles.label}>{ label }</Text>
            <InputComponent
                style={[styles.input, inputStyle]}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={multiline}
                editable={editable}
                secureTextEntry={secureTextEntry}
                mask={mask}
                onChangeText={onChangeValue}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderRadius: 8
    }
})
