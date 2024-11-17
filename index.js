const path = require('path')


module.exports = function() {
    return {
      visitor: {
        Program(programPath, state) {
          const filePath = state.file.opts.filename;
          const relativePath = path.relative(process.cwd(), filePath);
          const pathWithoutExtension = relativePath.replace(/\.[^/.]+$/, "");
          const normalizedPath = pathWithoutExtension.replace(/[\\/]+/g, '-');
          
          state.file.set('normalizedPath', normalizedPath);
          state.file.set('counter', 0);
        },
        JSXOpeningElement(path, state) {
          const normalizedPath = state.file.get('normalizedPath');
          let counter = state.file.get('counter');
          const attributes = path.node.attributes;
          
          const hasDataLensAttribute = attributes.some(attr => 
            attr.type === 'JSXAttribute' && 
            attr.name.name === 'data-lens'
          );
          
          if (!hasDataLensAttribute) {
            const elementName = path.node.name.name || 'unknown';
            const uniqueValue = `${normalizedPath}-${elementName}-${counter}`;
            attributes.push(
              {
                type: 'JSXAttribute',
                name: {
                  type: 'JSXIdentifier',
                  name: 'data-lens'
                },
                value: {
                  type: 'StringLiteral',
                  value: uniqueValue
                }
              }
            );
            
            counter++;
            state.file.set('counter', counter);
          }
        }
      }
    };
  };