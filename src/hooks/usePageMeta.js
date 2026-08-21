import { useEffect } from 'react';
import { applyDocumentMeta } from '../seo/meta.js';

export function usePageMeta({ title, description }) {
  useEffect(() => {
    applyDocumentMeta({ title, description });
  }, [title, description]);
}
