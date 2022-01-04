import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from './Icon';

export const NavigateBackBar: React.FC = () => {
  const {
    colors: {text},
  } = useTheme();
  const {goBack} = useNavigation();

  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <View style={styles.view}>
        <TouchableOpacity onPress={goBack}>
          <Icon color={text} name="ios-arrow-back" size={38} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goBack}>
          <Icon color={text} name="ios-heart-outline" size={38} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 25,
  },
});
