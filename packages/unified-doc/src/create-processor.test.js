import createProcessor from './create-processor';

describe('createProcessor', () => {
  it('should parse text (default) content', () => {
    const processor = createProcessor();
    const tree = processor.parse('\na to the \nb to the \n\nc to the d');
    expect(tree).toEqual({
      type: 'root',
      children: [
        {
          type: 'text',
          value: '\na to the \nb to the \n\nc to the d',
          position: {
            start: {
              column: 1,
              line: 1,
              offset: 0,
            },
            end: {
              column: 11,
              line: 5,
              offset: 32,
            },
          },
        },
      ],
    });
  });

  it('should parse html content', () => {
    const processor = createProcessor({ contentType: 'html' });
    const tree = processor.parse('<div>some <h1>heading</h1> content</div>');

    // TODO debug why processor is not using sanitize plugin in test
    expect(tree.children[0].children[1].children).toEqual([
      {
        type: 'element',
        tagName: 'div',
        properties: {},
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 41,
            offset: 40,
          },
        },
        children: [
          {
            type: 'text',
            value: 'some ',
            position: {
              start: {
                line: 1,
                column: 6,
                offset: 5,
              },
              end: {
                line: 1,
                column: 11,
                offset: 10,
              },
            },
          },
          {
            type: 'element',
            tagName: 'h1',
            properties: {},
            position: {
              start: {
                line: 1,
                column: 11,
                offset: 10,
              },
              end: {
                line: 1,
                column: 27,
                offset: 26,
              },
            },
            children: [
              {
                type: 'text',
                value: 'heading',
                position: {
                  start: {
                    line: 1,
                    column: 15,
                    offset: 14,
                  },
                  end: {
                    line: 1,
                    column: 22,
                    offset: 21,
                  },
                },
              },
            ],
          },
          {
            type: 'text',
            value: ' content',
            position: {
              start: {
                line: 1,
                column: 27,
                offset: 26,
              },
              end: {
                line: 1,
                column: 35,
                offset: 34,
              },
            },
          },
        ],
      },
    ]);
  });

  it('should parse markdown content', () => {
    const processor = createProcessor({ contentType: 'markdown' });
    const tree = processor.parse('# heading');
    expect(tree.children).toEqual([
      {
        type: 'heading',
        depth: 1,
        position: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 10,
            offset: 9,
          },
          indent: [],
        },
        children: [
          {
            type: 'text',
            value: 'heading',
            position: {
              start: {
                line: 1,
                column: 3,
                offset: 2,
              },
              end: {
                line: 1,
                column: 10,
                offset: 9,
              },
              indent: [],
            },
          },
        ],
      },
    ]);
  });
});
