import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, TextInput, useWindowDimensions, Touchable, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateDoc, getDocs, collection, addDoc, orderBy, query, onSnapshot, where, doc } from 'firebase/firestore';
import { database } from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const MentorCreate = () => {
    const navigation = useNavigation();

    const [isMentor, setMentor] = useState(null);
    const [isAdmin, setAdmin] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePicture, setPP] = useState(null);

    const [role, setRole] = useState(null);
    const [about, setAbout] = useState(null);
    const [experience, setExperience] = useState([]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const [currentDateField, setCurrentDateField] = useState(null);
    const [currentExperienceIndex, setCurrentExperienceIndex] = useState(null);
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        const fetchData = async () => {
            const m = await AsyncStorage.getItem('is_mentor');
            const a = await AsyncStorage.getItem('is_admin');
            const ui = await AsyncStorage.getItem('user_id');
            const un = await AsyncStorage.getItem('username');
            const e = await AsyncStorage.getItem('email');
            const pp = await AsyncStorage.getItem('profile_picture');

            setMentor(m);
            setAdmin(a);
            setUserId(ui);
            setUsername(un);
            setEmail(e);
            setPP(pp);
        };

        fetchData();
    }, []);

    const onAddExperience = () => {
        setExperience([...experience, { jobTitle: "", companyName: "", startDate: "", endDate: "", description: "" }]);
    }

    const onRemoveExperience = () => {
        let newExperience = [...experience];
        newExperience.pop();
        setExperience(newExperience);
    }

    const onSubmit = async () => {

        const isValid = experience.every(exp => exp.jobTitle !== "" && exp.companyName !== "" && exp.startDate !== "" && exp.startDate !== "dd/mm/yy" && exp.description !== "");

        if (!isValid) {
            alert("Please fill all the experience fields");
            return;
        }

        const approvalId = await getDocs(query(collection(database, "赞同"), where("user_id", "==", userId)));
        let approvalIdList = [];
        approvalId.forEach((doc) => {
            approvalIdList.push(doc.data());
        });

        await Promise.all(experience.map(async (exp, index) => {
            let dateParts = exp.startDate.split("/");
            exp.startDate = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`).toISOString();
            if(exp.endDate == "dd/mm/yy" || exp.endDate == ""){
                exp.endDate = "Now";
            } else {
                dateParts = exp.endDate.split("/");
                exp.endDate = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`).toISOString();
            }
        }));

        if(approvalIdList.length == 0) {
            const approval = await getDocs(query(collection(database, "赞同")));
            let list = [];
            approval.forEach((doc) => {
                list.push(doc.data());
            });

            const docRef = await addDoc(collection(database, "赞同"), {
                mentor_name: username,
                approval_id: `${approvalIdList.length + 1}`,
                accepted: false,
                rejected: false,
                user_id: userId,
                role: role,
                about: about,
                experience: experience,
                profile_picture: profilePicture,
            });
        } else {
            const getData = await getDocs(query(collection(database, "赞同"), where("user_id", "==", userId)));
            if (!getData.empty) {
                const docId = getData.docs[0].id;
                const docRef = doc(database, '赞同', docId);
            
                await updateDoc(docRef, {
                    role: role,
                    about: about,
                    experience: experience,
                });
            }
        }

        navigation.navigate("Mentor");
    }

    const showDatePicker = (index, field) => {
        setCurrentExperienceIndex(index);
        setCurrentDateField(field);
        setDatePickerVisibility(true);
    };
    
    const handleConfirm = (event, selectedDate) => {
        if (selectedDate) {
            const formattedDate = new Date(selectedDate).toLocaleDateString('en-US');
            setDate(selectedDate);
            let newExperience = [...experience];
            newExperience[currentExperienceIndex][currentDateField] = formattedDate;
            setExperience(newExperience);
        }
        setDatePickerVisibility(false);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);

    };
    


    return (
        <KeyboardAvoidingView
            style={styles.layout}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <View style={styles.navbar}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View>
                            <Image source={images.arrow} style={{ height: 24 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.navbarText}>Explore your need</Text>
                </View>
            </View>
            <ScrollView>
                <View style={{ padding: 24 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.textBold}>Name</Text>
                        <View style={[styles.inputName]}>
                            <Text style={{ color: "#A3A3A3" }}>{username}</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.textBold}>Role</Text>
                        <TextInput style={styles.input} 
                            value={role}
                            placeholder="What do you want to teach" 
                            onChangeText={(text) => setRole(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.textBold}>About me</Text>
                        <TextInput 
                            multiline={true} 
                            style={[styles.input, { height: 100 }]} 
                            textAlignVertical='top' 
                            placeholder="Write yourself" 
                            value={about}
                            onChangeText={(text) => setAbout(text)}
                        />
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.textBold}>Experience</Text>
                    </View>
                    {
                        experience.map((exp, index) => (
                            <View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.textNormal}>Job Title {index + 1}</Text>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Your Job Title" 
                                        value={experience[index].jobTitle}
                                        onChangeText={(text) => {
                                            let newExperience = [...experience];
                                            newExperience[index].jobTitle = text;
                                            setExperience(newExperience);
                                        }}
                                    />
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.textNormal}>Company Name {index + 1}</Text>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Company Name" 
                                        value={experience[index].companyName}
                                        onChangeText={(text) => {
                                            let newExperience = [...experience];
                                            newExperience[index].companyName = text;
                                            setExperience(newExperience);
                                        }}
                                    />
                                </View>
                                <View style={{ marginBottom: 10, flexDirection: "row" }}>
                                    <View>
                                        <Text style={styles.textNormal}>Start Date</Text>
                                        <View style={styles.inputDate}>
                                            <Text style={styles.textDate}>{experience[index].startDate || 'dd/mm/yy'}</Text>
                                            <TouchableOpacity onPress={() => showDatePicker(index, 'startDate')}>
                                                <Image source={images.calendar}></Image>
                                            </TouchableOpacity>
                                        </View>                                        
                                    </View>
                                    <View style={{marginLeft: 20}}>
                                        <Text style={styles.textNormal}>End Date</Text>
                                        <View style={styles.inputDate}>
                                            <Text style={styles.textDate}>{experience[index].endDate || 'dd/mm/yy'}</Text>
                                            <TouchableOpacity onPress={() => showDatePicker(index, 'endDate')}>
                                                <Image source={images.calendar} />
                                            </TouchableOpacity>
                                        </View>      
                                    </View>
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.textNormal}>Description {index + 1}</Text>
                                    <TextInput 
                                        style={styles.input} 
                                        placeholder="Description" 
                                        value={experience[index].description}
                                        onChangeText={(text) => {
                                            let newExperience = [...experience];
                                            newExperience[index].description = text;
                                            setExperience(newExperience);
                                        }}
                                    />
                                </View>
                            </View>
                        ))

                    }
                    <View style={styles.addButton}>
                        {experience.length >= 1 ? (
                        <TouchableOpacity onPress={() => onRemoveExperience()}>
                            <Image source={images.min} style={{ height: 24, marginRight: 10 }} />
                        </TouchableOpacity> ) : <View></View>}
                        <TouchableOpacity onPress={() => onAddExperience()}>
                            <Image source={images.plus} style={{ height: 24 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: Dimensions.get('window').width - 48, alignItems: "center"}}>
                        <TouchableOpacity
                            onPress={() => onSubmit()}
                            style={{
                                backgroundColor: "#1C61C7",
                                padding: 10,
                                marginTop: 20,
                                width: 150,
                                opacity: role && about ? 1 : 0.5,
                                ...(role && about ? {} : { pointerEvents: "none" })
                            }}
                            disabled={!role || !about}
                        >
                            <Text style={styles.submit}>Send request</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{width: Dimensions.get('window').width - 48, alignItems: "center"}}>
                        <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: "#1C61C7", padding: 10, marginTop: 20, width: 150 }}>
                            <Text style={styles.submit}>Send request</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ScrollView>
            {isDatePickerVisible && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={handleConfirm}
                />
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: "white",
        height: "100%"
    },
    arrow: {
        height: 24,
        width: 24,
    },
    navbar: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        height: 110,
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#A3A3A3",
        alignItems: "center",
        backgroundColor: "white",
    },
    navbarText: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    navbarIcon: {
        flexDirection: "row",
        paddingRight: 10,
        alignItems: "center",
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 14
    },
    textNormal: {
        fontSize: 14
    },
    textDate: {
        color: "#5C5C5C"
    },
    input: {
        borderWidth: 1,
        borderColor: "#A3A3A3",
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 10,
        width: Dimensions.get("window").width - 48,
    },
    inputDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#A3A3A3",
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 10,
        width: ((Dimensions.get("window").width - 48) / 2) - 10,
    },
    inputName: {
        borderWidth: 1,
        borderColor: "#A3A3A3",
        backgroundColor: "#E2E1E1",
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 10,
        width: Dimensions.get("window").width - 48,
    },
    addButton: {
        width: Dimensions.get("window").width - 48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 30,
    },
    submit: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    }
});

const images = {
    arrow: require("../../assets/images/arrow-back.png"),
    plus: require("../../assets/images/plus-circle.png"),
    min: require("../../assets/images/min-circle.png"),
    calendar: require("../../assets/images/calendar.png"),
};

export default MentorCreate;