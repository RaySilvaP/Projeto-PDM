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
    name: yup.string().required("Nome é obrigatório"),
    cep: yup.string()
        .matches(/^\d{5}-?\d{3}$/, "CEP inválido")
        .required("CEP é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
});

export default function SignUp() {
    const primaryColor = useThemeColor({}, 'primary');
    const secondTextColor = useThemeColor({}, 'textSecondary');
    const router = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [address, setAddress] = useState('');

    const onSubmit = (data: any) => {
        router.push({ pathname: '/authentication/signup2', params: data });
    };

    useEffect(() => {
        register('name');
        register('cep');
        register('address');
    }, [register]);

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
                const address = `${addressResponse[0].street}, ${addressResponse[0].city}, ${addressResponse[0].region}`;
                setAddress(address);
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
                        errorMessage={errors.name?.message}
                        ref={ref => ref?.showErrorMessage(errors.name ? true : false)}
                        onChangeText={text => setValue('name', text)}
                        label='Nome Completo:'
                        placeholder='Digite seu nome completo'
                        style={{ marginBottom: 16 }} />
                    <ThemedTextInput
                        errorMessage={errors.cep?.message}
                        ref={ref => ref?.showErrorMessage(errors.cep ? true : false)}
                        onChangeText={text => setValue('cep', text)}
                        label='CEP:'
                        placeholder='Digite seu CEP'
                        style={{ marginBottom: 16 }} />
                    <ThemedTextInput
                        errorMessage={errors.address?.message}
                        ref={ref => ref?.showErrorMessage(errors.address ? true : false)}
                        value={address}
                        onChangeText={(text) => {
                            setValue('address', text)
                            setAddress(text)
                        }}
                        label='Endereço:'
                        placeholder='Digite sua endereço' />
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
