import {Dimensions, StyleSheet} from 'react-native'

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export default StyleSheet.create({
    max: {
        flex: 1,
    },
    buttonHolder: {
        // position:'absolute',
        height: 100,
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    customButtonHolder:{
        width: dimensions.width,
        height: dimensions.height - 100,
        position:'absolute',
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    customButton:{
        position:'relative',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    button: {
        // position:'absolute',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height - 100,
    },
    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5
    },
    remote: {
        width: 150,
        height: 150,
        marginHorizontal: 2.5
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9',
    },
})
