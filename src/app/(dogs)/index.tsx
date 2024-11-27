import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DogItem} from "./DogItem";
import {useFirebaseAuth} from "../../store/userStore";
import {getParentDogListAPI} from "./dogListModel";

function SelectDogPage() {
    const [dogList, setDogList] = useState([]);
    const {idToken} = useFirebaseAuth();

    // [parent] 사용자의 강아지 목록을 가져오는 API 호출
    useEffect(() => {
        const dogListData = async () => {
            try {
                const data = await getParentDogListAPI(idToken)
                setDogList(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        dogListData()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/images/pawsome-logo-sm.svg")}
                    style={styles.logo}
                />
            </View>

            {dogList.map((dog) => (
                <DogItem dog={dog}/>
            ))}

            <AddDogAtSelectDog/>
        </ScrollView>
    );
}

function AddDogAtSelectDog() {
    const navigator = useNavigation();
    return (
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigator.navigate("AddDog")}
        >
            <Text style={styles.addButtonText}>+ Add profile</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#FFF8EF",
        alignItems: "center",
    },
    header: {
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 10,
        marginBottom: 15,
        width: "100%",
        height: 114,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#C4C4C4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    profileImage: {
        width: 30,
        height: 30,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    addButton: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6C4F3E",
    },
});

export default SelectDogPage;
