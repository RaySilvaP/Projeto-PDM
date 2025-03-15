import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Location from 'expo-location';
import { useAuth } from '@/hooks/useAuth';
import { AlertModal, AlertModalHandle } from '@/components/AlertModal';

const schema = yup.object().shape({
    userName: yup.string()
        .min(4, 'O nome de usuário deve ter pelo menos 4 caracteres')
        .required("Nome de usuário é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
});

export default function SignUp() {
    const primaryColor = useThemeColor({}, 'primary');
    const secondTextColor = useThemeColor({}, 'placeholder');
    const router = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [loadingLocation, setLoadingLocation] = useState(false);
    const { signup } = useAuth();
    const [addressState, setAddressState] = useState("Usar Localização Atual")
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [modalText, setModalText] = useState('');
    const modalRef = useRef<AlertModalHandle>(null);

    const onSubmit = async (data: any) => {
        const address = JSON.parse(data.address);
        address.city = city;
        address.state = state;
        const response = await signup(data.userName, data.email, data.password, address);

        if (response.success) {
            router.replace('/authentication/login');
        } else {
            setModalText(response.message);
            modalRef.current?.setVisible();
        }
    };

    useEffect(() => {
        register('userName');
        register('email');
        register('password');
        register('address');
        register('city');
        register('state');
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
                setCity(addressResponse[0].city || '');
                setState(addressResponse[0].region || '');

                setValue('city', city);
                setValue('state', state);

                const data = { city, state, location: { type: 'Point', coordinates: [longitude, latitude] } };
                const address = JSON.stringify(data);
                setValue('address', address);
                setAddressState("Usando localização atual");
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
                        errorMessage={errors.userName?.message}
                        ref={ref => ref?.showErrorMessage(errors.userName ? true : false)}
                        onChangeText={text => setValue('userName', text)}
                        label='Nome de usuário:'
                        placeholder='Digite seu nome de usuário'
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
                    <ThemedTextInput
                        label='Cidade:'
                        placeholder='Digite sua cidade'
                        value={city}
                        onChangeText={(text) => {
                            setValue('city', text)
                            setCity(text)
                        }}
                        errorMessage={errors.city?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.city ? true : false)}
                        style={{ marginBottom: 16 }}
                    />
                    <ThemedTextInput
                        label='Estado:'
                        placeholder='Digite seu estado'
                        value={state}
                        onChangeText={(text) => {
                            setValue('state', text)
                            setState(text)
                        }}
                        errorMessage={errors.state?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.state ? true : false)}
                    />
                    <ThemedButton type='transparent' style={styles.location} onPress={getLocation} disabled={loadingLocation}>
                        <ThemedText style={{ fontSize: 14 }}>{loadingLocation ? 'Buscando localização...' : addressState}</ThemedText>
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
            <AlertModal type='fail' ref={modalRef} text={modalText} />
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
