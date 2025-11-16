// src/components/CategorySelector.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

type Props = {
  categories: string[];
  selected?: string | null;
  onSelect: (cat: string | null) => void;
};

export default function CategorySelector({ categories, selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
        <TouchableOpacity style={[styles.chip, selected === null && styles.active]} onPress={() => onSelect(null)}>
          <Text style={[styles.chipText, selected === null && styles.activeText]}>Tất cả</Text>
        </TouchableOpacity>

        {categories.map(cat => (
          <TouchableOpacity key={cat} style={[styles.chip, selected === cat && styles.active]} onPress={() => onSelect(cat)}>
            <Text style={[styles.chipText, selected === cat && styles.activeText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#eee', marginRight: 8 },
  chipText: { color: '#333' },
  active: { backgroundColor: '#E91E63' },
  activeText: { color: '#fff' },
});
