import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Colors from '../../constants/Colors';
import FloorPicker from './FloorPicker';
import RoomPicker from './RoomPicker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        width: '90%',
        marginTop: 150,
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: '300',
        fontFamily: 'kelly-slab',
        color: Colors.primary,
    },
    map: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
});

export const FloorPlan = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Torsgatan 14</Text>
                <View style={styles.map}>
                    <Text style={styles.mapText}>Map goes here.....</Text>
                </View>
                <View style={styles.roomPicker}>
                    <RoomPicker />
                </View>
                <TextInput style={styles.search} value="Search" />
            </View>
            <View style={styles.floorPicker}>
                <FloorPicker />
            </View>
        </View>
    );
};

export default FloorPlan;
