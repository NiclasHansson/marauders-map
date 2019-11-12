import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';

const ITEM_HEIGHT = 60;

const getColor = type => {
    switch (type) {
        case 'meeting':
            return Colors.meeting;
        case 'teamroom':
            return Colors.teamroom;
        case 'bathroom':
            return Colors.bathroom;
        case 'kitchen':
            return Colors.kitchen;
        case 'stairway':
            return Colors.stairway;
        case 'printer':
            return Colors.printer;
        default:
            return Colors.meeting;
    }
};

export const RoomPicker = ({ onSelect, onReselect, rooms, selected }) => {
    const [continerHeight, setContinerHeight] = React.useState(0);
    const scrollViewRef = React.useRef(null);

    React.useEffect(() => {
        scrollViewRef.current.scrollTo({
            y: (selected + 0.5) * ITEM_HEIGHT - continerHeight / 2,
        });
    }, [selected]);

    return (
        <View onLayout={e => setContinerHeight(e.nativeEvent.layout.height)} style={styles.picker}>
            <LinearGradient
                style={{ ...styles.fade, ...styles.fadeUpper }}
                colors={['rgba(251, 250, 249, 1)', 'rgba(251, 250, 249, 0)']}
                pointerEvents={'none'}
            />
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                {rooms.map(({ label, type }, index) => (
                    <TouchableOpacity
                        key={`room-${label}-${index}`}
                        style={rooms.length === index + 1 ? { ...styles.room, ...styles.lastRoom } : styles.room}
                        onPress={() => (selected === index ? onReselect() : onSelect(index))}
                    >
                        <View style={styles.nameContainer}>
                            <View style={{ ...styles.colorBall, backgroundColor: getColor(type) }} />
                            <Text style={styles.roomName}>{label}</Text>
                        </View>
                        {selected === index && (
                            <Image style={styles.image} source={require('../../../assets/images/check.png')} />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <LinearGradient
                style={{ ...styles.fade, ...styles.fadeLower }}
                colors={['rgba(251, 250, 249, 0)', 'rgba(251, 250, 249, 1)']}
                pointerEvents={'none'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    picker: {
        width: '90%',
        position: 'relative',
    },
    fade: {
        width: '100%',
        height: ITEM_HEIGHT / 2,
        position: 'absolute',
        zIndex: 1,
    },
    fadeUpper: {
        top: 0,
    },
    fadeLower: {
        bottom: 0,
    },
    room: {
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lastRoom: {
        borderBottomWidth: 0,
    },
    colorBall: {
        width: 13,
        height: 13,
        borderRadius: 100,
        marginRight: 15,
    },
    roomName: {
        fontSize: 20,
        fontFamily: 'kelly-slab',
        color: Colors.primary,
    },
    image: {
        resizeMode: 'contain',
        width: 16,
        marginRight: 15,
    },
});

RoomPicker.propTypes = {
    onSelect: PropTypes.func,
    onReselect: PropTypes.func,
    rooms: PropTypes.array,
    selected: PropTypes.number,
};

export default RoomPicker;
