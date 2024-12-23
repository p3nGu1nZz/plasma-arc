# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2024-12-23

### Added
- Integrated nodemon for development and production environments.
- Added nodemon configuration files for development and production.
- Included clean duration in `CleanSummary`.
- Enhanced logging with `[plasma-arc]` prefix for better readability.
- Organized environment configuration into logical groups.

### Changed
- Updated `fetchShaderCode` to check for embedded shaders in the global `shaders` constant.
- Simplified `fetchShaderCode` by extracting embedded string logic into a separate function.
- Ensured `InitializeShaders` uses `fetchShaderCode` to fetch shader code.
- Adjusted build pipeline to include shader embedding and copying steps.
- Improved readability and maintainability of the code by reducing nested conditions and redundant comments.

### Fixed
- Fixed issues with shader file paths and environment variable usage in the build pipeline.

### [1.0.0] - 2024-12-18
#### Added
- Updated `build.js` script to use environment variables from `.env` file.
- Updated `clean.js` script to use environment variables from `.env` file.
- Updated `publish.js` script to use environment variables from `.env` file.
- Added detailed instructions in `README.md` for setting up Python virtual environment and installing dependencies.
- Created `requirements.txt` file for Python dependencies, including `huggingface_hub[cli]`.
- Added sections in `README.md` for building, running, and publishing the project.
- Updated `REFERENCES.md` with additional and reorganized content.
- Updated `FAQ.md` with new and organized content.
- Updated `ETHICS.md` and `CODE_OF_CONDUCT.md` for clarity and completeness.

## [1.0.0] - 2024-12-15
#### Added
- Full version release with refined features and optimized performance.
- Updated README.md with comprehensive project details.
- Detailed contribution guidelines and code of conduct.
- Enhanced WebGPU integration with additional shader programs and utilities.
- Advanced configuration options for the plasma arc simulation.

#### Changed
- Refined code structure and modularization for better maintainability.
- Improved documentation for better clarity and usability.
- Updated project dependencies to the latest versions.

#### Fixed
- Bug fixes and performance improvements for smoother operation.
- Resolved issues with file serving and MIME type handling.

## [0.0.1] - 2024-12-13
#### Added
- Initial prototype release.
- Core simulation functionality with configurable parameters.
- Integration with WebGPU for high-performance computation and rendering.
- Basic modular components for state management and pipeline creation.

#### Changed
- N/A

#### Fixed
- N/A
