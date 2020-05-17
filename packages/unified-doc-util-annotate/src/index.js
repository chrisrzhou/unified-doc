import visit from 'unist-util-visit-parents';
import { v4 as uuidv4 } from 'uuid';

import getAnnotatedNodes from './get-annotated-nodes';
import validateAnnotations from './validate-annotations';

/**
 * Annotation algorithm:
 * - Validate and sort annotations (check id, startOffset, endOffset)
 * - Visit all text nodes of the tree.
 * - Use the fact that annotations are sorted to:
 * 		- Move to next annotation if they occur before the current text node.
 * 		- Skip remaining annotations if they occur after the current text node.
 * - Keep track of various hashmaps for easy lookups when annotations and text node overlap:
 * 		- allAnnotations: normalized map of annotations
 *		- allNodes: normalized map of text nodes (with generated uuids)
 *		- a2n: For each annotation ID, track overlapping text nodes.  The order of the text nodes is important.
 *		- n2a: For each text node ID, track overlapping annotations.
 * - With the hashmaps, use the getAnnotatedNodes method to split the current text node into nodeSegments (every possible segment of text node that is overlapping with annotations).
 * 		- For the current text node, segment the node by checking all possible offset intervals using n2a hashmap.
 * 		- Keep track of relevant data for the node segment (startOffset, endOffset, annotations, value), which will be needed to construct new hast nodes.
 * 		- If nodeSegments do not contain annotations, construct a <text /> node.
 * 		- If nodeSegments contain annotations, construct a <mark /> node and apply relevant annotation data and callbacks.  Keep track of which nodeSegments represents the start/end of the annotation.
 * - Replace the current text node with the annotated nodeSegments by splicing it in place under its parents.
 * - Return the mutated tree.
 */
export default function annotate(tree, annotations, annotationCallbacks) {
  const validatedAnnotations = validateAnnotations(annotations);
  const allAnnotations = validatedAnnotations.reduce(
    (map, annotation) => ({
      ...map,
      [annotation.id]: annotation,
    }),
    {},
  );
  const allNodes = {};
  const a2n = {};
  const n2a = {};

  visit(tree, 'text', (node, parents) => {
    const nodeId = uuidv4();
    const parent = parents[parents.length - 1]; // Get immediate parent

    // If annotation occurs before node, continue to next.
    // If it is after, break out because there is nothing left to find.
    for (const annotation of validatedAnnotations) {
      const { id: annotationId } = annotation;
      if (annotation.startOffset > node.position.end.offset) {
        break;
      } else if (annotation.endOffset < node.position.start.offset) {
        continue;
      } else {
        if (!n2a[nodeId]) {
          n2a[nodeId] = [];
        }

        if (!a2n[annotationId]) {
          a2n[annotationId] = [];
        }

        // Keep track of all hashmaps
        if (node.value && node.value !== '\n') {
          allAnnotations[annotationId] = annotation;
          allNodes[nodeId] = { node, parent };
          n2a[nodeId].push(annotationId);
          a2n[annotationId].push(nodeId);
        }
      }
    }
  });

  const annotationData = {
    allAnnotations,
    a2n,
    n2a,
  };

  Object.keys(allNodes).forEach((nodeId) => {
    const { node, parent } = allNodes[nodeId];
    const siblings = parent.children;

    if (!Array.isArray(siblings)) {
      return;
    }

    const annotatedNodes = getAnnotatedNodes(
      node,
      nodeId,
      annotationData,
      annotationCallbacks,
    );

    // Reconstruct nodes under parent
    const currentNodeIndex = siblings.indexOf(node);
    parent.children = siblings
      .slice(0, currentNodeIndex)
      .concat(annotatedNodes)
      .concat(siblings.slice(currentNodeIndex + 1));
  });

  return tree;
}
