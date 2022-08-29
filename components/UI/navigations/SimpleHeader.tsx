import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backImage: {
    width: 20,
    height: 20,
    marginRight: 14,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default function SimpleHeader({
  withBackButton,
  children,
}: {
  withBackButton?: boolean;
  children?: ReactNode;
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      {withBackButton ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.backImage}
            source={require('../../../assets/icons/left-arrow.png')}
          />
        </Pressable>
      ) : null}

      <Text style={styles.screenTitle}>{children}</Text>
    </View>
  );
}

SimpleHeader.defaultProps = {
  withBackButton: true,
  children: null,
};
