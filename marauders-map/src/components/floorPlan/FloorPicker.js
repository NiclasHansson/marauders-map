import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';

import Colors from '../../constants/Colors';

const ITEM_WIDTH = 100;
const floors = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export const FloorPicker = () => {
    const [selected, setSelected] = React.useState(6);
    const scrollViewRef = React.useRef(null);

    React.useEffect(() => {
        scrollViewRef.current.scrollTo({
            x: selected * ITEM_WIDTH - Dimensions.get('window').width / 2 + ITEM_WIDTH / 2,
        });
    }, [selected]);

    return (
        <ScrollView ref={scrollViewRef} style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
            {floors.map((floor, index) => (
                <TouchableOpacity
                    key={`floor-${floor}-${index}`}
                    onPress={() => setSelected(index)}
                    style={index === selected ? { ...styles.button, ...styles.selected } : styles.button}
                >
                    <Text style={styles.upperText}>Floor</Text>
                    <Text style={styles.lowerText}>{floor}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

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
        width: ITEM_WIDTH,
        minWidth: ITEM_WIDTH,
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

export default FloorPicker;
