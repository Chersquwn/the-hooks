module.exports = {
  plugins: [
    'jest'
  ],
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:react-hooks/recommended'
  ],
  env: {
    'jest/globals': true
  },
  rules: {
    'react/jsx-no-useless-fragment': 0
  }
}
