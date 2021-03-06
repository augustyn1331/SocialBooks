import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setErrorNull} from 'src/redux/user/userSlice';
import {BORDER_RADIUS, palette} from 'src/styles';
import {AppText} from './AppText';

interface Props {
  label: string;
}

export const Message: React.FC<Props> = ({label}) => {
  const dispatch = useDispatch();
  const onDismissSnackBar = () => dispatch(setErrorNull());
  const {
    colors: {background, text},
  } = useTheme();
  return (
    <View style={styles.container}>
      <Snackbar
        theme={{
          colors: {
            onSurface: text,
          },
        }}
        duration={4000}
        visible={true}
        onDismiss={onDismissSnackBar}
        style={styles.wrapper}
        action={{
          label: 'x',
          onPress: onDismissSnackBar,
          color: background,
        }}>
        <AppText variant="p" style={{color: 'white', fontWeight: 'bold'}}>
          {label}
        </AppText>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'space-between',
    width: '95%',
    maxWidth: 400,
    alignSelf: 'center',
    bottom: -110,
  },
  wrapper: {
    borderRadius: BORDER_RADIUS,
    color: palette.white,
  },
});
