import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertModal, AlertModalHandle } from '@/components/AlertModal';

const schema = yup.object({
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
}).required();

export default function Login() {
    const primaryColor = useThemeColor({}, 'primary');
    const secondTextColor = useThemeColor({}, 'placeholder');
    const router = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { login } = useAuth();
    const [modalText, setModalText] = useState('Sucesso');
    const modalRef = useRef<AlertModalHandle>(null);

    useEffect(() => {
        register('email')
        register('password')
    });

    const onSubmit = async (data: any) => {
        const response = await login(data.email, data.password);

        if (response.success) {
            router.replace('/(tabs)/Index');
        } else {
            setModalText(response.message);
            modalRef.current?.setVisible();
        }
    };

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
                    <ThemedTextInput
                        label='E-mail:'
                        placeholder='Digite seu endereço de e-mail'
                        onChangeText={(text) => setValue('email', text)}
                        errorMessage={errors.email?.message}
                        ref={ref => ref?.showErrorMessage(errors.email ? true : false)}
                        style={{ marginBottom: 16 }} />
                    <ThemedTextInput
                        label='Senha:'
                        placeholder='Digite sua senha'
                        secureTextEntry
                        onChangeText={(text) => setValue('password', text)}
                        errorMessage={errors.password?.message}
                        ref={ref => ref?.showErrorMessage(errors.password ? true : false)} />
                </View>
                <ThemedButton style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <ThemedText lightColor='white'>Entrar</ThemedText>
                </ThemedButton>
                <View style={styles.signup}>
                    <ThemedText>Ainda não tem conta?</ThemedText>
                    <ThemedText style={{ color: primaryColor, marginLeft: 8 }} onPress={() => { router.replace('/authentication/signup') }}>
                        Cadastre-se agora!
                    </ThemedText>
                </View>
            </ThemedView>
            <AlertModal type='fail' ref={modalRef} text={modalText}/>
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
