export interface Payment{
    id?: number,
    cardOwnerName: string,
    cardNumber :string,
    expirationDate: Date,
    securityCode: string
}