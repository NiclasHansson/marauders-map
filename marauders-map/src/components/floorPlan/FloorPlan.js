import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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

    const [geoLocation, setGeoLocation] = React.useState(null);
    const [prevGeoLocation, setPrevGeoLocation] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState('');
    React.useEffect(() => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMessage('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
        } else {
            getGeoLocation();
        }
    }, []);

    const getGeoLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            setErrorMessage('Permission to access location was denied');
        }

        await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 2000,
                distanceInterval: 1,
            },
            location => {
                setPrevGeoLocation(geoLocation);
                setGeoLocation(location);
            }
        );
    };

    const upperLeft = { long: 1024, lat: 6.6423 };
    const upperRight = { long: 17250, lat: 6.7476 };
    const lowerRight = { long: 20879, lat: 6.5045 };

    const omega = 26.177 * ((2 * Math.PI) / 360);
    const toPrimCoordinates = (x, y) => {
        const { radius, alpha } = toPolarCoordinates(x, y);
        const xPrim = radius * Math.cos(alpha) * Math.cos(omega) + radius * Math.sin(alpha) * Math.sin(omega);
        const yPrim = radius * Math.sin(alpha) * Math.cos(omega) - radius * Math.cos(alpha) * Math.sin(omega);
        return { x: xPrim, y: yPrim };
    };

    const toPolarCoordinates = (x, y) => {
        const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        const alpha = Math.asin(y / radius);
        return { radius, alpha };
    };

    const prim = toPrimCoordinates(upperLeft.long, upperLeft.lat);
    // console.log('UPPER LEFT', prim);
    const prim2 = toPrimCoordinates(upperRight.long, upperRight.lat);
    // console.log('UPPER RIGHT', prim2);
    const prim3 = toPrimCoordinates(lowerRight.long, lowerRight.lat);
    const diffx = prim2.x - prim.x;
    const diffy = prim3.y - prim2.y;
    console.log('UPPER diff', diffx, diffy);
    // console.log('LOWER RIGHT', prim3);
    console.log('--------------------');

    const onRoomPress = index => {
        setSelectedRoomIndex(index);
    };

    const selectedRoomLabel = roomList[selectedRoomIndex] && roomList[selectedRoomIndex].label;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>{'Torsgatan 14'}</Text>
                <View style={styles.mapContainer}>
                    <Map
                        location={{
                            lat: geoLocation && geoLocation.coords.latitude,
                            long: geoLocation && geoLocation.coords.longitude,
                        }}
                        rooms={roomData}
                        selected={selectedRoomLabel}
                        onRoomPress={() => true}
                    />
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
