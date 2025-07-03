/* eslint-disable class-methods-use-this */
class YupHelper {
  /**
   * @desc Email validation regex
   */
  // eslint-disable-next-line no-useless-escape
  emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * @desc Password validation regex
   */
  passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;

  /**
   * @desc Hexadecimal value validation regex
   */
  hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

  /**
   * @desc validate value according to the schema
   *
   * @param schema yup schema
   * @param value to be validated
   *
   * @returns validation error status
   */
  validateValue = async (schema, value) => schema.validate(value);

  /**
   * @desc handle error promise
   *
   * @param promise errorPromise
   *
   * @returns errorMessage
   */
  handlePromiseError = async (promise) => {
    let errorMessage = '';
    await promise.catch((err) => {
      errorMessage = err.message;
    });
    return errorMessage;
  };
}

export default new YupHelper();
