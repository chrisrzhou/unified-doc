import { Plugin, Processor } from 'unified';
import {
  Annotation,
  AnnotationCallback,
  AnnotationCallbacks,
} from 'unified-doc-util-annotate';

export {
  Annotation,
  AnnotationCallback,
  AnnotationCallbacks,
  Plugin,
  Processor,
};

export type ContentType = 'html' | 'markdown' | 'text';

export type Optional<T> = {
  [P in keyof T]?: T[P];
};

export interface SanitizeSchema {
  [key: string]: any;
}

export interface SelectedText extends Annotation {
  value: string;
}
