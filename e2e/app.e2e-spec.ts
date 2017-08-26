import { ElectroPage } from './app.po';

describe('electro App', () => {
  let page: ElectroPage;

  beforeEach(() => {
    page = new ElectroPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
