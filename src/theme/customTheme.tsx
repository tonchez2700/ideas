import { StyleSheet } from 'react-native';

export const colors = {
    black: '#23233C',
    blue: '#23233C',
    info: '#8D8D8D',
    primary: '#005691',
    secondary: '#00A558',
    transparent: 'transparent',
    white: '#FFFFFF',

    black_opacity: 'rgba(35, 35, 60, 0.5)',
    secondary_opacity: 'rgba(0, 165, 88, 0.8)',
    gray_opacity: '#707070',
    gray_light: '#51515150',

    opacity: 0.7,
}

export const general = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    backgroundImage: {
        height: 450,
        position: 'relative',
        width: '100%',
    },
    bg_opacity: {
        backgroundColor: colors.white,
        flex: 1,
        opacity: 0.95,
    },
    global_margin: {
        paddingHorizontal: 20,
    },
    padding: {
        padding: 10
    },
    paddingHorizontal: {
        paddingHorizontal: 10
    },
    paddingVertical: {
        paddingVertical: 10
    },
    margin: {
        margin: 10
    },
    marginTop: {
        marginTop: 10,
    },
    marginBottom: {
        marginBottom: 10,
    },
    marginHorizontal: {
        marginHorizontal: 10,
    },
    marginVertical: {
        marginVertical: 10,
    },
    fullScreen: {
        flex: 1
    },
    formContainer: {
        backgroundColor: colors.transparent,
        flex: 1,
        height: 600,
        justifyContent: 'center',
        marginBottom: 20,
    },
    subtitle_public: {
        color: colors.black,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 3,
        marginTop: 30,
        textAlign: 'center',
    },
    subtitle: {
        color: colors.black,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 24,
        textAlign: 'center',
    },
    label: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 9,
    },
    data_text: {
        color: colors.black,
        fontSize: 15,
        marginTop: 6,
        textAlign: 'center',
    },
    datagreen_text: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: 'center',
    },
    info_text: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: colors.info,
        flexDirection: 'row',
        fontSize: 15,
        justifyContent: 'center',
        marginVertical: 6,
        textAlign: 'center',
    },
    img_fluid: {
        width: '100%',
    },
})

export const public_screens = StyleSheet.create({
    container_view: {
        padding: 10,
    },
    image_view: {
        alignSelf: 'center',
        width: '70%',
    },
    title_view: {
        color: colors.black,
        fontSize: 40,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    subtitle_view: {
        color: colors.black,
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    subtitle_info: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'right',
    },
    link: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    text_view: {
        color: colors.black,
        fontSize: 13,
    },
})

export const private_screens = StyleSheet.create({
    container_view: {
        backgroundColor: colors.white,
        padding: 10,
    },
    image_view: {
        alignSelf: 'center',
        width: '70%',
    },
    title_view: {
        color: colors.black,
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle_view: {
        color: colors.black,
        fontSize: 14,
        fontWeight: 'bold',
    },
    text_view: {
        color: colors.black,
        fontSize: 14,
    },
})