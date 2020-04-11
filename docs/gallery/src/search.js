import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Layout from './layout';
import { content } from '../../src/data';
import { FlexLayout, Input, Link } from '../../ui';

const SNIPPET_CHARS = 20;

function Search() {
	const [searchResults, setSearchResults] = useState([]);
	const [query, setQuery] = useState('');
	const queryRegexp = new RegExp(query, 'gi');

	function submitSearch(event) {
		event.preventDefault();
		const searchResults = [];
		let match;
		if (query) {
			while ((match = queryRegexp.exec(content)) !== null) {
				const startOffset = match.index;
				const endOffset = queryRegexp.lastIndex;
				const snippet = content.slice(
					Math.max(0, startOffset - SNIPPET_CHARS),
					Math.min(content.length, endOffset + SNIPPET_CHARS),
				);

				searchResults.push({
					// Similar shape as annotation
					id: uuidv4(),
					startOffset,
					endOffset,
					snippet,
				});
			}
		}

		setSearchResults(searchResults);
	}

	const sidebar = (
		<FlexLayout flexDirection="column">
			<form onSubmit={submitSearch}>
				<Input
					id="search-input"
					label="Search"
					placeholder="e.g. ’alice’, ’wonder’, ’oh dear’"
					value={query}
					onChange={setQuery}
				/>
			</form>
			<ul>
				{searchResults.map(({ id, snippet }) => {
					const [left, right] = snippet.split(queryRegexp);
					const matched = snippet.slice(
						left.length,
						left.length + query.length,
					);
					return (
						<li key={id}>
							<Link key={id} href={`#${id}`} sx={{ fontSize: 's' }}>
								{left}
								<strong>
									<code>{matched}</code>
								</strong>
								{right}
							</Link>
						</li>
					);
				})}
			</ul>
		</FlexLayout>
	);

	const docProps = {
		annotations: searchResults,
		content,
	};

	return <Layout docProps={docProps} name="search" sidebar={sidebar} />;
}

export default Search;
