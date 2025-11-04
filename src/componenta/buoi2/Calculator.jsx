import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Single-file React Native BMI Calculator
// Usage: paste into a React Native project (Expo or bare RN) as App.js or another screen file.

export default function App() {
  const [height, setHeight] = useState(''); // user input for height (number)
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' or 'm'
  const [weight, setWeight] = useState(''); // user input for weight (number)
  const [weightUnit, setWeightUnit] = useState('kg'); // 'kg' or 'lb'
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [advice, setAdvice] = useState('');

  const parseNumber = (value) => {
    if (!value) return NaN;
    // allow comma or dot as decimal
    const normalized = value.replace(',', '.');
    return parseFloat(normalized);
  };

  const toMeters = (rawHeight, unit) => {
    const h = parseNumber(rawHeight);
    if (isNaN(h) || h <= 0) return NaN;
    if (unit === 'cm') return h / 100;
    if (unit === 'm') return h;
    return NaN;
  };

  const toKg = (rawWeight, unit) => {
    const w = parseNumber(rawWeight);
    if (isNaN(w) || w <= 0) return NaN;
    if (unit === 'kg') return w;
    if (unit === 'lb') return w * 0.45359237;
    return NaN;
  };

  const classifyBMI = (val) => {
    if (val < 18.5) return { label: 'Underweight', color: styles.underweight, detail: 'You are underweight. Consider a nutrition plan to gain healthy weight.' };
    if (val < 25) return { label: 'Normal weight', color: styles.normal, detail: 'Great — your BMI is within the normal range. Keep balanced diet and exercise.' };
    if (val < 30) return { label: 'Overweight', color: styles.overweight, detail: 'You are overweight. Consider a balanced calorie plan and increase physical activity.' };
    return { label: 'Obese', color: styles.obese, detail: 'BMI in obese range. Consider consulting a health professional for a personalized plan.' };
  };

  const calculate = () => {
    const m = toMeters(height, heightUnit);
    const kg = toKg(weight, weightUnit);
    if (isNaN(m) || isNaN(kg) || m <= 0 || kg <= 0) {
      setBmi(null);
      setCategory('');
      setAdvice('Please enter valid positive numbers for height and weight.');
      return;
    }

    const value = kg / (m * m);
    const rounded = Math.round(value * 10) / 10; // 1 decimal place
    setBmi(rounded);

    const classif = classifyBMI(rounded);
    setCategory(classif.label);
    setAdvice(classif.detail);

    // compute ideal weight range based on WHO normal BMI 18.5-24.9
    const minW = Math.round(18.5 * m * m * 10) / 10;
    const maxW = Math.round(24.9 * m * m * 10) / 10;

    if (rounded < 18.5) {
      const gain = Math.round((minW - kg) * 10) / 10;
      setAdvice((prev) => `${classif.detail} Your ideal weight range is ${minW} kg - ${maxW} kg. You may consider gaining ~${gain} kg to reach the healthy range.`);
    } else if (rounded >= 25) {
      const lose = Math.round((kg - maxW) * 10) / 10;
      setAdvice((prev) => `${classif.detail} Your ideal weight range is ${minW} kg - ${maxW} kg. You may consider losing ~${lose} kg to reach the healthy range.`);
    } else {
      setAdvice((prev) => `${classif.detail} Your ideal weight range is ${minW} kg - ${maxW} kg. Keep it up!`);
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setAdvice('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>BMI Calculator</Text>

          <Text style={styles.label}>Height</Text>
          <View style={styles.row}> 
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={heightUnit === 'cm' ? 'e.g. 170' : 'e.g. 1.7'}
              value={height}
              onChangeText={setHeight}
            />

            <View style={styles.unitGroup}>
              <TouchableOpacity onPress={() => setHeightUnit('cm')} style={[styles.unitBtn, heightUnit === 'cm' && styles.unitBtnActive]}>
                <Text style={styles.unitText}>cm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setHeightUnit('m')} style={[styles.unitBtn, heightUnit === 'm' && styles.unitBtnActive]}>
                <Text style={styles.unitText}>m</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>Weight</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={weightUnit === 'kg' ? 'e.g. 65' : 'e.g. 143'}
              value={weight}
              onChangeText={setWeight}
            />

            <View style={styles.unitGroup}>
              <TouchableOpacity onPress={() => setWeightUnit('kg')} style={[styles.unitBtn, weightUnit === 'kg' && styles.unitBtnActive]}>
                <Text style={styles.unitText}>kg</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setWeightUnit('lb')} style={[styles.unitBtn, weightUnit === 'lb' && styles.unitBtnActive]}>
                <Text style={styles.unitText}>lb</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.button} onPress={calculate}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
              <Text style={[styles.buttonText, styles.resetText]}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Result</Text>
            {bmi === null ? (
              <Text style={styles.resultEmpty}>No result yet. Enter values and press Calculate.</Text>
            ) : (
              <View style={styles.resultInner}>
                <Text style={styles.bmiValue}>{bmi}</Text>
                <Text style={[styles.bmiCategory, category === 'Normal weight' ? styles.normal : category === 'Overweight' ? styles.overweight : category === 'Obese' ? styles.obese : styles.underweight]}>
                  {category}
                </Text>
                <Text style={styles.advice}>{advice}</Text>
              </View>
            )}
          </View>

          <View style={styles.legend}>
            <Text style={styles.legendTitle}>Legend (WHO)</Text>
            <Text>Underweight: &lt; 18.5</Text>
            <Text>Normal: 18.5 - 24.9</Text>
            <Text>Overweight: 25 - 29.9</Text>
            <Text>Obese: ≥ 30</Text>
          </View>

          <Text style={styles.footer}>Built with ❤️ — React Native</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F8' },
  container: { padding: 20, alignItems: 'stretch', paddingBottom: 60 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, backgroundColor: '#FFF' },
  unitGroup: { marginLeft: 10, flexDirection: 'column' },
  unitBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', marginBottom: 6, backgroundColor: '#FFF' },
  unitBtnActive: { backgroundColor: '#E6F4EA', borderColor: '#9ED7A6' },
  unitText: { fontWeight: '600' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, backgroundColor: '#2E86AB', padding: 14, borderRadius: 12, alignItems: 'center', marginRight: 8 },
  resetButton: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CCC', marginRight: 0 },
  buttonText: { color: '#FFF', fontWeight: '700' },
  resetText: { color: '#333' },
  resultBox: { marginTop: 24, padding: 16, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE' },
  resultLabel: { fontWeight: '700', marginBottom: 8 },
  resultEmpty: { color: '#666' },
  resultInner: { alignItems: 'center' },
  bmiValue: { fontSize: 48, fontWeight: '800' },
  bmiCategory: { marginTop: 6, fontSize: 18, fontWeight: '700', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999 },
  advice: { marginTop: 10, textAlign: 'center', color: '#444' },
  legend: { marginTop: 18, backgroundColor: '#FFF', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#EEE' },
  legendTitle: { fontWeight: '700', marginBottom: 6 },
  footer: { marginTop: 24, textAlign: 'center', color: '#888' },

  // color styles for categories (applied to text backgrounds)
  underweight: { backgroundColor: '#F0F4FF' },
  normal: { backgroundColor: '#E6F4EA' },
  overweight: { backgroundColor: '#FFF4E5' },
  obese: { backgroundColor: '#FDECEA' },
});
