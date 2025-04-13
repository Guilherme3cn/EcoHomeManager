import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#e0f5e8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    registerBox: {
        backgroundColor: '#e0f5e8',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    label: {
        marginTop: 10,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#FFFAFA',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#00C853',
        borderRadius: 8,
        padding: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#555',
    },
    registerLink: {
        color: '#00C853',
        fontWeight: 'bold',
    },
});


export default styles;