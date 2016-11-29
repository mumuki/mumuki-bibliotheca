
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
      const expectations = (ne, exps) => _.merge(exercise, { new_expectations: ne, expectations: exps });

      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(false, [{binding: 'foo', inspection: 'bar'}]))).to.not.throw());
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(false, [{binding: 'foo', inspection: ''}]))).to.throw('test: Has incomplete expectations'));
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(false, [{binding: '', inspection: 'bar'}]))).to.throw('test: Has incomplete expectations'));
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(true, [{subject: 'foo', verb: 'bar', object: 'baz'}]))).to.not.throw());
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(true, [{subject: '', verb: 'bar', object: 'baz'}]))).to.throw('test: Has incomplete expectations'));
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(true, [{subject: 'foo', verb: '', object: 'baz'}]))).to.throw('test: Has incomplete expectations'));
      spec((Validator) => expect(() => Validator.notIncompleteExpectations(expectations(true, [{subject: 'foo', verb: 'bar', object: ''}]))).to.throw('test: Has incomplete expectations'));
    });
  });

});

