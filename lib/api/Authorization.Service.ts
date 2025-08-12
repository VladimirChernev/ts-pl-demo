import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export default class AuthorizationService {
  readonly request: APIRequestContext;
  readonly baseUrl: string;
  readonly actionBaseURL: string;
  readonly today: Date = new Date();
  readonly currentTime: string;
  readonly currentDate: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = 'https://borica1-t.test.procreditbank.bg/AuthorizationService.svc';
    this.actionBaseURL = 'http://ws.atx/Atx/';
    this.currentTime = this.today.getHours().toString().padStart(2, '0') + this.today.getMinutes().toString().padStart(2, '0') + this.today.getSeconds().toString().padStart(2, '0');
    this.currentDate = (this.today.getMonth() + 1).toString().padStart(2, '0') + this.today.getDate().toString().padStart(2, '0');
  }

  /**
   * Reports the balance of the account.
   * @param iBan - The IBAN of the account.
   * @returns the account balance as a number.
   */
  async reportBalance(iBan: string): Promise<{ availability: number; accountBalance: number }> {
    const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.atx/">
   <soapenv:Header/>
   <soapenv:Body>
      <ws:reportBalanceRequest>
         <!--Optional:-->
         <ws:accountNumber>${iBan}</ws:accountNumber>
      </ws:reportBalanceRequest>
   </soapenv:Body>
</soapenv:Envelope>`;

    const headers = {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: this.actionBaseURL + 'reportBalanceRequest',
    };

    const response: APIResponse = await this.request.post(this.baseUrl, {
      headers,
      data: body,
    });

    expect(response.status()).toBe(200);
    const rawXML: string = await response.text();

    try {
      // Parse the XML response
      const parser = new XMLParser();
      const requestBody: XMLDocument = parser.parse(body);
      const responseBody = parser.parse(rawXML);

      // log the parsed XML for debugging
      console.log('POST: ', this.baseUrl);
      console.log('Request Body:\n', JSON.stringify(requestBody, null, 2));
      console.log('Response Status:', response.status());
      console.log('Response Body:\n', JSON.stringify(responseBody, null, 2));

      // Get specific result value
      const outcome = responseBody['s:Envelope']['s:Body']['reportBalanceResponse']['Outcome'];
      const availability = responseBody['s:Envelope']['s:Body']['reportBalanceResponse']['availability'];
      const accountBalance = responseBody['s:Envelope']['s:Body']['reportBalanceResponse']['accountBalance'];

      // Check if result value is undefined
      if (accountBalance == undefined || availability == undefined || outcome == undefined) {
        throw new Error('Could not find accountBalance or availability or outcome in the response');
      }

      expect(outcome).toBe('OK');

      // Convert the result to a number and return it
      return {
        availability: Number(availability),
        accountBalance: Number(accountBalance),
      };
    } catch (error) {
      console.error('Error parsing XML:', error);
      throw error;
    }
  }
}
