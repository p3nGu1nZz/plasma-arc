# Plasma Arc Project FAQ

## General

### What is the Plasma Arc Project?
The Plasma Arc Project is a WebGPU-based simulation that handles the transformation of vertices and the sampling of textures to produce the final rendered image. It aims to provide a high-performance rendering solution using modern web technologies.

### Where can I find the source code?
The source code is available on [GitHub](https://github.com/p3nGu1nZz/plasma-arc).

## Installation

### How do I install the project?
1. Clone the repository:
    ```sh
    git clone https://github.com/p3nGu1nZz/plasma-arc.git
    cd plasma-arc
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory with the following content:
    ```properties
    # Hugging Face Configuration
    HF_TOKEN=your_hf_token
    HF_PROJECT=plasma-arc
    HF_ORG=your_hf_org

    # Build Configuration
    SOURCE_DIRS=src
    BUILD_DIR=build
    OUT_DIR=out
    SPACE_DIR=space
    EXCLUDE_PATTERNS=**/test/**,**/*.test.js,**/node_modules/**
    INCLUDE_PATTERNS=**/*.js,**/*.html
    PUBLIC_FILE_TYPES=*.html,*.css,*.ico,*.jpg,*.png
    MODULE_NAME=wgpu-render.module.js
    ROOT_FILE=index.js
    PUBLIC_DIR=public
    SHADERS_DIR=src/shaders
    ```

## Usage

### How do I build the project?
Run the following command to build the project:
```sh
npm run build
```

### How do I serve the project?
Run the following command to serve the project:
```sh
npm start
```

## Development

### How are shaders handled in the project?
Shaders are embedded into the module during the build process. The `fetchShaderCode` function can fetch shader code from embedded strings, URLs, or the global `shaders` constant generated during the build process.

### What is the build pipeline?
The build pipeline includes the following steps:
- Create output directory
- Copy source files
- Log included files
- Create space directory
- Compile JavaScript files
- Copy public files
- Copy shader files
- Embed shaders into the module
- Update index file
- Generate build summary

### How do I add a new shader?
To add a new shader, place the shader file in the `src/shaders` directory. The build process will automatically embed the shader into the module.

### How do I update an existing shader?
To update an existing shader, modify the shader file in the `src/shaders` directory. The build process will automatically embed the updated shader into the module.

### How do I debug the project?
To debug the project, you can use the built-in debugging tools in your browser. Open the Developer Tools (usually by pressing F12 or right-clicking and selecting "Inspect") and navigate to the "Console" and "Sources" tabs to view logs and set breakpoints.

### How do I run tests?
Currently, the project does not include automated tests. You can manually test the project by running it in your browser and verifying that the expected behavior is observed.

## Troubleshooting

### I encountered an error during the build process. What should I do?
Check the error message for details. Common issues include missing environment variables or incorrect file paths. Ensure that your `.env` file is correctly set up and that all required directories and files are present.

### How do I report a bug or request a feature?
Please open an issue on the [GitHub repository](https://github.com/p3nGu1nZz/plasma-arc/issues) with detailed information about the bug or feature request.

### The shaders are not loading correctly. What should I do?
Ensure that the shader files are correctly placed in the `src/shaders` directory and that the build process has successfully embedded them into the module. Check the console for any error messages related to shader loading.

## Security

### How do I report a security vulnerability?
If you discover a security vulnerability within this project, please follow these steps:
1. **Do not open a public issue.** Instead, send an email to the project maintainer:
    - **Email:** rawsonkara@gmail.com
2. Include the following details in your email:
    - A description of the vulnerability.
    - Steps to reproduce the vulnerability.
    - Any potential impact or exploit scenarios.
3. The project maintainer will acknowledge receipt of your email within 48 hours and will work with you to understand and address the issue.

## Contact

### How can I contact the project maintainer?
You can contact the project maintainer, K. Rawson, via email at rawsonkara@gmail.com.
