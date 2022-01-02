import React from 'react';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import {StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppButton, AppText, Container, FeatureButton} from 'src/components/common';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProp, Route} from 'src/constants';
import {useDispatch} from 'react-redux';
import {logOutUser} from 'src/redux/user/userActions';

interface Props {
  book: Book | undefined;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  refetch: () => void;
}

export const Home: React.FC<Props> = ({book, isLoading, isError, error, refetch}) => {
  // console.log(error);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<HomeScreenProp>();
  return (
    <Container style={styles.wrapper} flexStart>
      <AppText style={styles.title} variant="h1">
        Hello{' '}
        <AppText variant="h1" style={styles.markedTitle}>
          MY DIGITAL
        </AppText>
      </AppText>
      <View style={{width: '100%'}}>
        <AppText style={styles.paragraph} variant="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </AppText>
        {!!book && (
          <BookComponent
            book={book}
            style={{marginVertical: 24}}
            shadowColor={palette.secondary}
            onPress={() => navigate(Route.DETAILS, {book, id: book.id})}
          />
        )}
        <FeatureButton
          label="Login"
          style={{marginVertical: 24}}
          shadowMaxWidth={137}
          onPress={() => {
            navigate(Route.AUTH);
          }}
        />
        <FeatureButton
          label="Logout"
          style={{marginVertical: 24}}
          shadowColor={palette.secondary}
          shadowMaxWidth={148}
          onPress={() => dispatch(logOutUser())}
        />
        {/* <AppText style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </AppText> */}
        <FeatureButton
          label="Lorem Ipsum"
          style={{marginVertical: 24}}
          shadowColor={palette.third}
          shadowMaxWidth={202}
          onPress={() => {
            console.log('click');
          }}
        />
        <AppButton
          label="Lorem Ipsum"
          style={{marginVertical: 24}}
          onPress={() => {
            console.log('click');
          }}
        />
        <AppButton
          label="Lorem Ipsum"
          style={{marginVertical: 24}}
          variant="secondary"
          onPress={() => {
            console.log('click');
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  title: {
    paddingTop: 40,
  },
  paragraph: {
    paddingTop: 50,
  },
  markedTitle: {
    color: palette.primary,
  },
});
