import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

 export const  HtmlEdit=()=> {
  const [value, setValue] = useState('');

  return <ReactQuill style={{"backgroundColor":"white"}} theme="snow" value={value} onChange={setValue} />;
}
