import {Book, Review} from 'src/models/';

export const convertToBook = ({id, volumeInfo}: Book): Book => ({
  id,
  volumeInfo: {
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    description: volumeInfo.description,
    imageLinks: {
      thumbnail: volumeInfo.imageLinks?.thumbnail,
    },
  },
});

export const convertToBooks = (response: Book[]): Book[] => {
  if (!!response?.length) {
    return response.map(({id, volumeInfo}: Book) => ({
      id,
      volumeInfo: {
        title: volumeInfo.title,
        authors: volumeInfo.authors,
        description: volumeInfo.description,
  
        imageLinks: {
          thumbnail: volumeInfo.imageLinks?.thumbnail,
        },
      },
    }));
  }
  return [] as Book[];
};
