//Import SweetAlert2
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
})
//是非
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
  background: '#242b34',
})
//Success---noButton
Swal.fire({
  // position: 'top-end',
  type: 'success',
  title: '<span style="color:#d4d1cc">登入成功</span>',
  showConfirmButton: false,
  buttonsStyling: false,
  background: '#242b34',
  timer: 1500,
})

//Error---withButton
Swal.fire({
  type: 'error',
  title: '<span style="color:#d4d1cc">帳號或密碼錯誤</span>',
  showConfirmButton: true,
  confirmButtonClass: 'btn btn-warning',
  confirmButtonColor: '#ffa510',
  buttonsStyling: false,
  background: '#242b34',
  timer: 3000,
})

<span style="color:#d4d1cc">
</span>

Toast.fire({
  type: 'success',
  title: '歡迎加入Movieee，將為您跳轉至會員中心!',
})

