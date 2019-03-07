# TalkTalk
[![CircleCI](https://circleci.com/gh/dooboolab/talktalk-rn.svg?style=shield)](https://circleci.com/gh/dooboolab/talktalk-rn)
[![codecov](https://codecov.io/gh/dooboolab/talktalk-rn/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/talktalk-rn)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![Slack](https://img.shields.io/badge/slack-dooboolab-purple.svg)](https://dooboolab.com/joinSlack)

![m63gkogvnu](https://user-images.githubusercontent.com/27461460/53927695-ffc23580-40ca-11e9-91cd-aadb42eb49a1.gif)

> Specification
* flow
* styeld-component
* react-hook
* react-navigation
* localization
* jest
* react-native-testing-library

# Gain points
```
1. Sample of `react context api provider`.
2. Able to learn how to structure react native app with `context api` and `jest` and `flow`.
3. Test type with flow with `npm run build` command.
4. Learn how to localize your project.
```

# INSTALL
```
1. npm install
2. npm start
```

# Structures
```text
app/
├─ .doobooo // necessary if using dooboo-cli
├─ assets
│  └─ icons // app icons
│  └─ images // app images like background images
├─ node_modules/
├─ src/
│  └─ apis
│  └─ components
│  └─ providers
│  └─ utils
│  └─ index.js
├─ test/
├─ .buckconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .flowconfig
├─ .gitattributes
├─ .gitignore
├─ .watchmanconfig
├─ app.json
├─ babel.config.js
├─ index.js
├─ package.json
├─ README.md
└─ STRINGS.js
```

# Running the project
Running the project is as simple as running
```sh
npm run start
```

This runs the `start` script specified in our `package.json`, and will spawn off a server which reloads the page as we save our files.
Typically the server runs at `http://localhost:8080`, but should be automatically opened for you.

## Testing the project
Testing is also just a command away:
```sh
npm test
```

## Writing tests with Jest
We've created test examples with jest-ts in `src/components/screen/__tests__` and `src/components/shared/__tests__`. Since react is component oriented, we've designed to focus on writing test in same level of directory with component. You can simply run `npm test` to test if it succeeds and look more closer opening the source.

## Localization
We've defined Localization strings in `STRINGS.js` which is in root dir.
We used [react-native-localization](https://github.com/stefalda/ReactNativeLocalization) pacakage for this one.
```
import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: {
    LOGIN: 'Login',
  },
  kr: {
    LOGIN: '로그인',
  },
});

export {
  strings,
};
```

Fixed jest setup by adding following in jestSetup.

```
import { NativeModules } from 'react-native';

/**
 * monkey patching the locale to avoid the error:
 * Something went wrong initializing the native ReactLocalization module
 * https://gist.github.com/MoOx/08b465c3eac9e36e683929532472d1e0
 */

NativeModules.ReactLocalization = {
  language: 'en_US',
};
```

## React version
16.8

## React Native version
0.59

## React navigation
3

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://dooboolab.com"><img src="https://avatars0.githubusercontent.com/u/27461460?v=4" width="100px;" alt="Hyo Chan Jang"/><br /><sub><b>Hyo Chan Jang</b></sub></a><br /><a href="https://github.com/dooboolab/talktalk-rn/commits?author=hyochan" title="Code">💻</a> <a href="https://github.com/dooboolab/talktalk-rn/commits?author=hyochan" title="Documentation">📖</a> <a href="#eventOrganizing-hyochan" title="Event Organizing">📋</a> <a href="#maintenance-hyochan" title="Maintenance">🚧</a> <a href="#talk-hyochan" title="Talks">📢</a> <a href="https://github.com/dooboolab/talktalk-rn/commits?author=hyochan" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/geoseong"><img src="https://avatars0.githubusercontent.com/u/19166187?v=4" width="100px;" alt="TaeSeong Park"/><br /><sub><b>TaeSeong Park</b></sub></a><br /><a href="https://github.com/dooboolab/talktalk-rn/commits?author=geoseong" title="Code">💻</a> <a href="https://github.com/dooboolab/talktalk-rn/commits?author=geoseong" title="Documentation">📖</a> <a href="#example-geoseong" title="Examples">💡</a> <a href="#maintenance-geoseong" title="Maintenance">🚧</a></td><td align="center"><a href="https://blog.cometkim.kr"><img src="https://avatars3.githubusercontent.com/u/9696352?v=4" width="100px;" alt="Hyeseong Kim"/><br /><sub><b>Hyeseong Kim</b></sub></a><br /><a href="https://github.com/dooboolab/talktalk-rn/commits?author=cometkim" title="Documentation">📖</a> <a href="#ideas-cometkim" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-cometkim" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#security-cometkim" title="Security">🛡️</a> <a href="#talk-cometkim" title="Talks">📢</a> <a href="https://github.com/dooboolab/talktalk-rn/commits?author=cometkim" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
