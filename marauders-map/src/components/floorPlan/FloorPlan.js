import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Colors from '../../constants/Colors';
import FloorPicker from './FloorPicker';
import Map from './Map';
import RoomPicker from './RoomPicker';

class FloorPlan extends Component {
    state = {
        currentFloor: 7,
    }

    handleFloorChange(floor) {
        console.log('handleFloorChange is starting');
        console.log('floor=' + floor);
        const newState = Object.assign(
            {
                currentFloor: floor,
            },
        )
        this.setState(newState);
    } 
    
    render() {
        const { currentFloor } = this.state
        console.log('render floorplan floor=' + currentFloor);
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>Torsgatan 14</Text>
                    <View style={styles.mapContainer}>
                        <View style={styles.map}>
                            <Map currentFloor={{ currentFloor }} />
                        </View>
                    </View>
                    <View style={styles.roomPicker}>
                        <RoomPicker currentFloor={{ currentFloor }} />
                    </View>
                </View>
                <View style={styles.floorPicker}>
                    <FloorPicker currentFloor={{ currentFloor }}
                        handleFloorChange={this.handleFloorChange} />
                </View>
            </View>
        );
    };
}

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
});



export default FloorPlan;
