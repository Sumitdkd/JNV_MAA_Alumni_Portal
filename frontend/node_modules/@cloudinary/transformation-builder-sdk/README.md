Cloudinary JS-Transformation-Builder-SDK
=========================
[![Build Status](https://api.travis-ci.com/cloudinary/js-transformation-builder-sdk.svg?branch=master)](https://app.travis-ci.com/github/cloudinary/js-url-gen)
## About
This is an internal Cloudinary SDK.
The Cloudinary JS-Transformation-Builder-SDK allows you to generate transformations for `@cloudinary/url-gen`

### Additional documentation
This Readme provides basic installation and usage information.

## Table of Contents
- [Key Features](#key-features)
- [Version Support](#Version-Support)
- [Installation](#installation)
- [Usage](#usage)
    - [Setup](#Setup)
    - [Transform and Optimize Assets](#Transform-and-Optimize-Assets)
    - [Transpilation](#Transpilation)
    - [Testing with Jest](#Testing-with-jest)
- [Contributions](#Contributions)
- [Get Help](#Get-Help)
- [Additional Resources](#Additional-Resources)

## Key Features
- [Transform image](https://cloudinary.com/documentation/javascript_image_transformations) assets (links to docs).
- [Transform video](https://cloudinary.com/documentation/javascript_video_transformations) assets (links to docs).


## Version Support

### Note!
This SDK is cross-platform, but only the Node.js versions are worth mentioning

| SDK Version   | Node.js 10    | Node.js 12  | Node.js 14   | Node.js 16  |
|---------------|------------|----------|----------|----------|
|  1.x          | V          | V        | V        | V        |



## Installation
### Install using your favorite package manager (yarn, npm)
```bash
npm install @cloudinary/transformation-builder-sdk
```
```bash
yarn add @cloudinary/transformation-builder-sdk
```

## Usage
### Setup
```javascript
// Import the Cloudinary class
import {Transformation} from '@cloudinary/transformation-builder-sdk';

// Create your transformation
const tx = new Transformation()
        .resize(scale(100, 100))
```

### Transform and Optimize Assets
- [See full documentation](https://cloudinary.com/documentation/javascript_image_transformations)
```javascript
// Create a new instance if you haven't (see above for the details)
const cld = new Cloudinary({/*...*/})

// Let's create a new image
const myImage = cld.image('sample');

// Import the resize transformation and apply it to myImage
import {Resize} from '@cloudinary/url-gen/actions/resize';

// Resize the image to 100x100
myImage.resize(Resize.scale().width(100).height(100));

// When we're done, we can apply all our changes and create a URL.
const myURL = myImage.toURL();

// https://res.cloudinary.com/demo/image/upload/c_scale,w_100,h_100/sample
console.log(myURL);
```

### Transpilation
`@cloudinary/transformation-builder-sdk` is shipped as untranspiled ES6 code.
`@cloudinary/transformation-builder-sdk` is optimized around bundle size, as such we do not transpile our distributed modules,
we leave the decision of what browsers to support, and what transpilations to apply, to you, the user.

### Testing with Jest
As mentioned above, we're shipping `@cloudinary/transformation-builder-sdk` with ES6 code, as this provides great tree-shaking potential.
it also requires a few adjustments when testing.

In jest.config, you'll need to add these lines to allow babel to transpile our code.
```json
{
  "transform": {
    "node_modules/@cloudinary/transformation-builder-sdk": "babel-jest"
  },
  "transformIgnorePatterns": ["/node_modules/(?!@cloudinary/transformation-builder-sdk)"]
}
```
Make sure to install babel-jest:
`npm install babel-jest`

You'll also need to ensure you have a `babel.config.js` file (and not a `.babelrc`), and that
it's configured properly to transpile code,

*As an example*:
```js
module.exports = {
  "presets": [
    "@babel/preset-env"
  ]
};
```

## Contributions
- Clone this repository
- Create a fork
- Make your changes
- Run tests locally `npm run test`
- Build project locally `npm run build`
- Push your changes
- Await a review from the maintainers


## Get Help
If you run into an issue or have a question, you can either:
- [Open a Github issue](https://github.com/cloudinary/transformation-builder-sdk/issues) (for issues related to the SDK)
- [Open a support ticket](https://cloudinary.com/contact) (for issues related to your account)

## About Cloudinary
Cloudinary is a powerful media API for websites and mobile apps alike, Cloudinary enables developers to efficiently manage, transform, optimize, and deliver images and videos through multiple CDNs. Ultimately, viewers enjoy responsive and personalized visual-media experiences—irrespective of the viewing device.


## Additional Resources
- [React SDK](https://www.npmjs.com/package/@cloudinary/react)
- [Angular SDK](https://www.npmjs.com/package/@cloudinary/angular)
- [Use with a Frontend Framework](https://cloudinary.com/documentation/sdks/js/frontend-frameworks/index.html)
- [Cloudinary Transformation and REST API References](https://cloudinary.com/documentation/cloudinary_references): Comprehensive references, including syntax and examples for all SDKs.
- [MediaJams.dev](https://mediajams.dev/): Bite-size use-case tutorials written by and for Cloudinary Developers
- [DevJams](https://www.youtube.com/playlist?list=PL8dVGjLA2oMr09amgERARsZyrOz_sPvqw): Cloudinary developer podcasts on YouTube.
- [Cloudinary Academy](https://training.cloudinary.com/): Free self-paced courses, instructor-led virtual courses, and on-site courses.
- [Code Explorers and Feature Demos](https://cloudinary.com/documentation/code_explorers_demos_index): A one-stop shop for all code explorers, Postman collections, and feature demos found in the docs.
- [Cloudinary Roadmap](https://cloudinary.com/roadmap): Your chance to follow, vote, or suggest what Cloudinary should develop next.
- [Cloudinary Facebook Community](https://www.facebook.com/groups/CloudinaryCommunity): Learn from and offer help to other Cloudinary developers.
- [Cloudinary Account Registration](https://cloudinary.com/users/register/free): Free Cloudinary account registration.
- [Cloudinary Website](https://cloudinary.com)


## Licence
Released under the MIT license.
