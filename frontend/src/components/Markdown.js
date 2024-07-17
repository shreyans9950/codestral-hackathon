import React from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';

const MarkdownComponent = ({ markdownText }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]}>{markdownText}</Markdown>
  );
};

export default MarkdownComponent;