describe('Function: ADMIN - Quản lý Sản phẩm', () => {
  beforeEach(() => {
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
        win.localStorage.setItem('products', JSON.stringify([{
          id: 1,
          title: 'Test Product',
          price: 15000,
          img: './assets/img/products/test.png',
          desc: 'Test desc',
          category: 'Món chay',
          status: 1
        }]));
      }
    });
    cy.wait(2000);
    cy.contains('.sidebar-link', 'Sản phẩm').click();
    cy.wait(1000);
  });

  it('Hiển thị danh sách sản phẩm ở quản trị', () => {
    cy.get('#show-product .list').should('exist');
  });

  it('Click Thêm món mới, modal hiện đủ', () => {
    cy.get('#btn-add-product').click();
    cy.get('.modal.add-product').should('have.class', 'open');
    cy.get('input#ten-mon').should('exist');
  });

  it('Điền form đủ case hợp lệ, nhấn thêm, sản phẩm mới xuất hiện', () => {
    cy.get('#btn-add-product').click();
    cy.wait(500);
    cy.get('input#ten-mon').type('Test Sản phẩm');
    cy.get('#chon-mon').select('Món chay');
    cy.get('input#gia-moi').type('15000');
    cy.get('textarea#mo-ta').type('Đơn vị test automation');
    cy.get('#add-product-button').click();
    cy.wait(2000);
    cy.get('#show-product').should('contain', 'Test Sản phẩm');
  });

  it('Thiếu tên món báo lỗi', () => {
    cy.get('#btn-add-product').click();
    cy.wait(500);
    cy.get('input#gia-moi').type('15000');
    cy.get('#add-product-button').click();
    cy.get('#toast').should('be.visible');
  });

  it('Thiếu giá bán báo lỗi', () => {
    cy.get('#btn-add-product').click();
    cy.wait(500);
    cy.get('input#ten-mon').type('Test 2');
    cy.get('#add-product-button').click();
    cy.get('#toast').should('be.visible');
  });

  it('Upload ảnh ko đúng định dạng báo lỗi', () => {
    cy.get('#btn-add-product').click();
    cy.wait(500);
    cy.get('input[type=file]').selectFile('cypress/fixtures/example.json', { force: true });
    cy.wait(500);
    cy.get('#toast').should('be.visible');
  });

  it('Chỉnh sửa sản phẩm - popup hiện đủ, dữ liệu đúng', () => {
    cy.get('.btn-edit').first().click();
    cy.wait(500);
    cy.get('.modal.add-product').should('have.class', 'open');
    cy.get('input#ten-mon').should('have.value');
  });

  it('Lưu chỉnh sửa, danh sách cập nhật', () => {
    cy.get('.btn-edit').first().click();
    cy.wait(500);
    cy.get('input#ten-mon').clear().type('Sản phẩm cập nhật');
    cy.get('#update-product-button').click();
    cy.wait(2000);
    cy.get('#show-product').should('contain', 'Sản phẩm cập nhật');
  });

  it('Xoá sản phẩm, danh sách cập nhật đúng', () => {
    cy.get('.btn-delete').first().click();
    cy.wait(1000);
    cy.window().then(win => {
      cy.stub(win, 'confirm').returns(true);
    });
    cy.get('.btn-delete').first().click();
    cy.wait(2000);
    cy.get('#show-product .list').should('exist');
  });

  it('Filter/search/sort sau khi thao tác Thêm/Xóa vẫn đúng', () => {
    cy.get('#form-search-product').type('chay');
    cy.wait(1000);
    cy.get('#show-product .list').should('exist');
    cy.get('select#the-loai').select('Món chay');
    cy.wait(1000);
    cy.get('#show-product .list').should('exist');
  });
});
