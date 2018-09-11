export class Order {
    
        cartId: string;
        comment?: string;
        delivery?: {
          type: string
        };
        address?: {
          city?: string,
          streetId?: string,
          home?:number,
          housing?: string,
          index?: string,
          entrance?: string,
          floor?: string,
          apartment?: string
        };
        customer: {
          phone: string,
          mail?: string,       
          name: string
        }
      
      
}
