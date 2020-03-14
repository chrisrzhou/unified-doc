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
		type: 'highlight',
		classNames: ['custom-highlight'],
		startOffset: 0,
		endOffset: 100,
		id: Math.random().toFixed(4),
	},
	{
		type: 'redline',
		startOffset: 101,
		endOffset: 200,
		id: Math.random().toFixed(4),
	},
	{
		type: 'strikethrough',
		startOffset: 201,
		endOffset: 300,
		id: Math.random().toFixed(4),
	},
];
