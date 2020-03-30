import React from 'react';
import { animated, useTrail } from 'react-spring';

export function AnimatedTrail({
	duration = 1000,
	from = { opacity: 0 },
	idAccessor = item => item.id,
	items,
	to = { opacity: 1 },
	renderItem,
}) {
	const trail = useTrail(items.length, {
		config: { duration },
		from,
		to,
	});
	return (
		<>
			{trail.map((style, i) => {
				const item = items[i];
				return (
					<animated.div key={idAccessor(item) || i} style={style}>
						{renderItem(item)}
					</animated.div>
				);
			})}
		</>
	);
}
