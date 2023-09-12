import { StyleSheet, Dimensions } from 'react-native';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    MainView: {
        backgroundColor: "white",
        width: windoWidth,
        height: windoHeight
    },
    BackGImg: {
        width: windoWidth,
        height: windoHeight
    },
    LogoImage: {
        width: 160,
        height: 160,
        backgroundColor: "white",
        borderRadius: 20
    },
    LogoView: {
        justifyContent: "center",
        // borderWidth: 1,
        borderColor: 'white',
        height: windoHeight / 3,
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        position: "absolute",
        width: windoWidth,
        bottom: 0
    },
    modalView: {
        backgroundColor: '#1081AF',
        borderTopRightRadius: 70,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: windoWidth,
        height: windoHeight / 1.7
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontWeight: "800",
        color: "white",
        fontSize: 40
    },
    InputView: {
        marginHorizontal: 10,
        paddingVertical: 20
    },
    InputText: {
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: "#D5D8D2",
        paddingHorizontal: 10
    },
    TextLabel: {
        color: "white",
        marginLeft: 3
    },
    LogInBtn: {
        backgroundColor: "#042F57",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 8
    },
    LogInBtnText: {
        color: "white"
    },
    ForgotPassView: {
        alignItems: "center",
        marginTop: 30
    },
    ForgotPassViewText: {
        fontWeight: "800",
        color: "white"
    }
})
export default styles;