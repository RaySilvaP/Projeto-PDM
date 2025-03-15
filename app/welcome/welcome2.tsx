import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome2() {
    const primaryTextColor = useThemeColor({}, 'textPrimary');
    const secondTextColor = useThemeColor({}, 'textSecondary');
    const primaryColor = useThemeColor({}, 'primary');
    const secondaryColor = useThemeColor({}, 'stroke');
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <LongLogo />
                <ThemedText type='title' style={styles.title}>
                    Apresente seu melhor amigo ao mundo!
                </ThemedText>
                <ThemedText type='default' lightColor={secondTextColor}>
                    Adicione uma foto, suas características e veja seu cão se tornar o centro das atenções.
                </ThemedText>
                <Image source={require('@/assets/images/ilustrative2.png')} />
                <View style={styles.paginationDots}>
                    <View style={[{ backgroundColor: secondaryColor}, styles.paginationDot]}></View>
                    <View style={[{ backgroundColor: primaryColor }, styles.paginationDot]}></View>
                </View>
                <View style={styles.buttons}>
                    <ThemedButton type='transparent' style={styles.button} onPress={() => { router.back() }}>
                        <IconSymbol name='arrow.left' color={primaryTextColor} />
                        <ThemedText style={{marginLeft: 10}}>Voltar</ThemedText>
                    </ThemedButton>
                    <ThemedButton style={styles.button} onPress={() => { router.push('/authentication/signup') }}>
                        <ThemedText lightColor='white'>Avançar</ThemedText>
                    </ThemedButton>
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
        alignItems: 'center',
    },
    title: {
        marginTop: 64,
        marginBottom: 16,
    },
    paginationDots: {
        flexDirection: 'row',
        width: 30,
        justifyContent: 'space-evenly',
        marginTop: 16,
        marginBottom: 64
    },
    paginationDot: {
        borderRadius: 20,
        width: 10,
        height: 10
    },
    buttons: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '30%',
        flexDirection: 'row',
    }
});
