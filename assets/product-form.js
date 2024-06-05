if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.variantIdInput.disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');
        this.submitButtonText = this.submitButton.querySelector('span');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      async onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        const variantId = formData.get('id');
        const serviceId = formData.get('service_id');
        const giftId = '47362534572265'; // Fixed gift product ID

        try {
          // Fetch current cart content
          const cartResponse = await fetch('/cart.js', {
            method: 'GET',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          });
          const cartData = await cartResponse.json();

          // Remove all existing items except the service and gift
          const removePromises = cartData.items.map((item) => {
            if (item.variant_id != serviceId && item.variant_id != giftId) {
              return fetch('/cart/change.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                  id: item.key,
                  quantity: 0,
                }),
              });
            }
          });

          await Promise.all(removePromises.filter(Boolean));

          // Add the service if not already in the cart
          const serviceInCart = cartData.items.some((item) => item.variant_id == serviceId);
          if (!serviceInCart) {
            await fetch('/cart/add.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
              },
              body: JSON.stringify({
                id: serviceId,
                quantity: 1,
              }),
            });
          }

          // Add the gift product if not already in the cart
          const giftInCart = cartData.items.some((item) => item.variant_id == giftId);
          if (!giftInCart) {
            await fetch('/cart/add.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
              },
              body: JSON.stringify({
                id: giftId,
                quantity: 1,
              }),
            });
          }

          if (this.cart) {
            formData.append(
              'sections',
              this.cart.getSectionsToRender().map((section) => section.id)
            );
            formData.append('sections_url', window.location.pathname);
            this.cart.setActiveElement(document.activeElement);
          }
          config.body = formData;

          const response = await fetch(`${routes.cart_add_url}`, config);
          const responseData = await response.json();

          if (responseData.status) {
            publish(PUB_SUB_EVENTS.cartError, {
              source: 'product-form',
              productVariantId: variantId,
              errors: responseData.errors || responseData.description,
              message: responseData.message,
            });
            this.handleErrorMessage(responseData.description);

            const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
            if (!soldOutMessage) return;
            this.submitButton.setAttribute('aria-disabled', true);
            this.submitButtonText.classList.add('hidden');
            soldOutMessage.classList.remove('hidden');
            this.error = true;
            return;
          } else if (!this.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          if (!this.error)
            publish(PUB_SUB_EVENTS.cartUpdate, {
              source: 'product-form',
              productVariantId: variantId,
              cartData: responseData,
            });
          this.error = false;
          const quickAddModal = this.closest('quick-add-modal');
          if (quickAddModal) {
            document.body.addEventListener(
              'modalClosed',
              () => {
                setTimeout(() => {
                  this.cart.renderContents(responseData);
                });
              },
              { once: true }
            );
            quickAddModal.hide(true);
          } else {
            this.cart.renderContents(responseData);
          }
        } catch (e) {
          console.error(e);
        } finally {
          this.submitButton.classList.remove('loading');
          if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
          if (!this.error) this.submitButton.removeAttribute('aria-disabled');
          this.querySelector('.loading__spinner').classList.add('hidden');
        }
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }

      toggleSubmitButton(disable = true, text) {
        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }

      get variantIdInput() {
        return this.form.querySelector('[name=id]');
      }
    }
  );
}
