module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-navigation|react-native-gesture-handler|react-native-animatable|react-native-vector-icons)/',
    '<rootDir>/lib/'
  ],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/src/contexts/'
  ],
  collectCoverage: true,
  setupFiles: [
    './test/jestSetup.js'
  ],
  globals: {
    'window': {}
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  // 'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ios.js',
    'ios.jsx',
    'android.js',
    'android.jsx'
  ],
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/'
  ],
};
