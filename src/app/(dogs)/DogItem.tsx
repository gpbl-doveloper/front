import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Dog, DogFromBackend, useSelectedDogStore} from "@/src/store/dogStore";
import {useNavigation} from "expo-router";
import {RootStackParamList} from "@/global";

interface DogItemProps {
    dog: DogFromBackend | Dog;
    children?: React.ReactNode;
}

export function DogItem({dog, children}: DogItemProps) {
    const navigation = useNavigation();
    const {setSelectedDog} = useSelectedDogStore();

    const handleTouch = () => {
        setSelectedDog(dog);
        navigation.navigate("Home");

    };
    return (
        <TouchableOpacity style={styles.dogItemContainer} onPress={handleTouch}>
            <DogImagePlaceholder dogImage={dog.img}/>
            <View style={styles.dogInfo}>
                <Text style={styles.dogName}>{dog.name}</Text>
                {children}
            </View>
        </TouchableOpacity>
    );
}

// DogImagePlaceholder 컴포넌트
function DogImagePlaceholder(dogImage: any) {
    const cleanUrl = dogImage.dogImage.split('?')[0];
    console.log(cleanUrl);
    return (
        <View style={styles.dogImageContainer}>
            <View style={styles.dogImagePlaceholder}>
                {
                    dogImage.dogImage
                        ? <Image source={{uri: cleanUrl}}
                                 style={styles.dogImage}/>
                        : <Ionicons name="image-outline" size={30} color="#A3C0F7"/>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dogItemContainer: {
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "#F3F7FF",
        marginBottom: 10,
        alignItems: "center",
        paddingRight: 16,
        height: 114,
    },
    dogImageContainer: {
        width: 100,
        height: 114,
        backgroundColor: "#E5EDFF",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    dogImage: {
        width: 100,
        height: 114,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    dogImagePlaceholder: {
        width: 40,
        height: 114,
        justifyContent: "center",
        alignItems: "center",
    },
    dogInfo: {
        flex: 1,
        paddingLeft: 18,
        gap: 12,
        justifyContent: "center",
    },
    dogName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    tasksStatusContainer: {
        flexDirection: "column",
        gap: 6,
        paddingHorizontal: 4,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    dogStatus: {
        color: "#A3A3A3",
        fontSize: 16,
        marginLeft: 6,
    },
});
