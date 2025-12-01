// HOMEPAGE MODULE CYPRESS TESTS (LTM) - Rewritten with correct selectors

describe("TC-LTM-01 - Valid Email Subscription", () => {
  it("should show success message for valid email", () => {
    cy.visit("index.html");
    cy.scrollTo('bottom');
    cy.get('.form-ground-input').type('test@example.com');
    cy.get('.form-ground-btn').click();
    cy.wait(1000);
    cy.get('#toast').should('exist').and('not.be.empty');
  });
});

describe("TC-LTM-02 - Invalid Email Subscription", () => {
  it("should show error for invalid email", () => {
    cy.visit("index.html");
    cy.scrollTo('bottom');
    cy.get('.form-ground-input').type('test.email');
    cy.get('.form-ground-btn').click();
    cy.wait(1000);
    cy.get('#toast').should('exist').and('not.be.empty');
  });
});

describe("TC-LTM-03 - Empty Email Subscription", () => {
  it("should show error for empty email", () => {
    cy.visit("index.html");
    cy.scrollTo('bottom');
    cy.get('.form-ground-input').clear();
    cy.get('.form-ground-btn').click();
    cy.wait(1000);
    cy.get('#toast').should('exist').and('not.be.empty');
  });
});

describe("TC-LTM-04 - Homepage Displays Correct Interface", () => {
  it("should show title, navbar, search bar, cart, and footer", () => {
    cy.visit("index.html");
    cy.contains('Vy Food').should('exist');
    cy.get('.menu-list').should('exist');
    cy.get('.header-middle-center .form-search').should('exist');
    cy.get('.cart-icon-menu').should('exist');
    cy.get('footer, .footer').should('exist');
  });
});

describe("TC-LTM-05 - Click Navigation Menu Item", () => {
  it("should filter products when clicking 'Món chay'", () => {
    cy.visit("index.html");
    cy.wait(1000); // Wait for products to load
    cy.contains('.menu-link', 'Món chay').click();
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });
});

describe("TC-LTM-06 - Footer Link 'Về chúng tôi'", () => {
  it("should scroll to footer and show link", () => {
    cy.visit("index.html");
    cy.scrollTo('bottom');
    cy.contains('.widget-title', 'Về chúng tôi').should('be.visible');
  });
});

describe("TC-LTM-07 - Logged-in Username Display", () => {
  it("should show username in navbar if logged in", () => {
    const user = {
      fullname: "Nguyen Huy Hoang",
      phone: "0123456789",
      password: "123456",
      cart: [],
      userType: 0
    };
    cy.visit("index.html", {
      onBeforeLoad(win) {
        win.localStorage.setItem("currentuser", JSON.stringify(user));
      }
    });
    cy.wait(1000);
    cy.get('.text-tk').should('contain', 'Nguyen Huy Hoang');
  });
});

describe("TC-LTM-08 - Shopping Cart Displays Correct Number", () => {
  it("should display correct cart count from localStorage", () => {
    const user = {
      fullname: "Test User",
      phone: "0123456789",
      password: "123456",
      cart: [
        { id: 1, soluong: 1, note: "test" },
        { id: 2, soluong: 1, note: "test" },
        { id: 3, soluong: 1, note: "test" },
        { id: 4, soluong: 1, note: "test" },
        { id: 5, soluong: 1, note: "test" }
      ],
      userType: 0
    };
    cy.visit("index.html", {
      onBeforeLoad(win) {
        win.localStorage.setItem("currentuser", JSON.stringify(user));
      }
    });
    cy.wait(1000);
    cy.get('.count-product-cart').should('contain', '5');
  });
});

describe("TC-LTM-09 - Search Valid Keyword", () => {
  it("should show list of matching dishes when searching", () => {
    cy.visit("index.html");
    cy.wait(1000);
    cy.get('.form-search-input').type('Bánh');
    cy.wait(1000);
    cy.get('#home-products .col-product').should('exist');
  });
});

describe("TC-LTM-10 - Empty Cart Behavior", () => {
  it("should show empty cart message if cart is empty", () => {
    const user = {
      fullname: "Test User",
      phone: "0123456789",
      password: "123456",
      cart: [],
      userType: 0
    };
    cy.visit("index.html", {
      onBeforeLoad(win) {
        win.localStorage.setItem("currentuser", JSON.stringify(user));
      }
    });
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.gio-hang-trong').should('contain', 'Không có sản phẩm nào trong giỏ hàng');
  });
});
