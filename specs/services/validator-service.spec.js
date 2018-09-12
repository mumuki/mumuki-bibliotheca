editorTest('Validator Service', (mocks) => {

  let exercise;

  beforeSpec(() => exercise = { fullName: () => 'test' });

  context('#notEmptyString', () => {

    beforeSpec(() => _.merge(exercise, { foo: 'hello' }));

    spec((Validator) => expect(() => Validator.notEmptyString(exercise, 'foo')).to.not.throw());
    spec((Validator) => expect(() => Validator.notEmptyString(exercise, 'bar')).to.throw('test: Field bar is mandatory'));

  });

  context('Choices', () => {
    const choices = (chs) => _.merge(exercise, { choices: chs });

    context('#notEmptyChoices', () => {
      spec((Validator) => expect(() => Validator.notEmptyChoices(choices([{value: 'foo'}, {value: 'bar'}]))).to.not.throw());
      spec((Validator) => expect(() => Validator.notEmptyChoices(choices([{value: 'foo'}]))).to.throw('test: Should have at least two choices'));
    });

    context('#notIncompleteChoices', () => {
      spec((Validator) => expect(() => Validator.notIncompleteChoices(choices([{value: 'foo'}]))).to.not.throw());
      spec((Validator) => expect(() => Validator.notIncompleteChoices(choices([{value: ''}]))).to.throw('test: Has incomplete choices'));
    });
  });

  context('Expectations', () => {
    context('#notIncompleteExpectations', () => {
      const expectations = (exps) => _.merge(exercise, { expectations: exps });

      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations([{binding: 'foo', inspection: 'bar'}]))).to.not.throw());
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations([{binding: 'foo', inspection: ''}]))).to.throw('test: Has incomplete expectations'));
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations([{binding: '', inspection: 'bar'}]))).to.throw('test: Has incomplete expectations'));
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations([{binding: 'foo', inspection: 'uses:'}]))).to.throw('test: Has incomplete expectations'));
    });
  });

  context('Randomizations', () => {
    context('#isIncompleteRandomization', () => {
      const randomizations = (rands) => _.merge(exercise, { needsRandomizations: () => true, randomizations: rands });

      const validRandomizations = { someWord: { type: 'oneOf', value: ['some', 'word'] }, someNumber: { type: 'range', value: [1, 10] } };
      const randomizationsWithBlankReplacee = { '': { type: 'oneOf', value: ['some', 'word'] } };
      const randomizationsWithNoChoices = { someWord: { type: 'oneOf', value: [] } };
      const randomizationsWithOnlyOneChoice = { someWord: { type: 'oneOf', value: ['some'] } };
      const randomizationsWithBlankReplacer = { someWord: { type: 'oneOf', value: ['some', ''] } };
      const randomizationsWithNonNumericRangeLimits = { someNumber: { type: 'range', value: ['1', '10'] } };


      spec((Validator) => expect(() => Validator.validateRandomizations(randomizations(validRandomizations))).to.not.throw());
      spec((Validator) => expect(() => Validator.validateRandomizations(randomizations(randomizationsWithBlankReplacee))).to.throw('test: Has incomplete randomizations'));
      spec((Validator) => expect(() => Validator.validateRandomizations(randomizations(randomizationsWithNoChoices))).to.throw('test: Has incomplete randomizations'));
      spec((Validator) => expect(() => Validator.validateRandomizations(randomizations(randomizationsWithOnlyOneChoice))).to.throw('test: Has incomplete randomizations'));
      spec((Validator) => expect(() => Validator.validateRandomizations(randomizations(randomizationsWithBlankReplacer))).to.throw('test: Has incomplete randomizations'));
      spec((Validator) => expect(() => Validator.validateRandomizations(randomizations(randomizationsWithNonNumericRangeLimits))).to.throw('test: Has incomplete randomizations'));
    });
  });

});

