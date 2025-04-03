const returnValidErrorMessage = (mongoError) => {
  const initErrorArray = Object.values(mongoError);

  const onlyErrorMessages = initErrorArray.map((item) => item.message);

  if (onlyErrorMessages.length > 1) {
    return onlyErrorMessages.reduce((acc, cum) => `${acc} \n${cum}`);
  } else {
    onlyErrorMessages[0];
  }
};

module.exports = returnValidErrorMessage;
