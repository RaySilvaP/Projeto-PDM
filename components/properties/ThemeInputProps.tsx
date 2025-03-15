export interface ThemedInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    multiline?: boolean;
    style?: object;
    placeholderTextColor?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}