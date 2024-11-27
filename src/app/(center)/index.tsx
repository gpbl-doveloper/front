import React, {useState} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "expo-router";

export default function AddCenterPage() {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        centerName: "",
        phoneNumber: "",
        street: "",
        city: "",
        zipCode: "",
        state: "",
        businessNumber: "",
        centerDescription: "",
    });

    const handleInputChange = (key: string, value: string) => {
        setForm({...form, [key]: value});
    };

    const handleSubmit = () => {
        console.log("Form submitted:", form);
        // Handle form submission logic
        navigation.reset({
            index: 0,
            routes: [{name: "(main)", params: {screen: "(teacher-home)"}}],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Center</Text>

            <TextInput
                style={styles.input}
                placeholder="Center name"
                value={form.centerName}
                onChangeText={(value) => handleInputChange("centerName", value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={form.phoneNumber}
                onChangeText={(value) => handleInputChange("phoneNumber", value)}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Street"
                value={form.street}
                onChangeText={(value) => handleInputChange("street", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={form.city}
                onChangeText={(value) => handleInputChange("city", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Zip code"
                keyboardType="number-pad"
                value={form.zipCode}
                onChangeText={(value) => handleInputChange("zipCode", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="State"
                value={form.state}
                onChangeText={(value) => handleInputChange("state", value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Business number"
                keyboardType="number-pad"
                value={form.businessNumber}
                onChangeText={(value) => handleInputChange("businessNumber", value)}
            />

            <TextInput
                style={styles.input}
                placeholder="Center Description"
                value={form.centerDescription}
                onChangeText={(value) => handleInputChange("centerDescription", value)}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF8E7",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000",
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
        color: "#555",
    },
    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#6B4226",
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

