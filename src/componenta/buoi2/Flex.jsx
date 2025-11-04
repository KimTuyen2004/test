import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Flex() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>Section 1</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Section 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  section: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

