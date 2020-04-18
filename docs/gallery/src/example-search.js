import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Layout from './layout';
import { content } from '../../src/data';
import { FlexLayout, Input, Link, Text } from '../../ui';

const SNIPPET_CHARS = 20;
const MIN_QUERY_LENGTH = 3;

export function getSearchResults(searchInput) {
	const searchInputRegExp = new RegExp(searchInput, 'gi');

	const searchResults = [];
	let match;
	if (searchInput && searchInput.length >= MIN_QUERY_LENGTH) {
		while ((match = searchInputRegExp.exec(content)) !== null) {
			const startOffset = match.index;
			const endOffset = searchInputRegExp.lastIndex;
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

	return searchResults;
}

function ExampleSearch() {
	const [searchResults, setSearchResults] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	function submitSearch(event) {
		event.preventDefault();
		const searchResults = getSearchResults(searchInput);

		setSearchQuery(searchInput);
		setSearchResults(searchResults);
	}

	const sidebar = (
		<FlexLayout flexDirection="column">
			<form onSubmit={submitSearch}>
				<Input
					id="search-input"
					label="Search"
					placeholder="e.g. ’alice’, ’wonder’, ’oh dear’"
					value={searchInput}
					onChange={(value) => {
						setSearchInput(value);
					}}
				/>
			</form>
			{searchQuery.length < MIN_QUERY_LENGTH && (
				<Text variant="help">
					Search term must be at least {MIN_QUERY_LENGTH} characters long.
				</Text>
			)}
			{searchQuery.length >= MIN_QUERY_LENGTH && searchResults.length === 0 && (
				<Text variant="help">No results found.</Text>
			)}
			<ul>
				{searchResults.map(({ id, snippet }) => {
					const [left, right] = snippet.split(new RegExp(searchQuery, 'gi'));
					const matched = snippet.slice(
						left.length,
						left.length + searchQuery.length,
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

export default ExampleSearch;