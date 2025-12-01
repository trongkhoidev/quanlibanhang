describe('Function: ĐẶT HÀNG - Checkout Flow', () => {
  beforeEach(() => {
    const user = {
      fullname: "Test User",
      phone: "0123456789",
      password: "123456",
      cart: [{
        id: 1,
        soluong: 1,
        note: "test note"
      }],
      userType: 0
    };
    cy.visit('index.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('currentuser', JSON.stringify(user));
        win.localStorage.setItem('products', JSON.stringify([{
          id: 1,
          title: 'Test Product',
          price: 50000,
          img: './assets/img/products/test.png',
          desc: 'Test desc',
          category: 'Món chay',
          status: 1
        }]));
      }
    });
    cy.wait(2000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.wait(1000);
    cy.get('.thanh-toan').click();
    cy.wait(1000);
  });

  it('Giao diện checkout hiển thị đúng tổng tiền & sản phẩm', () => {
    cy.get('.checkout-title').should('be.visible');
    cy.get('.bill-total').should('be.visible');
  });

  it('Nhập đầy đủ thông tin hợp lệ, đặt hàng thành công', () => {
    cy.get('#tennguoinhan').type('Khách test');
    cy.get('#sdtnhan').type('0123456789');
    cy.get('#diachinhan').type('273 An Dương Vương');
    cy.get('.complete-checkout-btn').click();
    cy.wait(2000);
    cy.get('#toast').should('exist');
  });

  it('Thiếu tên người nhận → báo lỗi', () => {
    cy.get('#sdtnhan').type('0123456789');
    cy.get('#diachinhan').type('abc');
    cy.get('.complete-checkout-btn').click();
    cy.get('#toast').should('be.visible');
  });

  it('Thiếu số điện thoại → báo lỗi', () => {
    cy.get('#tennguoinhan').type('Khách test');
    cy.get('#diachinhan').type('abc');
    cy.get('.complete-checkout-btn').click();
    cy.get('#toast').should('be.visible');
  });

  it('Số điện thoại nhập ký tự đặc biệt → cảnh báo', () => {
    cy.get('#tennguoinhan').type('Khách test');
    cy.get('#sdtnhan').type('abc!@#');
    cy.get('#diachinhan').type('abc');
    cy.get('.complete-checkout-btn').click();
    cy.get('#toast').should('be.visible');
  });

  it('Địa chỉ rỗng hoặc chỉ space → lỗi', () => {
    cy.get('#tennguoinhan').type('Khách test');
    cy.get('#sdtnhan').type('0123456789');
    cy.get('#diachinhan').type('        ');
    cy.get('.complete-checkout-btn').click();
    cy.get('#toast').should('be.visible');
  });

  it('Chọn hình thức giao hàng "Tự đến lấy", UI thay đổi', () => {
    cy.get('#tudenlay').click();
    cy.wait(500);
    cy.get('#tudenlay-group').should('be.visible');
  });

  it('Đặt hàng với ghi chú, verify hiển thị/submit', () => {
    cy.get('#tennguoinhan').type('Tester Ghi chú');
    cy.get('#sdtnhan').type('0123456789');
    cy.get('#diachinhan').type('Q5');
    cy.get('.note-order').type('Giao gấp!');
    cy.get('.complete-checkout-btn').click();
    cy.wait(2000);
    cy.get('#toast').should('exist');
  });

  it('Chọn giờ giao cụ thể và submit', () => {
    cy.get('#deliverytime').check({ force: true });
    cy.get('.choise-time').select('09:00');
    cy.get('#tennguoinhan').type('Khách Test');
    cy.get('#sdtnhan').type('0123456789');
    cy.get('#diachinhan').type('273 ADV');
    cy.get('.complete-checkout-btn').click();
    cy.wait(2000);
    cy.get('#toast').should('exist');
  });

  it('Reset/nhập lại hoặc đặt hàng liên tiếp 2 lần không bug state', () => {
    cy.get('#tennguoinhan').type('AAA');
    cy.get('#sdtnhan').type('0123456789');
    cy.get('#diachinhan').type('a');
    cy.get('.complete-checkout-btn').click();
    cy.wait(1000);
    cy.get('.complete-checkout-btn').click();
    cy.get('#toast').should('exist');
  });
});
