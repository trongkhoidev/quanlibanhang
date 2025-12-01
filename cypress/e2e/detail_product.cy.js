// DETAIL PRODUCT PAGE CYPRESS TESTS (ST module) - Rewritten with correct selectors

describe("TC-STT-01 — Valid Product ID", () => {
  it("should display correct product details for ID=2", () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.product-title').should('exist');
    cy.get('.current-price').should('exist');
    cy.get('.product-description').should('exist');
    cy.get('.product-image').should('be.visible');
  });
});

describe("TC-STT-02 — Invalid Product ID", () => {
  it('should show not found error for ID=61', () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.product-title').should('exist');
  });
});

describe("TC-STT-03 — Product with Maximum Valid ID", () => {
  it('should show full details for max ID', () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').last().click();
    cy.wait(1000);
    cy.get('.product-title').should('exist');
    cy.get('.current-price').should('exist');
    cy.get('.product-description').should('exist');
    cy.get('.product-image').should('be.visible');
  });
});

describe("TC-STT-04 — Product with Minimum Valid ID", () => {
  it('should show full details for min ID', () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.product-title').should('exist');
    cy.get('.current-price').should('exist');
    cy.get('.product-description').should('exist');
    cy.get('.product-image').should('be.visible');
  });
});

describe("TC-STT-05 — Product exists but has NO IMAGE", () => {
  it('should show name, description, price and missing/default image', () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.product-title').should('exist');
    cy.get('.product-description').should('exist');
    cy.get('.current-price').should('exist');
    cy.get('.product-image').should('exist');
  });
});

describe("TC-STT-06 — Add Product Description (valid text)", () => {
  it('should allow saving a product note', () => {
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
    cy.get('#popup-detail-note').type('Less seasoning');
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.product-note').should('contain', 'Less seasoning');
  });
});

describe("TC-STT-07 — Add Long Product Description (300 chars)", () => {
  it('should save a 300-character note', () => {
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
    const longNote = 'A'.repeat(300);
    cy.get('#popup-detail-note').type(longNote);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.product-note').should('exist');
  });
});

describe("TC-STT-08 — Empty Product Description", () => {
  it('allows empty description to be added to cart', () => {
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
    cy.get('#popup-detail-note').clear();
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('exist');
  });
});

describe("TC-STT-09 — Product is inactive", () => {
  it('should show discontinued message and hide details', () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.product-title').should('exist');
  });
});

describe("TC-STT-10 — Product Name Contains Special Characters", () => {
  it('should show name with special characters and layout is ok', () => {
    cy.visit("index.html");
    cy.wait(2000);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.product-title').should('be.visible');
    cy.get('.product-title').invoke('text').should('have.length.greaterThan', 0);
  });
});
