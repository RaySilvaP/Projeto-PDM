import { LongLogo } from '@/components/LongLogo';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';

const schema = yup.object({
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    phone: yup.string().min(10, 'Número inválido').required('O telefone é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
}).required();

export default function SignUp2() {
    const primaryColor = useThemeColor({}, 'primary');
    const secondTextColor = useThemeColor({}, 'textSecondary');
    const router = useRouter();
    const params = useLocalSearchParams();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        register('email');
        register('phone');
        register('password');
    }, [register]);

    const onSubmit = (data: any) => {
        const finalData = { ...params, ...data }; // Merge with first page data
        Alert.alert("Cadastro Completo", JSON.stringify(finalData, null, 2));

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ThemedView style={styles.container}>
                <LongLogo />
                <ThemedText type='title' style={styles.title}>
                    Concluir Cadastro
                </ThemedText>
                <ThemedText type='default' lightColor={secondTextColor}>
                    Precisamos de mais algumas informações para concluir seu cadastro.
                </ThemedText>
                <View style={styles.inputs}>
                    <ThemedTextInput
                        label='E-mail:'
                        placeholder='Digite seu endereço de e-mail'
                        onChangeText={(text) => setValue('email', text)}
                        errorMessage={errors.email?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.email ? true : false)}
                        style={{ marginBottom: 16 }}
                    />
                    <ThemedTextInput
                        label='Telefone:'
                        placeholder='Digite seu número de telefone'
                        onChangeText={(text) => setValue('phone', text)}
                        errorMessage={errors.phone?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.phone ? true : false)}
                        style={{ marginBottom: 16 }}
                    />
                    <ThemedTextInput
                        label='Senha:'
                        placeholder='Digite sua senha'
                        secureTextEntry
                        onChangeText={(text) => setValue('password', text)}
                        errorMessage={errors.password?.message}
                        ref={(ref) => ref?.showErrorMessage(errors.password ? true : false)}
                    />    
                </View>
                <ThemedButton style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <ThemedText lightColor='white'>Concluir Cadastro</ThemedText>
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
});
