const exampleDomTree = [
  {
    tagName: 'div', id: 'testId1', classList: ['class1', 'class2'], attributes: { attr1: 'value1', attr2: 'value2' },
    children: [
      {
        tagName: 'div', id: 'testId2', classList: ['class1', 'class2'], attributes: { attr1: 'value1', attr2: 'value2' },
        children: [
          { tagName: 'div', id: 'testId3', classList: ['class1', 'class2'], attributes: { attr1: 'value1', attr2: 'value2' } }
        ]
      },
      { tagName: 'div', id: 'testId4', classList: ['class1', 'class2'], attributes: { attr1: 'value1', attr2: 'value2' } }
    ]
  },
  { tagName: 'div', id: 'testId5', classList: ['class1', 'class2'], attributes: { attr1: 'value1', attr2: 'value2' } }
]

export { exampleDomTree };
