import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
    const headlineColor = useThemeColor({}, 'textSecondary');
    const primaryColor = useThemeColor({}, 'primary');
    const secondaryColor = useThemeColor({}, 'stroke');
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <LongLogo />
                <ThemedText type='title' style={styles.title}>Bem-vindo ao DoggyConnect!</ThemedText>
                <ThemedText
                    type='default' lightColor={headlineColor}>
                    Crie o perfil do seu pet, compartilhe e conecte-se com uma comunidade de amantes de cães.
                </ThemedText>
                <Image source={require('@/assets/images/ilustrative1.png')} />
                <View style={styles.paginationDots}>
                    <View style={[{ backgroundColor: primaryColor}, styles.paginationDot]}></View>
                    <View style={[{ backgroundColor: secondaryColor}, styles.paginationDot]}></View>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                    <ThemedButton style={{ width: '30%' }} onPress={() => { router.push('/welcome/welcome2') }}>
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
});
