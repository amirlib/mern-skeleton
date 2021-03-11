const errorMessages = {
  ERR_FIELD_EMPTY: 'field is required',
  ERR_FIELD_LENGTH: 'field length is not between the valid range',
  ERR_INVALID_EMAIL: 'address value is invalid',
};

class InvalidFieldValueError extends Error {
  constructor(code, fieldName = '') {
    super();

    this.code = code;
    this.fieldName = fieldName;
    this.message = errorMessages[code];
    this.name = 'InvalidFieldValueError';

    Error.captureStackTrace(this, InvalidFieldValueError);
  }
}

export default InvalidFieldValueError;
