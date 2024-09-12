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


    