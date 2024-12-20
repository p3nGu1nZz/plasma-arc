# Plasma Arc Project Reference

## Modules

### `wgpu-shader.js`
This module provides functions to fetch and initialize shader code for the WebGPU-based simulation.

#### Functions
- `fetchShaderCode(source)`: Fetches shader code from the given URL or embedded string.
- `InitializeShaders(state)`: Initializes shaders by fetching the shader code.

### `wgpu-render.module.js`
This module contains the embedded shader code and the main entry point for the WebGPU-based simulation.

#### Embedded Shader Code
The shader code is embedded into the module during the build process and is accessible via the `shaders` constant.

### `Pipeline.js`
This module defines the `Pipeline` class, which manages the execution of a series of processing steps (pipes) in the build process.

#### Methods
- `add(pipe)`: Adds a pipe to the pipeline.
- `execute()`: Executes all pipes in the pipeline.
- `handleError(err)`: Handles errors during pipeline execution.
- `exit()`: Exits the pipeline execution with an error.

### `Files.js`
This module provides utility functions for file and directory operations.

#### Methods
- `create(dirPath)`: Creates a directory.
- `exists(filePath)`: Checks if a file or directory exists.
- `isDir(filePath)`: Checks if a path is a directory.
- `isFile(filePath)`: Checks if a path is a file.
- `read(filePath)`: Reads the content of a file or directory.
- `write(filePath, content)`: Writes content to a file.
- `remove(filePath)`: Removes a file or directory.
- `unlink(filePath)`: Unlinks a file.
- `exclude(filePath, excludePatterns)`: Checks if a file should be excluded based on patterns.
- `include(filePath, includePatterns)`: Checks if a file should be included based on patterns.
- `flatten(file, src)`: Flattens a file path.
- `shorten(filePath, max)`: Shortens a file path for display.

### `EmbedShaders.js`
This module defines the `EmbedShaders` class, which embeds shader code into the module during the build process.

#### Methods
- `constructor(outDir, spaceDir, moduleName)`: Initializes the `EmbedShaders` class with the output directory, space directory, and module name.
- `execute()`: Embeds shader code into the module.

### `CopyShaders.js`
This module defines the `CopyShaders` class, which copies shader files to the output directory during the build process.

#### Methods
- `constructor(srcDir, outDir)`: Initializes the `CopyShaders` class with the source directory and output directory.
- `execute()`: Copies shader files to the output directory.

### `build.js`
This script defines the build process for the project, including the creation of directories, copying of source files, compilation of JavaScript files, and embedding of shaders.

#### Build Pipeline
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

### Environment Variables
The following environment variables are used in the build process:
- `SOURCE_DIRS`: Comma-separated list of source directories.
- `BUILD_DIR`: Directory for build output.
- `OUT_DIR`: Directory for compiled output.
- `SPACE_DIR`: Directory for additional build artifacts.
- `EXCLUDE_PATTERNS`: Comma-separated list of patterns to exclude from the build.
- `INCLUDE_PATTERNS`: Comma-separated list of patterns to include in the build.
- `PUBLIC_FILE_TYPES`: Comma-separated list of public file types to copy.
- `MODULE_NAME`: Name of the output module file.
- `ROOT_FILE`: Root file for the build.
- `PUBLIC_DIR`: Directory for public files.
- `SHADERS_DIR`: Directory for shader files.

## Math Libraries and Rendering Vertex Stuff

- **Workgroup**: [WebGPU Fundamentals](https://webgpufundamentals.org/)
- **Module**: [wgpu-matrix.module.js](https://webgpufundamentals.org/3rdparty/wgpu-matrix.module.js)
- **Implementations**: [Search Results for matrix.module.js](https://www.bing.com/search?pglt=929&q=matrix.module.js&cvid=f489a108db90408c8b575d292bfd7c55&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhA0gEHNjI0ajBqMagCALACAA&FORM=ANNTA1&PC=U531&EPC=ExpTester)

## WebGPU Resources

For detailed information about WebGPU and its usage, refer to the following resources:

- **Official WebGPU Documentation**: [WebGPU Spec](https://www.w3.org/TR/webgpu/)
- **WebGPU Tutorial**: [WebGPU Fundamentals](https://webgpufundamentals.org/webgpu.html)

## Design and Architecture

Our project aims to align with industry standards for coding and design. Here are some references that guide our design and architecture:

- **Unreal Engine 5 Style Guide**: [UE5 Coding Standards](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/DevelopmentSetup/CodingStandard/)
- **UE5 Style Guide**: [GitHub UE5 Style Guide](https://github.com/Allar/ue5-style-guide)
- **React State Management**: [React Documentation](https://reactjs.org/docs/state-and-lifecycle.html)

## Additional References

For further reading and understanding of the concepts used in the Plasma Arc Project, the following references are highly recommended:

- **Plasma Physics Textbook**: J. D. Huba, "NRL Plasma Formulary", 2020.
- **WebGPU API Reference**: [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- **GPU Programming**: N. Wilt, "CUDA Handbook: A Comprehensive Guide to GPU Programming", 2013.
- **Shader Programming**: M. Bailey and S. Cunningham, "Graphics Shaders: Theory and Practice", 3rd Edition, 2016.

## Bibliography

Including a bibliography ensures that we credit the sources and provide additional reading for users who want to dive deeper into the topics. Here are some key references:

- Huba, J. D. "NRL Plasma Formulary". 2020.
- Wilt, N. "CUDA Handbook: A Comprehensive Guide to GPU Programming". 2013.
- Bailey, M., and S. Cunningham. "Graphics Shaders: Theory and Practice". 3rd Edition, 2016.

This document will be updated as new references become relevant to the project.
