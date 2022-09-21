export const fileToBase64 = (file: File): Promise<string | null | ArrayBuffer> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
}