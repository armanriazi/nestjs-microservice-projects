import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AMQPConfig } from './amqp.dto';
import amqp from 'amqplib';
// const amqp = require('amqplib');

@Injectable()
export class AmqpService {
  private conn: any;
  private channel: any;
  private queueName: string;

  constructor(private readonly configService: ConfigService) {}

  async CreateConnection(config: AMQPConfig | any = null): Promise<boolean> {
    const user = this.configService.get('MQ_USER') || config.user;
    const password = this.configService.get('MQ_PASS') || config.password;
    const host = this.configService.get('MQ_HOST') || config.host;
    const port = this.configService.get('MQ_PORT') || config.port;
    const vhost = this.configService.get('MQ_VHOST') || config.vhost;

    // User, Pass, Host, VHost
    const url = `amqp://${user}:${password}@${host}:${port}${vhost}`;

    try {
      this.conn = await amqp.connect(url);
      this.conn.on('error', function (err) {
        console.log('AMQP:Error:', err);
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async CloseConnection(): Promise<void> {
    if (this.channel) await this.channel.close();
    await this.conn.close();
  }

  GetConnection() {
    return this.conn;
  }

  async CreateChannel(): Promise<boolean> {
    try {
      this.channel = await this.conn.createChannel();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async DeclareQueue(queueName: string): Promise<boolean> {
    try {
      this.queueName = queueName;
      const q = await this.channel.assertQueue(queueName, {
        durable: false,
        autoDelete: false,
        exclusive: false,
      });
      if (!q) {
        console.log(q);
        return false;
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  Publish(data: any): boolean {
    const message: string = JSON.stringify(data);
    const p = this.channel.sendToQueue(this.queueName, Buffer.from(message));

    return p;
  }
}
