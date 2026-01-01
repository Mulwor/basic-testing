import { generateLinkedList } from './index';
import { linkedList, elements } from './linkedList';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const valuesList = generateLinkedList(elements);
    expect(valuesList).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    const valuesList = generateLinkedList(elements);
    expect(valuesList).toMatchSnapshot();
  });
});
