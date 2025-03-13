import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const primaryColor = useThemeColor({}, 'primary');
    const secondTextColor = useThemeColor({}, 'textSecondary');
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <LongLogo />
                <ThemedText type='title' style={styles.title}>
                    Fazer Login
                </ThemedText>
                <ThemedText type='default' lightColor={secondTextColor}>
                    Entre para continuar conectando com a comunidade de pets.
                </ThemedText>
                <View style={styles.inputs}>
                    <ThemedTextInput placeholder='Digite seu endereço de e-mail' style={{ marginBottom: 16 }} />
                    <ThemedTextInput placeholder='Digite sua senha' />
                </View>
                <ThemedButton style={styles.button} onPress={() => { router.push('/welcome/welcome2') }}>
                    <ThemedText lightColor='white'>Entrar</ThemedText>
                </ThemedButton>
                    <View style={styles.signup}>
                    <ThemedText>Ainda não tem conta?</ThemedText>
                    <ThemedText style={{ color: primaryColor, marginLeft: 8 }} onPress={() => { router.replace('/authentication/signup') }}>
                        Cadastre-se agora!
                    </ThemedText>
                </View>
            </ThemedView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 48,
        paddingTop: 48,
    },
    title: {
        marginTop: 64,
        marginBottom: 16,
    },
    button: {
        flexDirection: 'row',
    },
    inputs: {
        marginTop: 24,
        marginBottom: 16,
    },
    signup: { 
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});
