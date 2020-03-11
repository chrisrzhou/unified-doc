import hastAnnotate from '@unified-doc/hast-util-annotate';

function annotate(options) {
	function transformer(hast) {
		return hastAnnotate(hast, options);
	}

	return transformer;
}

export default annotate;
