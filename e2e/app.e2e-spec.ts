import { Ng2EducationPage } from './app.po';

describe('ng2-education App', function() {
  let page: Ng2EducationPage;

  beforeEach(() => {
    page = new Ng2EducationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
