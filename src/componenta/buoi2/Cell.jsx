import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Cell() {
  const colors = [
    '#FF6B6B', '#FFD93D', '#6BCB77',
    '#4D96FF', '#c7141aff', '#9D4EDD',
    '#00B4D8', '#F15BB5', '#FF9F1C'
  ];


  return (
    <View style={styles.container}>
      {colors.map((color, index) => (
        <View key={index} style={[styles.cell, { backgroundColor: color }]}> 
          <Text style={styles.text}>Box {index + 1}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#947d7dff',
    padding: 10,
  },
  cell: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#65cc76ff',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
});