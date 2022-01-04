/* eslint-disable @typescript-eslint/no-explicit-any */
import {FormikErrors} from 'formik';
import React from 'react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Animated, {FlipInYRight} from 'react-native-reanimated';
import {RegisterUser} from 'src/models';
import {Container, AppButton, Input, Message, AppLogo} from 'src/components/common';
import {palette} from 'src/styles';

interface Props {
  //type from useFormik handleChange
  onChange: {
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onSubmit: () => void;
  form: RegisterUser;
  errors: FormikErrors<RegisterUser>;
  serverError: string;
  loading: boolean;
}

export const Register: React.FC<Props> = ({onChange, onSubmit, form, serverError, errors, loading}) => {
  const {t} = useTranslation('common');
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const handleHide = () => setHiddenPassword(!hiddenPassword);
  return (
    <Container withKeyboard withNavigateBackBar scrollViewContainerStyle={styles.wrapper}>
      <Animated.View entering={FlipInYRight.springify().stiffness(65)}>
        <AppLogo style={styles.logoImage} />
      </Animated.View>
      <View>
        <Text style={styles.title}>{t('welcomeMessage')}</Text>
        <View style={styles.form}>
          <Input
            label={t('userName')}
            value={form.username}
            onChangeText={onChange('username')}
            error={errors.username}
            autoCapitalize="words"
          />
          <Input
            label={t('email')}
            value={form.email}
            onChangeText={onChange('email')}
            error={errors.email}
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <Input
            label={t('password')}
            value={form.password}
            onChangeText={onChange('password')}
            secureTextEntry={hiddenPassword}
            error={errors.password}
            right={<TextInput.Icon name="eye" color={palette.grey} onPress={handleHide} />}
          />
          <AppButton style={styles.button} onPress={onSubmit} label={t('register')} disabled={loading} />
          {!!serverError && <Message label={serverError} />}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  logoImage: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
    color: palette.white,
  },
  form: {
    paddingTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
