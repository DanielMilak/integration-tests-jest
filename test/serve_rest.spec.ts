import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';

describe('ServeRest API', () => {
  let carrinho = '';
  let token = '';
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://serverest.dev';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Login', () => {
    it('POST', async () => {
      token = await p
        .spec()
        .post(`${baseUrl}/login`)
        .withJson({
          email: 'fulano@qa.com',
          password: 'teste'
        })
        .expectStatus(200)
        .inspect()
        .returns('authorization');
    });
  });

  describe('Usuários', () => {
    it('GET ALL', async () => {
      await p
        .spec()
        .get(`${baseUrl}/usuarios`)
        .withHeaders('Authorization', token)
        .expectStatus(200);
    });
  });

  describe('Cadastro', () => {
    it('POST', async () => {
      carrinho = await p
        .spec()
        .post(`${baseUrl}/carrinhos`)
        .withHeaders('Authorization', token)
        .withJson({
          idProduto: '123456789',
          quantidade: 1
        })
        .returns('_id')
        .inspect()
        .expectStatus(200);
    });
  });

  describe('carrinhos', () => {
    it('GET ALL', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carrinhos/` + carrinho)
        .withHeaders('Authorization', carrinho)
        .expectStatus(200);
    });
  });
});
