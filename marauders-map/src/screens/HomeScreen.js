import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Video from 'react-native-af-video-player';

import Colors from '../constants/Colors';
import FloorPlan from '../components/floorPlan/FloorPlan';

const video = require('../../assets/videos/intro.mp4');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContainer: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FloorPlan />
                <Video url={video} />
            </ScrollView>
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};
