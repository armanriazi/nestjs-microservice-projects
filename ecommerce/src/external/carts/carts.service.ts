import { Injectable } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/common/node_modules/axios';
import axios from 'axios';
import { CartsFromExternal } from './cart.dto';

@Injectable()
export class CartsService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.SERVICE_CART_HOST;
  }

  async GetUserCartByCartIds(
    auth: string,
    cartIds: string[],
  ): Promise<AxiosResponse<CartsFromExternal[]>> {
    let query = '';

    for (const cartId of cartIds) {
      query += `cart_ids=${cartId}&`;
    }

    const resp = await axios.get(`${this.baseUrl}/v1/cart?${query}`, {
      headers: {
        authorization: auth,
      },
    });
    return resp;
  }

  async DeleteBulkUserCart(
    auth: string,
    cartIds: string[],
  ): Promise<AxiosResponse> {
    try {
      let query = '';

      for (const cartId of cartIds) {
        query += `cart_ids=${cartId}&`;
      }

      return axios.delete(`${this.baseUrl}/v1/cart/bulk?${query}`, {
        headers: {
          authorization: auth,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async DeleteUserCart(auth: string, cartId: string): Promise<AxiosResponse> {
    try {
      return axios.delete(`${this.baseUrl}/v1/cart/${cartId}`, {
        headers: {
          authorization: auth,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async CommitDeleteUserCart(auth: string): Promise<string> {
    try {
      return axios.get(`${this.baseUrl}/v1/cart/transaction/delete/commit`, {
        headers: {
          authorization: auth,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async RollbackUserCart(auth: string): Promise<string> {
    try {
      return axios.get(`${this.baseUrl}/v1/cart/transaction/delete/rollback`, {
        headers: {
          authorization: auth,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
