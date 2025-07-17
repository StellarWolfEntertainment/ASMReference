# x64 Calling Convention Reference

An interactive web-based reference tool for x64 assembly register usage across different calling conventions.

## Overview

This project provides a comprehensive, interactive reference for register usage in two major x64 calling conventions:

- **Microsoft x64** (Windows)
- **System V x64** (Linux, macOS, and other Unix-like systems)

Designed as a quick lookup tool for assembly programmers, compiler developers, and anyone working with low-level code who needs to understand register allocation, parameter passing, and preservation requirements.

## Features

- **Interactive Convention Toggle**: Seamlessly switch between Microsoft x64 and System V x64 calling conventions
- **Comprehensive Register Tables**: 
  - Integer and floating-point parameter registers organized by bit width
  - Complete register listings with volatility information
  - Clear indication of volatile vs. non-volatile registers for proper preservation
- **Responsive Design**: Works on desktop and mobile devices
- **Automatic Theme Support**: Adapts to system dark/light mode preferences
- **Accessible**: Built with semantic HTML and ARIA labels for screen readers

## Usage

1. Open `index.html` in any modern web browser
2. Use the toggle buttons to switch between calling conventions
3. Browse the different register tables using the navigation sidebar
4. Reference the tables while writing or reviewing assembly code

## Project Structure

```
├── index.html          # Main HTML file
├── readme.md          # This file
├── license.md         # License information
├── assets/
│   └── registers.json # Register data for both conventions
├── css/
│   └── style.css      # Styling and theme definitions
└── js/
    └── registers.js   # JavaScript for interactive functionality
```

## Browser Compatibility

This project uses modern web standards and is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

Feel free to submit issues or pull requests to improve the reference data or add new features. Contributions are welcome!

## License

This project is released into the **public domain**. See [license.md](license.md) for details.