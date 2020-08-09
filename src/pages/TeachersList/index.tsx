import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import {
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeachersList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [week_day, setWeekDay] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');

  async function loadFavorites() {
    AsyncStorage.getItem('@proffy/favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => teacher.id
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  async function handleSubmitFilter() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    if (response.data && response.data.length > 0) {
      loadFavorites();
      setIsFilterVisible(false);
    }

    setTeachers(response.data);
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#c1bccc"
              placeholder="Qual a matéria"
              onChangeText={(text) => setSubject(text)}
              value={subject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#c1bccc"
                  placeholder="Qual o dia?"
                  onChangeText={(text) => setWeekDay(text)}
                  value={week_day}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#c1bccc"
                  placeholder="Qual o horário?"
                  onChangeText={(text) => setTime(text)}
                  value={time}
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleSubmitFilter}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.length > 0 &&
          teachers.map((teacher: Teacher) => {
            return (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}

export default TeachersList;
