import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {CKEditor} from "ckeditor4-react";

CKEditor.editorUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.5.4/ckeditor.js";

export const HtmlEditor=()=> {
    const editorRef = useRef(null);
    const log = () => {
    if (editorRef.current) {
        console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
    <h1>jlkjsdlf</h1>
    
    <CKEditor
        data="<p>Hello from CKEditor 4!</p>"
        config={{
          toolbar: [
            { name: "tools", items: ["Maximize"] },
            {
              name: "clipboard",
              items: ["Cut", "Copy", "Paste", "PasteText", "-", "Undo", "Redo"]
            },
            { name: "links", items: ["Link", "Unlink"] },
            { name: "document", items: ["Source"] },
            "/",
            {
              name: "basicstyles",
              items: [
                "Bold",
                "Italic",
                "Underline",
                "Strike",
                "-",
                "Subscript",
                "Superscript"
              ]
            },
            {
              name: "paragraph",
              items: [
                "NumberedList",
                "BulletedList",
                "-",
                "Outdent",
                "Indent",
                "Blockquote"
              ]
            },
            {
              name: "align",
              items: [
                "AlignLeft",
                "JustifyLeft",
                "JustifyCenter",
                "JustifyRight",
                "JustifyBlock"
              ]
            },
            "/",
            { name: "styles", items: ["Format", "-", "Font", "-", "FontSize"] },
            { name: "colors", items: ["TextColor", "BGColor"] },
            { name: "insert", items: ["Image", "Table", "HorizontalRule"] },
            "/"
          ],
          extraPlugins: "colorbutton,colordialog,font",
          removeButtons: ""
        }}
      />
    </>
  );
}