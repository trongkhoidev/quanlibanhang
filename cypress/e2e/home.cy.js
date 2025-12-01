describe('Trang chủ Web Bán Hàng', () => {
  it('Hiển thị tiêu đề trang', () => {
    cy.visit('index.html');
    cy.contains('Vy Food').should('exist');
  });

  it('Kiểm tra banner hiện ra', () => {
    cy.visit('index.html');
    cy.get('img[src*="banner"]').should('exist');
  });
});
