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
		classNames: ['custom-highlight'],
		startOffset: 0,
		endOffset: 60,
	},
	{
		anchorId: 'test-anchor',
		classNames: ['highlight'],
		startOffset: 100,
		endOffset: 200,
	},
	{
		classNames: ['redline'],
		startOffset: 240,
		endOffset: 300,
	},
];

export const overlappedAnnotations: Annotation[] = [
	{
		classNames: ['custom-highlight'],
		startOffset: 0,
		endOffset: 30,
	},
	{
		classNames: ['highlight'],
		startOffset: 25,
		endOffset: 40,
	},
];

export const testAnnotations: Annotation[] = [
	{
		classNames: ['custom-highlight'],
		startOffset: 24,
		endOffset: 26,
	},
];
