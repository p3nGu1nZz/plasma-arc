# Contributing to Plasma Arc Project

Thank you for your interest in contributing to the Plasma Arc Project! We welcome contributions from the community and are grateful for your support.

## How to Contribute

### Reporting Issues

If you encounter any bugs or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/p3nGu1nZz/plasma-arc/issues). Provide as much detail as possible, including steps to reproduce the issue and any relevant screenshots or logs.

### Submitting Pull Requests

1. **Fork the repository:**
    ```sh
    git fork https://github.com/p3nGu1nZz/plasma-arc.git
    ```

2. **Clone your fork:**
    ```sh
    git clone https://github.com/your-username/plasma-arc.git
    cd plasma-arc
    ```

3. **Create a new branch:**
    ```sh
    git checkout -b my-feature-branch
    ```

4. **Make your changes:**
    - Follow the coding standards and guidelines outlined in the project.
    - Ensure that your code is well-documented and includes comments where necessary.
    - Write tests to cover your changes, if applicable.

5. **Commit your changes:**
    ```sh
    git commit -m "Description of my changes"
    ```

6. **Push your changes to your fork:**
    ```sh
    git push origin my-feature-branch
    ```

7. **Open a pull request:**
    - Go to the [GitHub repository](https://github.com/p3nGu1nZz/plasma-arc) and open a pull request.
    - Provide a detailed description of your changes and any relevant information.

### Code Review

All pull requests will be reviewed by the project maintainers. Please be patient as we review your contributions. We may request changes or provide feedback to ensure that the code meets the project's standards.

### Coding Standards

- **Consistency:** Follow the existing coding style and conventions used in the project.
- **Readability:** Write clear and readable code. Use meaningful variable and function names.
- **Documentation:** Document your code with comments and provide clear commit messages.

### Community Guidelines

- **Respect:** Treat all contributors and users with respect and courtesy.
- **Inclusivity:** Foster an inclusive environment where everyone feels welcome.
- **Collaboration:** Work together with other contributors and share knowledge.

## Development Workflow

### Setting Up the Development Environment

1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Set up environment variables:**
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

### Running the Build

To build the project, run:
```sh
npm run build
```

### Running the Project

To serve the project, run:
```sh
npm start
```

### Running Tests

Currently, the project does not include automated tests. You can manually test the project by running it in your browser and verifying that the expected behavior is observed.

## Contact

If you have any questions or need assistance, please contact the project maintainer:

- **Email:** rawsonkara@gmail.com

Thank you for contributing to the Plasma Arc Project!
