import hastAnnotate from '@unified-doc/hast-util-annotate';

export default function annotate(options) {
	function transformer(hast) {
		return hastAnnotate(hast, options);
	}

	return transformer;
}
