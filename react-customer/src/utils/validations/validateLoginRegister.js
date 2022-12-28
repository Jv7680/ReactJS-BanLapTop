import { toast } from 'react-toastify';

function checkPhonenumber(phonenumber) {
    for (let i = 0; i < phonenumber.length; i++) {
        if (!parseInt(phonenumber[i]) && parseInt(phonenumber[i]) != 0) {
            return false;
        }
    }
    return true;
}

const validateLoginRegister = {
    username: (username) => {
        if (username.length === 0) {
            toast.error('Bạn chưa nhập tên đăng nhập!');
            return false;
        }
        else {
            return true;
        }
    },

    password: (password) => {
        if (password.length === 0) {
            toast.error('Bạn chưa nhập mật khẩu!');
            return false;
        }
        else if (password.length < 6 || password.length > 32) {
            toast.error('Mật khẩu từ 6-24 ký tự!');
            return false;
        }
        else {
            return true;
        }
    },

    firstname: (firstname) => {
        if (firstname.length === 0) {
            toast.error('Bạn chưa nhập tên!');
            return false;
        }
        else {
            return true;
        }
    },

    lastname: (lastname) => {
        if (lastname.length === 0) {
            toast.error('Bạn chưa nhập họ tên đệm!');
            return false;
        }
        else {
            return true;
        }
    },

    gmail: (gmail) => {
        if (gmail.length === 0) {
            toast.error('Bạn chưa nhập gmail!');
            return false;
        }
        else if (gmail.search('@') === -1) {
            toast.error('Gmail không hợp lệ!');
            return false;
        }
        else {
            return true;
        }
    },

    phonenumber: (phonenumber) => {
        if (phonenumber.length != 10) {
            toast.error('Số điện thoại cần 10 ký tự!');
            return false;
        }
        else if (!checkPhonenumber(phonenumber)) {
            toast.error('Số điện thoại không hợp lệ!');
            return false;
        }
        else {
            return true;
        }
    },

    address: (address) => {
        if (address.length === 0) {
            toast.error('Bạn chưa nhập địa chỉ!');
            return false;
        }
        else {
            return true;
        }
    },
}

export default validateLoginRegister;