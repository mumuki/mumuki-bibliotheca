
editorTest('Exercise Model', () => {

  const exercise1 = { id: 10, name: 'foo' };
  const exercise2 = { id: 20, name: 'bar' };
  const exercise3 = { id: 30, name: 'baz' };

  let exercise;
  let Exercise;
  let guide = { exercises: [ exercise1, exercise2, exercise3 ], language: 'haskell' };

  beforeSpec((_Exercise_) => Exercise = _Exercise_);
  beforeSpec((_Languages_) => _Languages_.set([{ name: 'haskell' }, { name: 'text' }]));
  beforeSpec((_CurrentItem_) => _CurrentItem_.set(guide))

  context('#icon', () => {
    spec(() => Exercise.from({ language: 'haskell' }).icon().should.be.eql('da da-haskell'));
  });

  context('#fullName', () => {
    spec(() => Exercise.from(exercise2).fullName().should.be.eql('2. bar'));
  });

  context('#getLanguage', () => {
    spec(() => Exercise.from({}).getLanguage().should.be.eql('haskell'));
    spec(() => Exercise.from({ language: 'text' }).getLanguage().should.be.eql('text'));
  });

  context('#setLanguage', () => {
    beforeSpec(() => exercise = Exercise.from({ language: 'text'}));

    it('when is equal to guide language', () => {
      exercise.setLanguage('haskell');
      exercise.should.not.have.property('language');
    });
    it('when is different to guide language', () => {
      exercise.setLanguage('gobstones');
      exercise.should.have.property('language').eql('gobstones');
    });
  });

  context('#validation', () => {
    context('#default', () => {
      beforeSpec((_Editor_) => sinon.stub(_Editor_, 'default', () => ({ transformFromServer: () => {}, validate: () => {} })));
      beforeSpec(() => exercise = Exercise.from({
        name: 'example',
        type: 'problem',
        layout: 'input_right',
        description: 'description',
      }));

      spec(() => expect(() => exercise.validate()).to.not.throw());
      spec(() => expect(() => _.omit(exercise, 'name').validate()).to.throw());
      spec(() => expect(() => _.omit(exercise, 'type').validate()).to.throw());
      spec(() => expect(() => _.omit(exercise, 'layout').validate()).to.throw());
      spec(() => expect(() => _.omit(exercise, 'description').validate()).to.throw());

      afterSpec((_Editor_) => _Editor_.default.restore());
    });
    context('#single_choice', () => {
      beforeSpec(() => exercise.editor = 'single_choice');

      spec(() => {
        exercise.choices = [];
        expect(() => exercise.validate()).to.throw('Should have at least two choices');
      });
      spec(() => {
        exercise.choices = [{value: 'foo'}];
        expect(() => exercise.validate()).to.throw('Should have at least two choices');
      });
      spec(() => {
        exercise.choices = [{value: 'foo'}, {value: ''}];
        expect(() => exercise.validate()).to.throw('Has incomplete choices');
      });
      spec(() => {
        exercise.setLanguage('text');
        exercise.choices = [{value: 'foo'}, {value: 'bar'}];
        expect(() => exercise.validate()).to.throw('Shoud have only one choice selected');
      });
      spec(() => {
        exercise.setLanguage('text');
        exercise.choices = [{value: 'foo', checked: true}, {value: 'bar', checked: true}];
        expect(() => exercise.validate()).to.throw('Shoud have only one choice selected');
      });
      spec(() => {
        exercise.setLanguage('text');
        exercise.test = 'it "one is one" $ do 1 `shouldBe 1`';
        exercise.choices = [{value: 'foo'}, {value: 'bar', checked: true}];
        expect(() => exercise.validate()).to.not.throw();
      });
      spec(() => {
        exercise.setLanguage('text');
        exercise.choices = [{value: 'foo'}, {value: 'bar', checked: true}];
        expect(() => exercise.validate()).to.not.throw();
      });
      spec(() => {
        exercise.setLanguage('haskell');
        exercise.choices = [{value: 'foo'}, {value: 'bar', checked: true}];
        expect(() => exercise.validate()).to.throw('Should not have choices selected');
      });
      spec(() => {
        exercise.setLanguage('haskell');
        exercise.test = '';
        exercise.expectations = [];
        exercise.choices = [{value: 'foo'}, {value: 'bar'}];
        expect(() => exercise.validate()).to.throw('Should have at least one test, one expectation or evaluation should be manual');
      });
      spec(() => {
        exercise.setLanguage('haskell');
        exercise.choices = [{value: 'foo'}, {value: 'bar'}];
        exercise.test = 'it "one is one" $ do 1 `shouldBe 1`';
        expect(() => exercise.validate()).to.not.throw();
      });
      spec(() => {
        exercise.setLanguage('haskell');
        exercise.choices = [{value: 'foo'}, {value: 'bar'}];
        exercise.expectations = [{binding: 'foo', inspection: 'HasUsage:bar'}];
        expect(() => exercise.validate()).to.not.throw();
      });

    });
  });

  context('#isTextlanguage', () => {
    spec(() => Exercise.from({ language: 'text' }).isTextLanguage().should.be.true);
    spec(() => Exercise.from({ language: 'haskell' }).isTextLanguage().should.be.false);
  });

  context('#hasTest', () => {
    spec(() => Exercise.from({}).hasTest().should.be.false);
    spec(() => Exercise.from({ test: '' }).hasTest().should.be.false);
    spec(() => Exercise.from({ test: 'foo' }).hasTest().should.be.true);
  });

  context('#hasExpectations', () => {
    spec(() => Exercise.from({ expectations: [] }).hasExpectations().should.be.false);
    spec(() => Exercise.from({ expectations: [{}] }).hasExpectations().should.be.true);
  });

  const choices = (chs) => Exercise.from({ choices: chs });

  context('#hasAnyChoiceSelected', () => {
    spec(() => choices([{checked: true}]).hasAnyChoiceSelected().should.be.true);
    spec(() => choices([{checked: false}]).hasAnyChoiceSelected().should.be.false);
  });

  context('#hasOneChoiceSelected', () => {
    spec(() => choices([{checked: true}, {checked: true}]).hasOneChoiceSelected().should.be.false);
    spec(() => choices([{checked: true}, {checked: false}]).hasOneChoiceSelected().should.be.true);
    spec(() => choices([{checked: false}, {checked: false}]).hasOneChoiceSelected().should.be.false);
  });

  context('#hasMoreThanOneChoiceSelected', () => {
    spec(() => choices([{checked: true}, {checked: true}]).hasMoreThanOneChoiceSelected().should.be.true);
    spec(() => choices([{checked: true}, {checked: false}]).hasMoreThanOneChoiceSelected().should.be.false);
    spec(() => choices([{checked: false}, {checked: false}]).hasMoreThanOneChoiceSelected().should.be.false);
  });

  context('#from', () => {
    beforeSpec(() => exercise = Exercise.from({}));

    spec(() => exercise.should.have.property('name').eql('New exercise'));
    spec(() => exercise.should.have.property('type').eql('problem'));
    spec(() => exercise.should.have.property('editor').eql('code'));
    spec(() => exercise.should.have.property('layout').eql('input_right'));
    spec(() => exercise.should.have.property('test').eql(''));
    spec(() => _.keys(exercise).length.should.be.eql(5));
  });

});

