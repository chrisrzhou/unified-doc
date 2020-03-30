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
		label: 'default',
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

export const content = `
<h3>In Congress, July 4, 1776.</h3>
<p><strong>The unanimous Declaration of the thirteen united States of America,</strong> When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature’s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.</p>
<p>We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world.</p>
<div>
<p>He has refused his Assent to Laws, the most wholesome and necessary for the public good.</p>
<p>He has forbidden his Governors to pass Laws of immediate and pressing importance, unless suspended in their operation till his Assent should be obtained; and when so suspended, he has utterly neglected to attend to them.</p>
<p>He has refused to pass other Laws for the accommodation of large districts of people, unless those people would relinquish the right of Representation in the Legislature, a right inestimable to them and formidable to tyrants only.</p>
<p>He has called together legislative bodies at places unusual, uncomfortable, and distant from the depository of their public Records, for the sole purpose of fatiguing them into compliance with his measures.</p>
<p>He has dissolved Representative Houses repeatedly, for opposing with manly firmness his invasions on the rights of the people.</p>
<p>He has refused for a long time, after such dissolutions, to cause others to be elected; whereby the Legislative powers, incapable of Annihilation, have returned to the People at large for their exercise; the State remaining in the mean time exposed to all the dangers of invasion from without, and convulsions within.</p>
<p>He has endeavoured to prevent the population of these States; for that purpose obstructing the Laws for Naturalization of Foreigners; refusing to pass others to encourage their migrations hither, and raising the conditions of new Appropriations of Lands.</p>
<p>He has obstructed the Administration of Justice, by refusing his Assent to Laws for establishing Judiciary powers.</p>
<p>He has made Judges dependent on his Will alone, for the tenure of their offices, and the amount and payment of their salaries.</p>
<p>He has erected a multitude of New Offices, and sent hither swarms of Officers to harrass our people, and eat out their substance.</p>
<p>He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures.</p>
<p>He has affected to render the Military independent of and superior to the Civil power.</p>
<p>He has combined with others to subject us to a jurisdiction foreign to our constitution, and unacknowledged by our laws; giving his Assent to their Acts of pretended Legislation:</p>
<p>For Quartering large bodies of armed troops among us:</p>
<p>For protecting them, by a mock Trial, from punishment for any Murders which they should commit on the Inhabitants of these States:</p>
<p>For cutting off our Trade with all parts of the world:</p>
<p>For imposing Taxes on us without our Consent:</p>
<p>For depriving us in many cases, of the benefits of Trial by Jury:</p>
<p>For transporting us beyond Seas to be tried for pretended offences</p>
<p>For abolishing the free System of English Laws in a neighbouring Province, establishing therein an Arbitrary government, and enlarging its Boundaries so as to render it at once an example and fit instrument for introducing the same absolute rule into these Colonies:</p>
<p>For taking away our Charters, abolishing our most valuable Laws, and altering fundamentally the Forms of our Governments:</p>
<p>For suspending our own Legislatures, and declaring themselves invested with power to legislate for us in all cases whatsoever.</p>
<p>He has abdicated Government here, by declaring us out of his Protection and waging War against us.</p>
<p>He has plundered our seas, ravaged our Coasts, burnt our towns, and destroyed the lives of our people.</p>
<p>He is at this time transporting large Armies of foreign Mercenaries to compleat the works of death, desolation and tyranny, already begun with circumstances of Cruelty &amp; perfidy scarcely paralleled in the most barbarous ages, and totally unworthy the Head of a civilized nation.</p>
<p>He has constrained our fellow Citizens taken Captive on the high Seas to bear Arms against their Country, to become the executioners of their friends and Brethren, or to fall themselves by their Hands.</p>
<p>He has excited domestic insurrections amongst us, and has endeavoured to bring on the inhabitants of our frontiers, the merciless Indian Savages, whose known rule of warfare, is an undistinguished destruction of all ages, sexes and conditions.</p>
</div>
<p>In every stage of these Oppressions We have Petitioned for Redress in the most humble terms: Our repeated Petitions have been answered only by repeated injury. A Prince whose character is thus marked by every act which may define a Tyrant, is unfit to be the ruler of a free people.</p>
<p>Nor have We been wanting in attentions to our Brittish brethren. We have warned them from time to time of attempts by their legislature to extend an unwarrantable jurisdiction over us. We have reminded them of the circumstances of our emigration and settlement here. We have appealed to their native justice and magnanimity, and we have conjured them by the ties of our common kindred to disavow these usurpations, which, would inevitably interrupt our connections and correspondence. They too have been deaf to the voice of justice and of consanguinity. We must, therefore, acquiesce in the necessity, which denounces our Separation, and hold them, as we hold the rest of mankind, Enemies in War, in Peace Friends.</p>
<p>We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do. And for the support of this Declaration, with a firm reliance on the protection of divine Providence, we mutually pledge to each other our Lives, our Fortunes and our sacred Honor.</p>
`;

// Keep in sync with ./doc.css
export const cssProperties = `
.doc {
	font-family: -apple-system, BlinkMacSystemFont, ’Segoe UI’, Roboto, Oxygen, Ubuntu, Cantarell, ’Open Sans’, ’Helvetica Neue’, sans-serif;
}

.doc-dark {
	background: black;
	color: rgb(236, 113, 113);
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

.tippy-box {
	font-family: -apple-system, BlinkMacSystemFont, ’Segoe UI’, Roboto, Oxygen, Ubuntu, Cantarell, ’Open Sans’, ’Helvetica Neue’, sans-serif;
	font-size: 12px;
}
`;
