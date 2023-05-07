export default {
  UUID: /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/,
  JWT_TOKEN: /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)$/,
  USER_PSEUDO: /^.{3,32}$/,
  USER_USERNAME: /^[a-z0-9_]{3,32}$/,
  USER_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
  TAROT_CARD_NAME: /^.{3,255}$/,
  TAROT_CARD_IDENTIFIER: /^[A-Z]{7}$/i,
};
