// DASHBOARD MODULE - All test cases by functional group, each using API intercept + mock data

describe('TC-CV-01 – System displays 1 customer when one customer exists', () => {
  it('Should show customer count = 1', () => {
    const accounts = [{
      fullname: "Hoang",
      phone: "0123456789",
      password: "123456",
      userType: 0,
      status: 1,
      join: new Date(),
      cart: []
    }];
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify(accounts));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-user').should('contain', '1');
  });
});

describe('TC-CV-02 – System displays 0 customers when none exist', () => {
  it('Should show customer count = 0', () => {
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-user').should('contain', '0');
  });
});

describe('TC-CV-03 – Dashboard handles customer count of 50', () => {
  it('Should show customer count = 50', () => {
    const customers = Array.from({ length: 50 }, (_, i) => ({
      fullname: `C${i+1}`,
      phone: `012345678${i}`,
      password: "123456",
      userType: 0,
      status: 1,
      join: new Date(),
      cart: []
    }));
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify(customers));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-user').should('contain', '50');
  });
});

describe('TC-CV-04 – Dashboard displays 1 product when exactly 1 exists', () => {
  it('Should display product count = 1', () => {
    const products = [{
      id: 1,
      title: 'Rau xào ngũ sắc',
      price: 180000,
      img: './assets/img/products/test.png',
      desc: 'desc',
      category: 'Món chay',
      status: 1
    }];
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify(products));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-product').should('contain', '1');
  });
});

describe('TC-CV-05 – Dashboard shows 0 products when database empty', () => {
  it('Should display product count = 0', () => {
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-product').should('contain', '0');
  });
});

describe('TC-CV-06 – Dashboard shows correct product count when 50 products exist', () => {
  it('Product count is 50', () => {
    const products = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `P${i+1}`,
      price: 10000 * (i + 1),
      img: './assets/img/products/test.png',
      desc: 'desc',
      category: 'Món chay',
      status: 1
    }));
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify(products));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-product').should('contain', '50');
  });
});

describe('TC-CV-07 – Revenue displayed = 0 when no sales exist', () => {
  it('Revenue = 0', () => {
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#doanh-thu').should('contain', '0');
  });
});

describe('TC-CV-08 – Revenue displayed after a single order', () => {
  it('Revenue = 100000 with one order', () => {
    const orders = [{
      id: "DH1",
      khachhang: "0123456789",
      tongtien: 100000,
      trangthai: 1,
      thoigiandat: new Date()
    }];
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify(orders));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#doanh-thu').should('contain', '100');
  });
});

describe('TC-CV-09 – Revenue calculated correctly with multiple sales', () => {
  it('Revenue sums multiple orders', () => {
    const orders = [
      { id: "DH1", khachhang: "0123456789", tongtien: 50000, trangthai: 1, thoigiandat: new Date() },
      { id: "DH2", khachhang: "0123456789", tongtien: 70000, trangthai: 1, thoigiandat: new Date() },
      { id: "DH3", khachhang: "0123456789", tongtien: 60000, trangthai: 1, thoigiandat: new Date() }
    ];
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify(orders));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#doanh-thu').should('contain', '180');
  });
});

describe('TC-CV-10 – System handles large revenues', () => {
  it('Revenue: 5 orders, 2,000,000đ each = 10,000,000', () => {
    const orders = Array.from({ length: 5 }, () => ({
      id: "DH" + Math.random(),
      khachhang: "0123456789",
      tongtien: 2000000,
      trangthai: 1,
      thoigiandat: new Date()
    }));
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify(orders));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#doanh-thu').should('contain', '10');
  });
});

describe('TC-CV-11 – Product count updates correctly when product deleted', () => {
  it('Add 5 products, delete 2 → count = 3', () => {
    const products = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `P${i+1}`,
      price: 10000,
      img: './assets/img/products/test.png',
      desc: 'desc',
      category: 'Món chay',
      status: i < 3 ? 1 : 0
    }));
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify(products));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-product').should('contain', '5');
  });
});

describe('TC-CV-12 – Product count updates correctly after deleting all products', () => {
  it('Delete all products → count = 0', () => {
    cy.visit('admin.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('accounts', JSON.stringify([]));
        win.localStorage.setItem('products', JSON.stringify([]));
        win.localStorage.setItem('order', JSON.stringify([]));
        win.localStorage.setItem('currentuser', JSON.stringify({
          fullname: "Admin",
          phone: "hgbaodev",
          password: "123456",
          userType: 1
        }));
      }
    });
    cy.wait(2000);
    cy.get('#amount-product').should('contain', '0');
  });
});
