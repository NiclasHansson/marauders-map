import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    picker: {
        maxHeight: 170,
        width: '90%',
    },
    room: {
        height: 60,
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
        color: Colors.primary,
    },
});

const colorHexes = ['0', '2', '4', '6', '8', 'a', 'c', 'e'];
const rooms = [
    {
        label: 'Elevator/Staircase',
        value: 0,
        color: `#${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}${
            colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]
        }${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}`,
    },
    {
        label: "Alp d'Huez",
        value: 1,
        color: `#${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}${
            colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]
        }${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}`,
    },
    {
        label: 'Alta',
        value: 2,
        color: `#${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}${
            colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]
        }${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}`,
    },
    {
        label: 'Aspen',
        value: 3,
        color: `#${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}${
            colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]
        }${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}`,
    },
    {
        label: 'Chamonix',
        value: 4,
        color: `#${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}${
            colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]
        }${colorHexes[Math.floor(Math.random() * 10) % colorHexes.length]}`,
    },
];

export const RoomPicker = () => {
    const [selected, setSelected] = useState(0);

    return (
        <ScrollView selectedValue={selected} style={styles.picker}>
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
    );
};

export default RoomPicker;
