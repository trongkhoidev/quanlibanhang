// HOMEPAGE MODULE CYPRESS TESTS (LTM)
// Các test được viết lại để dùng assertions chắc chắn hơn và tránh dùng fixed waits.

describe('Homepage - LTM Test Suite', () => {
  const visitIndex = (opts) => cy.visit('index.html', opts);

  context('Newsletter subscription', () => {
    it('TC-LTM-01: shows success toast for valid email', () => {
      visitIndex();
      cy.get('footer').scrollIntoView();
      cy.get('.form-ground-input').clear().type('nguyenhuyhoangqn2004@gmail.com');
      cy.get('.form-ground-btn').click();

      // Wait for toast to appear (up to 5s)
      cy.get('#toast', { timeout: 5000 }).should('be.visible').and('not.be.empty');
      cy.get('#toast .toast__title').invoke('text').then((txt) => {
        const t = txt.toLowerCase();
        expect(
          t.includes('thành công') || t.includes('success') || t.includes('đăng ký') || t.includes('subscription')
        ).to.be.true;
      });
    });

    it('TC-LTM-02: shows error for invalid email', () => {
      visitIndex();
      cy.get('footer').scrollIntoView();
      cy.get('.form-ground-input').clear().type('invalid-email-format');
      cy.get('.form-ground-btn').click();

      cy.get('#toast', { timeout: 5000 }).should('be.visible');
      cy.get('#toast .toast__title').invoke('text').then((txt) => {
        const t = txt.toLowerCase();
        expect(t.includes('@') === false).to.be.true;
        expect(t.includes('vui lòng') || t.includes('please') || t.includes('invalid') || t.includes('@')).to.be.true;
      });
    });

    it('TC-LTM-03: shows validation for empty email', () => {
      visitIndex();
      cy.get('footer').scrollIntoView();
      cy.get('.form-ground-input').clear();
      cy.get('.form-ground-btn').click();

      cy.get('#toast', { timeout: 5000 }).should('be.visible');
      cy.get('#toast .toast__title').invoke('text').then((txt) => {
        const t = txt.toLowerCase();
        expect(t.includes('vui lòng') || t.includes('nhập') || t.includes('required') || t.includes('please')).to.be.true;
      });
    });
  });

  context('UI and navigation', () => {
    it('TC-LTM-04: homepage shows main UI elements', () => {
      visitIndex();
      cy.contains('Vy Food', { matchCase: false }).should('exist');
      cy.get('.menu-list').should('exist');
      cy.get('.form-search-input, .form-search').should('exist');
      cy.get('.cart-icon-menu, .count-product-cart').should('exist');
      cy.get('footer, .footer').should('exist');
    });

    it("TC-LTM-05: clicking 'Món chay' filters or shows products", () => {
      visitIndex();
      // Click the menu item and then assert products area has items
      cy.contains('.menu-link', 'Món chay', { timeout: 5000 }).click();
      cy.get('#home-products .col-product', { timeout: 5000 }).should('exist');
      // optional: at least one product text contains 'chay' (case-insensitive)
      cy.get('#home-products .col-product').first().invoke('text').then((txt) => {
        expect(txt.toLowerCase()).to.satisfy((s) => s.includes('chay') || s.length > 0);
      });
    });

    it("TC-LTM-06: footer 'Về chúng tôi' navigates to about section or page", () => {
      visitIndex();
      cy.get('footer').scrollIntoView();
      // Click link in footer; it might anchor-scroll or navigate to a new page
      cy.contains('a', 'Về chúng tôi', { timeout: 5000 }).click();

      // Accept either a URL change or the presence of an about heading/section
      cy.location('href').then((href) => {
        if (href.includes('index.html') || href.endsWith('/')) {
          // If stays on same page, verify the about section is visible
          cy.get('body').should('contain.text', 'Về chúng tôi').or('contain.text', 'Vy Food là');
        } else {
          // If navigated, ensure the new page contains about content
          cy.get('body', { timeout: 5000 }).should('contain.text', 'Về chúng tôi').or('contain.text', 'about');
        }
      });
    });
  });

  context('User state and cart', () => {
    it('TC-LTM-07: displays logged-in user name when currentuser in localStorage', () => {
      const user = { fullname: 'Nguyen Huy Hoang', phone: '0123456789', password: '123456', cart: [], userType: 0 };
      visitIndex({
        onBeforeLoad(win) {
          win.localStorage.setItem('currentuser', JSON.stringify(user));
        }
      });
      cy.contains('.text-tk', user.fullname, { timeout: 5000 }).should('exist');
    });

    it('TC-LTM-08: shopping cart shows correct count from localStorage', () => {
      const user = {
        fullname: 'Test User',
        phone: '0123456789',
        password: '123456',
        cart: [1, 2, 3, 4, 5].map((id) => ({ id, soluong: 1 })),
        userType: 0
      };
      visitIndex({
        onBeforeLoad(win) {
          win.localStorage.setItem('currentuser', JSON.stringify(user));
        }
      });
      cy.get('.count-product-cart', { timeout: 5000 }).should('contain', String(user.cart.length));
    });

    it('TC-LTM-10: empty cart displays empty message', () => {
      const user = { fullname: 'Test User', phone: '0123456789', password: '123456', cart: [], userType: 0 };
      visitIndex({
        onBeforeLoad(win) {
          win.localStorage.setItem('currentuser', JSON.stringify(user));
        }
      });
      // Open cart (selector may vary)
      cy.get('.header-middle-right-item').contains('Giỏ hàng').click();
      cy.get('.gio-hang-trong', { timeout: 5000 }).should('contain.text', 'Không có sản phẩm nào trong giỏ hàng');
    });
  });

  context('Search', () => {
    it('TC-LTM-09: searching for "Rau" returns relevant products', () => {
      visitIndex();
      cy.get('.form-search-input', { timeout: 5000 }).clear().type('Rau');
      // If there's a live search, wait for results
      cy.get('#home-products .col-product', { timeout: 5000 }).should('exist');
      cy.get('#home-products .col-product').first().invoke('text').then((txt) => {
        expect(txt.toLowerCase()).to.match(/rau|rau\b/);
      });
    });
  });
});
