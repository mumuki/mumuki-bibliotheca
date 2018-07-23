editorTest('Inspection Model', () => {

  let Inspection;

  beforeSpec((_Inspection_) => Inspection = _Inspection_);

  context('#from', () => {
    spec(() => Inspection.from({ verb: 'Except:DoesTypeTest' }).verb.should.be.eql('DoesTypeTest'));
    spec(() => Inspection.from({ verb: 'Assigns' }).verb.should.be.eql('Assigns'));
  });

  context('#smell', () => {
    spec(() => Inspection.smell().isSmell.should.be.eql(true));
  });

  context('#expectation', () => {
    spec(() => Inspection.expectation().isSmell.should.be.eql(false));
  });

  context('#fromSupportedSmell', () => {
    let inspection

    beforeSpec(() => inspection = Inspection.fromSupportedSmell('DoesTypeTest'));

    spec(() => inspection.should.have.property('scope').eql('*'));
    spec(() => inspection.should.have.property('verb').eql('DoesTypeTest'));
    spec(() => inspection.should.have.property('target').eql(''));
  });

  context('#fromSupportedExpectation', () => {
    let inspection

    beforeSpec(() => inspection = Inspection.fromSupportedExpectation('Assigns:'));

    spec(() => inspection.should.have.property('scope').eql(''));
    spec(() => inspection.should.have.property('verb').eql('Assigns:'));
    spec(() => inspection.should.have.property('target').eql(''));
  });

  context('#fromServer', () => {

    let inspection;

    context('is a smell', () => {
      beforeSpec(() => inspection = Inspection.fromServer({ binding: '*', inspection: 'Except:DoesTypeTest' }))
      spec(() => inspection.should.have.property('scope').eql('*'));
      spec(() => inspection.should.have.property('verb').eql('DoesTypeTest'));
      spec(() => inspection.should.have.property('target').eql(''));
    })

    context('is an expectation', () => {
      beforeSpec(() => inspection = Inspection.fromServer({ binding: 'foo', inspection: 'Assigns:bar' }))
      spec(() => inspection.should.have.property('scope').eql('foo'));
      spec(() => inspection.should.have.property('verb').eql('Assigns:'));
      spec(() => inspection.should.have.property('target').eql('bar'));
    })
  });

  context('#asString', () => {
    spec(() => Inspection.smell({ verb: 'DoesTypeTest' }).asString().should.be.eql('* Except:DoesTypeTest'));
    spec(() => Inspection.expectation({ scope: 'foo', verb: 'Assigns:', target: 'bar' }).asString().should.be.eql('foo Assigns:bar'));
  });

  context('#asString', () => {
    spec(() => Inspection.smell({ verb: 'DoesTypeTest' }).asBindingInspection().should.be.eql({ binding: '*', inspection: 'Except:DoesTypeTest' }));
    spec(() => Inspection.expectation({ scope: 'foo', verb: 'Assigns:', target: 'bar' }).asBindingInspection().should.be.eql({ binding: 'foo', inspection: 'Assigns:bar' }));
  });

});

