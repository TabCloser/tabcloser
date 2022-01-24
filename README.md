# TabCloser

![build](https://github.com/TabCloser/tabcloser/workflows/build/badge.svg)

Chrome Extension for closing out those pesky, leftover windows that occur when a link is opened within an app other than the browser.

## Officially Supported Apps/Websites

* Figma
* Spotify
* Visual Studio Code
* Zoom

## Example Links

* https://www.figma.com/app_auth/bfa73036-e7fc-442a-bc78-7eaa3d275012/grant?desktop_protocol=figma&fuid=880567443010618669
* https://www.figma.com/file/XtT2KTNtVPxSFmOzbHheLC/Closing-Figma-Tabs?node-id=0%3A1
* https://open.spotify.com/album/4WsroDqYcqI1DpRgRAwqF2?si=Rscu9SG4R22pay5OkYtelA&nd=1
* https://prod.liveshare.vsengsaas.visualstudio.com/join?1F5B57FF455C9244EB719875E333E9150127

## Developer Info

### Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

### Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Types

```typescript
interface Plugin {
  regex: string/Regex
  // in seconds
  timeout?: number
  toggles: { [key: string]: boolean }
}

interface Plugins {
  [key: string]: Plugin
}
```

### Setup

```
npm install
```

### Build

```
npm run build
```

### Build in watch mode

#### terminal

```
npm run watch
```

#### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

### Load extension to chrome

Load `dist` directory

### Test
`npx jest` or `npm run test`
