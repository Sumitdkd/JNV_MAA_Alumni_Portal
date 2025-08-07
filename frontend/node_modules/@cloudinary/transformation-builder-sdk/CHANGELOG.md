1.17.0 / 2025-05-21
==================

* Add support for `preserve-alpha` attribute in `e_extract` action

1.16.1 / 2024-11-27
==================

- Handle proper escaping for percentage char (generative fill, generative background replace transformations)

1.16.0 / 2024-11-25
==================

- Escaping special characters for generative fill and generative background replace transformations

1.15.2 / 2024-10-03
==================

- Allow usage of strings in autoFocus.focusOn

1.15.1 / 2024-09-02
==================

- Fix broken import path

1.15.0 / 2024-08-28
==================

* Add support for the `e_extract` action

1.14.1 / 2024-07-08
==================

- Fixed import of GenerativeBackgroundReplace

1.14.0 / 2024-07-08
==================

- Support for Generative Background Replace action

1.13.3 / 2024-03-27
==================

- Security alert on FlagQualifier fix

1.13.2 / 2024-03-19
==================

- Add internal converter to Sharpen action
  
1.13.1 / 2024-03-07
==================

- Add json conversion for rotateByMode action

1.13.0 / 2024-02-26
==================

- Support audio as an overlay source

1.12.1 / 2024-02-22
==================

- autoPad gravity fix

1.12.0 / 2024-02-22
==================

- Added Resize.autoPad action
- Added Effect.enhance action

1.11.0 / 2024-02-09
==================

- Fix handling of blurred background params when only brightness specified

1.10.3 / 2024-02-05
==================

- Internal improvements in backgroundColor action

1.10.2 / 2024-02-05
==================

- Internal improvements in backgroundColor action

1.10.1 / 2024-01-15
==================

* Fix support for "auto" offsets in `VideoEdit.trim`

1.10.0 / 2023-12-18
==================

- Add Resize.auto() action

1.9.0 / 2023-12-04
==================

- Add Upscale action 
- Add model translation to the Blur action

1.8.0 / 2023-11-02
==================

- Add `decectMultiple` method to `GenerativeReplace`
- Add `removeShadow` method to `GenerativeRemove`
- Create `decectMultiple` alias for `GenerativeRecolor#multiple` method to be compatible with other "generative" actions
- Fix parameters delimiter in BackgroundRemoval action that caused producing invalid URLs

1.7.0 / 2023-10-19
==================

- Added generativeRestore() action

1.6.1 / 2023-08-25
==================

- Generative Recolor color formatting fix

1.6.0 / 2023-08-25
==================

- Generative Recolor effect action

1.5.1 / 2023-08-01
==================

* Remove `regionType` property from RectangleRegion

1.5.0 / 2023-08-01
==================

* Simplify API for GenerativeRemove action
* Add a dedicated method for Generative Fill background  

1.4.0 / 2023-07-24
==================

- Generative Replace action support

1.3.0 / 2023-07-18
==================

- Add support for the Generative Remove effect 

1.2.11 / 2023-07-14
==================

- Fix alternative syntax for ForegroundObject

1.2.10 / 2023-07-11
==================

- Add support for Generative Fill background
- Adjust allowed Background Removal hints syntax

1.2.9 / 2023-06-06
==================

- Default value for background removal fine edges option

1.2.8 / 2023-05-04
==================

- Return nested transformation errors at the layer action level

1.2.7 / 2023-03-08
==================

- Add missing focusOn named export

1.2.6 / 2023-02-22
==================

- Border actionModel params compliant with transformation-model 

1.2.5 / 2023-02-21
==================

- Adjust border radius in from/toJson model 

1.2.4 / 2023-02-20
==================

- Align RoundCorners action with the specs

1.2.3 / 2023-02-03
==================

- Add fromJson support to Opacity action

1.2.2 / 2023-02-03
==================

- Fix opacity action (missing actionModel)

1.2.1 / 2023-01-31
==================

- Updated default values of Drop Shadow action

1.2.0 / 2023-01-11
==================

- Add DropShadow effect

1.1.0 / 2022-10-20
==================

  * Add Background Removal effect
  * Add from/toJson for rotateByAngle Action

1.0.1 / 2022-09-13
==================

  * Fix broken prettier version 
  * Default length for the fade action

1.0.0 / 2022-05-12
==================

Release package

