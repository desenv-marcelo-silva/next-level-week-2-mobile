import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';

import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsApp() {
    api.post('connections', { user_id: teacher.id });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('@proffy/favorites');

    let favoritesList: any[] = [];

    if (favorites) {
      favoritesList = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoritesIndex = favoritesList.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      if (favoritesIndex > -1) {
        favoritesList.splice(favoritesIndex, 1);
        setIsFavorited(false);
      }
    } else {
      favoritesList.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem(
      '@proffy/favorites',
      JSON.stringify(favoritesList)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <ScrollView scrollEnabled style={styles.bioArea}>
        <Text style={styles.bio}>{teacher.bio}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={heartOutLineIcon} />
            ) : (
              <Image source={unFavoriteIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsApp}
          >
            <Image source={whatsAppIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
