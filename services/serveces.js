export const createElementByTag = (tag, className = '', text = false, attributeName = false, attributeValue = false) => {
    const newElememt = document.createElement(tag);

    if (className) {
      className.split (' ').forEach(className => {
        newElememt.classList.add(className);
      })
    }
    
    if (text && text.trim()) {
        newElememt.textContent = text;
    }
    
    if(attributeName && attributeValue && attributeName.trim()) {
      newElememt.setAttribute(attributeName.trim(), attributeValue.trim());
    }  
      return newElememt
    }

    export const createArrayBySize =  (column, row) => {
          return Array.from({length: column},() => Array.from({length:row}, () => {
            return {
              pixelPosition: { x: 0, y: 0 },
              pixelContent: 1,
          }
          }));
       
    }


    