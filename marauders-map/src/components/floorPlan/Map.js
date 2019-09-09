import React from 'react';
import PropTypes from 'prop-types';
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

export const Map = ({ rooms, selected }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/images/mapxxxhdpi.png')} />
            {rooms.map(
                ({ coordinates, label, type }) =>
                    (label === selected || selected === 'All') && (
                        <View
                            key={`loc-${coordinates}`}
                            style={{
                                ...getLocationStyle(type),
                                left: `${coordinates[0]}%`,
                                top: `${coordinates[1]}%`,
                            }}
                        />
                    )
            )}
        </View>
    );
};

Map.propTypes = {
    rooms: PropTypes.array,
    selected: PropTypes.string,
};

export default Map;
