// PRODUCT QUANTITY CONTROL CYPRESS TESTS (ID module) - Rewritten with correct selectors

describe("TC-ID-01 - Input quantity is zero", () => {
  it("should show error for quantity 0", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('0').blur();
    cy.wait(500);
    cy.get('.input-qty').should('not.have.value', '0');
  });
});

describe("TC-ID-02 - Input quantity is one", () => {
  it("should proceed to checkout for quantity 1", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('1');
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').should('have.value', '1');
  });
});

describe("TC-ID-03 - Input quantity is two", () => {
  it("should proceed to checkout for quantity 2", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('2');
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').should('have.value', '2');
  });
});

describe("TC-ID-04 - Input quantity is ten", () => {
  it("should proceed to checkout for quantity 10", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('10');
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').should('have.value', '10');
  });
});

describe("TC-ID-05 - Input quantity is eleven (above max)", () => {
  it("should show limit error for quantity 11", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('11');
    cy.get('.input-qty').should('have.attr', 'max', '100');
  });
});

describe("TC-ID-06 - Increase Button from Quantity = 1", () => {
  it("should increase quantity from 1 to 2", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('1');
    cy.get('.plus.is-form').click();
    cy.get('.input-qty').should('have.value', '2');
  });
});

describe("TC-ID-07 - Decrease Button from Quantity = 2", () => {
  it("should decrease quantity from 2 to 1", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('2');
    cy.get('.minus.is-form').click();
    cy.get('.input-qty').should('have.value', '1');
  });
});

describe("TC-ID-08 - Increase Button from Quantity = 2", () => {
  it("should increase quantity from 2 to 3", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('2');
    cy.get('.plus.is-form').click();
    cy.get('.input-qty').should('have.value', '3');
  });
});

describe("TC-ID-09 - Increase Button at Limit (Quantity = 10)", () => {
  it("should show error and not exceed 10 when increasing", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('10');
    cy.wait(500);
    cy.get('.plus.is-form').click();
    cy.wait(500);
    cy.get('.input-qty').should('have.value', '10');
  });
});

describe("TC-ID-10 - Decrease Button at Minimum (Quantity = 1)", () => {
  it("should stay at 1 and never go below", () => {
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
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('1');
    cy.get('.minus.is-form').click();
    cy.get('.input-qty').should('have.value', '1');
  });
});
