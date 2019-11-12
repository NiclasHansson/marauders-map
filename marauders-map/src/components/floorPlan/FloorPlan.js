import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import FloorPicker from './FloorPicker';
import Map from './Map';
import RoomPicker from './RoomPicker';
import rooms from './data';
import Menu from './Menu';

export const FloorPlan = () => {
    const [showMenu, setShowMenu] = useState(false);

    const [selectedRoomLabel, setSelectedRoomLabel] = useState('');

    const onRoomPress = index => {
        setSelectedRoomIndex(index);
        setSelectedRoomLabel(filteredRooms[index] && filteredRooms[index].label);
    };

    const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
    const [filteredRooms, setFilteredRooms] = React.useState([]);
    const eightFloor = rooms.filter(room => room.floor === 8);
    React.useEffect(() => {
        let havePrinterAlready = false;
        let haveBathroomAlready = false;

        const specialRoomTypes = ['all', 'printer', 'bathroom'];
        const sortedRooms = eightFloor.sort((a, b) => {
            if (specialRoomTypes.includes(a.type) && !specialRoomTypes.includes(b.type)) {
                return -1;
            } else if (specialRoomTypes.includes(b.type) && !specialRoomTypes.includes(a.type)) {
                return 1;
            }
            return 0;
        });

        const sortedFilteredRooms = sortedRooms.filter(room => {
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
        setFilteredRooms(sortedFilteredRooms);
        setSelectedRoomLabel(sortedFilteredRooms[selectedRoomIndex] && sortedFilteredRooms[selectedRoomIndex].label);
    }, [eightFloor]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Torsgatan 14</Text>
                <View style={styles.mapContainer}>
                    <Map rooms={eightFloor} selected={selectedRoomLabel} onRoomPress={() => setShowMenu(true)} />
                </View>
                <View style={styles.roomPicker}>
                    <RoomPicker
                        onSelect={onRoomPress}
                        onReselect={() => setShowMenu(true)}
                        rooms={filteredRooms}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    content: {
        width: '100%',
        flex: 1,
        marginTop: 100,
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
        marginTop: 40,
    },
    roomPicker: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    floorPicker: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
});

export default FloorPlan;
