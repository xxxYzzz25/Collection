import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

// 自定義validate
const dictionary = {
  en: {
    messages: {
      email: () => 'INVALID EMAIL',
      required: field => `${field} CANNOT BE EMPTY`,
      min: () => 'MINIMUM 8 CHARACTERS',
    },
    attributes: {
      // 帳戶
      email: 'Account',
      password: 'Password',
      confirmPsw: 'Confirm Password',
      // 資訊
      phone: 'Phone',
      name: 'Name',
      address: 'Address',
      // 圖片
      // 信用卡
      bankName: 'Bank Name',
      card: 'Card',
      cardMonth: 'Card Month',
      cardName: 'Card Name',
      cardYear: 'Card Year',
      cvv: 'CVV',
    },
  },
};

Validator.localize(dictionary);
Vue.use(VeeValidate);
