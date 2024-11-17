# babel-plugin-jsx-lens

A Babel plugin that automatically adds unique `data-lens` attributes to JSX elements.

## Installation

**npm**:
```bash
npm install --save-dev babel-plugin-jsx-lens
```

**yarn**:
```bash
yarn add -D babel-plugin-jsx-lens
```

### Required Dependencies for React Projects

The following packages must be installed additionally when using with React projects:

**npm**:
```bash
npm install --save-dev @babel/core @babel/preset-react babel-loader
```

**yarn**:
```bash
yarn add -D @babel/core @babel/preset-react babel-loader
```

## Configuration

Add the plugin to your `.babelrc` file:

```json
{
  "plugins": ["babel-plugin-jsx-lens"]
}
```

## How It Works

This plugin automatically adds unique `data-lens` attributes to JSX elements.
Each attribute has a unique value in the format of `file-path-element-name-index`.

### Example

**Input:**
```jsx
// src/components/Example.jsx
function Component() {
  return (
    <>
      <div>Hello</div>
      <span>World</span>
    </>
  );
}
```

**Output:**
```jsx
function Component() {
  return (
    <>
      <div data-lens="src-components-example-div-0">Hello</div>
      <span data-lens="src-components-example-span-1">World</span>
    </>
  );
}
```

## Supported Frameworks

Currently supports React/JSX-based projects only.
