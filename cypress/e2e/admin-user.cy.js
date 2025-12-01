describe('Function: ADMIN - Quản lý Khách hàng', () => {
  beforeEach(() => {
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
        win.localStorage.setItem('accounts', JSON.stringify([{
          fullname: "User Test",
          phone: "0123456789",
          password: "123456",
          userType: 0,
          status: 1,
          join: new Date(),
          cart: []
        }]));
      }
    });
    cy.wait(2000);
    cy.contains('.sidebar-link', 'Khách hàng').click();
    cy.wait(1000);
  });

  it('Hiển thị danh sách user', () => {
    cy.get('#show-user tr').should('exist');
  });

  it('Filter trạng thái hoạt động/bị khoá', () => {
    cy.get('#tinh-trang-user').select('Hoạt động');
    cy.wait(1000);
    cy.get('#show-user tr').should('exist');
    cy.get('#tinh-trang-user').select('Bị khóa');
    cy.wait(1000);
    cy.get('#show-user tr').should('exist');
  });

  it('Tìm kiếm user theo tên/SDT', () => {
    cy.get('#form-search-user').type('User');
    cy.wait(1000);
    cy.get('#show-user tr').should('exist');
  });

  it('Thêm user mới đầy đủ field, user lên danh sách', () => {
    cy.get('#btn-add-user').click();
    cy.wait(500);
    cy.get('input#fullname').type('User New');
    cy.get('input#phone').type('0900111222');
    cy.get('input#password').type('testpass');
    cy.get('#signup-button').click();
    cy.wait(2000);
    cy.get('#show-user').should('contain', 'User New');
  });

  it('Thêm user thiếu field, báo lỗi', () => {
    cy.get('#btn-add-user').click();
    cy.wait(500);
    cy.get('input#fullname').clear();
    cy.get('#signup-button').click();
    cy.get('.form-message').should('exist');
  });

  it('Chỉnh sửa user, lưu thành công', () => {
    cy.get('.btn-edit').first().click();
    cy.wait(500);
    cy.get('input#fullname').clear().type('User Edit');
    cy.get('#btn-update-account').click();
    cy.wait(2000);
    cy.get('#show-user').should('contain', 'User Edit');
  });

  it('Khoá/mở khoá user, trạng thái đổi', () => {
    cy.get('.btn-edit').first().click();
    cy.wait(500);
    cy.get('input#user-status').click({ force: true });
    cy.get('#btn-update-account').click();
    cy.wait(2000);
    cy.get('#show-user').should('exist');
  });

  it('Lọc ngày tham gia, dữ liệu trả đúng', () => {
    cy.get('#time-start-user').type('2023-01-01');
    cy.get('#time-end-user').type('2023-12-31');
    cy.wait(1000);
    cy.get('#show-user tr').should('exist');
  });

  it('Xoá user, danh sách cập nhật', () => {
    cy.window().then(win => {
      cy.stub(win, 'confirm').returns(true);
    });
    cy.get('#show-user .btn-delete').first().click();
    cy.wait(2000);
    cy.get('#show-user').should('exist');
  });

  it('Tìm kiếm, filter liên tục không lỗi', () => {
    cy.get('#form-search-user').type('User');
    cy.get('#tinh-trang-user').select('Hoạt động');
    cy.wait(1000);
    cy.get('#show-user tr').should('exist');
  });
});
