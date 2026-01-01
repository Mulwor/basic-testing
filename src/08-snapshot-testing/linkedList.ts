export const linkedList = {
  value: 'head',
  next: {
    value: { id: 1, value: 'Node 1', tags: ['a', 'b'] },
    next: {
      value: { id: 2, value: 'Node 2', active: true },
      next: {
        value: [10, 20, 30],
        next: {
          value: {
            nested: {
              deep: {
                value: 'I am tired ;-( ',
              },
            },
          },
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  },
};

export const elements = [
  'head',
  { id: 1, value: 'Node 1', tags: ['a', 'b'] },
  { id: 2, value: 'Node 2', active: true },
  [10, 20, 30],
  {
    nested: {
      deep: {
        value: 'I am tired ;-( ',
      },
    },
  },
];
