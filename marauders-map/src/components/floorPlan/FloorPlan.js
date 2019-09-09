import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../constants/Colors';
import FloorPicker from './FloorPicker';
import Map from './Map';
import RoomPicker from './RoomPicker';
import Rooms from './data';
import Menu from './Menu';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        width: '90%',
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: '300',
        fontFamily: 'kelly-slab',
        color: Colors.primary,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
    },
    map: {
        height: 260,
        marginTop: 40,
    },
    mapText: {
        fontFamily: 'kelly-slab',
    },
    roomPicker: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    search: {
        width: '100%',
        height: 60,
        marginTop: 30,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 5,
        fontFamily: 'kelly-slab',
    },
    floorPicker: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    containerInner: {
        zIndex: 1,
        position: 'absolute',
        //opacity: 0.9,
    },
});

export const FloorPlan = () => {
    const eightFloor = Rooms.filter(room => room.floor === 8);
    const [selectedRoom, onSelectRoom] = useState(eightFloor[0].label);
    const [showMenu, setShowMenu] = useState(false);
    console.log('NICLAS', showMenu);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Torsgatan 14</Text>
                <View style={styles.mapContainer}>
                    <View style={styles.map}>
                        <Map rooms={eightFloor} selected={selectedRoom} onRoomPress={() => setShowMenu(true)} />
                    </View>
                </View>
                <View style={styles.roomPicker}>
                    <RoomPicker onSelect={onSelectRoom} rooms={eightFloor} selected={selectedRoom} />
                </View>
            </View>

            <View style={styles.floorPicker}>
                <FloorPicker />
            </View>
            {showMenu && <Menu onClose={() => setShowMenu(false)} />}
        </View>
    );
};

export default FloorPlan;
