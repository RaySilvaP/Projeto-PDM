import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function LongLogo() {
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />
            <ThemedText style={styles.text}>
                Nome do App
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 50,
        width: 50,
    },
    text: {
        textAlignVertical: 'center',
    },
    container: {
        flexDirection: 'row',
    },
});
