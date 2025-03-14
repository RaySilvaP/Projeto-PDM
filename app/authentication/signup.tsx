import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Location from 'expo-location';

const schema = yup.object().shape({
    username: yup.string().required("Nome de usuário é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
});

export default function SignUp() {
    const primaryColor = useThemeColor({}, 'primary');
    const secondTextColor = useThemeColor({}, 'textSecondary');
    const router = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [loadingLocation, setLoadingLocation] = useState(false);

    const onSubmit = (data: any) => {
        Alert.alert('test', JSON.stringify(data));
    };

    useEffect(() => {
        register('username');
        register('email');
        register('password');
        register('address');
    }, [register]);

    useEffect(() => {
        if (errors.address) {
            Alert.alert('Erro no endereço', errors.address.message);
        }
    }, [errors.address]);


    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        setLoadingLocation(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Ative a localização para preencher o endereço automaticamente.');
                setLoadingLocation(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Reverse Geocoding: Get address from latitude and longitude
            const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

            if (addressResponse.length > 0) {
                const data = { city: addressResponse[0].city, state: addressResponse[0].region, location: { type: 'Point', coordinates: [longitude, latitude] } };
                const address = JSON.stringify(data);
                setValue('address', address);
            } else {
                Alert.alert('Erro', 'Não foi possível encontrar seu endereço.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao obter a localização.');
        }
        setLoadingLocation(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <LongLogo />
                <ThemedText type='title' style={styles.title}>
                    Cadastre-se
                </ThemedText>
                <ThemedText type='default' lightColor={secondTextColor}>
                    Crie sua conta e conecte-se ao universo dos amantes de pets.
                </ThemedText>
                <View style={styles.inputs}>
                    <ThemedTextInput
                        errorMessage={errors.username?.message}
                        ref={ref => ref?.showErrorMessage(errors.username ? true : false)}
                        onChangeText={text => setValue('username', text)}
                        label='Nome Completo:'
                        placeholder='Digite seu nome completo'
                        style={{ marginBottom: 16 }} />
                    <ThemedTextInput
                        label='E-mail:'
                        placeholder='Digite seu endereço de e-mail'
                        onChangeText={(text) => setValue('email', text)}
                        errorMessage={errors.email?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.email ? true : false)}
                        style={{ marginBottom: 16 }} />
                    <ThemedTextInput
                        label='Senha:'
                        placeholder='Digite sua senha'
                        secureTextEntry
                        onChangeText={(text) => setValue('password', text)}
                        errorMessage={errors.password?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.password ? true : false)}
                        style={{ marginBottom: 16 }} />
                    <ThemedButton type='transparent' style={styles.location} onPress={getLocation} disabled={loadingLocation}>
                        <ThemedText style={{ fontSize: 14 }}>{loadingLocation ? 'Buscando localização...' : 'Usar Localização Atual'}</ThemedText>
                        <IconSymbol size={25} name='location' color={primaryColor} />
                    </ThemedButton>
                </View>
                <ThemedButton style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <ThemedText lightColor='white'>Criar Conta</ThemedText>
                </ThemedButton>
                <View style={styles.signup}>
                    <ThemedText>Já tem conta?</ThemedText>
                    <ThemedText style={{ color: primaryColor, marginLeft: 8 }} onPress={() => { router.replace('/authentication/login') }}>
                        Faça login!
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
    },
    location: {
        flexDirection: 'row',
        paddingTop: 0,
        alignSelf: 'flex-end'
    }
});
