import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import FloorPicker from './FloorPicker';
import Map from './Map';
import RoomPicker from './RoomPicker';

import roomData from './data';

export const FloorPlan = () => {
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
    const [roomList, setRoomList] = React.useState([]);

    React.useEffect(() => {
        let havePrinterAlready = false;
        let haveBathroomAlready = false;

        const specialRoomTypes = ['all', 'printer', 'bathroom'];
        const roomList = roomData
            .sort((a, b) => {
                if (specialRoomTypes.includes(a.type) && !specialRoomTypes.includes(b.type)) {
                    return -1;
                } else if (specialRoomTypes.includes(b.type) && !specialRoomTypes.includes(a.type)) {
                    return 1;
                }
                return 0;
            })
            .filter(room => {
                if (room.type === 'printer') {
                    if (!havePrinterAlready) {
                        havePrinterAlready = true;
                        return true;
                    }
                } else if (room.type === 'bathroom') {
                    if (!haveBathroomAlready) {
                        haveBathroomAlready = true;
                        return true;
                    }
                } else {
                    return true;
                }
            }, []);
        setRoomList(roomList);
    }, []);

    const onRoomPress = index => {
        setSelectedRoomIndex(index);
    };

    const selectedRoomLabel = roomList[selectedRoomIndex] && roomList[selectedRoomIndex].label;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>{'Torsgatan 14'}</Text>
                <View style={styles.mapContainer}>
                    <Map rooms={roomData} selected={selectedRoomLabel} onRoomPress={() => true} />
                </View>
                <View style={styles.roomPicker}>
                    <RoomPicker
                        onSelect={onRoomPress}
                        onReselect={() => true}
                        rooms={roomList}
                        selected={selectedRoomIndex}
                    />
                </View>
            </View>
            <View style={styles.floorPicker}>
                <FloorPicker />
            </View>
        </View>
    );
};

const isIphoneX = () => {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return Platform.OS === 'ios' && (height >= 812 || width >= 812);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        width: '100%',
        flex: 1,
        marginTop: isIphoneX() ? 100 : 40,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: '300',
        fontFamily: 'kelly-slab',
        color: Colors.primary,
    },
    mapContainer: {
        width: '100%',
        marginTop: 30,
    },
    roomPicker: {
        flex: 1,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
    },
    floorPicker: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
});

export default FloorPlan;
