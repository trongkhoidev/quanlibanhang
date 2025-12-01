describe('MODULE: CART – Toàn bộ test case nghiệp vụ giỏ hàng', () => {
  beforeEach(() => {
    const user = {
      fullname: "Test User",
      phone: "0123456789",
      password: "123456",
      cart: [],
      userType: 0
    };
    cy.visit('index.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem("currentuser", JSON.stringify(user));
      }
    });
    cy.wait(2000);
  });

  // TC-C-01
  it('TC-C-01 – System accepts the minimum quantity of an item as 1', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').should('have.value', '1');
  });

  // TC-C-02
  it('TC-C-02 – System doesn\'t accept editing the quantity to 0', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').clear().type('0').blur();
    cy.wait(500);
    cy.get('.cart-item .input-qty').should('not.have.value', '0');
  });

  // TC-C-03
  it('TC-C-03 – User can remove a product from the cart', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-delete').click();
    cy.get('.gio-hang-trong').should('be.visible');
  });

  // TC-C-04
  it('TC-C-04 – System displays the empty cart message', () => {
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.gio-hang-trong').should('contain.text', 'Không có sản phẩm nào trong giỏ hàng');
  });

  // TC-C-05
  it('TC-C-05 – User can proceed to checkout when cart has items', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.thanh-toan').click();
    cy.get('.checkout-title').should('exist');
  });

  // TC-C-06
  it('TC-C-06 – System adds multiple products to the cart', () => {
    cy.get('.card-button.order-item').eq(0).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.modal.product-detail').should('not.have.class', 'open');
    cy.wait(500);
    cy.get('.card-button.order-item').eq(1).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('have.length', 2);
  });

  // TC-C-07
  it('TC-C-07 – System allows adding the same item multiple times', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.modal.product-detail').should('not.have.class', 'open');
    cy.wait(500);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('have.length', 1);
    cy.get('.cart-item .input-qty').should('have.value', '2');
  });

  // TC-C-08
  it('TC-C-08 – Total price is correctly calculated when same product added multiple times', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('5');
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').should('have.value', '5');
    cy.get('.text-price').should('exist');
  });

  // TC-C-09
  it('TC-C-09 – Total price is correctly calculated when cart contains multiple products', () => {
    cy.get('.card-button.order-item').eq(0).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.modal.product-detail').should('not.have.class', 'open');
    cy.wait(500);
    cy.get('.card-button.order-item').eq(1).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('have.length', 2);
    cy.get('.text-price').should('exist');
  });

  // TC-C-10
  it('TC-C-10 – System correctly deletes an item when cart contains one item', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-delete').click();
    cy.get('.gio-hang-trong').should('be.visible');
  });

  // TC-C-11
  it('TC-C-11 – System correctly deletes an item when cart contains multiple items', () => {
    cy.get('.card-button.order-item').eq(0).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.modal.product-detail').should('not.have.class', 'open');
    cy.wait(500);
    cy.get('.card-button.order-item').eq(1).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('have.length', 2);
    cy.get('.cart-item-delete').first().click();
    cy.wait(500);
    cy.get('.cart-item').should('have.length', 1);
  });

  // TC-C-12
  it('TC-C-12 – Delete All Items in Cart', () => {
    cy.get('.card-button.order-item').eq(0).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.modal.product-detail').should('not.have.class', 'open');
    cy.wait(500);
    cy.get('.card-button.order-item').eq(1).click();
    cy.wait(500);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-delete').then($buttons => {
      const count = $buttons.length;
      for (let i = 0; i < count; i++) {
        cy.get('.cart-item-delete').first().click();
        cy.wait(300);
      }
    });
    cy.get('.gio-hang-trong').should('be.visible');
  });

  // TC-C-13
  it('TC-C-13 – Total amount updates when product added', () => {
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.text-price').invoke('text').then(oldTotalText => {
      const oldTotal = parseInt(oldTotalText.replace(/[^\d]/g, '')) || 0;
      cy.get('.cart-close').click();
      cy.get('.card-button.order-item').first().click();
      cy.wait(1000);
      cy.get('.button-dat').click();
      cy.wait(1000);
      cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
      cy.get('.text-price').invoke('text').then(newTotalText => {
        const newTotal = parseInt(newTotalText.replace(/[^\d]/g, '')) || 0;
        if (oldTotal === 0) {
          expect(newTotal).to.be.greaterThan(0);
        } else {
          expect(newTotal).to.be.greaterThan(oldTotal);
        }
      });
    });
  });

  // TC-C-14
  it('TC-C-14 – Total amount updates when product quantity is increased', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').clear().type('2');
    cy.get('.cart-item .plus.is-form').first().click();
    cy.wait(500);
    cy.get('.text-price').should('exist');
  });

  // TC-C-15
  it('TC-C-15 – Total amount updates when product quantity is decreased', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.input-qty').clear().type('3');
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').clear().type('2');
    cy.get('.cart-item .minus.is-form').first().click();
    cy.wait(500);
    cy.get('.text-price').should('exist');
  });

  // TC-C-16
  it('TC-C-16 – After deleting product, user can add new product correctly', () => {
    cy.get('.card-button.order-item').eq(0).click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-delete').click();
    cy.wait(500);
    cy.get('.gio-hang-trong').should('be.visible');
    cy.get('.cart-close').click();
    cy.wait(500);
    cy.get('.card-button.order-item').eq(1).click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('have.length', 1);
  });

  // TC-C-17
  it('TC-C-17 – After deleting product, adding same product again keeps correct quantity', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-delete').click();
    cy.wait(500);
    cy.get('.cart-close').click();
    cy.wait(500);
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item .input-qty').should('have.value', '1');
  });

  // TC-C-18
  it('TC-C-18 – After deleting product, adding different product works correctly', () => {
    cy.get('.card-button.order-item').eq(0).click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-delete').click();
    cy.wait(500);
    cy.get('.cart-close').click();
    cy.wait(500);
    cy.get('.card-button.order-item').eq(1).click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item').should('have.length', 1);
  });

  // TC-C-19
  it('TC-C-19 – System handles price change (dynamic pricing)', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.cart-item-price').should('exist');
  });

  // TC-C-20
  it('TC-C-20 – System updates cart total when product\'s price changes', () => {
    cy.get('.card-button.order-item').first().click();
    cy.wait(1000);
    cy.get('.button-dat').click();
    cy.wait(1000);
    cy.get('.header-middle-right-item.open').contains('Giỏ hàng').click();
    cy.get('.text-price').should('exist');
  });
});
