// FroalaEditor.js

import React, { useState } from 'react';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

 export function HtmlEdit() {
  // Initialize the content state with some initial content
  const [content, setContent] = useState('<p>Edit Your Content Here!</p>');

  // Object containing Froala editor API options and Events
  const config = {
    heightMin: 300,
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    
  };

  return (
    <div>
      <FroalaEditorComponent tag="textarea" config={config} />
      <div className="preview">
        <h2>Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

// export default FroalaEditor;
