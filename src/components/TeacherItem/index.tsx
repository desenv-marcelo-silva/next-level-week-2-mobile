import React from 'react';
import { View, Image, Text } from 'react-native';

import { RectButton, ScrollView } from 'react-native-gesture-handler';

import styles from './styles';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsAppIcon from '../../assets/images/icons/whatsapp.png';

function TeacherItem() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              'https://avatars3.githubusercontent.com/u/18222796?s=460&u=69b77bfeaf625a570eb0d5be6086cd1e3811262e&v=4',
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Marcelo Silva</Text>
          <Text style={styles.subject}>Matemática</Text>
        </View>
      </View>

      <ScrollView scrollEnabled style={styles.bioArea}>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. {'\n'} {'\n'}{' '}
          Placeat, tempore totam corrupti laborum dolor, suscipit Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Voluptatem obcaecati
          molestias unde officia numquam necessitatibus rem libero assumenda
          sequi, nesciunt, hic saepe nam vitae eum dolor at eos dolorem illo?
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ 20,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutLineIcon} /> */}
            <Image source={unFavoriteIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsAppIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;
