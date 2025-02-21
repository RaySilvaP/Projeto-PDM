import { useThemeColor } from "@/hooks/useThemeColor";
import { Button, ButtonProps } from "react-native";

export type ThemedButtonProps = ButtonProps & {
	lightColor?: string,
	darkColor?: string,
	type?: 'success' | 'danger'
}

export function ThemedButton({ lightColor, darkColor, type, ...rest }: ThemedButtonProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, type === undefined ? "primary" : type);
	return (
		<Button
			color={color}
			{...rest}
		/>
	)
}
