# Plasma Arc Project ⚡

Check out the live demo at **[Hugging Face](https://huggingface.co/spaces/p3nGu1nZz/plasma-arc)**

## Description

The Plasma Arc Project is a WebGPU-based simulation that handles the transformation of vertices and the sampling of textures to produce the final rendered image.

![Plasma Arc Simulation](public/plasma-arc-01.jpg)

## Features

The Plasma Arc Project is packed with features designed to make high-performance plasma arc simulation accessible and efficient for users and developers alike. Here are some of the key features:

- Vertex and fragment shaders for WebGPU-based rendering.
- Shader embedding and copying during the build process.
- Flexible shader code fetching from embedded strings or URLs.
- Comprehensive build pipeline with multiple processing steps.
- High-performance plasma arc simulation
- Realistic visualizations using WebGPU
- Modular and extendable codebase
- User-friendly interface
- Fast iteration with modular WebGPU components

## WebGPU Integration

WebGPU is a cutting-edge technology that provides advanced graphics and compute capabilities. By using WebGPU, our simulation can run efficiently on a wide range of devices. This section details how WebGPU is integrated into our project to achieve smoother and more responsive visualizations.

## Project Structure

Understanding the project structure is crucial for navigating and contributing to the Plasma Arc Project. Below is a breakdown of the key directories and files:

```
project-root/
├── assets/          # Assets like fonts and images
├── public/          # Static files served to client
├── src/             # Source code for javascript modules
│   ├── components/  # Reusable components
│   ├── shaders/     # Shader programs
│   ├── utils/       # Utility functions
│   ├── wgpu/        # WebGPU-specific modules
│   ├── index.js     # Main entry point for client-side application
├── scripts/         # Server and other scripts
│   ├── build.js     # Build script
│   ├── clean.js     # Clean script
│   ├── publish.js   # Publish script
│   └── server.js    # Node.js server configuration
├── tests/           # Test files for the application
├── .gitattributes   # Git attributes file
├── .gitignore       # Git ignore file
├── CHANGELOG.md     # Changelog for tracking changes
├── CONTRIBUTING.md  # Guidelines for contributing
├── ETHICS.md        # Code of ethics and guidelines
├── FAQ.md           # Frequently asked questions
├── LICENSE          # License for the project
├── README.md        # Readme file
├── REFERENCE.md     # Bibliography and Links
└── SECURITY.md      # Security guidelines
```

## Installation

To get started with the Plasma Arc Project, you'll need to set up your environment by following the steps below. Ensure you have the prerequisites installed and then clone the repository to your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js (v18.0.0 or higher)
- Python (v3.10 or higher)
- A WebGPU-compatible browser (e.g., Chrome Canary, Firefox Nightly)

### Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/p3nGu1nZz/plasma-arc.git
cd plasma-arc
```

### Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

### Set Up Python Virtual Environment

1. **Create a virtual environment**:

   ```bash
   python -m venv env
   ```

2. **Activate the virtual environment**:

   - On Windows:
     ```bash
     .\env\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source env/bin/activate
     ```

3. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

Before running the project, you need to configure the environment variables. 

1. **Copy the `.env.sample` file** to a new file named `.env`:

   ```bash
   cp .env.sample .env
   ```

2. **Edit the `.env` file** and fill in the required values. The Hugging Face properties like the token are only necessary if you plan to publish to your own Hugging Face space.

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

## Building the Project

To build the project, you need to run the build script. This script will copy the necessary files to the build directory and set up the environment.

1. **Clean the Build Directory**:

   ```bash
   npm run clean
   ```

2. **Run the Build Script**:

   ```bash
   npm run build
   ```

This will prepare your project for running and publishing.

## Running the Project

Running the simulation is simple. Start the server, open the HTML file in your browser, and modify configurations as needed.

1. **Start the Server**:

   ```bash
   npm run start
   ```

2. **Open `index.html`** in your WebGPU-compatible browser.

3. **Modify the Configurations** as needed in the `config` object.

4. **Refresh the Browser** to see your changes instantly with fast iterative development.

## Publishing the Project

To publish your project to Hugging Face Spaces, follow these steps:

1. **Ensure the Build Directory is Prepared**:

   ```bash
   npm run build
   ```

2. **Run the Publish Script**:

   ```bash
   npm run publish
   ```

This will upload your project to Hugging Face Spaces, making it available for others to use and explore.

## Usage

1. Build the project:
    ```sh
    npm run build
    ```

2. Serve the project:
    ```sh
    npm start
    ```

## Development

### Fetching Shader Code

The `fetchShaderCode` function can fetch shader code from embedded strings, URLs, or the global `shaders` constant generated during the build process.

### Build Pipeline

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

### Example Shader Code

The example shader code is located in `src/shaders/shaders.wgsl` and is embedded into the module during the build process.

## Testing

Testing is an essential part of ensuring the stability and functionality of the Plasma Arc Project. We use Jest for testing our code.

### Run Tests

To run the tests, use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you'd like to contribute to the Plasma Arc Project, please follow our **[contribution guidelines](CONTRIBUTING.md)**. We appreciate all efforts to improve the project.

## Acknowledgments

We would like to extend our sincere gratitude to:
- **Hugging Face**: For providing an amazing platform that supports and fosters innovation.
- **Discord**: For offering a vibrant community space where collaboration thrives.
- **The Community at Hugging Face Discord**: Your feedback, discussions, and encouragement have been invaluable.
- **Microsoft Copilot**: For providing guidance and assistance throughout the development of this project.

## Alignment with Industry Standards

Our project strives to achieve parity with Unreal Engine 5 (UE5) by aligning our style guide, naming conventions, and source code architecture with industry standards. Additionally, from a design aspect, we are borrowing concepts from the state architecture of React to ensure a modern, efficient, and scalable development experience.

## License

This project is licensed under the **[MIT License](LICENSE.md)**.

## Citation

If you use this project in your research, please cite it as follows:

```bibtex
@misc{plasma_arc,
  author = {K. Rawson},
  title = {Plasma Arc},
  year = {2025},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/p3nGu1nZz/plasma-arc}},
  email = {rawsonkara@gmail.com}
}
```
