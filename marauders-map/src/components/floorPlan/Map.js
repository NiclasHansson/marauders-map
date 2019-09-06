import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        resizeMode: 'center',
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
});

const locations = [
    {
        type: 'meeting',
        coordinates: [15, 10],
        data: {
            name: 'Aspen',
            size: 8,
        },
    },
    {
        type: 'bathroom',
        coordinates: [20, 30],
        data: {},
    },
    {
        type: 'stairway',
        coordinates: [70, 25],
        data: {},
    },
    {
        type: 'kitchen',
        coordinates: [35, 65],
        data: {},
    },
];

const getLocationStyle = type => {
    switch (type) {
        case 'meeting':
            return { ...styles.dot, ...styles.meeting };
        case 'bathroom':
            return { ...styles.dot, ...styles.bathroom };
        case 'stairway':
            return { ...styles.dot, ...styles.stairway };
        case 'kitchen':
            return { ...styles.dot, ...styles.kitchen };
        default:
            return styles.dot;
    }
};

export const Map = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/images/mapxxxhdpi.png')} />
            {locations.map(({ type, coordinates }) => (
                <View
                    key={`loc-${coordinates}`}
                    style={{ ...getLocationStyle(type), left: `${coordinates[0]}%`, top: `${coordinates[1]}%` }}
                />
            ))}
        </View>
    );
};

export default Map;
