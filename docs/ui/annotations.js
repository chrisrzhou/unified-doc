import React from 'react';

import { Box, FlexLayout, Link, Text } from '.';

export function Annotations({
	annotations,
	onClearAnnotations,
	onRemoveAnnotation,
}) {
	return (
		<FlexLayout alignItems="center" flexWrap="wrap" space="xs">
			{annotations.map((annotation) => {
				const { anchor, id, value, classNames } = annotation;
				const text = (
					<Text
						className={classNames.join(' ')}
						sx={{
							maxWidth: 200,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
						variant="token">
						{value}
					</Text>
				);
				return (
					<Box
						key={id}
						px="s"
						sx={{
							borderColor: anchor ? 'link' : 'border',
							borderRadius: 'm',
							borderStyle: 'solid',
							borderWidth: 1,
						}}>
						<FlexLayout alignItems="center" space="s">
							{anchor ? (
								<Link
									href={`#${id}`}
									sx={{ color: 'unset', textDecoration: 'none' }}>
									{text}
								</Link>
							) : (
								text
							)}
							<Text
								variant="icon"
								onClick={() => onRemoveAnnotation(annotation)}>
								×
							</Text>
						</FlexLayout>
					</Box>
				);
			})}
			{annotations.length > 0 && (
				<Text variant="icon" onClick={onClearAnnotations}>
					×
				</Text>
			)}
		</FlexLayout>
	);
}
