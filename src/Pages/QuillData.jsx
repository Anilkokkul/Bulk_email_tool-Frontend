export const modules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }], // Inline size applied to selection
    [{ header: [1, 2, 3, 4, 5, 6, false] }],       // Block level header
    [{ font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
    ['code-block']
  ],
};

export const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'code-block'
];