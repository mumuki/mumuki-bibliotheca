editorTest('Foldable Service', (mocks) => {

  let Foldable, $scope;

  beforeSpec((_Foldable_, _$rootScope_) => {
    Foldable = _Foldable_;
    $scope = _$rootScope_;
  });

  const foldableWith = (content) => {
    $scope.content = content;
    Foldable.from($scope);
    return $scope;
  };

  it('starts folded when the field is empty', () => {
    foldableWith('').isMinimized().should.be.ok;
  });

  it('starts unfolded when the field has content', () => {
    foldableWith('asd').isMinimized().should.not.be.ok;
  });

});
