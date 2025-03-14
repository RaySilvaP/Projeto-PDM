import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface UserHeaderProps {
  name: string;
  subtitle: string;
  avatarUrl?: string;
  avatarImage?: ImageSourcePropType;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, subtitle, avatarUrl, avatarImage }) => {
  return (
    <View style={styles.container}>
      {(avatarImage || avatarUrl) && (
        <Image
          source={avatarImage ? avatarImage : { uri: avatarUrl }}
          style={styles.avatar}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Bem vindo, <Text style={styles.nameText}>{name}</Text>!
        </Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nameText: {
    color: '#8A56E3',
    fontWeight: '700',
  },
  subtitleText: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
});

export default UserHeader;