import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSlider } from '@/components/ThemedSlider';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    return (
        <View style={styles.container}>
            <ThemedButton onPress={() => {Alert.alert("Test")}} shape = "circle"> 
                <Text style={{color: 'white'}}>Test</Text>
            </ThemedButton>
            <ThemedSlider
                minimumValue= {0}
                maximumValue= {1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
