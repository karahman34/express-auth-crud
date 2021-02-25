class Transformer {
  constructor(res) {
    this.res = res;
  }

  // eslint-disable-next-line class-methods-use-this
  setResponse(ok, message, data) {
    return {
      ok,
      message,
      data,
    };
  }

  success(message, data = null, status = 200) {
    return this.res.status(status).json(this.setResponse(true, message, data));
  }

  fail(message, data = null, status = 500) {
    return this.res.status(status).json(this.setResponse(false, message, data));
  }

  validationError(errors, additionalError = null) {
    let data = {};
    if (errors) {
      data = errors.details.reduce((obj, validation) => {
        obj[validation.context.key] = validation.message;

        return obj;
      }, {});
    }

    if (additionalError !== null) {
      data = { ...data, ...additionalError };
    }

    return this.res.status(422).json(this.setResponse(false, 'Validation Error.', data));
  }
}

module.exports = Transformer;
