// components/ThemedInputProps.ts
export interface ThemedInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    multiline?: boolean; // Define se o campo será multiline (para observações)
    style?: object;
    placeholderTextColor?: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'; // Adicione esta linha
    maxLength?: number;
  }