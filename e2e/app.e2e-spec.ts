import { CcViewerPage } from './app.po';

describe('cc-viewer App', function() {
  let page: CcViewerPage;

  beforeEach(() => {
    page = new CcViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
