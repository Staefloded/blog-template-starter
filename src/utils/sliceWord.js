const sliceWord = (word, limit) => {
  if (word.length > limit) {
    return word.slice(0, limit) + "...";
  } else {
    return word;
  }
};

export default sliceWord;
