import Swal from 'sweetalert2';

export function showSuccess(message, timer = 2000) {
  return Swal.fire({
    title: message,
    icon: 'success',
    timer,
    showConfirmButton: false
  });
}

export function showError(message) {
  return Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error'
  });
}

export function createImagePreview(url, container) {
  if (!container) return;
  
  container.innerHTML = `<img src="${url}" alt="Preview" style="max-width: 100%; border-radius: 8px;">`;
}