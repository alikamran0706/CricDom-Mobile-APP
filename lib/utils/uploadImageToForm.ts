import { Platform } from 'react-native';

export interface ImageData {
  uri: string;
  name?: string;
  type?: string;
}

export const prepareImageForUpload = (image: string, fieldName = 'files') => {
  const form = new FormData();

  const isBase64 = image.startsWith('data:image/');
  const isRemoteUrl = image.startsWith('http');

  if (isBase64) {
    const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
    if (match) {
      const mime = match[1];
      const b64Data = match[2];
      const filename = `image.${mime.split('/')[1]}`;

      if (Platform.OS === 'web') {
        const byteCharacters = atob(b64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mime });
        form.append(fieldName, blob, filename);
      } else {
        form.append(fieldName, {
          uri: image,
          name: filename,
          type: mime,
        } as any);
      }
    }
  } else if (isRemoteUrl) {
    form.append(fieldName, image);
  } else {
    const filename = image.split('/').pop() || `image_${Date.now()}.jpg`;
    const extMatch = /\.(\w+)$/.exec(filename);
    let ext = extMatch ? extMatch[1].toLowerCase() : 'jpeg';
    if (ext === 'jpg') ext = 'jpeg';
    const type = `image/${ext}`;

    form.append(fieldName, {
      uri: image,
      name: filename,
      type,
    } as any);
  }

  return form;
};
