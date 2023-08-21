import otpGenerator from 'otp-generator';

const OTP_CONFIG = {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
};

const generateOTP = () => {
  const OTP = otpGenerator.generate(4, OTP_CONFIG);
  return OTP;
};

export default generateOTP;
