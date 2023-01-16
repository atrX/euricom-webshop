Case

- We gaan een kleine webshop bouwen met user gedeelte (products & basket) en een admin gedeelte (product list en product form)

- De API https://euricom-test-api.herokuapp.com/ Zie products & basket kan je als referentie gebruiken maar je gaat dxeze zelf bouwen in TRPC & Next13

- To implement; UI, API (TRPC), DB, auth (optional)
  NextJS 13
  TRPC
  TailWind CSS
  TypeScript
  Prisma (MongoDB)

- Starter: T3 Stack (https://create.t3.gg/) + vitest

- CSS met TailwindCSS & Daisy UI as UI framework.

- Gebruik TRPC (react-query) voor API queries.

- Forms: react-hook-forms with Zod

- Unit testen (Next in vitest) voor alle componenten/pages. Gebruik hiervoor de https://testing-library.com/docs/vue-testing-library/intro/

App:

- Admin module (start hier mee)

  - Page 1 - Table with products, sorting on column headers, paging for data. Actions to edit, delete and add a product
  - Page 2 - New/Edit product form (also include delete). Provide an image upload.
  - Seed DB with dummy data (100 products)
    node ./scripts/seedDb.js

- User module

  - Grid view of all products, infinite loading of products.
  - Buy button on every product (disabled when out of stock) to add product on basket.
  - Basket with list of all products. Change quantity, remove product. Display of total price of the basket. Basket state should be stored on server and retrieved on startup.

- Add error handling when API fails, add error handling when API fails. Gebruik hiervoor een toaster (vb: https://www.npmjs.com/package/vue-toast-notification).

- Maak een eigen github repo aan (public en op je eigen naam) en geef me contribution rechten.
