import {createAsyncThunk} from '@reduxjs/toolkit';
import {Book, Challenge, Favorite, Review} from 'src/models';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  CollectionActions,
  setChallengeComplete,
  setChallenges,
  setData,
  setReview,
  setTakingPartInChallenge,
} from 'src/services/firestore';
import {convertToBook} from 'src/helpers/convertResponse';

export const setChallenge = createAsyncThunk<void, Challenge>('collections/setChallenge', async item => {
  await setChallenges(item);
});
export const completeChallenge = createAsyncThunk<void, Challenge>('collections/completeChallenge', async item => {
  await setChallengeComplete(item, CollectionActions.ADD);
  await setTakingPartInChallenge(item, CollectionActions.REMOVE);
});
export const removeCompleteChallenge = createAsyncThunk<void, Challenge>(
  'collections/removeCompleteChallenge',
  async item => {
    await setChallengeComplete(item, CollectionActions.REMOVE);
  },
);
export const takePartInChallenge = createAsyncThunk<void, Challenge>('collections/takePartInChallenge', async item => {
  await setTakingPartInChallenge(item, CollectionActions.ADD);
});
export const removeTakePartInChallenge = createAsyncThunk<void, Challenge>(
  'collections/removeTakePartInChallenge',
  async item => {
    await setTakingPartInChallenge(item, CollectionActions.REMOVE);
  },
);
export const getChallenges = createAsyncThunk<Challenge[]>(
  'collections/getChallenges',
  () =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('challenges')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                ...(doc.data() as Challenge),
                id: doc.id,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);

export const setFavorite = createAsyncThunk<void, Book>('collections/setFavorite', async book => {
  await setData(book);
});

export const setFollowing = createAsyncThunk<void, string>('collections/setFollowing', async id => {
  await setFollowing(id);
});
export const getFollowing = createAsyncThunk<string[]>(
  'collections/getFollowing',
  () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('following')
        .onSnapshot(
          snap => {
            resolve(snap.docs.map(doc => doc.id));
          },
          error => {
            reject(error);
          },
        );
    }),
);

export const getFavorite = createAsyncThunk<Favorite[]>(
  'collections/getFavorite',
  () =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('favorite')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: doc.id,
                createdBy: doc.data().createdBy,
                createdDate: doc.data().createdDate,
                book: {
                  id: doc.data().book.id,
                  volumeInfo: {
                    title: doc.data().book.volumeInfo.title,
                    description: doc.data().book.volumeInfo.description,
                    authors: doc.data().book.volumeInfo.authors,
                    imageLinks: {
                      thumbnail: doc.data().book.volumeInfo.imagePath,
                    },
                  },
                },
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);
export const setReviews = createAsyncThunk<void, Review>('collections/setReviews', async review => {
  await setReview(review);
});

export const getReviews = createAsyncThunk<Review[]>(
  'collections/getReviews',
  () =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('reviews')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: doc.id,
                book: convertToBook(doc.data().book),
                createdBy: doc.data().createdBy,
                createdDate: doc.data().createdDate,
                reviewTitle: doc.data().reviewTitle,
                reviewDescription: doc.data().reviewDescription,
                rating: doc.data().rating,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);
