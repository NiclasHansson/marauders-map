import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        resizeMode: 'contain',
    },
    dot: {
        position: 'absolute',
        width: 13,
        height: 13,
        borderRadius: 100,
        marginRight: 15,
    },
    meeting: {
        backgroundColor: Colors.meeting,
    },
    bathroom: {
        backgroundColor: Colors.bathroom,
    },
    stairway: {
        backgroundColor: Colors.stairway,
    },
    kitchen: {
        backgroundColor: Colors.kitchen,
    },
    printer: {
        backgroundColor: Colors.printer,
    },
    teamroom: {
        backgroundColor: Colors.teamroom,
    },
});

const getLocationStyle = type => {
    switch (type) {
        case 'meeting':
            return { ...styles.dot, ...styles.meeting };
        case 'teamroom':
            return { ...styles.dot, ...styles.teamroom };
        case 'bathroom':
            return { ...styles.dot, ...styles.bathroom };
        case 'stairway':
            return { ...styles.dot, ...styles.stairway };
        case 'kitchen':
            return { ...styles.dot, ...styles.kitchen };
        case 'printer':
            return { ...styles.dot, ...styles.printer };
        default:
            return styles.dot;
    }
};

let start = true;

export const Map = ({ onRoomPress, rooms, selected }) => {
    const [translateValue] = useState(new Animated.ValueXY({ x: 50, y: -60 }));

    if (start) {
        Animated.loop(
            Animated.sequence([
                Animated.timing(translateValue, {
                    toValue: { x: 300, y: -60 },
                    duration: 20000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: { x: 50, y: -60 },
                    duration: 10000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: { x: 180, y: 80 },
                    duration: 15000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: { x: 210, y: 80 },
                    duration: 5000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: { x: 210, y: -60 },
                    duration: 15000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateValue, {
                    toValue: { x: 50, y: -60 },
                    duration: 10000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
        start = false;
    }

    const translateTransform = translateValue.getTranslateTransform();

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/images/mapxxxhdpi.png')} />
            {rooms.map(
                ({ coordinates, label, type }) =>
                    (label === selected ||
                        selected === 'All' ||
                        (selected === 'Printer' && type == 'printer') ||
                        (selected === 'Bathroom' && type == 'bathroom')) && (
                        <TouchableOpacity
                            onPress={onRoomPress}
                            key={`loc-${coordinates}-${label}`}
                            style={{
                                ...getLocationStyle(type),
                                left: `${coordinates[0]}%`,
                                top: `${coordinates[1]}%`,
                            }}
                        />
                    )
            )}
            {rooms && rooms.length && rooms[0].floor === 8 && (
                <Animated.View
                    key={`loc-asa`}
                    style={{
                        ...styles.dot,
                        backgroundColor: 'red',
                        transform: translateTransform,
                    }}
                />
            )}
        </View>
    );
};

Map.propTypes = {
    rooms: PropTypes.array,
    selected: PropTypes.string,
    onRoomPress: PropTypes.func,
};

export default Map;
