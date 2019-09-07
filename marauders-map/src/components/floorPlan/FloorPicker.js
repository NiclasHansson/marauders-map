import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 3,
        marginBottom: 20,
        maxHeight: 60,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: Colors.secondary,
        borderRightWidth: 1,
        minWidth: 100,
    },
    selected: {
        borderTopColor: Colors.primary,
        borderTopWidth: 5,
    },
    upperText: {
        fontSize: 10,
        fontFamily: 'kelly-slab',
        color: Colors.text,
        marginTop: 5,
    },
    lowerText: {
        fontSize: 24,
        fontFamily: 'kelly-slab',
        color: Colors.primary,
    },
});

global.floors = [2, 3, 4, 5, 6, 7, 8, 9, 10];
global.currentFloor = 8;

export const moreThanSelected = index => event => {
    console.log('moreThanSelected is starting');
    console.log('index='+index);
    currentFloor = floors[index];
    console.log('currentFloor=' + currentFloor);
    //FloorPicker.setSelected(index);
    //useState(index);
    FloorPicker.refresh();
    // https://stackoverflow.com/questions/41794622/react-native-how-to-change-style-and-image-of-a-view-onpress
}

export const FloorPicker = () => {
    console.log('FloorPicker is rendered');
    //const [selected, setSelected] = useState(0);
    return (
        
        <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
            {floors.map((floor, index) => (
                <TouchableOpacity
                    key={`floor-${floor}`}
                    onPress={moreThanSelected(index)}
                    style={floors[index] === currentFloor ? { ...styles.button, ...styles.selected } : styles.button}
                >
                    <Text style={styles.upperText}>Floor</Text>
                    <Text style={styles.lowerText}>{floor}</Text>
                </TouchableOpacity>
            )) }
        </ScrollView>
    );
};

export default FloorPicker;
