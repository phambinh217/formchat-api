class ActionError {
  constructor(message, errors) {
    this.message = message;
    this.errors = errors;
  }

  /**
   * Check variable is instance of ActionError
   */
  static is(variable) {
    return variable instanceof ActionError;
  }
}

export default ActionError;
