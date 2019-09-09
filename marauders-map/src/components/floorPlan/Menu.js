import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 0,
        width: '95%',
        height: '72%',
        bottom: 0,
        //Below lines will help to set the border radius
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 20,
        position: 'absolute',
        zIndex: 0,
    },
    containerInner: {
        zIndex: 1,
        position: 'relative',
        // marginTop: 0,
        opacity: 0.9,
        bottom: 0,
    },
    titleContainer: {
        //display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 10,
        maxHeight: 50,
        minWidth: 100,
        marginTop: 10,
        marginBottom: 80,
    },
    wrapper: {
        flex: 1,
        bottom: 0,
        width: '100%',
    },

    stretch: {
        width: 25,
        height: 25,
        resizeMode: 'stretch',
        marginRight: 5,
    },

    header: {
        fontSize: 36,
        fontWeight: '400',
        fontFamily: 'kelly-slab',
        color: Colors.primary,
        textAlign: 'center',
    },
    rumDetails: {
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        marginBottom: 30,

        marginBottom: 25,
        paddingVertical: 5,
    },
    upperText: {
        fontSize: 20,
        fontFamily: 'kelly-slab',
        color: Colors.text,
        marginTop: 5,
    },
    closeContainer: {
        position: 'absolute',
        right: -30,
        top: 4,
    },
});

const roomDetails = [
    {
        label: 'Alta',
        people: ' 3 people',
        value: 1,
        image: <Image style={styles.stretch} source={require('../../../assets/images/error.png')} />,
    },
    {
        label: 'Room XXX',
        people: ' 4 Personer',
        value: 2,
        image: <Image style={styles.stretch} source={require('../../../assets/images/robot-dev.png')} />,
    },
    {
        label: 'Room XXX',
        people: ' 3 people',
        value: 3,
        image: <Image style={styles.stretch} source={require('../../../assets/images/robot-dev.png')} />,
    },
    {
        label: 'Room XXX',
        people: ' 6 people',
        value: 4,
        image: <Image style={styles.stretch} source={require('../../../assets/images/robot-dev.png')} />,
    },
];

export const Menu = ({ onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <View style={styles.titleContainer}>
                    <Text style={styles.header}>Alta</Text>
                    <View style={styles.closeContainer}>
                        <TouchableOpacity onPress={onClose}>
                            <Image style={styles.stretch} source={require('../../../assets/images/error.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <View style={styles.rumDetails}>
                        <Image style={styles.stretch} source={require('../../../assets/images/size.png')} />
                        <View>
                            <Text style={styles.upperText}> 4 personer </Text>
                        </View>
                    </View>

                    <View style={styles.rumDetails}>
                        <Image style={styles.stretch} source={require('../../../assets/images/video.png')} />
                        <View>
                            <Text style={styles.upperText}> VideoUtrustning för Skype </Text>
                        </View>
                    </View>
                    <View style={styles.rumDetails}>
                        <Image style={styles.stretch} source={require('../../../assets/images/tv.png')} />
                        <View>
                            <Text style={styles.upperText}> TV </Text>
                        </View>
                    </View>
                    <View style={styles.rumDetails}>
                        <Image style={styles.stretch} source={require('../../../assets/images/other.png')} />
                        <View>
                            <Text style={styles.upperText}> More... </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Menu;
