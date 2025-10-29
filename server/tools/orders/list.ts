import { createPrivateTool } from "@deco/workers-runtime/mastra";
import { z } from "zod";
import type { Env } from "../../main.ts";

export const createListOrdersTool = (env: Env) =>
    createPrivateTool({
      id: "LIST_ORDERS",
      description: "List VTEX orders with detailed information including status, payment, shipping, and customer details",
      inputSchema: z.object({
        orderBy: z.string().optional().describe("You can retrieve orders lists filtering by an OrderField combined with an OrderType. To do so, you have to concatenate them: orderBy={{OrderField}},{{OrderType}}. OrderField values accepted: creationDate, orderId, items, totalValue and origin. OrderType values accepted: asc and desc."),
        page: z.number().optional().describe("Define the number of pages you wish to retrieve, restricted to the limit of 30 pages."),
        per_page: z.number().optional().describe("Quantity of orders for each page, the default value is 15 and it goes up to 100 orders per page. Be aware that the limit of retrieval of this endpoint is 30 pages."),
        f_hasInputInvoice: z.boolean().optional().describe("Filters list to return only orders with non null values for the invoiceInput field."),
        q: z.string().optional().describe("This parameter filters using Fulltext and accepts the values below. Be aware that the + caracter is not allowed in Fulltext Search. Order Id, Client email, Client document and Client name. Example: OrderID: v212333lux-02, Client email: taylor@email.com, Client document: 21133355524, Client name: Taylor"),
        f_shippingEstimate: z.string().optional().describe("You can filter orders by shipping estimate time in days by concatenating the desired number of days with the sufix .days. Examples: Tomorrow: 1.days, Today: 0.days, Late: -1.days, Next 7 days: 7.days"),
        f_invoicedDate: z.string().optional().describe("You can filter orders by invoiced date by concatenating the sufix invoicedDate: with the range date in Timestamp format. Example: invoicedDate:[2022-01-01T02:00:00.000Z TO 2022-01-02T01:59:59.999Z] for 1 Day, invoicedDate:[2022-01-01T02:00:00.000Z TO 2022-02-01T01:59:59.999Z] for 1 Month"),
        f_creationDate: z.string().optional().describe("You can filter orders by creation date by concatenating the sufix creationDate: with the range date in Timestamp format. Example: creationDate:[2022-01-01T02:00:00.000Z TO 2022-01-02T01:59:59.999Z] for 1 Day, creationDate:[2022-01-01T02:00:00.000Z TO 2022-02-01T01:59:59.999Z] for 1 Month"),
        f_authorizedDate: z.string().optional().describe("You can filter orders by authorized date by concatenating the sufix authorizedDate: with the range date in Timestamp format. Example: authorizedDate:[2022-01-01T02:00:00.000Z TO 2022-01-02T01:59:59.999Z] for 1 Day, authorizedDate:[2022-01-01T02:00:00.000Z TO 2022-02-01T01:59:59.999Z] for 1 Month"),
        f_UtmSource: z.string().optional().describe("You can filter orders by Urchin Tracking Module (UTM) source. Example: christmas_campaign"),
        f_sellerNames: z.string().optional().describe("You can filter orders by using a seller's name. Example: SellerName"),
        f_callCenterOperatorName: z.string().optional().describe("You can filter orders by using a Call Center Operator's identification. Example: Operator%20Name"),
        f_salesChannel: z.string().optional().describe("You can filter orders by sales channel's (or trade policy) name. Example: Main"),
        salesChannelId: z.string().optional().describe("You can filter orders by sales channel's (or trade policy) ID. Example: 1"),
        f_affiliateId: z.string().optional().describe("You can filter orders by affiliate ID. Example: WLM"),
        f_status: z.string().optional().describe("You can filter orders by the following order status. Examples: waiting-for-sellers-confirmation, payment-pending, payment-approved, ready-for-handling, handling, invoiced, canceled"),
        incompleteOrders: z.boolean().optional().describe("When set as true, you retrieve incomplete orders, when set as false, you retrieve orders that are not incomplete."),
        f_paymentNames: z.string().optional().describe("You can filter orders by payment type. Example: Visa"),
        f_RnB: z.string().optional().describe("You can filter orders by rates and benefits (promotions). Example: Free+Shipping"),
        searchField: z.string().optional().describe("You can search orders by using one of the following criterias: SKU ID: 25, Gift List ID: 11223, Transaction ID (TID): 54546300238810034995829230012, PCI Connector's Transaction ID (TID): 7032909234899834298423209, Payment ID (PID): 2, Connector's NSU: 2437281"),
        f_isInstore: z.boolean().optional().describe("When set as true, this parameter filters orders made via inStore, and when set as false, it filters orders that were not made via inStore."),
      }),
      outputSchema: z.object({
        list: z.array(z.object({
          orderId: z.string().describe("Unique order identifier"),
          creationDate: z.string().describe("Order creation date in ISO format"),
          clientName: z.string().nullable().describe("Customer name"),
          items: z.array(z.any()).nullable().describe("Order items list"),
          totalValue: z.number().describe("Total order value in cents"),
          paymentNames: z.string().describe("Payment method names"),
          status: z.string().describe("Current order status code"),
          statusDescription: z.string().describe("Human-readable order status"),
          marketPlaceOrderId: z.string().nullable().describe("Marketplace order ID if applicable"),
          sequence: z.string().describe("Order sequence number"),
          salesChannel: z.string().describe("Sales channel ID"),
          affiliateId: z.string().describe("Affiliate ID"),
          origin: z.string().describe("Order origin (Marketplace, Fulfillment, etc)"),
          workflowInErrorState: z.boolean().describe("Whether workflow has errors"),
          workflowInRetry: z.boolean().describe("Whether workflow is retrying"),
          lastMessageUnread: z.string().nullable().describe("Last unread message"),
          ShippingEstimatedDate: z.string().nullable().describe("Estimated shipping date"),
          ShippingEstimatedDateMax: z.string().nullable().describe("Maximum estimated shipping date"),
          ShippingEstimatedDateMin: z.string().nullable().describe("Minimum estimated shipping date"),
          orderIsComplete: z.boolean().describe("Whether order is complete"),
          listId: z.string().nullable().describe("List ID if from a list"),
          listType: z.string().nullable().describe("Type of list"),
          authorizedDate: z.string().nullable().describe("Payment authorization date"),
          callCenterOperatorName: z.string().nullable().describe("Call center operator name"),
          totalItems: z.number().describe("Total number of items"),
          currencyCode: z.string().describe("Currency code (BRL, USD, etc)"),
          hostname: z.string().describe("Store hostname"),
          invoiceOutput: z.array(z.any()).nullable().describe("Output invoices"),
          invoiceInput: z.array(z.any()).nullable().describe("Input invoices"),
          lastChange: z.string().describe("Last change date"),
          isAllDelivered: z.boolean().describe("Whether all items are delivered"),
          isAnyDelivered: z.boolean().describe("Whether any item is delivered"),
          giftCardProviders: z.array(z.any()).nullable().describe("Gift card providers"),
          orderFormId: z.string().describe("Order form ID"),
          paymentApprovedDate: z.string().nullable().describe("Payment approval date"),
          readyForHandlingDate: z.string().nullable().describe("Ready for handling date"),
          deliveryDates: z.array(z.any()).nullable().describe("Delivery dates"),
          customFieldsValues: z.array(z.any()).nullable().describe("Custom field values"),
          customFields: z.array(z.any()).describe("Custom fields"),
        })),
        paging: z.object({
          total: z.number(),
          pages: z.number(),
          currentPage: z.number(),
          perPage: z.number(),
        }).optional().describe("Pagination information"),
      }),
      execute: async ({ context }) => {
        const { vtexAppKey, vtexAppToken, publicUrl } = env.DECO_REQUEST_CONTEXT.state;

        // Build query parameters
        const params = new URLSearchParams();
        if (context.orderBy) params.append("orderBy", context.orderBy);
        if (context.page) params.append("page", context.page.toString());
        if (context.per_page) params.append("per_page", context.per_page.toString());
        if (context.f_hasInputInvoice !== undefined) params.append("f_hasInputInvoice", context.f_hasInputInvoice.toString());
        if (context.q) params.append("q", context.q);
        if (context.f_shippingEstimate) params.append("f_shippingEstimate", context.f_shippingEstimate);
        if (context.f_invoicedDate) params.append("f_invoicedDate", context.f_invoicedDate);
        if (context.f_creationDate) params.append("f_creationDate", context.f_creationDate);
        if (context.f_authorizedDate) params.append("f_authorizedDate", context.f_authorizedDate);
        if (context.f_UtmSource) params.append("f_UtmSource", context.f_UtmSource);
        if (context.f_sellerNames) params.append("f_sellerNames", context.f_sellerNames);
        if (context.f_callCenterOperatorName) params.append("f_callCenterOperatorName", context.f_callCenterOperatorName);
        if (context.f_salesChannel) params.append("f_salesChannel", context.f_salesChannel);
        if (context.salesChannelId) params.append("salesChannelId", context.salesChannelId);
        if (context.f_affiliateId) params.append("f_affiliateId", context.f_affiliateId);
        if (context.f_status) params.append("f_status", context.f_status);
        if (context.incompleteOrders !== undefined) params.append("incompleteOrders", context.incompleteOrders.toString());
        if (context.f_paymentNames) params.append("f_paymentNames", context.f_paymentNames);
        if (context.f_RnB) params.append("f_RnB", context.f_RnB);
        if (context.searchField) params.append("searchField", context.searchField);
        if (context.f_isInstore !== undefined) params.append("f_isInstore", context.f_isInstore.toString());

        const url = `${publicUrl}/api/oms/pvt/orders${params.toString() ? `?${params.toString()}` : ""}`;
        
        const response = await fetch(url, {
          headers: {
            'X-VTEX-API-AppKey': vtexAppKey,
            'X-VTEX-API-AppToken': vtexAppToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`VTEX API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as {
          list?: any[];
          paging?: {
            total: number;
            pages: number;
            currentPage: number;
            perPage: number;
          };
        };
        
        return {
          list: data.list || [],
          paging: data.paging,
        };
      },
    });