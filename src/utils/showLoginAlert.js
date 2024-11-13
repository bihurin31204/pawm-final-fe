// utils/showLoginAlert.js
import Swal from 'sweetalert2';

export const showLoginAlert = (loginFunction) => {
  Swal.fire({
    title: 'Anda belum login',
    text: 'Silakan login terlebih dahulu untuk mengakses simulasi.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Login',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#1976d2',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed) {
      loginFunction();
    }
  });
};
