import { ThemedButton } from '@/components/ThemedButton';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    return (
        <View style={styles.container}>
            <ThemedButton type= "transparent" onPress={() => {Alert.alert("Test")}}> 
                <Text>Test</Text>
            </ThemedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
})
