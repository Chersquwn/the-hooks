module.exports = {
  'branches': [
    'main', 
    'master', 
    'next'
  ],
  'verifyConditions': [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git'
  ],
  'prepare': [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git'
  ]
}
