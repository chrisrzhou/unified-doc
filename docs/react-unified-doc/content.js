const content = `
  <h1>HTML Heading 1</h1>
<h2>HTML Heading 2</h2>
<blockquote>HTML blockquote with <b>bold</b> and <em>em</em> text</blockquote>

<div className="custom-class" style="background: red; color: white; font-weight: bold">Custom HTML div node</div>
i
# Markdown Heading 1
## Markdown Heading 2
> Markdown block

quote with __bold__ and _em_ text
<script>
  function shouldNotRun() {
    console.log('shouldNotRun')
  }
  shouldNotRun();
</script>
`;

export default content;
