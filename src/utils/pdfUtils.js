export function openBase64PDF(base64String) {
  const byteCharacters = atob(base64String.split(',')[1]); // Remove header
  const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
}