
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

});

