'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// React Quill'i dynamic import ile yükle (SSR sorunlarını önlemek için)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Başlık boyutları
          [{ font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['link', 'image', 'video'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'video',
    'color',
    'background',
  ];

  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Not içeriğinizi buraya yazın...'}
        style={{
          backgroundColor: 'white',
          borderRadius: '0.375rem',
        }}
        className="rich-text-editor"
      />
    </div>
  );
}

