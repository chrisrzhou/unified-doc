import { Annotation } from '../../packages/react-unified-doc';

export const content = `
<h1 test="woohoo">HTML Heading 1</h1>
<h2>HTML Heading 2</h2>
<blockquote>
	HTML blockquote with
	<b>bold</b> and <em>em</em> text
</blockquote>

<div className="custom-class" style="background: red; color: white; font-weight: bold">Custom HTML div node</div>


	undefined position text

# Markdown Heading 1

## Markdown Heading 2

> Markdown block

${'```'}
This is
a paragraph

in a codeblock

${'```'}

quote with __bold__ and _em_ text
<script>
  function shouldNotRun() {
    console.log('shouldNotRun')
  }
  shouldNotRun();
</script>
`;

export const annotations: Annotation[] = [
	{
		id: 'a',
		className: 'custom-highlight',
		label: 'drugs',
		startOffset: 0,
		endOffset: 60,
	},
	{
		anchor: true,
		id: 'b',
		className: 'highlight',
		label: 'link',
		startOffset: 100,
		endOffset: 130,
		style: {
			background: 'red',
		},
	},
	{
		id: 'c',
		className: 'redline',
		label: 'redline',
		startOffset: 240,
		endOffset: 300,
	},
];

export const overlappedAnnotations: Annotation[] = [
	{
		id: 'a',
		className: 'custom-highlight',
		label: 'label 1',
		startOffset: 35,
		endOffset: 45,
	},
	{
		id: 'b',
		className: 'custom-highlight',
		label: 'label 2',
		startOffset: 0,
		endOffset: 80,
	},
	{
		id: 'c',
		className: 'highlight',
		label: 'label 3',
		startOffset: 25,
		endOffset: 50,
	},
];

export const testAnnotations: Annotation[] = [
	{
		id: 'a',
		className: 'custom-highlight',
		label: 'test',
		startOffset: 24,
		endOffset: 26,
	},
];
