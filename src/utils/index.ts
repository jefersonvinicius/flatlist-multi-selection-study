import {IPhoto} from '../pages/Main/PhotoItem';

export function filterPhotosByTitle(photos: IPhoto[], title: string) {
  return photos.filter((photo) =>
    photo.title.includes(title.trim().toLowerCase()),
  );
}
