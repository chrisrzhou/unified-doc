import { v4 as uuidv4 } from 'uuid';

export const markdownContent = `
# HTML Ipsum Presents

${'```js'}
var name = "World";
console.warn("Hello, " + name + "!");
${'```'}

**Pellentesque habitant morbi tristique** senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. *Aenean ultricies mi vitae est.* Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, ${'`'}commodo vitae${'`'}, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. [Donec non enim](#) in turpis pulvinar facilisis. Ut felis.

## Header Level 2

1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
2. Aliquam tincidunt mauris eu risus.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.

### Header Level 3

- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
- Aliquam tincidunt mauris eu risus.
`;

export const htmlContent = `
<h1>HTML Ipsum Presents</h1>

<pre><code class="language-js">
var name = "World";
console.warn("Hello, " + name + "!");
</code></pre>

<p style="background: #efefef; color: orange;"><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

<h2>Header Level 2</h2>

<ol>
   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
   <li>Aliquam tincidunt mauris eu risus.</li>
</ol>

<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

<h3>Header Level 3</h3>

<ul>
   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
   <li>Aliquam tincidunt mauris eu risus.</li>
</ul>
`;

export const annotations = [
	{
		id: uuidv4(),
		startOffset: 200,
		endOffset: 300,
		label: 'default',
		tooltip: 'commented by John (3 weeks ago)',
	},
	{
		id: uuidv4(),
		startOffset: 220,
		endOffset: 280,
		label: 'styled',
		style: { background: 'green', color: 'white' },
		tooltip: 'commented by John (3 weeks ago)',
	},
	{
		id: uuidv4(),
		startOffset: 400,
		endOffset: 500,
		label: 'strikethrough',
		classNames: ['strikethrough'],
		tooltip: 'removed by Jack (2 months ago)',
	},
	{
		id: uuidv4(),
		startOffset: 700,
		endOffset: 800,
		label: 'redline',
		classNames: ['redline'],
		tooltip: 'annotated by Jane (2 weeks ago)',
	},
	{
		id: uuidv4(),
		startOffset: 600,
		endOffset: 1000,
		label: 'custom highlight',
		classNames: ['custom-highlight'],
		tooltip: 'marked as HIGH PRIORITY by Jill (2 days ago)',
	},
];

// Keep in sync with doc.css
export const cssProperties = `
.doc {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.doc-dark {
	background: black;
	color: white;
}

.doc-yucks {
	background: brown;
	color: white;
	font-family: impact;
}

.custom-highlight {
	background: orange;
	border-bottom: 1px solid black;
	border-top: 1px solid black;
}

.custom-highlight[data-start="true"] {
	border-left: 1px solid black;
	padding-left: 2px;
}

.custom-highlight[data-end="true"] {
	border-right: 1px solid black;
	padding-right: 2px;
}

.redline {
	background-color: inherit;
	text-decoration: underline;
	text-decoration-color: red;
}

.strikethrough {
	background-color: inherit;
	text-decoration: line-through;
	text-decoration-color: red;
}
`;
