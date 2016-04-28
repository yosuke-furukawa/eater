require('babel-register')({
  ignore: (file) => {
    if (file.match(/node_modules/)) return true;
    return false;
  }
});

