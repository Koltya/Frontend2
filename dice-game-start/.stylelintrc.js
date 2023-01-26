module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: ['stylelint-value-no-unknown-custom-properties', 'stylelint-csstree-validator'],
  rules: {
    'csstools/value-no-unknown-custom-properties': true,
    'csstree/validator': true
  }
};
