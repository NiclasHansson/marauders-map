import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';

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

export const Map = ({ onRoomPress, rooms, selected }) => {
    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={require('../../../assets/images/mapxxxhdpi.png')}
            />
            {rooms.map(
                ({ coordinates, label, type }) =>
                    (selected === label ||
                        selected === 'All' ||
                        (selected === 'Printers' && type == 'printer') ||
                        (selected === 'Bathrooms' && type == 'bathroom')) && (
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: Dimensions.get('window').width - 20,
        height: (Dimensions.get('window').width - 20) / 1.39,
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

Map.propTypes = {
    location: PropTypes.shape({ lat: PropTypes.number, long: PropTypes.number }).isRequired,
    rooms: PropTypes.array,
    selected: PropTypes.string,
    onRoomPress: PropTypes.func,
};

export default Map;
