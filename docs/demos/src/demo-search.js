import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Layout from './layout';
import { content } from '../../src/data';
import { FlexLayout, Input, Link, Text } from '../../ui';

const SNIPPET_CHARS = 20;
const MIN_QUERY_LENGTH = 3;

export function search(content, query) {
	const searchInputRegExp = new RegExp(query, 'gi');

	const searchResults = [];
	let match;
	if (query && query.length >= MIN_QUERY_LENGTH) {
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
				value: content.slice(startOffset, endOffset),
			});
		}
	}

	return searchResults;
}

function DemoSearch() {
	const [searchResults, setSearchResults] = useState([]);
	const [query, setQuery] = useState('');
	const [submittedQuery, setSubmittedQuery] = useState('');

	function submitSearch(event) {
		event.preventDefault();
		const searchResults = search(content, query);
		setSubmittedQuery(query);
		setSearchResults(searchResults);
	}

	const sidebar = (
		<FlexLayout flexDirection="column">
			<form onSubmit={submitSearch}>
				<Input
					id="search-input"
					label="Search"
					placeholder="e.g. ’alice’, ’rabbit’, ’wonder’"
					value={query}
					onChange={setQuery}
				/>
			</form>
			{submittedQuery.length < MIN_QUERY_LENGTH && (
				<Text variant="help">
					Search term must be at least {MIN_QUERY_LENGTH} characters long.
				</Text>
			)}
			{submittedQuery.length >= MIN_QUERY_LENGTH &&
				searchResults.length === 0 && (
					<Text variant="help">No results found.</Text>
				)}
			<ul>
				{searchResults.map(({ id, snippet }) => {
					const [left, right] = snippet.split(new RegExp(submittedQuery, 'gi'));
					const matched = snippet.slice(
						left.length,
						left.length + submittedQuery.length,
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

export default DemoSearch;
