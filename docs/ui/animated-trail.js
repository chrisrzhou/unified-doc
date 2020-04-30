import React from 'react';
import { animated, useTrail } from 'react-spring';

export default function AnimatedTrail({
	duration = 1000,
	from = { opacity: 0 },
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
					<animated.div key={item.id || i} style={style}>
						{renderItem(item)}
					</animated.div>
				);
			})}
		</>
	);
}
