# Dawn

[![Build status](https://github.com/shopify/dawn/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Shopify/dawn/actions/workflows/ci.yml?query=branch%3Amain)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=informational)](/.github/CONTRIBUTING.md)

[Getting started](#getting-started) |
[Staying up to date with Dawn changes](#staying-up-to-date-with-dawn-changes) |
[Developer tools](#developer-tools) |
[Contributing](#contributing) |
[Code of conduct](#code-of-conduct) |
[Theme Store submission](#theme-store-submission) |
[License](#license)

Dawn represents a HTML-first, JavaScript-only-as-needed approach to theme development. It's Shopify's first source available theme with performance, flexibility, and [Online Store 2.0 features](https://www.shopify.com/partners/blog/shopify-online-store) built-in and acts as a reference for building Shopify themes.

* **Web-native in its purest form:** Themes run on the [evergreen web](https://www.w3.org/2001/tag/doc/evergreen-web/). We leverage the latest web browsers to their fullest, while maintaining support for the older ones through progressive enhancement—not polyfills.
* **Lean, fast, and reliable:** Functionality and design defaults to “no” until it meets this requirement. Code ships on quality. Themes must be built with purpose. They shouldn’t support each and every feature in Shopify.
* **Server-rendered:** HTML must be rendered by Shopify servers using Liquid. Business logic and platform primitives such as translations and money formatting don’t belong on the client. Async and on-demand rendering of parts of the page is OK, but we do it sparingly as a progressive enhancement.
* **Functional, not pixel-perfect:** The Web doesn’t require each page to be rendered pixel-perfect by each browser engine. Using semantic markup, progressive enhancement, and clever design, we ensure that themes remain functional regardless of the browser.

You can find a more detailed version of our theme code principles in the [contribution guide](https://github.com/Shopify/dawn/blob/main/.github/CONTRIBUTING.md#theme-code-principles).

## Getting started
We recommend using Dawn as a starting point for theme development. [Learn more on Shopify.dev](https://shopify.dev/themes/getting-started/create).

> If you're building a theme for the Shopify Theme Store, then you can use Dawn as a starting point. However, the theme that you submit needs to be [substantively different from Dawn](https://shopify.dev/themes/store/requirements#uniqueness) so that it provides added value for merchants. Learn about the [ways that you can use Dawn](https://shopify.dev/themes/tools/dawn#ways-to-use-dawn).

Please note that the main branch may include code for features not yet released. The "stable" version of Dawn is available in the theme store.

## Staying up to date with Dawn changes

Say you're building a new theme off Dawn but you still want to be able to pull in the latest changes, you can add a remote `upstream` pointing to this Dawn repository.

1. Navigate to your local theme folder.
2. Verify the list of remotes and validate that you have both an `origin` and `upstream`:
```sh
git remote -v
```
3. If you don't see an `upstream`, you can add one that points to Shopify's Dawn repository:
```sh
git remote add upstream https://github.com/Shopify/dawn.git
```
4. Pull in the latest Dawn changes into your repository:
```sh
git fetch upstream
git pull upstream main
```

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Dawn is already set up to work with these tools.

### Shopify CLI

[Shopify CLI](https://github.com/Shopify/shopify-cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://shopify.dev/docs/themes/tools/cli) to get started.

### Theme Check

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

We've added Theme Check to Dawn's [list of VS Code extensions](/.vscode/extensions.json) so if you're using Visual Studio Code as your code editor of choice, you'll be prompted to install the [Theme Check VS Code](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension upon opening VS Code after you've forked and cloned Dawn.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

### Continuous Integration

Dawn uses [GitHub Actions](https://github.com/features/actions) to maintain the quality of the theme. [This is a starting point](https://github.com/Shopify/dawn/blob/main/.github/workflows/ci.yml) and what we suggest to use in order to ensure you're building better themes. Feel free to build off of it!

#### Shopify/lighthouse-ci-action

We love fast websites! Which is why we created [Shopify/lighthouse-ci-action](https://github.com/Shopify/lighthouse-ci-action). This runs a series of [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) audits for the home, product and collections pages on a store to ensure code that gets added doesn't degrade storefront performance over time.

#### Shopify/theme-check-action

Dawn runs [Theme Check](#Theme-Check) on every commit via [Shopify/theme-check-action](https://github.com/Shopify/theme-check-action).

## Contributing

Want to make commerce better for everyone by contributing to Dawn? We'd love your help! Please read our [contributing guide](https://github.com/Shopify/dawn/blob/main/.github/CONTRIBUTING.md) to learn about our development process, how to propose bug fixes and improvements, and how to build for Dawn.

## Code of conduct

All developers who wish to contribute through code or issues, please first read our [Code of Conduct](https://github.com/Shopify/dawn/blob/main/.github/CODE_OF_CONDUCT.md).

## Theme Store submission

The [Shopify Theme Store](https://themes.shopify.com/) is the place where Shopify merchants find the themes that they'll use to showcase and support their business. As a theme partner, you can create themes for the Shopify Theme Store and reach an international audience of an ever-growing number of entrepreneurs.

Ensure that you follow the list of [theme store requirements](https://shopify.dev/themes/store/requirements) if you're interested in becoming a [Shopify Theme Partner](https://themes.shopify.com/services/themes/guidelines) and building themes for the Shopify platform.

## License

Copyright (c) 2021-present Shopify Inc. See [LICENSE](/LICENSE.md) for further details.

# Esquema de Servicios

Este esquema define la estructura para crear una página de servicios en un tema de Shopify. Proporciona la capacidad de listar productos y mostrar reseñas asociadas en una página de servicios.

## Uso

El esquema se compone de dos bloques principales:

### 1. Service (Servicio)

Este bloque se utiliza para representar información sobre un servicio o producto específico.

#### Configuraciones

- **Producto**: Permite asociar un producto específico con el servicio.

### 2. Reviews (Reseñas)

Este bloque se utiliza para mostrar las reseñas asociadas a los productos o servicios listados en la página.

## Preajustes

El esquema viene con un preajuste predeterminado:

- **Nombre**: Servicios
- **Categoría**: Páginas

Este preajuste se puede utilizar para configurar una página de servicios en un tema de Shopify.

## Ejemplo de Implementación

```json
{% schema %}
{
  "name": "Servicios",
  "settings": [],
  "blocks": [
    {
      "type": "service",
      "name": "Service",
      "settings": [
        {
          "type": "product",
          "id": "product",
          "label": "Producto"
        }
      ]
    },
    {
      "type": "reviews",
      "name": "Reviews",
      "settings": []
    }
  ],
  "presets": [
    {
      "name": "Servicios",
      "category": "Páginas"
    }
  ]
}
{% endschema %}
```

# Componente de Formulario de Producto

Este componente de JavaScript personalizado maneja la adición de productos al carrito en una tienda en línea, probablemente en un entorno de Shopify o similar. Proporciona funcionalidades como la adición de productos al carrito de manera asíncrona utilizando AJAX, la restricción para agregar más de 1 producto al carrito y el reemplazo del producto al agregar otro servicio al carrito.

## Funcionalidades Principales

### 1. AJAX Add to Cart

Este componente utiliza AJAX para enviar una solicitud al servidor cuando se envía el formulario de agregar al carrito. Esto permite agregar productos al carrito sin necesidad de recargar la página completa.

### 2. Restricción para Agregar Solo 1 Producto al Carrito

El componente limita la cantidad de servicios en el carrito a solo uno. Cuando se agrega un nuevo servicio al carrito, primero elimina cualquier otro servicio existente en el carrito antes de agregar el nuevo servicio.

### 3. Reemplazo del Producto al Agregar Otro Servicio al Carrito

El código también incluye una lógica para reemplazar un servicio existente en el carrito con el nuevo servicio agregado. Esto asegura que solo haya un servicio en el carrito en todo momento y evita que se acumulen múltiples servicios.

## Uso

Para utilizar este componente, simplemente asegúrate de incluir el código proporcionado en tu proyecto de JavaScript.

```javascript
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
        const giftId = '47362534572265'; // ID de producto de regalo fijo

        try {
          // Obtener el contenido actual del carrito
          const cartResponse = await fetch('/cart.js', {
            method: 'GET',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          });
          const cartData = await cartResponse.json();

          // Eliminar todos los artículos existentes excepto el servicio y el regalo.
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

          // Agrega el servicio si aún no está en el carrito
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

          // Agrega el producto de regalo si aún no está en el carrito.
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
```

