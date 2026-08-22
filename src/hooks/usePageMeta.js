import { useEffect } from 'react';
import { applyDocumentMeta } from '../seo/meta.js';

export function usePageMeta({ title, description, image } = {}) {
  useEffect(() => {
    applyDocumentMeta({ title, description, image });
  }, [title, description, image]);
}
