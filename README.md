# Plasma Arc Engine
Ultra-fast WebGPU game engine written in JavaScript

## Overview
The Plasma Arc Engine aims to develop a sophisticated and efficient plasma arc simulation using WebGPU. This project leverages the power of WebGPU to achieve high-performance computations and realistic visualizations. Our goal is to create a modular, extendable, and user-friendly application for research and educational purposes.

## Features
- High-performance plasma arc simulation
- Realistic visualizations using WebGPU
- Modular and extendable codebase
- User-friendly interface
- Fast iteration with modular WebGPU components

## WebGPU Integration
WebGPU is utilized for its advanced graphics and compute capabilities, enabling our simulation to run efficiently on a wide range of devices. By offloading heavy computations to the GPU, we achieve smoother and more responsive visualizations. The modular design aligns with industry standards like Unreal Engine 5, ensuring familiarity and ease of use for developers.

## Installation

### Prerequisites
- Python (v3.10 or higher)
- A WebGPU-compatible browser (e.g., Chrome Canary, Firefox Nightly)

### Clone the Repository
```bash
git clone https://github.com/yourusername/plasma-arc-engine.git
cd plasma-arc-engine
```

### Running the Simulation
1. Open `index.html` in your WebGPU-compatible browser.
2. Modify the configurations as needed in the `config` object.
3. Refresh the browser to see your changes instantly with the fast iterative development.

## Modular Components
The project is structured using modular components for WebGPU, ensuring a clean and scalable codebase:
- **wgpu-device.js**: Handles WebGPU device initialization.
- **wgpu-state.js**: Manages the application state.
- **wgpu-utility.js**: Utility functions for texture and other operations.
- **wgpu-pipeline.js**: Manages the creation of WebGPU pipelines.
- **wgpu-shader.js**: Fetches and compiles shader codes.
- **wgpu-texture.js**: Manages vertex data and textures.
- **wgpu-buffer.js**: Handles buffer creation and management.
- **wgpu-timing.js**: Manages timing and game loop properties.

## Contributing
We welcome contributions! Please submit issues or pull requests to help improve the project. Make sure to follow the coding standards and write tests for new features.

## License
This project is licensed under the MIT License.

## Citation
If you use this project in your research, please cite it as follows:

```bibtex
@misc{plasma_arc,
  author = {K. Rawson},
  title = {Plasma Arc Project},
  year = {2024},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/yourusername/plasma-arc-engine}},
  email = {rawsonkara@gmail.com}
}
```
