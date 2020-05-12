import {
	Annotation,
	AnnotationCallbacks,
	ContentType,
	Optional,
	Plugin,
	Processor,
	SanitizeSchema,
} from './types';

export interface Options {
	annotations: Annotation[];
	annotationCallbacks: AnnotationCallbacks;
	contentType: ContentType;
	rehypePlugins: Plugin[];
	sanitizeSchema: SanitizeSchema;
}

export default function createProcessor(options?: Optional<Options>): Processor;
