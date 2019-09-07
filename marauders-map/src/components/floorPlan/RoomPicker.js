import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';

const itemHeight = 60;
const styles = StyleSheet.create({
    picker: {
        maxHeight: 170,
        width: '90%',
        position: 'relative',
    },
    fade: {
        width: '100%',
        height: itemHeight / 2,
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
        height: itemHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary,
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
});

const roomColors = [Colors.bathroom, Colors.meeting, '#bcd4e0'];
global.rooms = [
    {
        label: 'Elevator/Staircase',
        floor: 8,
        value: 0,
        type: 'stairway',
        coordinates: [70, 25],
        color: roomColors[0 % roomColors.length],
        data: {},
    },
    {
        label: "Alp d'Huez",
        floor: 8,
        value: 1,
        type: 'meeting',
        coordinates: [25, 10],
        color: roomColors[1 % roomColors.length],
        data: {
            name: "Alp d'Huez",
            size: 2,
        },
    },
    {
        label: 'Alta',
        floor: 8,
        value: 2,
        type: 'meeting',
        coordinates: [35, 10],
        color: roomColors[2 % roomColors.length],
        data: {
            name: 'Alta',
            size: 4,
        },
    },
    {
        label: 'Aspen',
        floor: 8,
        value: 3,
        type: 'meeting',
        coordinates: [15, 10],
        color: roomColors[3 % roomColors.length],
        data: {
            name: 'Aspen',
            size: 8,
        },
    },
    {
        label: 'Chamonix',
        floor: 8,
        value: 4,
        type: 'meeting',
        coordinates: [45, 10],
        color: roomColors[4 % roomColors.length],
        data: {
            name: 'Chamonix',
            size: 14,
        },
    },
    {
        label: 'bathroom1',
        floor: 8,
        value: 5,
        type: 'bathroom',
        coordinates: [20, 30],
        color: roomColors[5 % roomColors.length],
        data: {},
    },
    {
        label: 'fika1',
        floor: 8,
        value: 6,
        type: 'kitchen',
        coordinates: [35, 65],
        color: roomColors[6 % roomColors.length],
        data: {},
    },
];

export const RoomPicker = () => {
    const [selected, setSelected] = useState(0);

    return (
        <View style={styles.picker}>
            <LinearGradient
                style={{ ...styles.fade, ...styles.fadeUpper }}
                colors={['rgba(251, 250, 249, 1)', 'rgba(251, 250, 249, 0)']}
                pointerEvents={'none'}
            />
            <ScrollView selectedValue={selected} showsVerticalScrollIndicator={false}>
                {rooms.map(({ color, label, value }, index) => (
                    <TouchableOpacity
                        key={`room-${value}`}
                        style={rooms.length === index + 1 ? { ...styles.room, ...styles.lastRoom } : styles.room}
                        onPress={() => setSelected(value)}
                    >
                        <View style={{ ...styles.colorBall, backgroundColor: color }} />
                        <Text style={styles.roomName}>{label}</Text>
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

export default RoomPicker;
