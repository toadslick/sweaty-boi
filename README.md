Show the world that you're a sweatyboi with particle effects for your mouse cursor.

## Repository Structure

| Project             | Source                   | Destination        |
| ------------------- | ------------------------ | ------------------ |
| developer test page | `src/target/development` | `dist/development` |
| public web page     | `src/target/docs`        | `docs`             |
| Firefox extension   | `src/target/firefox`     | `dist/firefox`     |
| Chrome extension    | `src/target/chrome`      | `dist/chrome`      |

## Local Development

    $ npm install
    $ npm start

## Build Firefox Extension

    $ npm install
    $ npm run package:firefox

## Build Environment Details

- MacOS 10.14.4
- Node 11.1.0
- NPM 6.5.0
- Git 2.17.1
