import hastUtilTextOffsets from '@unified-doc/hast-util-text-offsets';

export default function textOffsets(options) {
	function transformer(hast) {
		return hastUtilTextOffsets(hast, options);
	}

	return transformer;
}
