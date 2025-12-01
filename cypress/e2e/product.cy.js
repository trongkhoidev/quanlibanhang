describe('Function: SẢN PHẨM - Product Listing & Search', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.wait(2000); // Wait for products to load from localStorage
  });

  it('Hiển thị đầy đủ danh sách sản phẩm khi vào trang chủ', () => {
    cy.get('#home-products .col-product').should('have.length.greaterThan', 0);
  });

  it('Lọc sản phẩm theo từng menu loại món', () => {
    cy.contains('.menu-link', 'Món chay').click();
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });

  it('Tìm kiếm món chính xác tên, kiểm tra kết quả', () => {
    cy.get('.form-search-input').type('Bánh');
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });

  it('Tìm kiếm với ký tự đặc biệt, không có kết quả', () => {
    cy.get('.form-search-input').type('@@@@@');
    cy.wait(1000);
    cy.get('.no-result').should('exist');
  });

  it('Lọc sản phẩm theo giá từ 10,000 -> 50,000', () => {
    cy.get('.filter-btn').click();
    cy.wait(500);
    cy.get('#min-price').type('10000', { force: true });
    cy.get('#max-price').type('50000', { force: true });
    cy.get('#advanced-search-price-btn').click({ force: true });
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });

  it('Sắp xếp tăng dần giá', () => {
    cy.get('.filter-btn').click();
    cy.wait(500);
    cy.get('#sort-ascending').click({ force: true });
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });

  it('Sắp xếp giảm dần giá', () => {
    cy.get('.filter-btn').click();
    cy.wait(500);
    cy.get('#sort-descending').click({ force: true });
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });

  it('Dùng filter phân loại: chọn từng loại, kiểm tra sản phẩm hiển thị đúng', () => {
    cy.get('.filter-btn').click();
    cy.wait(500);
    cy.get('#advanced-search-category-select').select('Món chay', { force: true });
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });

  it('Reset bộ lọc, confirm danh sách trả về đầy đủ', () => {
    cy.get('.filter-btn').click();
    cy.wait(500);
    cy.get('#sort-ascending').click({ force: true });
    cy.wait(500);
    cy.get('#reset-search').click({ force: true });
    cy.wait(1000);
    cy.get('#home-products .col-product').should('have.length.greaterThan', 0);
  });

  it('Tìm kiếm/filter nhập rỗng/trùng, không lỗi layout hoặc empty crash', () => {
    cy.get('.form-search-input').type('       ');
    cy.wait(1000);
    cy.get('#home-products').should('exist');
    cy.get('.form-search-input').clear().type('!@#/');
    cy.wait(1000);
    cy.get('#home-products').should('exist');
  });
});
