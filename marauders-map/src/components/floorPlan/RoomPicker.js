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
    //{
    //    label: 'Elevator/Staircase',
    //    value: 0,
    //    color: roomColors[0 % roomColors.length],
    //    size: 0,
    //},
    {
        floor: 7,
        label: "Alp d'Huez",
        value: 1,
        color: roomColors[1 % roomColors.length],
        type: 'meeting',
        coordinates: [35, 10],
    },
    {
        floor: 7,
        label: 'Alta',
        value: 2,
        color: roomColors[2 % roomColors.length],
        type: 'meeting',
        coordinates: [25, 10],
    },
    {
        floor: 8,
        label: 'Aspen',
        value: 3,
        color: roomColors[3 % roomColors.length],
        type: 'meeting',
        coordinates: [15, 10],
        data: {
            name: 'Aspen',
            size: 8,
        },
    },
    {
        floor: 8,
        label: 'Chamonix',
        value: 4,
        color: roomColors[4 % roomColors.length],
        type: 'meeting',
        coordinates: [45, 10],
    },
];

//export const RoomsOnFloor = (selectedFloor) => {
//    return result = rooms.filter(room => floor = selectedFloor);
//}

////{rooms.map(({ color, label, value }, index) => (
export const RoomPicker = () => {
    const [selected, setSelected] = useState(0);

    return (
        
        <View style={styles.picker}>
            <Text>Hej {currentFloor}</Text>
            <LinearGradient
                style={{ ...styles.fade, ...styles.fadeUpper }}
                colors={['rgba(251, 250, 249, 1)', 'rgba(251, 250, 249, 0)']}
                pointerEvents={'none'}
            />
            
            <ScrollView selectedValue={selected} showsVerticalScrollIndicator={false}>
                {(rooms.filter(room => room.floor == currentFloor)).map(({ color, label, value }, index) => (
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
