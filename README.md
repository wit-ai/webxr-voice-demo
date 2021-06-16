# Wit.ai WebXR Voice Demo


## Overview

This demo will show you how to integrate [Wit.ai](https://wit.ai) (NLU service) and [A-Frame](https://aframe.io/) (WebXR library) to build a voice enabled VR application (that can be adapted for AR as well). The app will allow users to ask our sudo AI voice assistant built with the [Web-Speech-API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API) to add 3D objects to our VR environment with voice commands, such as _“Hey Gizmo, drop a box”_.


## Prerequisites



*   Create a [Wit.ai](https://wit.ai) account
*   Use a Web-Speech-API [compatible browser](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility)
*   Use a WebGL [compatible browser](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API#browser_compatibility)
*   Have a microphone connected to your computer


## Launch the Demo Setup



*   Create a new Wit.ai app
*   Unzip and import [`src/wit_example.zip`](src/wit_example.zip) to your Wit.ai app
*   Update `CLIENT_TOKEN` in  [`src/voice.js`](src/voice.js) to the client token obtained from your app’s **Settings** page 
*   Open the [`src/index.html`](src/index.html) file in your browser
*   Allow microphone access


## Supported Voice Commands

Below are some voice commands that are supported, but you can also go to your Wit.ai app and select **Utterances** to view and extend them:



*   “drop a box”
*   “add a cylinder”
*   “drop a sphere”
*   “I summon a box”
*   “can you add a cylinder”
*   “please add a cylinder”

## References

* [Wit.ai](https://wit.ai)
* [A-Frame](https://a-frame.io)
* [Web-Speech-API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)

## Contributing

See the [CONTRIBUTING](CONTRIBUTING.md) file for how to help out.


## License

Wit.ai WebXR Voice Demo is licensed, as found in the [LICENSE](LICENSE) file.
