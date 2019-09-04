import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 100,
    },
    header: {
        fontSize: 24,
    },
});

export const FloorPlan = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Torsgatan 14</Text>
        </View>
    );
};

export default FloorPlan;
