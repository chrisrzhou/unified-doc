import {
	Annotation,
	OptionalAnnotationCallbacks,
} from '@unified-doc/hast-util-annotate';
import { Extractor } from '@unified-doc/hast-util-extract-text-offsets';
import { Processor } from 'unified';

export type ContentType = 'html' | 'markdown' | 'text';

export interface ProcessorOptions {
	extractor?: Extractor;
	sanitizeSchema?: {
		[key: string]: any;
	};
}

export function createProcessor(
	contentType?: ContentType,
	annotations?: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
	options?: ProcessorOptions,
): Processor;
