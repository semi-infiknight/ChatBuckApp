import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, LogBox, Image, ScrollView, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
const windoHeight = Dimensions.get('window').height;
const image = { uri: 'https://i.vimeocdn.com/video/1319858265-1bd4f72cdd495d6d9cd02c041e6ffadb63486e6a3a95131d7c3c1e7e81123a65-d_640x360.jpg' };
import { useEffect, useState } from 'react'
import styles from './AuthStyle';
function ForgotPassword({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(true);
        setModalVisible(true);
    }, []);
    return (
        <View style={styles.MainView}>
            {/* <ImageBackground source={image} style={styles.BackGImg} > */}
            <View style={styles.LogoView}>
                <Image source={{ uri: "https://chatbuck.com/wp-content/uploads/2023/02/cropped-CHATBUCK-LOGOS-16-150x150.png" }} style={styles.LogoImage} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { height: windoHeight / 1.6 }]}>
                        <View>
                            <Text style={[styles.modalText, { fontSize: 30 }]}>Forgot Password</Text>
                        </View>
                        <View style={styles.InputView}>
                            <Text style={styles.TextLabel}>Email</Text>
                            <TextInput placeholder='Email' style={styles.InputText} />
                        </View>
                        <TouchableOpacity style={styles.LogInBtn}>
                            <Text style={styles.LogInBtnText}>Send Link</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.ForgotPassView, { marginHorizontal: 60, borderRadius: 7, paddingVertical: 5 }]} onPress={() => navigation.navigate('SignIn')}>
                            <Text style={[styles.ForgotPassViewText, { fontSize: 17 }]}>Back to Sign In?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
            {/* </ImageBackground> */}
        </View >
    )
}

export default ForgotPassword