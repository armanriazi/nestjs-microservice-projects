import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { CartsFromExternal } from '../carts/cart.dto';
import { ProductVariantFromExternal } from './product_variant.dto';

@Injectable()
export class ProductsService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.SERVICE_PRODUCT_HOST;
  }

  async GetProductVariantByVariantId(
    variantId: number,
  ): Promise<AxiosResponse<ProductVariantFromExternal>> {
    const resp = await axios.get(
      `${this.baseUrl}/v1/products/product_variant/${variantId}`,
    );
    return resp;
  }

  async PatchProductVariantStockByVariantId(
    auth: string,
    carts: CartsFromExternal[],
  ): Promise<boolean> {
    try {
      console.log('carts: ', carts);
      for (const cart of carts) {
        const res = await axios.patch(
          `${this.baseUrl}/v1/products/product_variant/patch-stock/transaction-start/${cart.product_variant_id}`,
          {
            quantity: cart.quantity,
          },
          {
            headers: {
              authorization: auth,
            },
          },
        );
        console.log(res);
      }

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async CommitPatchProductVariantStockByVariantId(
    auth: string,
  ): Promise<boolean> {
    try {
      await axios.get(
        `${this.baseUrl}/v1/products/product_variant/patch-stock/transaction/commit`,
        {
          headers: {
            authorization: auth,
          },
        },
      );

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async RollbackPatchProductVariantStockByVariantId(
    auth: string,
  ): Promise<boolean> {
    try {
      await axios.get(
        `${this.baseUrl}/v1/products/product_variant/patch-stock/transaction/rollback`,
        {
          headers: {
            authorization: auth,
          },
        },
      );

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
